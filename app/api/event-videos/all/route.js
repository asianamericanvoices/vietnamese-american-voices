// Show ALL videos in the database for debugging
import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
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

    // Get ALL videos - no filters at all
    const { data: videos, error } = await supabase
      .from('event_videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        videos: []
      });
    }

    // Group by event and language for easy viewing
    const grouped = {};
    videos?.forEach(video => {
      const key = `${video.event_id}_${video.language}`;
      if (!grouped[key]) {
        grouped[key] = {
          event_id: video.event_id,
          language: video.language,
          videos: []
        };
      }
      grouped[key].videos.push({
        id: video.id,
        title: video.title,
        published: video.published,
        created_at: video.created_at
      });
    });

    return NextResponse.json({
      success: true,
      totalVideos: videos?.length || 0,
      groupedByEventAndLanguage: grouped,
      rawVideos: videos?.slice(0, 10) // Show first 10 raw videos
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      videos: []
    });
  }
}