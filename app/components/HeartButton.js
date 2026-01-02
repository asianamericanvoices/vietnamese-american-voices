'use client';

import { useState, useEffect } from 'react';

const HeartButton = ({ articleId, site = 'korean', className = '', size = 'md' }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Size configurations
  const sizeClasses = {
    sm: 'w-5 h-5 text-sm',
    md: 'w-6 h-6 text-base',
    lg: 'w-8 h-8 text-lg'
  };

  // Get heart size class
  const heartSize = sizeClasses[size] || sizeClasses.md;

  // Load like status and count when component mounts
  useEffect(() => {
    if (!articleId) return;
    
    loadLikeStatus();
  }, [articleId, site]);

  const loadLikeStatus = async () => {
    try {
      const response = await fetch(
        `/api/articles/like?article_id=${articleId}&site=${site}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLiked(data.has_liked);
          setLikeCount(data.total_likes);
        }
      }
    } catch (error) {
      console.error('Failed to load like status:', error);
      // Fail silently - heart button still works without initial state
    }
  };

  const handleLike = async () => {
    if (loading || !articleId) return;
    
    setLoading(true);
    setError(null);

    try {
      const method = liked ? 'DELETE' : 'POST';
      const url = liked 
        ? `/api/articles/like?article_id=${articleId}&site=${site}`
        : '/api/articles/like';
      
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method === 'POST') {
        requestOptions.body = JSON.stringify({
          article_id: articleId,
          site: site
        });
      }

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (data.success) {
        setLiked(!liked);
        setLikeCount(data.total_likes);
        
        // Optional: Track analytics event
        if (typeof gtag !== 'undefined') {
          gtag('event', liked ? 'unlike_article' : 'like_article', {
            event_category: 'engagement',
            event_label: articleId,
            site: site
          });
        }
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          // Already liked - update UI state
          setLiked(true);
          setError('Already liked');
        } else if (response.status === 404 && method === 'DELETE') {
          // Like not found - update UI state
          setLiked(false);
          setError('Like not found');
        } else {
          setError(data.error || 'Something went wrong');
        }
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
      setError('Network error');
    } finally {
      setLoading(false);
      // Clear error after a few seconds
      if (error) {
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const formatLikeCount = (count) => {
    if (count >= 1000) {
      return `${Math.floor(count / 100) / 10}k`;
    }
    return count.toString();
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={handleLike}
        disabled={loading || !articleId}
        className={`
          inline-flex items-center justify-center rounded-full transition-all duration-200
          ${loading || !articleId ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
          ${liked 
            ? 'text-red-500 hover:text-red-600' 
            : 'text-gray-400 hover:text-red-500'
          }
          focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-30
          p-2 hover:bg-red-50 rounded-full
        `}
        aria-label={liked ? 'Unlike this article' : 'Like this article'}
        title={liked ? 'Unlike this article' : 'Like this article'}
      >
        <svg 
          className={`${heartSize} transition-colors duration-200`}
          fill={liked ? 'currentColor' : 'none'}
          stroke={liked ? 'currentColor' : 'currentColor'}
          strokeWidth={liked ? 0 : 2}
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      {/* Like count */}
      {likeCount > 0 && (
        <span className="text-sm text-gray-600 font-medium tabular-nums">
          {formatLikeCount(likeCount)}
        </span>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <span className="text-xs text-gray-400">...</span>
      )}
      
      {/* Error message (temporary) */}
      {error && (
        <span className="text-xs text-red-500 opacity-75">
          {error}
        </span>
      )}
    </div>
  );
};

export default HeartButton;