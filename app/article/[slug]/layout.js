// app/article/[slug]/layout.js - Server-side metadata generation for articles
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  try {
    const slug = await Promise.resolve(params.slug);

    // Fetch the article to get its data
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vietnamese-american-voices.vercel.app';
    const response = await fetch(`${baseUrl}/api/published-articles?language=vietnamese&limit=200&_t=${Date.now()}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    const article = data.articles?.find(a => a.id.toString() === slug.toString());

    if (!article) {
      return {
        title: 'Không tìm thấy bài viết | Tiếng Nói Việt Mỹ',
        description: 'Xin lỗi, bài viết bạn yêu cầu không tồn tại.',
      };
    }

    const vietnameseTitle = article.translatedTitles?.vietnamese || article.originalTitle;
    const vietnameseSummary = article.translations?.vietnamese || article.aiSummary;
    const imageUrl = article.imageUrl || '/og-logo-vietnamese.png'; // Fallback to branded logo

    return {
      title: `${vietnameseTitle} | Tiếng Nói Việt Mỹ`,
      description: vietnameseSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      openGraph: {
        title: vietnameseTitle,
        description: vietnameseSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        type: 'article',
        publishedTime: article.publishedDate,
        authors: [article.author || 'Tiếng Nói Việt Mỹ'],
        section: article.topic,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: vietnameseTitle,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: vietnameseTitle,
        description: vietnameseSummary?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Tiếng Nói Việt Mỹ',
      description: 'Trang tin tức độc lập cho cộng đồng người Mỹ gốc Việt',
    };
  }
}

export default function ArticleLayout({ children }) {
  return children;
}
