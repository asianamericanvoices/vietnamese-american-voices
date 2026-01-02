// app/search/page.js - Search Results Page for Korean American Voices
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
        `/api/search?q=${encodeURIComponent(searchQuery)}&site=korean&limit=50`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResults(data.results);
        } else {
          setError('검색 실패');
        }
      } else {
        setError('검색 요청 실패');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('검색 중 오류 발생');
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
    
    return localDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Category translations for Korean site
  const translateCategory = (category) => {
    const koreanCategories = {
      'General': '종합',
      'Korea-US Relations': '한미관계',
      'China-US Relations': '국제뉴스', // Maps to International News for KAV
      'International News': '국제뉴스',
      'US Politics': '미국정치',
      'Healthcare': '의료건강',
      'Education': '교육',
      'Immigration': '이민',
      'Economy': '경제',
      'Culture': '문화',
      'Sports': '스포츠'
    };
    return koreanCategories[category] || category;
  };

  // Map category for KAV - China-US Relations appears as International News
  const mapCategoryForKAV = (originalCategory) => {
    const mapping = {
      'China-US Relations': 'International News',
    };
    return mapping[originalCategory] || originalCategory;
  };

  const getCategoryColor = (topic) => {
    const mappedTopic = mapCategoryForKAV(topic);
    switch(mappedTopic) {
      case 'Korea-US Relations': return 'text-green-600 bg-green-50';
      case 'Healthcare': return 'text-blue-600 bg-blue-50';
      case 'Education': return 'text-purple-600 bg-purple-50';
      case 'Immigration': return 'text-orange-600 bg-orange-50';
      case 'US Politics': return 'text-red-600 bg-red-50';
      case 'Economy': return 'text-yellow-600 bg-yellow-50';
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
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                <span className="text-white font-bold text-xs leading-none tracking-wide">한미</span>
                <span className="text-white font-bold text-xs leading-none tracking-wide">목소리</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  한미목소리
                </h1>
                <p className="text-xs text-gray-500">Korean American Voices</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <SearchBar site="korean" />
              <Link 
                href="/"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
              >
                홈
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breaking News Ticker - Match main site */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-blue-600 px-2 py-1 text-xs font-bold rounded mr-4">
              검색
            </span>
            <div className="overflow-hidden flex-1">
              <div className="text-sm">
                {query ? `검색 결과: "${query}"` : '키워드를 입력해 뉴스를 검색하세요'}
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
              <span className="font-korean">전체 뉴스</span>
            </Link>
            {query && (
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-blue-600 text-white">
                <Search className="w-4 h-4" />
                <span className="font-korean">검색 결과</span>
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
            <Link href="/" className="hover:text-blue-600 font-korean">홈</Link>
            <span>›</span>
            <span className="text-gray-900 font-korean">검색 결과</span>
          </nav>
          
          {query && !loading && (
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-korean">
                검색: "{query}"
              </h1>
              {results.length > 0 && (
                <p className="text-gray-600 font-korean">
                  {results.length}개의 관련 기사를 찾았습니다
                </p>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">검색 중...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => performSearch(query)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              다시 검색
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query && results.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">관련 기사를 찾을 수 없습니다</p>
            <p className="text-gray-500 text-sm">다른 검색어를 시도해 보세요</p>
          </div>
        )}

        {/* Search Results - Vertical List */}
        {!loading && results.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6 font-korean">검색 결과</h2>
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
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight font-korean mb-2">
                              {getDisplayTitle(article)}
                            </h3>
                            
                            {/* Summary */}
                            {getDisplaySummary(article) && (
                              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2 font-korean mb-3">
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
            <p className="text-gray-600">검색어를 입력해 주세요</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex flex-col items-center justify-center gap-0.5">
                  <span className="text-white font-bold text-xs leading-none tracking-wide">한미</span>
                  <span className="text-white font-bold text-xs leading-none tracking-wide">목소리</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-korean">
                    한미목소리
                  </h3>
                  <p className="text-sm text-gray-400">Korean American Voices</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed font-korean">
                한미 커뮤니티의 중요한 이야기를 전합니다. 우리 커뮤니티에 영향을 미치는 문제에 집중하는 독립 뉴스 매체입니다.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 font-korean">소개</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white font-korean">우리의 사명</Link></li>
                <li><a href="mailto:contact@hanmimogsoli.us" className="text-gray-400 hover:text-white font-korean">문의하기</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white font-korean">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white font-korean">이용약관</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p className="font-korean">&copy; 2025 한미목소리. 모든 권리 보유.</p>
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
        
        .font-korean {
          font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
        }
      `}</style>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>}>
      <SearchResultsContent />
    </Suspense>
  );
}