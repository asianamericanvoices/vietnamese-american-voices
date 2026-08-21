// app/robots.js - robots.txt for Vietnamese American Voices
// Policy: allow search + AI *answer/retrieval* bots (so we get cited in AI
// answers and surface in Google/Bing AI Overviews), but disallow pure *training*
// scrapers. Googlebot/Bingbot stay fully allowed on purpose — their AI Overviews
// / Copilot run off the normal search index. Google-Extended is the separate
// Gemini-training control, so we disallow that instead.

const SITE = 'https://www.tiengnoinguoimygocviet.us';

const TRAINING_BOTS = [
  'GPTBot',
  'Google-Extended',
  'CCBot',
  'anthropic-ai',
  'ClaudeBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'Applebot-Extended',
  'Diffbot',
  'Omgilibot',
  'omgili',
  'ImagesiftBot',
  'PanguBot',
  'Timpibot',
];

const ANSWER_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'DuckAssistBot',
  'YouBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...ANSWER_BOTS.map((ua) => ({ userAgent: ua, allow: '/' })),
      ...TRAINING_BOTS.map((ua) => ({ userAgent: ua, disallow: '/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
