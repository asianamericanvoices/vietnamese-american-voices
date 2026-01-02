// app/article/[slug]/layout.js - Server-side metadata generation for articles
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const slug = await Promise.resolve(params.slug);
    
    // Fetch the article to get its data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://korean-american-voices.vercel.app';
    const response = await fetch(`${baseUrl}/api/published-articles?language=korean&limit=200&_t=${Date.now()}`, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    const data = await response.json();
    const article = data.articles?.find(a => a.id.toString() === slug.toString());
    
    if (!article) {
      return {
        title: '기사를 찾을 수 없습니다 | 한미목소리',
        description: '죄송합니다. 요청하신 기사를 찾을 수 없습니다.',
      };
    }

    const koreanTitle = article.translatedTitles?.korean || article.originalTitle;
    const koreanSummary = article.translations?.korean || article.aiSummary;
    const imageUrl = article.imageUrl || '/og-logo-korean-2.png'; // Fallback to branded logo
    
    return {
      title: `${koreanTitle} | 한미목소리`,
      description: koreanSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      openGraph: {
        title: koreanTitle,
        description: koreanSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        type: 'article',
        publishedTime: article.publishedDate,
        authors: [article.author || '한미목소리'],
        section: article.topic,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: koreanTitle,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: koreanTitle,
        description: koreanSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '한미목소리',
      description: '미국 한인 사회를 위한 독립 언론 매체',
    };
  }
}

export default function ArticleLayout({ children }) {
  return children;
}