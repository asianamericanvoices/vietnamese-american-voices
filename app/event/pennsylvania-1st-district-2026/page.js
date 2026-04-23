// Pennsylvania 1st District 2026 Event Page - Vietnamese American Voices
'use client';

import Script from 'next/script';

import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, ChevronRight, Globe, TrendingUp, Users, Building2, Flag, MapPin, Heart, GraduationCap, Plane, Palette, Newspaper, Trophy, Stethoscope, Vote } from 'lucide-react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import VideoHighlightsCarousel from '../../components/VideoHighlightsCarouselV2';
import LocationPopup from '../../components/LocationPopup';
import ManualVotingInfoPopup from '../../components/ManualVotingInfoPopup';

export default function Pennsylvania1stDistrict2026() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [eventVideos, setEventVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [showManualPopup, setShowManualPopup] = useState(false);

  const EVENT_NAME = 'Pennsylvania 1st District 2026';
  const EVENT_TITLE = 'Bầu cử Khu vực 1 Pennsylvania 2026';
  const EVENT_COLOR = 'bg-teal-100 text-teal-800 border-teal-300';

  const categories = [
    { id: 'all', name: 'Tất cả tin tức', icon: Globe },
    { id: 'General', name: 'Tổng hợp', icon: Newspaper },
    { id: 'US Politics', name: 'Chính trị Hoa Kỳ', icon: Building2 },
    { id: 'Healthcare', name: 'Y tế', icon: Stethoscope },
    { id: 'Education', name: 'Giáo dục', icon: GraduationCap },
    { id: 'Immigration', name: 'Di trú', icon: Plane },
    { id: 'Economy', name: 'Kinh tế', icon: TrendingUp },
    { id: 'Culture', name: 'Văn hóa', icon: Palette },
    { id: 'Sports', name: 'Thể thao', icon: Trophy }
  ];

  useEffect(() => {
    fetch('/api/event-videos?event=pennsylvania-1st-district-2026&language=vietnamese')
      .then(res => res.json())
      .then(data => { if (data.videos) setEventVideos(data.videos); })
      .catch(err => console.log('No videos yet'));

    fetchArticles();
    fetchTrendingArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/published-articles?language=vietnamese&targeted_event=${encodeURIComponent(EVENT_NAME)}&limit=50&t=${Date.now()}`);

      if (response.ok) {
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event articles:', error);
      setLoading(false);
    }
  };

  const fetchTrendingArticles = async () => {
    try {
      const response = await fetch(`/api/published-articles?language=vietnamese&limit=3&t=${Date.now()}`);
      if (response.ok) {
        const data = await response.json();
        if (data.articles) {
          setTrendingArticles(data.articles);
        }
      }
    } catch (error) {
      console.error('Error fetching trending articles:', error);
    }
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

  const getBreakingNews = () => {
    if (articles.length === 0) return [{ title: `Đang tải tin mới nhất về ${EVENT_TITLE}...`, url: null }];

    const latestNews = articles
      .slice(0, 5)
      .map(article => {
        const caption = article.socialCaptions?.vietnamese || article.translatedTitles?.vietnamese || article.display_title || article.ai_title;
        const shortCaption = caption && caption.length > 80 ? caption.substring(0, 77) + '...' : caption;
        return {
          id: article.id,
          title: shortCaption || 'Đang tải...',
          url: `/article/${article.id}`
        };
      });

    return latestNews.length > 0 ? latestNews : [{ title: `${EVENT_TITLE} - Tổng cộng ${articles.length} bài viết`, url: null }];
  };

  const getDisplayTitle = (article) => {
    return article.translatedTitles?.vietnamese || article.display_title || 'Đang dịch tiêu đề...';
  };

  const getDisplaySummary = (article) => {
    const summary = article.translations?.vietnamese || article.ai_summary || 'Đang dịch nội dung...';
    return summary.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
  };

  const getArticleUrl = (article) => {
    return `/article/${article.id}`;
  };

  const featuredArticle = articles.find(article =>
    article.isEventHero || article.eventHeroFor === EVENT_NAME
  ) || articles[0];

  const otherArticles = articles.filter(article => article.id !== featuredArticle?.id);

  const handleRecaptchaLoad = () => {
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {});
    }
  };

  const handleNewsletterSignup = async (e) => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message);
        setNewsletterEmail('');
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

  return (
    <div className="min-h-screen bg-white">
      <LocationPopup state="PA" eventType="pennsylvania-1st-district-2026" />

      <ManualVotingInfoPopup
        state="PA"
        eventType="pa-1-2026"
        isOpen={showManualPopup}
        onClose={() => setShowManualPopup(false)}
      />

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
                <h1 className="text-xl font-bold text-gray-900">Tiếng Nói Người Mỹ Gốc Việt</h1>
                <p className="text-xs text-gray-500">Vietnamese American Voices</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <SearchBar site="vietnamese" />
              <a href="mailto:contact@tiengnoinguoimygocviet.us" className="text-gray-700 hover:text-teal-600 text-sm font-medium">
                Liên hệ
              </a>
            </div>
          </div>

          {/* Prominent Event Hub Bar - Part of Sticky Header */}
          <div className="border-t border-gray-200 py-3 bg-gradient-to-r from-teal-50 via-yellow-50 to-red-50">
            <div className="max-w-7xl mx-auto px-6">
              {/* Desktop */}
              <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
                <span className="text-sm font-bold text-gray-700">🗳️ Sự kiện bầu cử quan trọng:</span>
                <Link
                  href="/event/pennsylvania-1st-district-2026"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 bg-teal-600 text-white hover:bg-teal-700 shadow-lg"
                >
                  <span>🏛️ Bầu cử sơ bộ Khu vực 1 PA 2026</span>
                </Link>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex flex-col items-center space-y-2">
                <span className="text-sm font-bold text-gray-700 mb-1">🗳️ Sự kiện bầu cử quan trọng</span>
                <div className="flex flex-col items-center space-y-2 w-full">
                  <Link
                    href="/event/pennsylvania-1st-district-2026"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 bg-teal-600 text-white hover:bg-teal-700 shadow-lg w-full max-w-xs"
                  >
                    <span>🏛️ Bầu cử sơ bộ Khu vực 1 PA 2026</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Event Banner - Dynamic Breaking News Ticker */}
      <div className="bg-teal-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-teal-600 px-2 py-1 text-xs font-bold rounded mr-4 flex-shrink-0">
              Tin đặc biệt
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap text-sm font-medium">
                {getBreakingNews().map((item, index) => (
                  <span key={item.id || index}>
                    {item.url ? (
                      <Link href={item.url} className="hover:text-teal-200 transition-colors">
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

      {/* Category Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="hidden md:flex items-center py-4 gap-3">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors text-gray-700 hover:bg-gray-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors text-gray-700 hover:bg-gray-200"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Voting Information Button */}
      <div className="bg-gradient-to-r from-teal-50 to-yellow-50 py-4 border-b border-teal-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'voting_info_button_click', {
                  event_category: 'Engagement',
                  event_label: 'pa-1-2026',
                  state: 'PA'
                });
              }
              fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  event_type: 'voting_info_button_click',
                  metadata: {
                    state: 'PA',
                    event_type: 'pa-1-2026',
                    button_location: 'event_page_banner',
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                  }
                })
              });
              setShowManualPopup(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <Vote className="w-5 h-5" />
            <span className="text-lg">🗳️ Thông tin cử tri Pennsylvania</span>
          </button>
          <p className="mt-2 text-sm text-gray-600">Thông tin bỏ phiếu cho cư dân Pennsylvania • Đăng ký • Địa điểm bỏ phiếu • Bầu cử sơ bộ 19/5</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Chưa có tin liên quan</p>
          </div>
        ) : (
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
                        <span className={`px-4 py-2 rounded-full text-sm font-bold border ${EVENT_COLOR}`}>
                          {EVENT_TITLE}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-teal-600 transition-colors font-vietnamese">
                        {getDisplayTitle(featuredArticle)}
                      </h1>

                      <div className="mt-4 flex items-center text-sm text-gray-600 space-x-4">
                        <span>{featuredArticle.source}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(featuredArticle.publishedDate || featuredArticle.scraped_date)}</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <p className="text-lg text-gray-700 leading-relaxed font-vietnamese">
                          {getDisplaySummary(featuredArticle)}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 font-medium">
                          <span>Đọc toàn bộ bài viết</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </a>

                  <div className="mt-6">
                    <a
                      href={featuredArticle.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Liên kết gốc</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </article>
              )}
            </div>

            {/* Sidebar - Trending */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center font-vietnamese">
                    <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
                    Tin phổ biến khác
                  </h2>
                </div>

                <div className="space-y-4">
                  {trendingArticles.map((article, index) => (
                    <article key={article.id} className="group cursor-pointer">
                      <a href={getArticleUrl(article)} className="block">
                        <div className="flex space-x-3">
                          <span className="text-2xl font-bold text-teal-600 mt-1">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors leading-tight font-vietnamese">
                              {getDisplayTitle(article)}
                            </h3>
                            <div className="mt-2 flex items-center text-xs text-gray-500 space-x-2">
                              <span>{article.source}</span>
                              <span>•</span>
                              <Clock className="w-3 h-3" />
                              <span>{formatDate(article.publishedDate || article.scraped_date)}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-teal-50 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 font-vietnamese">
                  Đăng ký bản tin
                </h2>
                <p className="text-sm text-gray-600 mb-4 font-vietnamese">
                  Nhận tin mới nhất ảnh hưởng đến cộng đồng Việt kiều.
                </p>
                <form onSubmit={handleNewsletterSignup} className="space-y-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Nhập địa chỉ email"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {newsletterStatus === 'loading' ? 'Đang đăng ký...' : 'Đăng ký'}
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
            </div>
          </div>
        )}

        {/* Video Carousel Section */}
        {eventVideos && eventVideos.length > 0 && (
          <VideoHighlightsCarousel
            videos={eventVideos}
            language="vietnamese"
          />
        )}

        {/* Other Articles Grid - Full Width */}
        {otherArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thêm tin tức</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherArticles.map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <a href={getArticleUrl(article)} className="block">
                    {article.imageUrl && (
                      <img
                        src={article.imageUrl}
                        alt={getDisplayTitle(article)}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors leading-tight font-vietnamese mb-2">
                      {getDisplayTitle(article)}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {getDisplaySummary(article)}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                      <span>{article.source}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.publishedDate || article.scraped_date)}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-[7px] leading-none">Tiếng Nói</span>
                  <span className="text-white font-bold text-[7px] leading-none">Người Mỹ</span>
                  <span className="text-white font-bold text-[7px] leading-none">Gốc Việt</span>
                </div>
                <div>
                  <div className="font-bold text-lg">TiếngNóiViệtMỹ.US</div>
                  <div className="text-sm text-gray-400">Vietnamese American Voices</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Tin tức độc lập và uy tín cho người Mỹ gốc Việt</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Liên hệ</h3>
              <p className="text-gray-400 text-sm">
                <a href="mailto:contact@tiengnoinguoimygocviet.us" className="hover:text-white">
                  contact@tiengnoinguoimygocviet.us
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">Giới thiệu</Link></li>
                <li><Link href="/about" className="hover:text-white">Sứ mệnh của chúng tôi</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="hover:text-white">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2026 Tiếng Nói Việt Mỹ. Bảo lưu mọi quyền. <span className="text-xs opacity-70 ml-2">Thuộc Asian American Voices Media, Inc.</span>
          </div>
        </div>
      </footer>

      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={handleRecaptchaLoad}
      />
    </div>
  );
}
