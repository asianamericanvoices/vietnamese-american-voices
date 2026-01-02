// API endpoint to retrieve event hub click analytics with daily aggregation
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = searchParams.get('end_date') || new Date().toISOString().split('T')[0];

    // Query event hub clicks from analytics_events table
    const { data: clickData, error } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('event_type', 'event_hub_click')
      .gte('created_at', startDate)
      .lte('created_at', endDate + 'T23:59:59')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching click data:', error);
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }

    // Aggregate clicks by day and event
    const dailyAggregation = {};
    const eventTotals = {};
    let totalClicks = 0;

    clickData?.forEach(click => {
      const date = click.created_at.split('T')[0];
      const eventName = click.metadata?.event_name || 'Unknown';

      // Daily aggregation
      if (!dailyAggregation[date]) {
        dailyAggregation[date] = {
          total: 0,
          events: {}
        };
      }

      dailyAggregation[date].total++;
      dailyAggregation[date].events[eventName] = (dailyAggregation[date].events[eventName] || 0) + 1;

      // Event totals
      eventTotals[eventName] = (eventTotals[eventName] || 0) + 1;
      totalClicks++;
    });

    // Convert to array format for easier charting
    const dailyData = Object.entries(dailyAggregation).map(([date, data]) => ({
      date,
      total: data.total,
      events: data.events
    }));

    // Calculate click-through rates if we have page views data
    const { data: pageViews } = await supabase
      .from('analytics_events')
      .select('*')
      .eq('event_type', 'page_view')
      .gte('created_at', startDate)
      .lte('created_at', endDate + 'T23:59:59');

    const totalPageViews = pageViews?.length || 0;
    const clickThroughRate = totalPageViews > 0 ? (totalClicks / totalPageViews * 100).toFixed(2) : 0;

    // Prepare response
    const analytics = {
      summary: {
        total_clicks: totalClicks,
        total_page_views: totalPageViews,
        click_through_rate: `${clickThroughRate}%`,
        date_range: {
          start: startDate,
          end: endDate
        }
      },
      event_totals: Object.entries(eventTotals).map(([event, count]) => ({
        event_name: event,
        click_count: count,
        percentage: ((count / totalClicks) * 100).toFixed(1) + '%'
      })).sort((a, b) => b.click_count - a.click_count),
      daily_trends: dailyData,
      top_destinations: clickData?.reduce((acc, click) => {
        const dest = click.metadata?.destination_url || 'Unknown';
        acc[dest] = (acc[dest] || 0) + 1;
        return acc;
      }, {})
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to process analytics' }, { status: 500 });
  }
}

// POST endpoint to manually trigger analytics report generation
export async function POST(request) {
  try {
    const body = await request.json();
    const { email_to } = body;

    // Get analytics data
    const analyticsResponse = await GET(request);
    const analyticsData = await analyticsResponse.json();

    if (email_to) {
      // Here you could send an email report
      // For now, just return the data
      console.log(`Would send analytics report to: ${email_to}`);
    }

    return NextResponse.json({
      message: 'Analytics report generated',
      data: analyticsData
    });
  } catch (error) {
    console.error('Report generation error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}