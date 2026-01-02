import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Check for required environment variables - try multiple possible names
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ||
                       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                       process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        {
          error: 'Configuration error',
          message: 'Supabase is not properly configured',
          missing: {
            url: !supabaseUrl,
            key: !supabaseKey
          }
        },
        { status: 503 }
      );
    }

    // Initialize Supabase client inside the function
    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();

    // Get IP address for tracking
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Prepare data for insertion
    const surveyData = {
      event_slug: body.event_slug,
      state: body.state,
      response: body.response,
      ip_address: ip,
      user_agent: request.headers.get('user-agent') || 'unknown',
      language: body.language || 'ko', // Default to Korean
      metadata: {
        timestamp: body.timestamp,
        referrer: request.headers.get('referer') || null,
        session_id: body.session_id || null
      }
    };

    // Try to insert into voter_engagement_surveys table first
    // If it fails, we'll fall back to analytics_events
    const { data, error } = await supabase
      .from('voter_engagement_surveys')
      .insert([surveyData])
      .select()
      .single();

    if (error) {
      console.error('Error saving to voter_engagement_surveys:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      // Fallback: Save to analytics_events table if voter_engagement_surveys doesn't exist
      console.log('Attempting fallback to analytics_events table...');
      const fallbackData = {
        event_type: 'voter_survey_response',
        metadata: {
          ...surveyData,
          table_error: error.message
        }
      };

      const { data: fallbackResult, error: fallbackError } = await supabase
        .from('analytics_events')
        .insert([fallbackData])
        .select()
        .single();

      if (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        return NextResponse.json(
          {
            error: 'Failed to save survey response',
            details: {
              primary_error: error.message,
              fallback_error: fallbackError.message
            }
          },
          { status: 500 }
        );
      }

      console.log('Successfully saved to analytics_events as fallback');
      return NextResponse.json({
        success: true,
        message: 'Survey response saved (fallback)',
        id: fallbackResult.id,
        fallback: true
      });
    }

    // Also log to analytics_events for unified tracking
    await supabase
      .from('analytics_events')
      .insert([{
        event_type: 'voter_survey_response',
        metadata: {
          ...surveyData,
          survey_id: data.id
        }
      }]);

    return NextResponse.json({
      success: true,
      message: 'Survey response saved successfully',
      id: data.id
    });

  } catch (error) {
    console.error('Error in voter survey API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve survey stats (for dashboard)
export async function GET(request) {
  try {
    // Check for required environment variables - try multiple possible names
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ||
                       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                       process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 503 }
      );
    }

    // Initialize Supabase client inside the function
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { searchParams } = new URL(request.url);
    const eventSlug = searchParams.get('event');
    const state = searchParams.get('state');

    let query = supabase
      .from('voter_engagement_surveys')
      .select('response, created_at');

    if (eventSlug) {
      query = query.eq('event_slug', eventSlug);
    }
    if (state) {
      query = query.eq('state', state);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching survey data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch survey data' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const stats = {
      total_responses: data.length,
      already_voted: data.filter(r => r.response === 'already_voted').length,
      will_vote: data.filter(r => r.response === 'will_vote').length,
      need_info: data.filter(r => r.response === 'need_info').length,
      skip: data.filter(r => r.response === 'skip').length,
      response_rate: data.filter(r => r.response !== 'skip').length / data.length * 100
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Error in survey stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}