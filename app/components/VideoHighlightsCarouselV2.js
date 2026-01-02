// VideoHighlightsCarousel Component V2 - Improved player with better controls
import { useState, useRef, useEffect } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

export default function VideoHighlightsCarousel({ videos = [], language = 'chinese' }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Translations
  const translations = {
    chinese: {
      title: '视频精选',
      close: '关闭',
      noVideos: '暂无视频内容',
      noVideosDesc: '我们正在制作相关视频内容，请稍后再来查看。',
      scrollHint: '左右滑动查看更多视频'
    },
    korean: {
      title: '비디오 하이라이트',
      close: '닫기',
      noVideos: '현재 비디오가 없습니다',
      noVideosDesc: '관련 비디오 콘텐츠를 준비 중입니다. 나중에 다시 확인해 주세요.',
      scrollHint: '더 많은 비디오를 보려면 좌우로 스크롤하세요'
    }
  };

  const t = translations[language] || translations.chinese;

  useEffect(() => {
    checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, [videos]);

  const checkScrollButtons = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setCanScrollLeft(carousel.scrollLeft > 0);
    setCanScrollRight(
      carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 10
    );
  };

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth * 0.8;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString(
        language === 'chinese' ? 'zh-CN' : 'ko-KR',
        { year: 'numeric', month: 'long', day: 'numeric' }
      );
    } catch {
      return '';
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    // Scroll to video player when opened
    setTimeout(() => {
      document.getElementById('video-player-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const closeVideoPlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h2>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noVideos}</h3>
            <p className="text-sm text-gray-600">{t.noVideosDesc}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12" id="video-section">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
        {videos.length > 3 && (
          <p className="text-sm text-gray-500 hidden md:block">{t.scrollHint}</p>
        )}
      </div>

      {/* Expanded Video Player (when video is selected) */}
      {selectedVideo && (
        <div id="video-player-section" className="mb-8 animate-fadeIn">
          {/* Video Title and Metadata Above Player */}
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedVideo.title}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500 gap-2">
                  {selectedVideo.publishDate && (
                    <>
                      <span>{formatDate(selectedVideo.publishDate)}</span>
                      <span>•</span>
                    </>
                  )}
                  {selectedVideo.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(selectedVideo.duration)}
                    </span>
                  )}
                </div>
              </div>
              {/* Close button outside video */}
              <button
                onClick={closeVideoPlayer}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={t.close}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Video Player Container - Constrained width */}
          <div className="bg-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnailUrl}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  controls={true} // Use native controls
                  autoPlay={false}
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Carousel */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id || index}
              className="flex-shrink-0 w-80 cursor-pointer group"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => handleVideoClick(video)}
            >
              {/* Thumbnail Card */}
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                {video.thumbnailUrl || video.imageUrl ? (
                  <img
                    src={video.thumbnailUrl || video.imageUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/640x360/1f2937/9ca3af?text=Video';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <svg className="w-20 h-20 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                )}

                {/* Highlight if selected */}
                {selectedVideo?.id === video.id && (
                  <div className="absolute inset-0 ring-4 ring-blue-500 rounded-lg pointer-events-none" />
                )}
              </div>

              {/* Video Title */}
              <h3 className="mt-3 font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>

              {/* Metadata */}
              {video.publishDate && (
                <div className="mt-1 text-sm text-gray-500">
                  {formatDate(video.publishDate)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
}