// app/api/search/route.js - Local search API for KAV
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const site = searchParams.get('site') || 'korean';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ success: true, results: [] });
    }

    // Search published articles using dedicated search fields
    const { data: articles } = await supabase
      .from('articles')
      .select('*, scraped_date, published_date, image_url, relevance_score')
      .eq('status', 'published')
      .or(`original_title.ilike.%${query}%,korean_title_search.ilike.%${query}%,korean_content_search.ilike.%${query}%`)
      .order('scraped_date', { ascending: false })
      .order('relevance_score', { ascending: false, nullsLast: true })
      .limit(limit);

    const results = articles?.map(article => {
      // Get the appropriate title and summary based on site language
      const translatedTitles = typeof article.translated_titles === 'string' 
        ? JSON.parse(article.translated_titles || '{}') 
        : article.translated_titles || {};
      
      const translations = typeof article.translations === 'string'
        ? JSON.parse(article.translations || '{}')
        : article.translations || {};

      const displayTitle = site === 'chinese' && translatedTitles.chinese
        ? translatedTitles.chinese
        : site === 'korean' && translatedTitles.korean
          ? translatedTitles.korean
          : article.display_title || article.original_title;

      const displaySummary = site === 'chinese' && translations.chinese
        ? translations.chinese
        : site === 'korean' && translations.korean
          ? translations.korean
          : article.ai_summary || '';

      return {
        id: article.id,
        originalTitle: article.original_title,
        displayTitle: displayTitle,
        translatedTitles: translatedTitles,
        translations: translations,
        topic: article.topic,
        source: article.source,
        publishedDate: article.scraped_date, // Use scraped_date to match article pages
        matchedSummary: displaySummary.substring(0, 200),
        imageUrl: article.image_url,
        relevanceScore: article.relevance_score
      };
    }) || [];

    return NextResponse.json({
      success: true,
      results,
      total_results: results.length
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}