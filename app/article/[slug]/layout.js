// app/article/[slug]/layout.js - Server-side metadata + structured data for articles
import { cache } from 'react';

const SITE = 'https://www.tiengnoinguoimygocviet.us';
const FETCH_BASE = process.env.NEXT_PUBLIC_SITE_URL || SITE;

// Fetch the SPECIFIC article by id. Deduped per-request via React cache() so
// generateMetadata and the layout component share a single fetch. (Previously
// this scanned the top-200 published-articles list and .find()'d the id, so any
// article deeper than 200 got a "not found" title even though the body loaded.)
const getArticle = cache(async (slug) => {
  try {
    const res = await fetch(`${FETCH_BASE}/api/article/${slug}?language=vietnamese`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.article || null;
  } catch (error) {
    console.error('getArticle failed:', error?.message);
    return null;
  }
});

const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, '').trim();

export async function generateMetadata({ params }) {
  const slug = await Promise.resolve(params.slug);
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Không tìm thấy bài viết | Tiếng Nói Việt Mỹ',
      description: 'Xin lỗi, bài viết bạn yêu cầu không tồn tại.',
    };
  }

  const vietnameseTitle = article.translatedTitles?.vietnamese || article.originalTitle;
  const vietnameseSummary = article.translations?.vietnamese || article.aiSummary;
  const description = stripHtml(vietnameseSummary).substring(0, 160) + '...';
  const imageUrl = article.imageUrl || '/og-logo-vietnamese-3.png';

  return {
    title: `${vietnameseTitle} | Tiếng Nói Người Mỹ Gốc Việt`,
    description,
    alternates: {
      canonical: `/article/${slug}`,
    },
    openGraph: {
      title: vietnameseTitle,
      description,
      type: 'article',
      url: `${SITE}/article/${slug}`,
      publishedTime: article.publishedDate,
      authors: [article.author || 'Tiếng Nói Người Mỹ Gốc Việt'],
      section: article.topic,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: vietnameseTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: vietnameseTitle,
      description,
      images: [imageUrl],
    },
  };
}

function newsArticleLd(article, slug) {
  const headline = stripHtml(article.translatedTitles?.vietnamese || article.originalTitle);
  const authorName =
    article.author && !['N/A', 'Unknown', 'Staff'].includes(article.author)
      ? article.author
      : article.source || 'Tiếng Nói Người Mỹ Gốc Việt';
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    inLanguage: 'vi',
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    ...(article.imageUrl ? { image: [article.imageUrl] } : {}),
    author: [{ '@type': article.author ? 'Person' : 'Organization', name: authorName }],
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Tiếng Nói Người Mỹ Gốc Việt',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/og-logo-vietnamese-3.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/article/${slug}` },
    url: `${SITE}/article/${slug}`,
    ...(article.topic ? { articleSection: article.topic } : {}),
  };
}

export default async function ArticleLayout({ children, params }) {
  const slug = await Promise.resolve(params?.slug);
  const article = slug ? await getArticle(slug) : null;

  return (
    <>
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleLd(article, slug)) }}
        />
      )}
      {children}
    </>
  );
}
