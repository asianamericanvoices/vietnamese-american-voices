// Test API - Simplified version without published filter
import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('event');
    const language = searchParams.get('language') || 'korean';

    console.log('[TEST API] Called with:', { eventId, language });

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        message: 'Supabase not configured',
        videos: []
      });
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // SIMPLIFIED QUERY - No published filter
    const { data: videos, error } = await supabase
      .from('event_videos')
      .select('*')
      .eq('event_id', eventId)
      .eq('language', language);

    console.log('[TEST API] Query result:', {
      foundVideos: videos?.length || 0,
      error: error?.message || null
    });

    if (videos && videos.length > 0) {
      console.log('[TEST API] First video details:', {
        id: videos[0].id,
        title: videos[0].title,
        published: videos[0].published,
        event_id: videos[0].event_id,
        language: videos[0].language
      });
    }

    // Map to frontend format
    const mappedVideos = (videos || []).map(v => ({
      id: v.id,
      title: v.title,
      videoUrl: v.video_url,
      thumbnailUrl: v.thumbnail_url,
      duration: v.duration,
      eventId: v.event_id,
      language: v.language,
      published: v.published,
      order: v.order_num,
      publishDate: v.publish_date || v.created_at || new Date().toISOString()
    }));

    return NextResponse.json({
      success: true,
      videos: mappedVideos,
      debug: {
        queryEventId: eventId,
        queryLanguage: language,
        totalFound: mappedVideos.length
      }
    });

  } catch (error) {
    console.error('[TEST API] Error:', error);
    return NextResponse.json({
      success: false,
      videos: [],
      error: error.message
    });
  }
}