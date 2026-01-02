'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
import Link from 'next/link';

// Category translations for Chinese site
const chineseCategories = {
  'General': '综合',
  'China-US Relations': '中美关系',
  'International News': '国际新闻',
  'US Politics': '美国政治',
  'Healthcare': '医疗健康',
  'Education': '教育',
  'Immigration': '移民',
  'Economy': '经济',
  'Culture': '文化',
  'Sports': '体育'
};

// Category translations for Korean site  
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

const SearchBar = ({ className = '', site = 'korean' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`recent-searches-${site}`);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, [site]);

  // Handle clicking outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Debounced search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      await performSearch(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(searchTimeout);
  }, [query, site]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&site=${site}&limit=6`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResults(data.results);
          // Track search behavior
          trackSearchAnalytics(searchQuery, data.results.length, false);
        } else {
          console.error('Search failed:', data.error);
          setResults([]);
          trackSearchAnalytics(searchQuery, 0, false);
        }
      } else {
        console.error('Search request failed:', response.status);
        setResults([]);
        trackSearchAnalytics(searchQuery, 0, false);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSearchSubmit = (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    // Save to recent searches
    const newRecentSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem(`recent-searches-${site}`, JSON.stringify(newRecentSearches));

    // Navigate to full search results page
    const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
    window.location.href = searchUrl;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(`recent-searches-${site}`);
  };

  // Function to translate category names
  const translateCategory = (category) => {
    if (site === 'chinese') {
      return chineseCategories[category] || category;
    } else if (site === 'korean') {
      return koreanCategories[category] || category;
    }
    return category;
  };

  const getDisplayTitle = (article) => {
    if (site === 'korean' && article.translatedTitles?.korean) {
      return article.translatedTitles.korean;
    }
    if (site === 'chinese' && article.translatedTitles?.chinese) {
      return article.translatedTitles.chinese;
    }
    return article.displayTitle || article.aiTitle || article.originalTitle;
  };

  // Track search analytics
  const trackSearchAnalytics = async (searchQuery, resultsCount, clickedResult, clickedArticleId = null) => {
    try {
      await fetch('/api/analytics/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: site,
          search_query: searchQuery,
          results_count: resultsCount,
          clicked_result: clickedResult,
          clicked_article_id: clickedArticleId,
          language: site === 'chinese' ? 'zh' : 'ko'
        })
      });
    } catch (error) {
      // Fail silently for analytics
      console.debug('Search analytics tracking failed:', error);
    }
  };

  // Handle article click from search results
  const handleArticleClick = (article) => {
    // Track click analytics
    trackSearchAnalytics(query, results.length, true, article.id);
    // Close search dropdown
    setIsOpen(false);
  };

  const highlightMatch = (text, searchQuery) => {
    if (!searchQuery.trim()) return text;
    
    try {
      const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
    } catch (e) {
      return text;
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      {/* Search Trigger */}
      {!isOpen ? (
        <button
          onClick={handleSearchClick}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
          aria-label="Search articles"
        >
          <Search className="w-5 h-5" />
          <span className="hidden md:inline text-sm">검색</span>
        </button>
      ) : (
        /* Expanded Search */
        <div className="fixed right-4 top-16 w-80 sm:w-96 sm:absolute sm:right-0 sm:top-0 max-w-[calc(100vw-2rem)] sm:max-w-none bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Search Input */}
          <div className="flex items-center p-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="뉴스 기사 검색..."
              className="flex-1 outline-none text-sm placeholder-gray-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center text-gray-500 text-sm">
                <div className="animate-pulse">검색 중...</div>
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                관련 기사를 찾을 수 없습니다
              </div>
            )}

            {!loading && query && results.length > 0 && (
              <>
                <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50">
                  {results.length}개의 기사를 찾았습니다
                </div>
                {results.map((article) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.id}`}
                    className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleArticleClick(article)}
                  >
                    <h4 
                      className="text-sm font-medium text-gray-900 mb-1"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightMatch(getDisplayTitle(article), query) 
                      }}
                    />
                    {article.matchedSummary && (
                      <p 
                        className="text-xs text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ 
                          __html: highlightMatch(article.matchedSummary, query) 
                        }}
                      />
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{translateCategory(article.topic)}</span>
                      <span className="text-xs text-gray-400">
                        {(() => {
                          // Parse date as local date to avoid timezone issues
                          const [year, month, day] = article.publishedDate.split('-');
                          const localDate = new Date(year, month - 1, day);
                          return localDate.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });
                        })()}
                      </span>
                    </div>
                  </Link>
                ))}
                {results.length >= 6 && (
                  <button
                    onClick={() => handleSearchSubmit()}
                    className="w-full p-3 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-t border-gray-100"
                  >
                    모든 검색 결과 보기 →
                  </button>
                )}
              </>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">최근 검색</h4>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    지우기
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSubmit(search)}
                    className="flex items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* No Recent Searches State */}
            {!query && recentSearches.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                검색어를 입력해 주세요
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;