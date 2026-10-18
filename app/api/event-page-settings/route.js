// app/api/event-page-settings/route.js
// Read-only: editorial settings for an event page (set in the AAVM dashboard),
// e.g. the Top stories slot picks on the Texas Railroad Commission voter guide.
// GET ?page=<page_key> -> { topStoryIds: [id | null, ...] } in slot order.
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const pageKey = new URL(request.url).searchParams.get('page');
  if (!pageKey) {
    return NextResponse.json({ error: 'page is required' }, { status: 400 });
  }

  // Missing config or table: fall back to all-auto rather than failing the page.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return NextResponse.json({ topStoryIds: [] });
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from('event_page_settings')
      .select('top_story_ids')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (error) throw error;

    let ids = [];
    if (data?.top_story_ids) {
      try {
        const parsed = JSON.parse(data.top_story_ids);
        if (Array.isArray(parsed)) ids = parsed;
      } catch {
        ids = [];
      }
    }
    return NextResponse.json({ topStoryIds: ids });
  } catch (error) {
    console.error('event-page-settings error:', error.message);
    return NextResponse.json({ topStoryIds: [] });
  }
}
