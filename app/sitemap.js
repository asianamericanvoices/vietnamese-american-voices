// app/sitemap.js - Dynamic sitemap for Vietnamese American Voices
// Lists the homepage, event hub pages, and every published article that has a
// Vietnamese translation.

const SITE = 'https://www.tiengnoinguoimygocviet.us';
const LANG_COLUMN = 'vietnamese'; // translated_titles ->> vietnamese

export const revalidate = 3600;

const EVENT_SLUGS = [
  'alaska-elections-2026',
  'california-redistricting-2025',
  'georgia-elections-2026',
  'georgia-psc-2025',
  'georgia-supreme-court-2026',
  'iowa-senate-2026',
  'michigan-elections-2026',
  'nevada-elections-2026',
  'new-jersey-governor-2025',
  'north-carolina-elections-2026',
  'pennsylvania-1st-district-2026',
  'pennsylvania-supreme-court-2025',
  'tennessee-7th-congressional-2025',
];

async function fetchAllPublishedArticles() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(url, key);

  const all = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, translated_titles, scraped_date, published_date')
      .eq('status', 'published')
      .order('scraped_date', { ascending: false })
      .range(from, from + pageSize - 1);
    if (error) {
      console.error('sitemap: supabase error', error.message);
      break;
    }
    if (!data || data.length === 0) break;
    // Keep only articles that have a translation in this site's language.
    // Filter in JS (translated_titles is TEXT holding JSON) to match the proven
    // pattern used by app/api/published-articles.
    for (const row of data) {
      let titles = row.translated_titles;
      if (typeof titles === 'string') {
        try { titles = JSON.parse(titles); } catch { titles = null; }
      }
      if (titles && titles[LANG_COLUMN]) all.push(row);
    }
    if (data.length < pageSize) break;
  }
  return all;
}

export default async function sitemap() {
  const now = new Date();

  const staticEntries = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'hourly', priority: 1.0 },
    ...EVENT_SLUGS.map((slug) => ({
      url: `${SITE}/event/${slug}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.7,
    })),
  ];

  let articleEntries = [];
  try {
    const articles = await fetchAllPublishedArticles();
    articleEntries = articles.map((a) => ({
      url: `${SITE}/article/${a.id}`,
      lastModified: a.scraped_date || a.published_date || now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (e) {
    console.error('sitemap: failed to build article entries', e?.message);
  }

  return [...staticEntries, ...articleEntries];
}
