// app/article/[slug]/page.js - Vietnamese American Voices Article Page
'use client';

import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, ArrowLeft, Share2 } from 'lucide-react';
import {
  shareToWhatsApp,
  shareToFacebook,
  shareToTwitter,
  shareToEmail,
  copyToClipboard,
  nativeShare
} from '../../../lib/sharing';
import Link from 'next/link';
import Head from 'next/head';
import HeartButton from '../../components/HeartButton';
import ArticleAudioPlayer from '../../components/ArticleAudioPlayer';


export default function ArticlePage({ params }) {
  // Handle the async params in Next.js 13+ App Router
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    // Unwrap params if they're a Promise (Next.js 15+)
    const getSlug = async () => {
      const resolvedParams = await Promise.resolve(params);
      setSlug(resolvedParams.slug);
    };

    if (params) {
      if (typeof params === 'object' && params.slug) {
        setSlug(params.slug);
      } else {
        getSlug();
      }
    }
  }, [params]);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        // For simplified URLs, slug is just the article ID
        const articleId = slug.toString();

        // Use the dedicated article endpoint for better performance and UUID support
        const response = await fetch(`/api/article/${articleId}?language=vietnamese&t=${Date.now()}`);

        if (!response.ok) {
          if (response.status === 404) {
            console.error('Article not found for ID:', articleId);
            setError('Không tìm thấy bài viết');
            setLoading(false);
            return;
          }
          throw new Error(`Failed to fetch article: ${response.status}`);
        }

        const data = await response.json();
        const foundArticle = data.article;

        if (!foundArticle) {
          console.error('No article data returned for ID:', articleId);
          setError('Không tìm thấy bài viết');
          setLoading(false);
          return;
        }

        setArticle(foundArticle);

        // Fetch related articles separately
        try {
          const relatedResponse = await fetch(`/api/published-articles?language=vietnamese&category=${foundArticle.topic}&limit=4&t=${Date.now()}`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            const related = relatedData.articles
              .filter(a => a.id !== foundArticle.id)
              .slice(0, 3);
            setRelatedArticles(related);
          }
        } catch (error) {
          console.warn('Failed to fetch related articles:', error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Lỗi khi tải bài viết');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // Analytics tracking useEffect
  useEffect(() => {
    if (article && typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
      console.log('📊 Tracking article view:', article.id);

      // Track article page view
      window.trackEvent('page_view', {
        article_id: article.id,
        article_title: getDisplayTitle(article),
        article_topic: article.topic,
        article_source: article.source,
        article_language: 'vi',
        content_type: 'article'
      });

      // Track reading session start
      window.trackEvent('reading_start', {
        article_id: article.id,
        article_title: getDisplayTitle(article),
        article_language: 'vi'
      });
    }
  }, [article]);

  // Category mapping for VAV - China-US Relations articles appear as International News
  const mapCategoryForVAV = (originalCategory) => {
    const mapping = {
      'China-US Relations': 'International News',  // Hide China-US, show as International
    };
    return mapping[originalCategory] || originalCategory;
  };

  const getCategoryNameInVietnamese = (topic) => {
    const directCategoryMap = {
      'Event Explainers': 'Giải thích sự kiện',
      'Vietnam-US Relations': 'Quan hệ Việt-Mỹ',
      'International News': 'Tin quốc tế',
      'US Politics': 'Chính trị Hoa Kỳ',
      'Healthcare': 'Y tế',
      'Education': 'Giáo dục',
      'Immigration': 'Di trú',
      'Economy': 'Kinh tế',
      'Culture': 'Văn hóa',
      'Sports': 'Thể thao',
      'General': 'Tổng hợp'
    };

    if (directCategoryMap[topic]) {
      return directCategoryMap[topic];
    }

    const mappedTopic = mapCategoryForVAV(topic);
    return directCategoryMap[mappedTopic] || mappedTopic;
  };

  const getDisplayTitle = (article) => {
    return article.translatedTitles?.vietnamese ||
           article.displayTitle ||
           article.aiTitle ||
           article.originalTitle;
  };

  const getDisplaySummary = (article) => {
    return article.translations?.vietnamese ||
           article.aiSummary ||
           'Chưa có bản dịch tiếng Việt';
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const localDate = new Date(year, month - 1, day);

    return localDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorDisplay = (author, source) => {
    if (author &&
        author !== 'N/A' &&
        author !== 'Unknown' &&
        author !== 'Staff' &&
        author.trim().length > 0) {
      return author;
    }

    return source || 'Phóng viên';
  };

  // Platform-specific share handler
  const handlePlatformShare = async (platform) => {
    const title = getDisplayTitle(article);
    const summary = getDisplaySummary(article);

    console.log(`📤 Sharing to ${platform}:`, title);

    try {
      let success = false;

      switch (platform) {
        case 'whatsapp':
          success = await shareToWhatsApp(article.id, title);
          break;
        case 'facebook':
          success = await shareToFacebook(article.id, title);
          break;
        case 'twitter':
          success = await shareToTwitter(article.id, title);
          break;
        case 'email':
          success = await shareToEmail(article.id, title, summary);
          break;
        case 'copy':
          success = await copyToClipboard(article.id, title);
          break;
        case 'native':
        default:
          success = await nativeShare(article.id, title, summary);
          break;
      }

      if (success) {
        console.log(`✅ Successfully shared to ${platform}`);
      } else {
        console.log(`❌ Failed to share to ${platform}`);
      }

    } catch (error) {
      console.error(`Error sharing to ${platform}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-[8px] leading-none">Tiếng</span>
                  <span className="text-white font-bold text-[8px] leading-none">Nói</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tiếng Nói Việt Mỹ</h1>
                  <p className="text-xs text-gray-500">Vietnamese American Voices</p>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-white font-bold text-[8px] leading-none">Tiếng</span>
                  <span className="text-white font-bold text-[8px] leading-none">Nói</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Tiếng Nói Việt Mỹ</h1>
                  <p className="text-xs text-gray-500">Vietnamese American Voices</p>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <p className="text-gray-600 mb-8">Xin lỗi, không thể tìm thấy bài viết bạn yêu cầu.</p>
          <Link href="/" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-[10px] leading-none tracking-wide">Tiếng</span>
                <span className="text-white font-bold text-[10px] leading-none tracking-wide">Nói</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tiếng Nói Việt Mỹ
                </h1>
                <p className="text-xs text-gray-500">Vietnamese American Voices</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 font-medium">Mới nhất</Link>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Chính trị</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Cộng đồng</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Kinh doanh</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium">Văn hóa</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-yellow-600 transition-colors">Trang chủ</Link>
            <span>›</span>
            <span className="font-medium">{getCategoryNameInVietnamese(article.topic)}</span>
            <span>›</span>
            <span className="text-gray-900">Chi tiết bài viết</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 text-sm font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay về trang chủ</span>
          </Link>
        </div>

        <article>
          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                {getCategoryNameInVietnamese(article.topic)}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-vietnamese">
              {getDisplayTitle(article)}
            </h1>

            {/* Journalistic Byline/Dateline */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="text-sm text-gray-600 leading-relaxed">
                <div className="flex flex-wrap items-center gap-1">
                  {article.dateline && (
                    <>
                      <span className="font-medium text-gray-900">
                        Tin từ {article.dateline}
                      </span>
                      <span>•</span>
                    </>
                  )}
                  {(!article.author || article.author === 'N/A' || article.author === 'Unknown' || article.author === 'Staff') && (
                    <>
                      <span className="font-medium">
                        {getAuthorDisplay(article.author, article.source)}
                      </span>
                      <span>•</span>
                    </>
                  )}
                  <span>{formatDate(article.publishedDate)}</span>
                  {article.author && article.author !== 'N/A' && article.author !== 'Unknown' && article.author !== 'Staff' && (
                    <>
                      <span>•</span>
                      <span className="text-gray-600">
                        Tác giả gốc: {article.author}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <HeartButton articleId={article.id} site="vietnamese" />

              {/* Share Buttons */}
              <div className="flex items-center space-x-4">
                {/* WhatsApp Share */}
                <button
                  onClick={() => handlePlatformShare('whatsapp')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                  title="Chia sẻ qua WhatsApp"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                  </svg>
                  <span className="text-sm hidden md:inline">WhatsApp</span>
                </button>

                {/* Facebook Share */}
                <button
                  onClick={() => handlePlatformShare('facebook')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                  title="Chia sẻ qua Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm hidden md:inline">Facebook</span>
                </button>

                {/* Email Share */}
                <button
                  onClick={() => handlePlatformShare('email')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Chia sẻ qua Email"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z"/>
                  </svg>
                  <span className="text-sm hidden md:inline">Email</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => handlePlatformShare('copy')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
                  title="Sao chép liên kết"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  <span className="text-sm hidden md:inline">Sao chép</span>
                </button>
              </div>
            </div>

            {/* Audio Player */}
            <ArticleAudioPlayer
              audioUrl={article.vietnameseAudioUrl || article.audioUrl}
              title={getDisplayTitle(article)}
              duration={article.vietnameseAudioDuration || article.audioDuration}
              language="vietnamese"
            />
          </header>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <img
                src={article.imageUrl}
                alt={getDisplayTitle(article)}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
              <p className="text-xs text-gray-500 italic mt-2 text-center font-vietnamese">
                {article.socialCaptions?.vietnamese && (
                  <span className="block mb-1">{article.socialCaptions.vietnamese}</span>
                )}
                <span>
                  {article.imageAttribution ? (
                    <>
                      Ảnh:
                      {article.imageAttribution.photographerUrl ? (
                        <a
                          href={article.imageAttribution.photographerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 hover:text-yellow-800 underline"
                        >
                          {article.imageAttribution.photographer}
                        </a>
                      ) : (
                        article.imageAttribution.photographer
                      )}
                      {' / '}
                      {article.imageAttribution.source === 'unsplash' ? (
                        <a
                          href="https://unsplash.com?utm_source=vietnamese-american-voices&utm_medium=referral"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 hover:text-yellow-800 underline"
                        >
                          Unsplash
                        </a>
                      ) : article.imageAttribution.source === 'pexels' ? (
                        <a
                          href="https://www.pexels.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-600 hover:text-yellow-800 underline"
                        >
                          Pexels
                        </a>
                      ) : (
                        article.imageAttribution.source || 'Nguồn ảnh'
                      )}
                    </>
                  ) : (
                    'Nguồn ảnh không rõ'
                  )}
                </span>
              </p>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-700 font-vietnamese leading-relaxed text-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: getDisplaySummary(article).replace(/\n/g, '<br>')
                }}
              />
            </div>
          </div>

          {/* Original Article Link */}
          <div className="bg-yellow-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 font-vietnamese">Đọc bài gốc</h3>
            <p className="text-gray-700 mb-4 font-vietnamese">
              Nhấn vào liên kết bên dưới để đọc toàn bộ bài viết gốc từ {article.source}.
            </p>
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <span>Truy cập {article.source}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-vietnamese">Tin liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/article/${relatedArticle.id}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={relatedArticle.imageUrl}
                      alt={getDisplayTitle(relatedArticle)}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2 font-vietnamese">
                        {getDisplayTitle(relatedArticle)}
                      </h3>
                      <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                        <span>{relatedArticle.source}</span>
                        <span>•</span>
                        <span>{formatDate(relatedArticle.publishedDate)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-[10px] leading-none tracking-wide">Tiếng</span>
                  <span className="text-white font-bold text-[10px] leading-none tracking-wide">Nói</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-vietnamese">
                    Tiếng Nói Việt Mỹ
                  </h3>
                  <p className="text-sm text-gray-400">Vietnamese American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-vietnamese">
                Mang đến những câu chuyện quan trọng cho cộng đồng người Mỹ gốc Việt. Chúng tôi là cơ quan truyền thông độc lập tập trung vào các vấn đề ảnh hưởng đến cộng đồng.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 font-vietnamese">Giới thiệu</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white font-vietnamese">Sứ mệnh của chúng tôi</Link></li>
                <li><a href="mailto:contact@vietnameseamericanvoices.com" className="text-gray-400 hover:text-white font-vietnamese">Liên hệ</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white font-vietnamese">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white font-vietnamese">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="font-vietnamese">
              &copy; 2025 Tiếng Nói Người Mỹ Gốc Việt. Đã đăng ký bản quyền.
              <span className="text-xs opacity-70 ml-2">Thuộc Asian American Voices Media, Inc.</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .font-vietnamese {
          font-family: 'Noto Sans', 'Arial', sans-serif;
        }
      `}</style>
    </div>
  );
}
