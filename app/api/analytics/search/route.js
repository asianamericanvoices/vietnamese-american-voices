// app/api/analytics/search/route.js - Search behavior tracking for Vietnamese American Voices
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Hash IP for privacy compliance
function hashIP(ip) {
  if (!ip) return null;
  return crypto.createHash('sha256').update(ip + (process.env.IP_SALT || 'vietnamese-american-voices')).digest('hex').substring(0, 16);
}

// Get client IP from headers
function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  if (cfIP) return cfIP;
  return null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      site, 
      search_query, 
      results_count, 
      clicked_result = false, 
      clicked_article_id = null,
      language 
    } = body;
    
    if (!site || !search_query) {
      return NextResponse.json({ error: 'site and search_query are required' }, { status: 400 });
    }

    const clientIP = getClientIP(request);
    const ipHash = hashIP(clientIP);
    
    // Insert search analytics data
    const { data, error } = await supabase
      .from('search_analytics')
      .insert({
        ip_hash: ipHash,
        site: site,
        search_query: search_query.toLowerCase().trim(), // Normalize for better analytics
        results_count: results_count || 0,
        clicked_result: clicked_result,
        clicked_article_id: clicked_article_id,
        language: language || (site === 'chinese' ? 'zh' : site === 'korean' ? 'ko' : 'vi')
      })
      .select();

    if (error) {
      console.error('Search analytics insert error:', error);
      return NextResponse.json({ error: 'Failed to track search' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      search_id: data[0]?.id 
    });

  } catch (error) {
    console.error('Search analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint for search analytics dashboard (optional)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get('site');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Get top search queries
    const { data: topQueries, error } = await supabase
      .from('search_analytics')
      .select('search_query, site, COUNT(*) as search_count')
      .match(site ? { site } : {})
      .groupBy(['search_query', 'site'])
      .order('search_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Search analytics query error:', error);
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      top_queries: topQueries || [],
      site: site || 'all'
    });

  } catch (error) {
    console.error('Search analytics GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}