// Debug endpoint to check video database connectivity and data
import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {},
    database: {},
    query: {},
    data: {}
  };

  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('event') || 'pennsylvania-supreme-court-2025';
    const language = searchParams.get('language') || 'korean';

    debugInfo.query = { eventId, language };

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    debugInfo.environment = {
      hasSupabaseUrl: !!supabaseUrl,
      supabaseUrlLength: supabaseUrl?.length || 0,
      hasSupabaseKey: !!supabaseKey,
      supabaseKeyLength: supabaseKey?.length || 0,
      supabaseUrlPrefix: supabaseUrl?.substring(0, 30) + '...' || 'NOT SET',
      nodeEnv: process.env.NODE_ENV
    };

    if (!supabaseUrl || !supabaseKey) {
      debugInfo.database.status = 'NOT_CONFIGURED';
      debugInfo.database.message = 'Supabase environment variables are not set';
      return NextResponse.json(debugInfo);
    }

    // Try to connect to database
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl, supabaseKey);

      debugInfo.database.status = 'CONNECTED';

      // Try different queries to debug

      // 1. Check if table exists and get all videos (no filters)
      const { data: allVideos, error: allError } = await supabase
        .from('event_videos')
        .select('*')
        .limit(10);

      if (allError) {
        debugInfo.database.tableError = allError.message;
        debugInfo.database.tableErrorDetails = allError;
      } else {
        debugInfo.data.totalVideosInTable = allVideos?.length || 0;
        debugInfo.data.sampleVideo = allVideos?.[0] || null;
      }

      // 2. Check videos for this specific event (no language filter)
      const { data: eventVideos, error: eventError } = await supabase
        .from('event_videos')
        .select('*')
        .eq('event_id', eventId);

      if (!eventError) {
        debugInfo.data.videosForEvent = eventVideos?.length || 0;
        debugInfo.data.eventVideoLanguages = [...new Set(eventVideos?.map(v => v.language) || [])];
      }

      // 3. Check videos for this language (no event filter)
      const { data: langVideos, error: langError } = await supabase
        .from('event_videos')
        .select('*')
        .eq('language', language);

      if (!langError) {
        debugInfo.data.videosForLanguage = langVideos?.length || 0;
        debugInfo.data.languageVideoEvents = [...new Set(langVideos?.map(v => v.event_id) || [])];
      }

      // 4. Check the exact query used in the main API
      const { data: exactVideos, error: exactError } = await supabase
        .from('event_videos')
        .select('*')
        .eq('event_id', eventId)
        .eq('language', language)
        .eq('published', true);

      if (exactError) {
        debugInfo.data.exactQueryError = exactError.message;
      } else {
        debugInfo.data.exactQueryCount = exactVideos?.length || 0;
        debugInfo.data.exactQueryVideos = exactVideos || [];
      }

      // 5. Check without published filter
      const { data: unpublishedVideos, error: unpubError } = await supabase
        .from('event_videos')
        .select('*')
        .eq('event_id', eventId)
        .eq('language', language);

      if (!unpubError) {
        debugInfo.data.withoutPublishedFilter = unpublishedVideos?.length || 0;
        debugInfo.data.publishedStatus = unpublishedVideos?.map(v => ({
          id: v.id,
          title: v.title,
          published: v.published
        })) || [];
      }

    } catch (dbError) {
      debugInfo.database.status = 'CONNECTION_FAILED';
      debugInfo.database.error = dbError.message;
      debugInfo.database.errorStack = dbError.stack;
    }

  } catch (error) {
    debugInfo.error = {
      message: error.message,
      stack: error.stack
    };
  }

  return NextResponse.json(debugInfo, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}