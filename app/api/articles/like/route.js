// app/api/articles/like/route.js - Local like API for Vietnamese American Voices
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

// Create Supabase client with anon key (limited permissions)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Get client IP address
function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

export async function POST(request) {
  try {
    const { article_id, site } = await request.json();
    const ip_address = getClientIP(request);

    const { data, error } = await supabase
      .from('article_likes')
      .insert([{ article_id, ip_address, site }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ success: false, error: 'Already liked' }, { status: 409 });
      }
      throw error;
    }

    // Get total count for this site only
    const { count } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', article_id)
      .eq('site', site);

    return NextResponse.json({
      success: true,
      total_likes: count || 0
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const article_id = searchParams.get('article_id');
    const site = searchParams.get('site') || 'korean';
    const ip_address = getClientIP(request);

    await supabase
      .from('article_likes')
      .delete()
      .eq('article_id', article_id)
      .eq('ip_address', ip_address)
      .eq('site', site);

    // Get total count for this site only
    const { count } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', article_id)
      .eq('site', site);

    return NextResponse.json({
      success: true,
      total_likes: count || 0
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const article_id = searchParams.get('article_id');
    const site = searchParams.get('site') || 'korean';
    const ip_address = getClientIP(request);

    // Check if user liked on this site
    const { data: userLike } = await supabase
      .from('article_likes')
      .select('id')
      .eq('article_id', article_id)
      .eq('ip_address', ip_address)
      .eq('site', site)
      .single();

    // Get total count for this site only
    const { count } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', article_id)
      .eq('site', site);

    return NextResponse.json({
      success: true,
      has_liked: !!userLike,
      total_likes: count || 0
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}