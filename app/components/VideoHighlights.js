// VideoHighlights Component for Event Hub Pages
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Clock } from 'lucide-react';

export default function VideoHighlights({ videos = [], language = 'chinese' }) {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});

  // Translations
  const translations = {
    chinese: {
      title: '视频精选',
      subtitle: '精彩文章视频摘要',
      duration: '时长',
      watchNow: '立即观看',
      loading: '加载中...'
    },
    korean: {
      title: '비디오 하이라이트',
      subtitle: '주요 기사 비디오 요약',
      duration: '길이',
      watchNow: '지금 보기',
      loading: '로딩 중...'
    }
  };

  const t = translations[language] || translations.chinese;

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      // Pause any currently playing video
      if (playingIndex !== null) {
        const currentVideo = videoRefs.current[playingIndex];
        if (currentVideo) currentVideo.pause();
      }

      video.play();
      setPlayingIndex(index);
    }
  };

  const handleVideoEnd = (index) => {
    setPlayingIndex(null);
  };

  const toggleMute = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;
    setVideoStates(prev => ({
      ...prev,
      [index]: { ...prev[index], muted: video.muted }
    }));
  };

  const toggleFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  // Only show videos if they are explicitly provided
  // No automatic placeholders on production
  if (!videos || videos.length === 0) return null;

  return (
    <div className="my-12 px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={video.id || index} className="group">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              {/* Video Element - Hidden but loaded */}
              <video
                ref={(el) => videoRefs.current[index] = el}
                className={`w-full h-full object-cover ${playingIndex === index ? 'block' : 'hidden'}`}
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                onEnded={() => handleVideoEnd(index)}
                playsInline
              />

              {/* Thumbnail with Play Button Overlay */}
              {playingIndex !== index && (
                <>
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => handlePlayPause(index)}
                      className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-200 group-hover:scale-105"
                    >
                      <Play className="w-10 h-10 text-gray-900 ml-2" fill="currentColor" />
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDuration(video.duration)}</span>
                  </div>
                </>
              )}

              {/* Video Controls Overlay (when playing) */}
              {playingIndex === index && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePlayPause(index)}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <Pause className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMute(index)}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        {videoStates[index]?.muted ?
                          <VolumeX className="w-5 h-5" /> :
                          <Volume2 className="w-5 h-5" />
                        }
                      </button>

                      <button
                        onClick={() => toggleFullscreen(index)}
                        className="text-white hover:text-gray-300 transition-colors"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Title and Metadata */}
            <div className="mt-4">
              <a
                href={video.articleUrl}
                className="block group-hover:text-red-600 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                  {video.title}
                </h3>
              </a>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span>{video.source}</span>
                <span>•</span>
                <span>{new Date(video.date).toLocaleDateString(language === 'chinese' ? 'zh-CN' : 'ko-KR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile-specific scroll hint */}
      <div className="md:hidden mt-4 text-center text-sm text-gray-500">
        <span>← {language === 'chinese' ? '滑动查看更多' : '더 보려면 스와이프'} →</span>
      </div>
    </div>
  );
}