// API endpoint for location-based popup metrics
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering to allow request.url usage
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (timeframe) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Fetch all popup-related events
    const { data: popupEvents, error } = await supabase
      .from('analytics_events')
      .select('*')
      .in('event_type', ['popup_shown', 'popup_dismissed', 'popup_link_click', 'event_hub_click'])
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Popup metrics query error:', error);
      return NextResponse.json({ error: 'Failed to fetch popup metrics' }, { status: 500 });
    }

    // Process the data
    const metrics = processPopupMetrics(popupEvents || [], timeframe);

    return NextResponse.json({
      success: true,
      timeframe,
      metrics,
      totalEvents: popupEvents?.length || 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Popup metrics API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function processPopupMetrics(events, timeframe) {
  if (!events.length) {
    return {
      popupShown: { total: 0, byState: {}, autoShown: 0, testMode: 0 },
      popupDismissed: { total: 0, byType: {} },
      linkClicks: { total: 0, byLinkType: {}, topLinks: [] },
      eventHubClicks: { total: 0, byEvent: {}, dailyTrend: [] },
      conversionRate: 0,
      engagementRate: 0,
      dailyMetrics: []
    };
  }

  // Initialize metrics
  const popupShown = { total: 0, byState: {}, autoShown: 0, testMode: 0 };
  const popupDismissed = { total: 0, byType: {} };
  const linkClicks = { total: 0, byLinkType: {}, linkDetails: [] };
  const eventHubClicks = { total: 0, byEvent: {}, dailyTrend: {} };
  const dailyMetrics = {};

  // Process each event
  events.forEach(event => {
    const metadata = event.metadata || {};
    const date = event.created_at?.split('T')[0] || new Date().toISOString().split('T')[0];

    // Initialize daily metrics
    if (!dailyMetrics[date]) {
      dailyMetrics[date] = {
        popupShown: 0,
        popupDismissed: 0,
        linkClicks: 0,
        eventHubClicks: 0
      };
    }

    switch (event.event_type) {
      case 'popup_shown':
        popupShown.total++;
        dailyMetrics[date].popupShown++;

        const state = metadata.user_state || 'Unknown';
        popupShown.byState[state] = (popupShown.byState[state] || 0) + 1;

        if (metadata.auto_shown) popupShown.autoShown++;
        if (metadata.test_mode) popupShown.testMode++;
        break;

      case 'popup_dismissed':
        popupDismissed.total++;
        dailyMetrics[date].popupDismissed++;

        const dismissType = metadata.dismiss_type || 'unknown';
        popupDismissed.byType[dismissType] = (popupDismissed.byType[dismissType] || 0) + 1;
        break;

      case 'popup_link_click':
        linkClicks.total++;
        dailyMetrics[date].linkClicks++;

        const linkType = metadata.link_type || 'Unknown';
        linkClicks.byLinkType[linkType] = (linkClicks.byLinkType[linkType] || 0) + 1;

        linkClicks.linkDetails.push({
          type: linkType,
          url: metadata.link_url,
          text: metadata.link_text,
          state: metadata.user_state,
          time: event.created_at
        });
        break;

      case 'event_hub_click':
        eventHubClicks.total++;
        dailyMetrics[date].eventHubClicks++;

        const eventName = metadata.event_name || 'Unknown';
        eventHubClicks.byEvent[eventName] = (eventHubClicks.byEvent[eventName] || 0) + 1;

        if (!eventHubClicks.dailyTrend[date]) {
          eventHubClicks.dailyTrend[date] = 0;
        }
        eventHubClicks.dailyTrend[date]++;
        break;
    }
  });

  // Calculate conversion and engagement rates
  const conversionRate = popupShown.total > 0
    ? ((linkClicks.total / popupShown.total) * 100).toFixed(2)
    : 0;

  const engagementRate = popupShown.total > 0
    ? (((linkClicks.total + popupDismissed.byType['confirm_button']) / popupShown.total) * 100).toFixed(2)
    : 0;

  // Format daily metrics for charts
  const dailyMetricsArray = Object.entries(dailyMetrics)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, metrics]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date,
      ...metrics
    }));

  // Format daily event hub trend
  const eventHubDailyTrend = Object.entries(eventHubClicks.dailyTrend)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      clicks: count
    }));

  // Get top clicked links
  const topLinks = linkClicks.linkDetails
    .reduce((acc, link) => {
      const key = link.text || link.type;
      if (!acc[key]) {
        acc[key] = {
          text: link.text,
          type: link.type,
          url: link.url,
          count: 0
        };
      }
      acc[key].count++;
      return acc;
    }, {});

  const topLinksArray = Object.values(topLinks)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    popupShown,
    popupDismissed,
    linkClicks: {
      ...linkClicks,
      topLinks: topLinksArray
    },
    eventHubClicks: {
      ...eventHubClicks,
      dailyTrend: eventHubDailyTrend
    },
    conversionRate,
    engagementRate,
    dailyMetrics: dailyMetricsArray
  };
}