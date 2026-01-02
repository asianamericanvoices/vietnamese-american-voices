'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

export default function ArticleAudioPlayer({ audioUrl, title, duration, language = 'korean' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef(null);
  const [audioExists, setAudioExists] = useState(true);
  const [actualDuration, setActualDuration] = useState(0);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);

        // Track audio play event
        if (typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
          window.trackEvent('audio_play', {
            article_title: title,
            audio_url: audioUrl,
            language: language
          });
        }
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      setHasError(true);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  // Skip forward/backward
  const skip = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(
      audioRef.current.currentTime + seconds,
      audioRef.current.duration || 0
    ));
  };

  // Change playback speed
  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const currentIndex = speeds.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const newRate = speeds[nextIndex];

    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);

      // Track audio completion
      if (typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
        window.trackEvent('audio_complete', {
          article_title: title,
          audio_url: audioUrl,
          language: language
        });
      }
    };

    const handleError = (e) => {
      console.error('Audio load error:', e);
      // Instead of showing error, hide the player completely
      setAudioExists(false);
      setHasError(true);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) {
        setActualDuration(audio.duration);
        console.log('🎵 Actual audio duration:', audio.duration, 'seconds');
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioUrl, title, language]);

  // Debug logging
  console.log('🎧 ArticleAudioPlayer props:', { audioUrl, title, duration, language, audioExists });

  if (!audioUrl || !audioExists) {
    console.log('❌ No audioUrl provided or audio file not found, hiding player');
    return null;
  }

  const texts = {
    korean: {
      listen: '이 기사 듣기',
      loading: '로딩 중...',
      error: '오디오를 재생할 수 없습니다',
      speed: '속도'
    },
    chinese: {
      listen: '收听本文',
      loading: '加载中...',
      error: '无法播放音频',
      speed: '速度'
    },
    english: {
      listen: 'Listen to this article',
      loading: 'Loading...',
      error: 'Unable to play audio',
      speed: 'Speed'
    }
  };

  const t = texts[language] || texts.english;

  // Ensure we're rendering something
  console.log('✅ ArticleAudioPlayer rendering with audioUrl:', audioUrl);

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200" data-audio-player="true">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onError={(e) => {
          console.error('Audio element error:', e);
          setHasError(true);
          setAudioExists(false);
        }}
      />

      <div className="flex items-center gap-2 mb-3">
        <Volume2 className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-blue-800">{t.listen}</span>
        {(actualDuration || duration) && (
          <span className="text-xs text-gray-500 ml-auto">
            {formatTime(currentTime)} / {formatTime(actualDuration || duration)}
          </span>
        )}
      </div>

      {hasError ? (
        <div className="text-sm text-red-600 py-2">{t.error}</div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Skip backward 10s */}
          <button
            onClick={() => skip(-10)}
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Skip backward 10 seconds"
          >
            <SkipBack className="w-4 h-4 text-blue-600" />
          </button>

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className={`
              p-3 rounded-full shadow-md transition-all
              ${isLoading ? 'opacity-50 cursor-wait' : 'hover:shadow-lg active:scale-95'}
              ${isPlaying ? 'bg-blue-700' : 'bg-blue-600'}
            `}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Skip forward 10s */}
          <button
            onClick={() => skip(10)}
            className="p-2 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="w-4 h-4 text-blue-600" />
          </button>

          {/* Progress bar - clickable for seeking */}
          <div className="flex-1 mx-2">
            <div
              className="h-2 bg-blue-100 rounded-full overflow-hidden cursor-pointer relative"
              onClick={(e) => {
                if (!audioRef.current?.duration) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                const newTime = percentage * audioRef.current.duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }}
            >
              <div
                className="h-full bg-blue-600 transition-all duration-200 pointer-events-none"
                style={{
                  width: `${audioRef.current?.duration ? (currentTime / audioRef.current.duration) * 100 : 0}%`
                }}
              />
            </div>
          </div>

          {/* Speed control */}
          <button
            onClick={changeSpeed}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            {playbackRate}x
          </button>
        </div>
      )}

      {/* AI Voice Disclaimer */}
      <div className="mt-3 text-xs text-gray-600 italic text-center">
        {language === 'korean' ? (
          <span>이 오디오는 ElevenLabs 기술로 생성된 AI 음성입니다</span>
        ) : language === 'chinese' ? (
          <span>此音频由ElevenLabs技术生成的AI语音朗读</span>
        ) : (
          <span>This audio is narrated by an AI voice powered by ElevenLabs</span>
        )}
      </div>
    </div>
  );
}