// app/search/page.js - Search Results Page for Vietnamese American Voices
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Clock, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import SearchBar from '../components/SearchBar';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&site=vietnamese&limit=50`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResults(data.results);
        } else {
          setError('Tìm kiếm thất bại');
        }
      } else {
        setError('Yêu cầu tìm kiếm thất bại');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Lỗi xảy ra khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  const getDisplayTitle = (article) => {
    return article.displayTitle || article.originalTitle;
  };

  const getDisplaySummary = (article) => {
    return article.matchedSummary || '';
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

  // Category translations for Vietnamese site
  const translateCategory = (category) => {
    const vietnameseCategories = {
      'General': 'Tổng hợp',
      'Vietnam-US Relations': 'Quan hệ Việt-Mỹ',
      'China-US Relations': 'Tin quốc tế',
      'International News': 'Tin quốc tế',
      'US Politics': 'Chính trị Mỹ',
      'Healthcare': 'Y tế & Sức khỏe',
      'Education': 'Giáo dục',
      'Immigration': 'Di trú',
      'Economy': 'Kinh tế',
      'Culture': 'Văn hóa',
      'Sports': 'Thể thao'
    };
    return vietnameseCategories[category] || category;
  };

  // Map category for VAV - China-US Relations appears as International News
  const mapCategoryForVAV = (originalCategory) => {
    const mapping = {
      'China-US Relations': 'International News',
    };
    return mapping[originalCategory] || originalCategory;
  };

  const getCategoryColor = (topic) => {
    const mappedTopic = mapCategoryForVAV(topic);
    switch(mappedTopic) {
      case 'Vietnam-US Relations': return 'text-yellow-600 bg-yellow-50';
      case 'Healthcare': return 'text-blue-600 bg-blue-50';
      case 'Education': return 'text-purple-600 bg-purple-50';
      case 'Immigration': return 'text-orange-600 bg-orange-50';
      case 'US Politics': return 'text-red-600 bg-red-50';
      case 'Economy': return 'text-green-600 bg-green-50';
      case 'Culture': return 'text-pink-600 bg-pink-50';
      case 'Sports': return 'text-indigo-600 bg-indigo-50';
      case 'Technology': return 'text-cyan-600 bg-cyan-50';
      case 'International News': return 'text-slate-600 bg-slate-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
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
              <Link
                href="/"
                className="text-gray-700 hover:text-yellow-600 text-sm font-medium"
              >
                Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breaking News Ticker - Match main site */}
      <div className="bg-yellow-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-yellow-600 px-2 py-1 text-xs font-bold rounded mr-4">
              Tìm kiếm
            </span>
            <div className="overflow-hidden flex-1">
              <div className="text-sm">
                {query ? `Kết quả tìm kiếm: "${query}"` : 'Nhập từ khóa để tìm kiếm tin tức'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation - Match main site */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center py-4 space-x-8 overflow-x-auto">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors text-gray-700 hover:bg-gray-200"
            >
              <span>Tất cả tin tức</span>
            </Link>
            {query && (
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-yellow-500 text-white">
                <Search className="w-4 h-4" />
                <span>Kết quả tìm kiếm</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-yellow-600">Trang chủ</Link>
            <span>›</span>
            <span className="text-gray-900">Kết quả tìm kiếm</span>
          </nav>

          {query && !loading && (
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tìm kiếm: "{query}"
              </h1>
              {results.length > 0 && (
                <p className="text-gray-600">
                  Tìm thấy {results.length} bài viết liên quan
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tìm kiếm...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => performSearch(query)}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Tìm kiếm lại
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query && results.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Không tìm thấy bài viết liên quan</p>
            <p className="text-gray-500 text-sm">Vui lòng thử từ khóa khác</p>
          </div>
        )}

        {/* Search Results - Vertical List */}
        {!loading && results.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Kết quả tìm kiếm</h2>
            <div className="space-y-6">
              {results.map((article) => (
                <article key={article.id} className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/article/${article.id}`} className="block">
                    <div className="flex">
                      {/* Article Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={article.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=120&fit=crop'}
                          alt={getDisplayTitle(article)}
                          className="w-32 h-24 sm:w-40 sm:h-28 object-cover"
                        />
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            {/* Category Badge */}
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getCategoryColor(article.topic)}`}>
                              {translateCategory(article.topic)}
                            </span>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors leading-tight mb-2">
                              {getDisplayTitle(article)}
                            </h3>

                            {/* Summary */}
                            {getDisplaySummary(article) && (
                              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 mb-3">
                                {getDisplaySummary(article)}
                              </p>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center text-sm text-gray-600 space-x-4">
                              <span>{article.source}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{formatDate(article.publishedDate)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* No Query State */}
        {!query && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Vui lòng nhập từ khóa tìm kiếm</p>
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
                  <span className="text-white font-bold text-xs leading-none tracking-wide">Tiếng</span>
                  <span className="text-white font-bold text-xs leading-none tracking-wide">Nói</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    Tiếng Nói Người Mỹ Gốc Việt
                  </h3>
                  <p className="text-sm text-gray-400">Vietnamese American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Truyền tải những câu chuyện quan trọng của cộng đồng người Mỹ gốc Việt. Trang tin độc lập tập trung vào các vấn đề ảnh hưởng đến cộng đồng.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Giới thiệu</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Sứ mệnh của chúng tôi</Link></li>
                <li><a href="mailto:contact@vietnameseamericanvoices.com" className="text-gray-400 hover:text-white">Liên hệ</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Chính sách bảo mật</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Điều khoản sử dụng</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Tiếng Nói Người Mỹ Gốc Việt. Bảo lưu mọi quyền.</p>
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

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tải...</p>
      </div>
    </div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
