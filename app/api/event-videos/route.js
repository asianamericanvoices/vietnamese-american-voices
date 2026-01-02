// API endpoint to fetch videos for event pages
import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// GET /api/event-videos?event=pennsylvania-supreme-court-2025&language=korean
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('event');
    const language = searchParams.get('language') || 'korean';

    console.log('API called with:', { eventId, language });

    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Event ID is required', videos: [] },
        { status: 400 }
      );
    }

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase not configured, returning empty array');
      return NextResponse.json({
        success: true,
        videos: [],
        message: 'Database not configured'
      });
    }

    // Try to import and use Supabase
    try {
      const { createClient } = await import('@supabase/supabase-js');

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Query published videos from database
      const { data: videos, error } = await supabase
        .from('event_videos')
        .select('*')
        .eq('event_id', eventId)
        .eq('language', language)
        .eq('published', true)
        .order('order_num', { ascending: true });

      if (error) {
        console.error('Supabase query error:', error);
        // Don't throw, just return empty array
        return NextResponse.json({
          success: true,
          videos: [],
          message: error.message
        });
      }

      // Map database fields to camelCase for frontend compatibility
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

      console.log(`Returning ${mappedVideos.length} videos`);

      return NextResponse.json({
        success: true,
        videos: mappedVideos
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      // If Supabase fails, return empty array
      return NextResponse.json({
        success: true,
        videos: [],
        message: 'Database connection failed'
      });
    }

  } catch (error) {
    console.error('API error:', error);
    // Always return a valid response
    return NextResponse.json({
      success: false,
      videos: [],
      error: error.message || 'Unknown error'
    });
  }
}