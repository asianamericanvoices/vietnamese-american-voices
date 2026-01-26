// app/page.js - Vietnamese American Voices Homepage
'use client';
// Trigger rebuild for separate hero functionality

import Script from 'next/script';
import React, { useState, useEffect, useRef } from 'react';
import { Clock, ExternalLink, ChevronRight, Globe, TrendingUp, Users, Building2, Flag, MapPin, Heart, GraduationCap, Plane, Palette, Newspaper, Trophy, Stethoscope, FileText, ShieldCheck, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import SearchBar from './components/SearchBar';
import ArticleRequestForm from './components/ArticleRequestForm';

export default function VietnameseAmericanVoices() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef(null);

  // Category mapping for VAV - China-US Relations articles appear as International News
  const mapCategoryForVAV = (originalCategory) => {
    const mapping = {
      'China-US Relations': 'International News',  // Hide China-US, show as International
      // All other categories stay the same
    };
    return mapping[originalCategory] || originalCategory;
  };

  // Categories in Vietnamese
  const categories = [
    { id: 'all', name: 'Tất cả tin tức', icon: Globe },
    { id: 'General', name: 'Tổng hợp', icon: Newspaper },
    { id: 'Vietnam-US Relations', name: 'Quan hệ Việt-Mỹ', icon: Flag },
    { id: 'International News', name: 'Tin quốc tế', icon: MapPin },
    { id: 'US Politics', name: 'Chính trị Hoa Kỳ', icon: Building2 },
    { id: 'Healthcare', name: 'Y tế', icon: Stethoscope },
    { id: 'Education', name: 'Giáo dục', icon: GraduationCap },
    { id: 'Immigration', name: 'Di trú', icon: Plane },
    { id: 'Economy', name: 'Kinh tế', icon: TrendingUp },
    { id: 'Culture', name: 'Văn hóa', icon: Palette },
    { id: 'Sports', name: 'Thể thao', icon: Trophy },
    { id: 'Fact Checks', name: 'Kiểm chứng', icon: ShieldCheck },
    { id: 'Analysis', name: 'Phân tích', icon: Lightbulb }
  ];

  // Filter out certain categories from visible category bar for VAV site
  // TODO: TO ENABLE FACT CHECKS/ANALYSIS - Remove 'Fact Checks' and 'Analysis' from this array
  // Also remove from filteredArticles below (search: "ENABLE FACT CHECKS")
  const visibleCategories = categories.filter(cat =>
    !['China-US Relations', 'Vietnam-US Relations', 'International News', 'Fact Checks', 'Analysis'].includes(cat.id)
  );

  // Fetch articles based on selected category
  const fetchArticles = async (category = 'all', reset = true) => {
    try {
      if (reset) {
        setLoading(true);
        setArticles([]);
        setCurrentPage(1);
      }

      console.log(`🔍 Đang tải bài viết - Danh mục: ${category}`);

      const categoryParam = category === 'all' ? '' : `&category=${category}`;
      const response = await fetch(`/api/published-articles?language=vietnamese&limit=26${categoryParam}&t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API Response:', data);

      if (data.articles && data.articles.length > 0) {
        console.log(`📰 Đã tải ${data.articles.length} bài viết (Danh mục: ${category})`);

        const hasMoreArticles = data.articles.length > 25;
        const articlesToShow = data.articles.slice(0, 25);

        if (reset) {
          setArticles(articlesToShow);
        } else {
          setArticles(prev => [...prev, ...articlesToShow]);
        }
        setHasMore(hasMoreArticles);

        console.log('🔍 PAGINATION DEBUG:', {
          category,
          totalFetched: data.articles.length,
          showing: articlesToShow.length,
          hasMore: hasMoreArticles
        });
      } else {
        console.log('📋 Không tìm thấy bài viết, sử dụng dữ liệu mẫu');
        const mockData = getMockArticles();
        setArticles(mockData);
        setHasMore(false);
      }

      setLoading(false);
    } catch (error) {
      console.error('❌ Lỗi khi tải bài viết:', error);
      console.log('📋 Sử dụng dữ liệu mẫu');

      const mockData = getMockArticles();
      setArticles(mockData);
      setHasMore(false);
      setLoading(false);
    }
  };

  // Fetch trending articles from all categories for sidebar
  const fetchTrendingArticles = async () => {
    try {
      console.log('🔍 Đang tải tin nổi bật');
      const response = await fetch(`/api/published-articles?language=vietnamese&limit=10&t=${Date.now()}`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        // Get high priority or high relevance articles
        let trending = data.articles
          .filter(article => article.priority === 'high' || article.relevanceScore >= 7)
          .slice(0, 3);

        // If not enough high priority articles, use the most recent articles as fallback
        if (trending.length < 3) {
          console.log(`⚠️ Chỉ có ${trending.length} bài ưu tiên cao, sử dụng bài mới nhất`);
          trending = data.articles.slice(0, 3);
        }

        setTrendingArticles(trending);
        console.log(`✅ Đã tải ${trending.length} tin nổi bật`);
      }
    } catch (error) {
      console.error('❌ Lỗi khi tải tin nổi bật:', error);
    }
  };

  useEffect(() => {
    // Track homepage page view with retry logic
    const trackPageView = () => {
      if (typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
        console.log('📊 Tracking homepage view for category:', selectedCategory);
        window.trackEvent('page_view', {
          page_type: 'homepage',
          category: selectedCategory,
          language: 'vietnamese'
        });
      } else {
        console.log('⚠️ Tracking not ready, retrying...');
        setTimeout(trackPageView, 500);
      }
    };

    setTimeout(trackPageView, 100);

    fetchArticles(selectedCategory);
    // Fetch trending articles when component mounts or category changes
    if (selectedCategory !== 'all') {
      fetchTrendingArticles();
    }
  }, [selectedCategory]);

  // Load more articles function
  const loadMoreArticles = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const categoryParam = selectedCategory === 'all' ? '' : `&category=${selectedCategory}`;
      const response = await fetch(`/api/published-articles?language=vietnamese&limit=26&offset=${currentPage * 25}${categoryParam}&t=${Date.now()}`);

      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          // If we got 26 articles, there are more available - show only first 25
          const hasMoreArticles = data.articles.length > 25;
          const articlesToAdd = data.articles.slice(0, 25);

          // Deduplicate articles by ID to prevent repeats
          setArticles(prev => {
            const existingIds = new Set(prev.map(a => a.id));
            const newArticles = articlesToAdd.filter(a => !existingIds.has(a.id));
            console.log(`🔍 Deduplication: ${articlesToAdd.length} fetched, ${newArticles.length} new (${articlesToAdd.length - newArticles.length} duplicates removed)`);
            return [...prev, ...newArticles];
          });
          setCurrentPage(nextPage);
          setHasMore(hasMoreArticles);

          console.log('🔍 LOAD MORE DEBUG:', {
            totalFetched: data.articles.length,
            showing: articlesToAdd.length,
            hasMore: hasMoreArticles,
            currentPage: nextPage
          });
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more articles:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Mock data function for fallback
  const getMockArticles = () => {
    return [
      {
        id: 1,
        originalTitle: "Trump calls for U.S. census to exclude for the first time people with no legal status",
        displayTitle: "Trump kêu gọi điều tra dân số Mỹ lần đầu tiên loại trừ người không có giấy tờ hợp pháp",
        aiSummary: "Tổng thống Trump đã công bố kế hoạch điều tra dân số \"mới\" sẽ loại trừ những người không có tình trạng pháp lý, khởi động lại nỗ lực gây tranh cãi từ nhiệm kỳ đầu tiên của ông. Tu chính án thứ 14 yêu cầu đếm \"toàn bộ số người\" trong mỗi tiểu bang để xác định đại diện Quốc hội.",
        source: "NPR",
        publishedDate: "2025-08-07",
        topic: "Immigration",
        priority: "high",
        relevanceScore: 8.5,
        imageUrl: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800&h=400&fit=crop",
        originalUrl: "https://www.npr.org/2025/08/07/nx-s1-5265650/new-census-trump-immigrants-counted",
        slug: "trump-census-immigration-policy"
      },
      {
        id: 2,
        originalTitle: "Immigrants who are crime victims and waiting for visas now face deportation",
        displayTitle: "Nạn nhân tội phạm nhập cư đang chờ visa hiện đối mặt với trục xuất",
        aiSummary: "Một số nạn nhân tội phạm nhập cư đang nộp đơn xin visa U đang bị giam giữ, như một phần của chiến dịch trục xuất hàng loạt của chính quyền Trump. Chương trình visa U được thiết kế để giúp nạn nhân tội phạm hợp tác với cơ quan thực thi pháp luật, nhưng chính sách mới không còn bảo vệ người nộp đơn khỏi thủ tục trục xuất.",
        source: "NBC News",
        publishedDate: "2025-08-07",
        topic: "Immigration",
        priority: "high",
        relevanceScore: 9.0,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        originalUrl: "https://www.nbcnews.com/news/latino/immigrants-u-visas-deportation-new-trump-rules-ice-rcna223480",
        slug: "u-visa-deportation-changes"
      },
      {
        id: 3,
        originalTitle: "Trump administration freezes $108M at Duke amid inquiry into alleged racial preferences",
        displayTitle: "Chính quyền Trump đóng băng 108 triệu đô la tại Duke giữa cuộc điều tra về ưu đãi chủng tộc",
        aiSummary: "Chính quyền Trump đã đóng băng 108 triệu đô la tài trợ nghiên cứu của Đại học Duke, cáo buộc trường phân biệt chủng tộc thông qua chính sách ưu đãi. Đây là động thái tiếp theo sau các hành động tương tự đối với Harvard, Columbia và Cornell, như một phần của chiến dịch rộng hơn chống lại các chương trình đa dạng, công bằng và hòa nhập.",
        source: "AP News",
        publishedDate: "2025-08-07",
        topic: "Education",
        priority: "medium",
        relevanceScore: 7.5,
        imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=400&fit=crop",
        originalUrl: "https://apnews.com/article/duke-university-funding-freeze-trump-dei-23a70359ee44a21fdc55bef6dfe52413",
        slug: "duke-university-funding-freeze"
      }
    ];
  };

  // Generate dynamic breaking news ticker from latest articles
  const getBreakingNews = () => {
    if (articles.length === 0) return [{ title: "Cập nhật tin tức mới nhất • Vấn đề quan trọng của cộng đồng Việt kiều • Tin cộng đồng", url: null }];

    // Use the first 5 articles to populate breaking news - they already have Vietnamese translations
    const latestNews = articles
      .slice(0, 5)
      .map(article => {
        // Prioritize Vietnamese translated title, fall back to displayTitle if not available
        const title = article.translatedTitles?.vietnamese || article.displayTitle;
        // Vietnamese titles need more space - use 100 char limit
        const shortTitle = title && title.length > 100 ? title.substring(0, 97) + '...' : title;
        return { title: shortTitle, url: getArticleUrl(article), id: article.id };
      })
      .filter(item => item.title); // Remove null/undefined titles

    return latestNews.length > 0 ? latestNews : [{ title: "Cập nhật tin tức mới nhất • Vấn đề quan trọng của cộng đồng Việt kiều", url: null }];
  };

  // TODO: ENABLE FACT CHECKS/ANALYSIS - Remove this filter to show these categories in article grids
  // Also remove 'Fact Checks' and 'Analysis' from visibleCategories above
  const filteredArticles = articles.filter(article =>
    article.topic !== 'Fact Checks' && article.topic !== 'Analysis'
  );

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  const formatDate = (dateString) => {
    // Fix timezone issue: treat date as local date, not UTC
    const [year, month, day] = dateString.split('-');
    const localDate = new Date(year, month - 1, day); // month is 0-indexed

    return localDate.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (topic) => {
    // First map the category, then get color
    const mappedTopic = mapCategoryForVAV(topic);
    switch(mappedTopic) {
      case 'Vietnam-US Relations': return 'text-green-600 bg-green-50';
      case 'Healthcare': return 'text-blue-600 bg-blue-50';
      case 'Education': return 'text-purple-600 bg-purple-50';
      case 'Immigration': return 'text-orange-600 bg-orange-50';
      case 'US Politics': return 'text-red-600 bg-red-50';
      case 'Economy': return 'text-yellow-700 bg-yellow-50';
      case 'Culture': return 'text-pink-600 bg-pink-50';
      case 'Sports': return 'text-indigo-600 bg-indigo-50';
      case 'Fact Checks': return 'text-teal-600 bg-teal-50';
      case 'Analysis': return 'text-amber-600 bg-amber-50';
      case 'Technology': return 'text-cyan-600 bg-cyan-50';
      case 'International News': return 'text-slate-600 bg-slate-50';
      case 'Event Explainers': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Helper function to get display content in Vietnamese - REQUIRE VIETNAMESE TRANSLATIONS
  const getDisplayTitle = (article) => {
    // ONLY use Vietnamese translation - no fallbacks since API filters for complete translations
    return article.translatedTitles?.vietnamese || 'Đang dịch tiêu đề...';
  };

  const getDisplaySummary = (article) => {
    // ONLY use Vietnamese translation - no fallbacks since API filters for complete translations
    const summary = article.translations?.vietnamese || 'Đang dịch nội dung...';
    // Clean up any HTML br tags that might be stored in the database
    return summary.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
  };

  // Generate article URL slug - simplified approach
  const getArticleUrl = (article) => {
    // Use just the article ID for now to ensure it works
    return `/article/${article.id}`;
  };

  // Newsletter signup handler
  // Initialize reCAPTCHA
  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {
        if (recaptchaRef.current && !recaptchaRef.current.hasChildNodes()) {
          try {
            window.grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              callback: (token) => {
                setCaptchaToken(token);
              },
              'expired-callback': () => {
                setCaptchaToken(null);
              }
            });
          } catch (e) {
            console.error('Error rendering reCAPTCHA:', e);
          }
        }
      });
    }
  };

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    if (!captchaToken) {
      setNewsletterStatus('error');
      setNewsletterMessage('Vui lòng hoàn thành xác minh');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail, captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message);
        setNewsletterEmail('');
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset();
        }
        setCaptchaToken(null); // Clear the input
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || 'Đăng ký thất bại. Vui lòng thử lại sau');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus('error');
      setNewsletterMessage('Đăng ký thất bại. Vui lòng thử lại sau');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
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
                <span className="text-white font-bold text-[7px] leading-none">Tiếng Nói</span>
                <span className="text-white font-bold text-[7px] leading-none">Người Mỹ</span>
                <span className="text-white font-bold text-[7px] leading-none">Gốc Việt</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Tiếng Nói Người Mỹ Gốc Việt
                </h1>
                <p className="text-xs text-gray-500">Vietnamese American Voices</p>
              </div>
            </Link>


            <div className="flex items-center space-x-4">
              <SearchBar site="vietnamese" />
              <a
                href="mailto:contact@tiengnoinguoimygocviet.us"
                className="text-gray-700 hover:text-yellow-600 text-sm font-medium"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>

      </header>

      {/* Breaking News Ticker - Now Dynamic */}
      <div className="bg-yellow-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-yellow-600 px-2 py-1 text-xs font-bold rounded mr-4">
              Tin nóng
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap text-sm">
                {getBreakingNews().map((item, index) => (
                  <span key={item.id || index}>
                    {item.url ? (
                      <Link href={item.url} className="hover:text-yellow-200 transition-colors">
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                    {index < getBreakingNews().length - 1 && " • "}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation with Event Hubs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: Single row with categories and events */}
          <div className="hidden md:flex items-center py-4 gap-3">
            {/* Scrollable Categories Section */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: Two separate rows */}
          <div className="md:hidden">
            {/* Categories Row */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
              {visibleCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-yellow-500 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            {featuredArticle && (
              <article className="group cursor-pointer">
                <a href={getArticleUrl(featuredArticle)} className="block">
                  <div className="relative">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={getDisplayTitle(featuredArticle)}
                      className="w-full h-64 lg:h-80 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredArticle.topic)}`}>
                        {categories.find(cat => cat.id === mapCategoryForVAV(featuredArticle.topic))?.name || mapCategoryForVAV(featuredArticle.topic)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors font-vietnamese">
                      {getDisplayTitle(featuredArticle)}
                    </h1>

                    <div className="mt-4 flex items-center text-sm text-gray-600 space-x-4">
                      <span>{featuredArticle.source}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(featuredArticle.publishedDate)}</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <p className="text-lg text-gray-700 leading-relaxed font-vietnamese">
                        {getDisplaySummary(featuredArticle)}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 font-medium">
                        <span>Xem toàn bộ</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>

                      <a
                        href={featuredArticle.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Bài gốc</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </a>
              </article>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Newsletter Signup - Moved above trending for marketing optimization */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2 font-vietnamese">
                Đăng ký nhận tin
              </h2>
              <p className="text-sm text-gray-600 mb-4 font-vietnamese">
                Nhận tin tức mới nhất ảnh hưởng đến cộng đồng Việt kiều qua email.
              </p>
              <form onSubmit={handleNewsletterSignup} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Nhập địa chỉ email của bạn"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                />
                {/* reCAPTCHA */}
                <div ref={recaptchaRef} className="mb-3"></div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
                {newsletterMessage && (
                  <div className={`text-sm font-vietnamese ${
                    newsletterStatus === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {newsletterMessage}
                  </div>
                )}
              </form>
            </div>

            {/* Trending Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center font-vietnamese">
                  <TrendingUp className="w-5 h-5 mr-2 text-yellow-600" />
                  {selectedCategory === 'all' ? 'Tin nổi bật' : 'Tin khác'}
                </h2>
                <span className="text-xs text-gray-500 font-vietnamese">
                  {selectedCategory === 'all' ? 'Top 3' : 'Đa danh mục'}
                </span>
              </div>

              <div className="space-y-4">
                {selectedCategory === 'all' ? (
                  // Homepage: show trending articles
                  otherArticles.slice(0, 3).map((article, index) => (
                  <article key={article.id} className="group cursor-pointer">
                    <a href={getArticleUrl(article)} className="block">
                      <div className="flex space-x-3">
                        <span className="text-2xl font-bold text-yellow-600 mt-1">
                          {index + 2}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight font-vietnamese">
                            {getDisplayTitle(article)}
                          </h3>
                          <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                            <span>{article.source}</span>
                            <span>•</span>
                            <span>{formatDate(article.publishedDate)}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </article>
                  ))
                ) : (
                  // Category pages: show cross-category trending articles
                  trendingArticles.length > 0 ? (
                    trendingArticles.map((article, index) => (
                      <article key={article.id} className="group cursor-pointer">
                        <a href={getArticleUrl(article)} className="block">
                          <div className="flex space-x-3">
                            <span className="text-2xl font-bold text-yellow-600 mt-1">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight font-vietnamese">
                                {getDisplayTitle(article)}
                              </h3>
                              <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                                <span>{article.source}</span>
                                <span>•</span>
                                <span>{formatDate(article.publishedDate)}</span>
                              </div>
                              <div className="mt-1">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(article.topic)}`}>
                                  {categories.find(cat => cat.id === mapCategoryForVAV(article.topic))?.name || mapCategoryForVAV(article.topic)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </article>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 font-vietnamese">
                        Đang tải tin nổi bật khác...
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Article Request Form - New Feature */}
            <div className="mt-6">
              <ArticleRequestForm />
            </div>
          </div>
        </div>

        {/* News Archive Section */}
        {otherArticles.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-vietnamese">Kho tin tức</h2>
              </div>
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-yellow-600 hover:text-yellow-700 text-sm font-medium font-vietnamese"
                >
                  Xem tất cả tin tức
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show different articles based on whether we're filtering by category */}
              {(selectedCategory === 'all' ? otherArticles.slice(3) : otherArticles.slice(0)).map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <a href={getArticleUrl(article)} className="block">
                    <div className="relative">
                      <img
                        src={article.imageUrl}
                        alt={getDisplayTitle(article)}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.topic)}`}>
                          {categories.find(cat => cat.id === mapCategoryForVAV(article.topic))?.name || mapCategoryForVAV(article.topic)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-vietnamese">
                          {formatDate(article.publishedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight font-vietnamese">
                        {getDisplayTitle(article)}
                      </h3>

                      <div className="mt-2 flex items-center text-sm text-gray-600 space-x-3">
                        <span>{article.source}</span>
                        <span>•</span>
                        <span className="font-vietnamese">{formatDate(article.publishedDate)}</span>
                      </div>

                      <p className="mt-3 text-gray-700 text-sm leading-relaxed line-clamp-3 font-vietnamese">
                        {getDisplaySummary(article).substring(0, 150)}...
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center space-x-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                          <span>Đọc thêm</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <a
                          href={article.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 hover:text-gray-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Bài gốc
                        </a>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMoreArticles}
                  disabled={loadingMore}
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-vietnamese"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang tải...
                    </>
                  ) : (
                    'Xem thêm bài viết'
                  )}
                </button>
              </div>
            )}
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
                  <span className="text-white font-bold text-[7px] leading-none">Tiếng Nói</span>
                  <span className="text-white font-bold text-[7px] leading-none">Người Mỹ</span>
                  <span className="text-white font-bold text-[7px] leading-none">Gốc Việt</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-vietnamese">
                    Tiếng Nói Người Mỹ Gốc Việt
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
                <li><a href="mailto:contact@tiengnoinguoimygocviet.us" className="text-gray-400 hover:text-white font-vietnamese">Liên hệ</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white font-vietnamese">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white font-vietnamese">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="font-vietnamese">
              &copy; 2025 Tiếng Nói Người Mỹ Gốc Việt. Bảo lưu mọi quyền.
              <span className="text-xs opacity-70 ml-2">Thuộc Asian American Voices Media, Inc.</span>
            </p>
          </div>
        </div>
      </footer>

      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        /* Faster scrolling on mobile devices */
        @media (max-width: 768px) {
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }

        .font-vietnamese {
          font-family: 'Noto Sans', 'Arial', sans-serif;
        }
      `}</style>

      {/* reCAPTCHA Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />
    </div>
  );
}
