// Georgia PSC 2025 Event Page - Same layout as homepage, filtered by event
'use client';

import Script from 'next/script';

import React, { useState, useEffect } from 'react';
import { Clock, ExternalLink, ChevronRight, Globe, TrendingUp, Users, Building2, Flag, MapPin, Heart, GraduationCap, Plane, Palette, Newspaper, Trophy, Stethoscope, Vote } from 'lucide-react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import VideoHighlightsCarousel from '../../components/VideoHighlightsCarouselV2';
import LocationPopup from '../../components/LocationPopup';
import ManualVotingInfoPopup from '../../components/ManualVotingInfoPopup';

export default function GeorgiaPSC2025() {
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [eventVideos, setEventVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(''); // '', 'loading', 'success', 'error'
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [showManualPopup, setShowManualPopup] = useState(false);

  const EVENT_NAME = 'Georgia PSC Election 2025';
  const EVENT_TITLE = '[보관됨] 2025년 조지아주 공공서비스위원회 선거';
  const EVENT_COLOR = 'bg-green-100 text-green-800 border-green-300';

  // Categories in Korean (for navigation)
  const categories = [
    { id: 'all', name: '전체 뉴스', icon: Globe },
    { id: 'General', name: '일반', icon: Newspaper },
    { id: 'US Politics', name: '미국 정치', icon: Building2 },
    { id: 'Healthcare', name: '의료 건강', icon: Stethoscope },
    { id: 'Education', name: '교육', icon: GraduationCap },
    { id: 'Immigration', name: '이민', icon: Plane },
    { id: 'Economy', name: '경제', icon: TrendingUp },
    { id: 'Culture', name: '문화', icon: Palette },
    { id: 'Sports', name: '스포츠', icon: Trophy }
  ];

  useEffect(() => {
        // Fetch videos for this event
    fetch('/api/event-videos?event=georgia-psc-2025&language=korean')
      .then(res => res.json())
      .then(data => { if (data.videos) setEventVideos(data.videos); })
      .catch(err => console.log('No videos yet'));

    fetchArticles();
    fetchTrendingArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/published-articles?language=korean&targeted_event=${encodeURIComponent(EVENT_NAME)}&limit=50&t=${Date.now()}`);

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
      const response = await fetch(`/api/published-articles?language=korean&limit=3&t=${Date.now()}`);
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
    return localDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate dynamic breaking news ticker from event articles using social captions
  const getBreakingNews = () => {
    if (articles.length === 0) return [{ title: `${EVENT_TITLE} 최신 보도 로딩 중...`, url: null }];

    const latestNews = articles
      .slice(0, 5)
      .map(article => {
        // Use social caption if available, otherwise fall back to title
        const caption = article.socialCaptions?.korean || article.translatedTitles?.korean || article.display_title || article.ai_title;
        const shortCaption = caption && caption.length > 80 ? caption.substring(0, 77) + '...' : caption;
        return {
          id: article.id,
          title: shortCaption || '로딩 중...',
          url: `/article/${article.id}`
        };
      });

    return latestNews.length > 0 ? latestNews : [{ title: `${EVENT_TITLE} - 총 ${articles.length}개 기사`, url: null }];
  };

  const getCategoryColor = (topic) => {
    switch(topic) {
      case 'Healthcare': return 'text-blue-600 bg-blue-50';
      case 'Education': return 'text-purple-600 bg-purple-50';
      case 'Immigration': return 'text-orange-600 bg-orange-50';
      case 'US Politics': return 'text-red-600 bg-red-50';
      case 'Economy': return 'text-yellow-600 bg-yellow-50';
      case 'Culture': return 'text-pink-600 bg-pink-50';
      case 'Sports': return 'text-indigo-600 bg-indigo-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDisplayTitle = (article) => {
    return article.translatedTitles?.korean || article.display_title || '제목 번역 중...';
  };

  const getDisplaySummary = (article) => {
    const summary = article.translations?.korean || article.ai_summary || '내용 번역 중...';
    return summary.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
  };

  const getArticleUrl = (article) => {
    return `/article/${article.id}`;
  };

  // Find the event hero article (Event Explainer) or fall back to the first article
  const featuredArticle = articles.find(article =>
    article.isEventHero || article.eventHeroFor === EVENT_NAME
  ) || articles[0];

  // Filter out the featured article from the other articles list
  const otherArticles = articles.filter(article => article.id !== featuredArticle?.id);

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
      setNewsletterMessage('유효한 이메일 주소를 입력해주세요');
      return;
    }

    if (!captchaToken) {
      setNewsletterStatus('error');
      setNewsletterMessage('인증을 완료해주세요');
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
        body: JSON.stringify({ email: newsletterEmail }),
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
        setNewsletterMessage(data.error || '구독 실패. 나중에 다시 시도해주세요');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus('error');
      setNewsletterMessage('구독 실패. 나중에 다시 시도해주세요');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Location-based Popup for Georgia Users */}
      <LocationPopup state="GA" eventType="georgia-psc" />

      {/* Manual Voting Info Popup */}
      <ManualVotingInfoPopup
        state="GA"
        eventType="ga-psc"
        isOpen={showManualPopup}
        onClose={() => setShowManualPopup(false)}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-xs leading-none tracking-wide">한미</span>
                <span className="text-white font-bold text-xs leading-none tracking-wide">목소리</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">한미목소리</h1>
                <p className="text-xs text-gray-500">Korean American Voices</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <SearchBar site="korean" />
              <a href="mailto:contact@koreanamericanvoices.us" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                문의하기
              </a>
            </div>
          </div>

        {/* Prominent Event Hub Bar - Part of Sticky Header */}
        <div className="border-t border-gray-200 py-3 bg-gradient-to-r from-blue-50 via-green-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            {/* Desktop: Inline layout */}
            <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
              <span className="text-sm font-bold text-gray-700">🗳️ 중요 선거 이벤트:</span>
              <Link
                href="/event/tennessee-7th-congressional-2025"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 bg-orange-600 text-white hover:bg-orange-700 shadow-lg"
              >
                <span>🗳️ 테네시 제7선거구 특별선거</span>
              </Link>
            </div>

            {/* Mobile: Stacked and centered layout */}
            <div className="md:hidden flex flex-col items-center space-y-2">
              <span className="text-sm font-bold text-gray-700 mb-1">🗳️ 중요 선거 이벤트</span>
              <div className="flex flex-col items-center space-y-2 w-full">
                <Link
                  href="/event/tennessee-7th-congressional-2025"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 bg-orange-600 text-white hover:bg-orange-700 shadow-lg w-full max-w-xs"
                >
                  <span>🗳️ 테네시 제7선거구 특별선거</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Event Banner - Dynamic Breaking News Ticker */}
      <div className="bg-green-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-green-600 px-2 py-1 text-xs font-bold rounded mr-4 flex-shrink-0">
              특별 보도
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap text-sm font-medium">
                {getBreakingNews().map((item, index) => (
                  <span key={item.id || index}>
                    {item.url ? (
                      <Link href={item.url} className="hover:text-green-200 transition-colors">
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

      {/* Category Navigation - Events Always Visible on Right */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop: Single row with categories and events */}
          <div className="hidden md:flex items-center py-4 gap-3">
            {/* Scrollable Categories Section */}
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

          {/* Mobile: Two separate rows */}
          <div className="md:hidden">
            {/* Categories Row */}
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
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 py-4 border-b border-green-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <button
            onClick={() => {
              // Track button click
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'voting_info_button_click', {
                  event_category: 'Engagement',
                  event_label: 'ga-psc',
                  state: 'GA'
                });
              }
              // Track internally
              fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  event_type: 'voting_info_button_click',
                  metadata: {
                    state: 'GA',
                    event_type: 'ga-psc',
                    button_location: 'event_page_banner',
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                  }
                })
              });
              // Show the manual popup
              setShowManualPopup(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <Vote className="w-5 h-5" />
            <span className="text-lg">🗳️ 조지아 유권자 정보 확인하기</span>
          </button>
          <p className="mt-2 text-sm text-gray-600">조지아 주민을 위한 투표 정보 • 등록 확인 • 투표소 찾기 • 중요 일정</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">관련 보도가 없습니다</p>
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
                      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors font-korean">
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
                        <p className="text-lg text-gray-700 leading-relaxed font-korean">
                          {getDisplaySummary(featuredArticle)}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                          <span>전체 기사 읽기</span>
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
                      <span>원문 링크</span>
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
                  <h2 className="text-lg font-bold text-gray-900 flex items-center font-korean">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    다른 인기 뉴스
                  </h2>
                </div>

                <div className="space-y-4">
                  {trendingArticles.map((article, index) => (
                    <article key={article.id} className="group cursor-pointer">
                      <a href={getArticleUrl(article)} className="block">
                        <div className="flex space-x-3">
                          <span className="text-2xl font-bold text-blue-600 mt-1">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight font-korean">
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
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-2 font-korean">
                  뉴스레터 구독
                </h2>
                <p className="text-sm text-gray-600 mb-4 font-korean">
                  한인 커뮤니티에 영향을 미치는 최신 뉴스를 받아보세요.
                </p>
                <form onSubmit={handleNewsletterSignup} className="space-y-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="이메일 주소 입력"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {newsletterStatus === 'loading' ? '구독 중...' : '구독하기'}
                  </button>
                  {newsletterMessage && (
                    <div className={`text-sm font-korean ${
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
            language="korean"
          />
        )}
        {/* Other Articles Grid - Full Width */}
        {otherArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">더 많은 보도</h2>
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
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight font-korean mb-2">
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
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-xs leading-none">한미</span>
                  <span className="text-white font-bold text-xs leading-none">목소리</span>
                </div>
                <div>
                  <div className="font-bold text-lg">한미목소리.US</div>
                  <div className="text-sm text-gray-400">Korean American Voices</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">한인을 위한 독립적이고 권위 있는 뉴스 보도</p>
            </div>

            <div>
              <h3 className="font-bold mb-4">문의하기</h3>
              <p className="text-gray-400 text-sm">
                <a href="mailto:contact@koreanamericanvoices.us" className="hover:text-white">
                  contact@koreanamericanvoices.us
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">정보</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white">소개</Link></li>
                <li><Link href="/about" className="hover:text-white">우리의 사명</Link></li>
                <li><Link href="/privacy" className="hover:text-white">개인정보 보호정책</Link></li>
                <li><Link href="/terms" className="hover:text-white">이용 약관</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2025 한미목소리. 모든 권리 보유. <span className="text-xs opacity-70 ml-2">Asian American Voices Media, Inc. 소속</span>
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
