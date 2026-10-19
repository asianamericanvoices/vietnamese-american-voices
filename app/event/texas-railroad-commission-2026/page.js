// Texas Railroad Commission 2026 voter guide (shared template, identical on all four sites).
// Per-site details (brand, colors, language, contact) come from ./content/site.js.
// Ad landing page in the standard event-hub frame. Guide copy follows
// RRC_Page_Handoff_for_Claude_Code.md; every string lives in ./content
// (tl = default edition, ?lang=en = English master for review).
// "Latest" and "Coverage" come from articles tagged Texas Elections 2026 + the RRC
// subtag in the dashboard, newest first, so adding a story needs no deploy.
// Unlisted until RRC_PAGE_PUBLIC (lib/rrcPage.js) is flipped.
'use client';

import Script from 'next/script';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, ChevronLeft, ChevronRight, ExternalLink, Globe, TrendingUp, Building2, GraduationCap, Plane, Palette, Newspaper, Trophy, Stethoscope, Vote } from 'lucide-react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import ManualVotingInfoPopup from '../../components/ManualVotingInfoPopup';
import { getContent, DEFAULT_EDITION, SITE } from './content';
import { RRC_PAGE_SLUG, RRC_PAGE_PATH } from '../../../lib/rrcPage';

const PARENT_EVENT = 'Texas Elections 2026';
const EVENT_SUBTAG = 'Texas Railroad Commission 2026';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const CATEGORIES = [
  { id: 'all', icon: Globe },
  { id: 'General', icon: Newspaper },
  { id: 'US Politics', icon: Building2 },
  { id: 'Healthcare', icon: Stethoscope },
  { id: 'Education', icon: GraduationCap },
  { id: 'Immigration', icon: Plane },
  { id: 'Economy', icon: TrendingUp },
  { id: 'Culture', icon: Palette },
  { id: 'Sports', icon: Trophy }
];

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Renders copy with [n] footnote markers linked to the Sources list, plus any
// named phrases (e.g. "VoteTexas.gov") linked out.
function RichText({ text, links = {}, onLinkClick }) {
  const phrases = Object.keys(links).map(escapeRegExp);
  const pattern = new RegExp(`(\\[[0-9]+[a-z]?\\]${phrases.length ? '|' + phrases.join('|') : ''})`, 'g');
  return text.split(pattern).map((part, i) => {
    const ref = part.match(/^\[([0-9]+[a-z]?)\]$/);
    if (ref) {
      return (
        <sup key={i}>
          <a href={`#source-${ref[1]}`} className="text-gray-500 hover:text-orange-700">[{ref[1]}]</a>
        </sup>
      );
    }
    if (links[part]) {
      return (
        <a
          key={i}
          href={links[part]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onLinkClick?.(part)}
          className="underline text-orange-700 hover:text-orange-800"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

// Light party-color shading on the carousel's candidate cards, so readers can tell
// at a glance who is with which party. Same tint strength for all three; layout,
// fields and type sizes stay identical. (Signed off by JT, 2026-10-18.)
const PARTY_CARD = {
  R: 'bg-red-500/20 ring-red-300/40',
  D: 'bg-blue-500/20 ring-blue-300/40',
  L: 'bg-yellow-400/20 ring-yellow-200/40',
};

// Desktop comparison table: tinted column header with a colored top stripe, and a
// fainter wash down each candidate's column.
const PARTY_TABLE_HEAD = {
  R: 'bg-red-50 border-t-4 border-red-300',
  D: 'bg-blue-50 border-t-4 border-blue-300',
  L: 'bg-yellow-50 border-t-4 border-yellow-300',
};
const PARTY_TABLE_CELL = {
  R: 'bg-red-50/40',
  D: 'bg-blue-50/40',
  L: 'bg-yellow-50/40',
};

// Same idea on the white page background, for the candidate profile cards.
const PARTY_PROFILE = {
  R: 'bg-red-50 border-red-200',
  D: 'bg-blue-50 border-blue-200',
  L: 'bg-yellow-50 border-yellow-200',
};

// Brand mark from site.js (same markup on every site; text and color differ).
function SiteLogo() {
  return (
    <div className={`w-12 h-12 ${SITE.logoBg} rounded-lg flex flex-col items-center justify-center gap-0.5`}>
      {SITE.logoLines.map((line) => (
        <span key={line} className={`text-white font-bold ${SITE.logoTextClass}`}>{line}</span>
      ))}
    </div>
  );
}

// "博·弗伦奇 (Bo French)" -> native name, with the English name on its own line.
// Names without a parenthetical (English, Tagalog, Vietnamese) are unchanged.
function splitName(name) {
  const m = name.match(/^(.*?)\s*\(([^()]+)\)\s*$/);
  return m ? { primary: m[1], english: m[2] } : { primary: name, english: null };
}

function CandidatePhoto({ candidate, showPhotos, size = 'w-12 h-12' }) {
  if (showPhotos) {
    // Same circular crop for all three; portraits are framed head-and-shoulders, so bias toward the face.
    return <img src={candidate.photo} alt={candidate.name} className={`${size} rounded-full object-cover bg-gray-200 flex-shrink-0`} style={{ objectPosition: '50% 22%' }} />;
  }
  return <div className={`${size} rounded-full bg-gray-300 flex-shrink-0`} aria-hidden="true" />;
}

function Carousel({ slides, candidates, ui, showPhotos, onSlideView }) {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [current, setCurrent] = useState(0);
  const [height, setHeight] = useState(null);
  const total = slides.length;

  useEffect(() => {
    onSlideView(current);
  }, [current]);

  // Size the carousel to the slide on screen, so a short slide doesn't sit in the
  // empty space left by the tallest one.
  useEffect(() => {
    const measure = () => {
      const el = slideRefs.current[current];
      if (el) setHeight(el.offsetHeight);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [current, slides]);

  const goTo = (index) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(total - 1, index));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== current) setCurrent(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(current - 1);
    }
  };

  return (
    <section aria-roledescription="carousel" aria-label={ui.carouselLabel}>
      <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="flex items-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide rounded-lg bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        style={{ scrollbarWidth: 'none', height: height ? `${height}px` : undefined, transition: 'height 300ms ease' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { slideRefs.current[i] = el; }}
            role="group"
            aria-roledescription="slide"
            aria-label={ui.slideOf(i + 1, total)}
            aria-hidden={i !== current}
            className="w-full flex-shrink-0 snap-center bg-slate-800 text-white px-11 py-6 sm:px-14 sm:py-10"
          >
            {slide.eyebrow && (
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-orange-300">{slide.eyebrow}</p>
            )}
            <h2 className={`${slide.eyebrow ? 'mt-1 ' : ''}text-xl sm:text-3xl font-bold leading-tight`}>{slide.title}</h2>
            {slide.question && (
              <p className="mt-2 text-sm sm:text-base italic text-slate-300">{slide.question}</p>
            )}
            {slide.candidates && (
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {candidates.map((c, j) => (
                  <div key={c.id} className={`rounded-lg p-4 ring-1 ${PARTY_CARD[c.partyKey] || 'bg-slate-700 ring-slate-600'}`}>
                    <div className="flex items-center gap-3 sm:flex-col sm:text-center">
                      <CandidatePhoto candidate={c} showPhotos={showPhotos} size="w-14 h-14 sm:w-20 sm:h-20" />
                      <div>
                        <p className="font-bold text-lg leading-tight">{splitName(c.name).primary}</p>
                        {splitName(c.name).english && (
                          <p className="text-xs text-slate-300">({splitName(c.name).english})</p>
                        )}
                        <p className="text-sm text-slate-300">{c.party}</p>
                      </div>
                    </div>
                    {slide.quotes ? (
                      <blockquote className="mt-2 text-sm sm:text-base leading-relaxed text-slate-100">
                        “{slide.candidates[j]}”
                      </blockquote>
                    ) : (
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-100">{slide.candidates[j]}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            {slide.note && (
              <p className="mt-4 text-xs text-slate-400">
                <RichText text={slide.note} />
              </p>
            )}
            {slide.bullets && (
              <ul className="mt-5 space-y-3 text-base sm:text-lg">
                {slide.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-slate-400" aria-hidden="true">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

        {/* Side arrows, vertically centered on the slide box */}
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          aria-label={ui.prevSlide}
          className={`absolute left-1 lg:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-white/90 text-slate-800 shadow-lg flex items-center justify-center hover:bg-white transition-opacity ${current === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          tabIndex={current === 0 ? -1 : 0}
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          aria-label={ui.nextSlide}
          className={`absolute right-1 lg:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-white/90 text-slate-800 shadow-lg flex items-center justify-center hover:bg-white transition-opacity ${current === total - 1 ? 'opacity-0 pointer-events-none' : ''}`}
          tabIndex={current === total - 1 ? -1 : 0}
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">{ui.slideOf(current + 1, total)}</p>

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label={ui.prevSlide}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={ui.goToSlide(i + 1)}
              aria-current={i === current ? 'true' : undefined}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? 'bg-orange-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          aria-label={ui.nextSlide}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default function TexasRailroadCommission2026() {
  const [lang, setLang] = useState(DEFAULT_EDITION);
  const [articles, setArticles] = useState([]);
  const [topStoryIds, setTopStoryIds] = useState([]); // dashboard slot picks; null = auto
  const [loading, setLoading] = useState(true);
  const [visibleCoverage, setVisibleCoverage] = useState(6);
  const [showManualPopup, setShowManualPopup] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const seenSlides = useRef(new Set());

  const content = getContent(lang);
  const { edition, site, ui, candidates } = content;
  // Never mix one real photo with placeholders: photos show only when all three exist.
  const showPhotos = candidates.every((c) => c.photo);

  // Sends to the site's existing analytics (GA4 + analytics_events) via window.trackEvent.
  const track = (eventType, data = {}) => {
    if (typeof window !== 'undefined' && typeof window.trackEvent === 'function') {
      window.trackEvent(eventType, {
        page_type: 'event',
        event_slug: RRC_PAGE_SLUG,
        edition: edition.lang,
        language: SITE.language,
        ...data
      });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('lang');
    if (requested === 'en') setLang('en');

    // Page view with UTM tags so ad traffic is attributable in analytics_events
    // (GA4/Meta Pixel read UTMs on their own).
    const utm = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) utm[key] = value;
    });
    const trackPageView = () => {
      if (typeof window.trackEvent === 'function') {
        window.trackEvent('page_view', {
          page_type: 'event',
          event_slug: RRC_PAGE_SLUG,
          edition: requested === 'en' ? 'en' : DEFAULT_EDITION,
          language: SITE.language,
          ...utm
        });
      } else {
        setTimeout(trackPageView, 500);
      }
    };
    setTimeout(trackPageView, 100);

    fetchArticles();
  }, []);

  useEffect(() => {
    const fired = new Set();
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max <= 0 ? 100 : (window.scrollY / max) * 100;
      [25, 50, 75, 100].forEach((threshold) => {
        const reached = threshold === 100 ? percent >= 99 : percent >= threshold;
        if (reached && !fired.has(threshold)) {
          fired.add(threshold);
          track('scroll_depth', { percent: threshold });
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const [response, settingsResponse] = await Promise.all([
        fetch(`/api/published-articles?language=${SITE.language}&targeted_event=${encodeURIComponent(PARENT_EVENT)}&event_subtag=${encodeURIComponent(EVENT_SUBTAG)}&limit=50&t=${Date.now()}`),
        fetch(`/api/event-page-settings?page=${RRC_PAGE_SLUG}&t=${Date.now()}`).catch(() => null),
      ]);
      if (settingsResponse?.ok) {
        const settings = await settingsResponse.json();
        if (Array.isArray(settings.topStoryIds)) setTopStoryIds(settings.topStoryIds);
      }
      if (response.ok) {
        const data = await response.json();
        if (data.articles) {
          // Strictly newest first (the API floats site heroes to the top).
          const sorted = [...data.articles].sort((a, b) =>
            String(b.publishedDate || '').localeCompare(String(a.publishedDate || ''))
          );
          setArticles(sorted);
        }
      }
    } catch (error) {
      console.error('Error fetching RRC articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSlideView = (index) => {
    if (seenSlides.current.has(index)) return;
    seenSlides.current.add(index);
    track('carousel_slide_view', { slide_index: index + 1 });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = String(dateString).slice(0, 10).split('-');
    return new Date(year, month - 1, day).toLocaleDateString(edition.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTitle = (article) => {
    if (edition.titleLanguage) {
      return article.translatedTitles?.[edition.titleLanguage] || article.displayTitle || article.originalTitle;
    }
    return article.originalTitle || article.displayTitle || article.aiTitle;
  };

  const getSummary = (article) => {
    const summary = (edition.titleLanguage && article.translations?.[edition.titleLanguage]) || article.aiSummary || '';
    return summary.replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
  };

  const getTickerItems = () => {
    if (articles.length === 0) return [{ title: content.header.title, url: null }];
    return articles.slice(0, 5).map((article) => {
      const caption = (edition.titleLanguage && article.socialCaptions?.[edition.titleLanguage]) || getTitle(article);
      return {
        id: article.id,
        title: caption && caption.length > 80 ? caption.substring(0, 77) + '...' : caption,
        url: `/article/${article.id}`
      };
    });
  };

  // Top stories: slots picked in the dashboard first (in slot order), remaining
  // slots auto-fill with the newest stories not already picked. A pick that isn't
  // available on this site (e.g. not translated yet) falls back to auto.
  const pickedArticles = topStoryIds.map((id) =>
    id ? articles.find((a) => String(a.id) === String(id)) || null : null
  );
  const pickedIds = new Set(pickedArticles.filter(Boolean).map((a) => a.id));
  const autoQueue = articles.filter((a) => !pickedIds.has(a.id));
  const latestArticles = [];
  for (let i = 0, next = 0; i < content.latest.count; i++) {
    const article = pickedArticles[i] || autoQueue[next++];
    if (article) latestArticles.push(article);
  }
  // Coverage lists everything not already in Top stories, newest first.
  const latestIds = new Set(latestArticles.map((a) => a.id));
  const coverageArticles = articles.filter((a) => !latestIds.has(a.id));


  const handleVotingInfoClick = () => {
    track('voting_link_click', { link: 'voter_info_popup' });
    setShowManualPopup(true);
  };

  const handleRecaptchaLoad = () => {
    if (window.grecaptcha && window.grecaptcha.ready) {
      window.grecaptcha.ready(() => {});
    }
  };

  const handleNewsletterSignup = async (e, location = 'page') => {
    e.preventDefault();

    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setNewsletterMessage(site.newsletterInvalid);
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
        track('newsletter_signup', { location });
        setNewsletterMessage(data.message);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(data.error || site.newsletterError);
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus('error');
      setNewsletterMessage(site.newsletterError);
    }
  };

  const sectionHeading = 'text-2xl font-bold text-gray-900 leading-tight';

  return (
    <div lang={edition.lang} className={`min-h-screen bg-white ${SITE.fontClass}`}>
      <ManualVotingInfoPopup
        state="TX"
        eventType={RRC_PAGE_SLUG}
        isOpen={showManualPopup}
        onClose={() => setShowManualPopup(false)}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <SiteLogo />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{SITE.name}</h1>
                <p className="text-xs text-gray-500">{SITE.englishName}</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <SearchBar site={SITE.language} />
              <a href={`mailto:${SITE.contactEmail}`} className={`text-gray-700 ${SITE.theme.contactHover} text-sm font-medium`}>
                {site.contact}
              </a>
            </div>
          </div>

          {/* Event Hub Bar */}
          <div className={`border-t border-gray-200 py-3 bg-gradient-to-r ${SITE.theme.hubBarGradient}`}>
            <div className="max-w-7xl mx-auto px-6">
              {/* Desktop */}
              <div className="hidden md:flex items-center justify-center gap-3 flex-wrap">
                <span className="text-sm font-bold text-gray-700">{site.hubBarLabel}</span>
                <Link
                  href="/event/texas-elections-2026"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all transform hover:scale-105 bg-orange-600 text-white hover:bg-orange-700 shadow-lg"
                >
                  <span>{site.texasHub}</span>
                </Link>
                <Link
                  href={RRC_PAGE_PATH}
                  aria-current="page"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-slate-700 text-white shadow-lg"
                >
                  <span>{site.thisPage}</span>
                </Link>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex flex-col items-center space-y-2">
                <span className="text-sm font-bold text-gray-700 mb-1">{site.hubBarLabel.replace(/:$/, '')}</span>
                <div className="flex flex-col items-center space-y-2 w-full">
                  <Link
                    href="/event/texas-elections-2026"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium transition-all transform hover:scale-105 bg-orange-600 text-white hover:bg-orange-700 shadow-lg w-full max-w-xs"
                  >
                    <span>{site.texasHub}</span>
                  </Link>
                  <Link
                    href={RRC_PAGE_PATH}
                    aria-current="page"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium bg-slate-700 text-white shadow-lg w-full max-w-xs"
                  >
                    <span>{site.thisPage}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Event Banner - Dynamic Breaking News Ticker */}
      <div className="bg-orange-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <span className="bg-white text-orange-600 px-2 py-1 text-xs font-bold rounded mr-4 flex-shrink-0">
              {site.specialReport}
            </span>
            <div className="overflow-hidden flex-1">
              <div className="animate-scroll whitespace-nowrap text-sm font-medium">
                {getTickerItems().map((item, index, all) => (
                  <span key={item.id || index}>
                    {item.url ? (
                      <Link href={item.url} className="hover:text-orange-200 transition-colors">
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                    {index < all.length - 1 && ' • '}
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
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors text-gray-700 hover:bg-gray-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{site.categories[category.id]}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors text-gray-700 hover:bg-gray-200"
                  >
                    <Icon className="w-3 h-3" />
                    <span>{site.categories[category.id]}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Voting Information Button */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-50 py-4 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <button
            onClick={handleVotingInfoClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            <Vote className="w-5 h-5" />
            <span className="text-lg">{site.votingButton}</span>
          </button>
          <p className="mt-2 text-sm text-gray-600">{site.votingSubline}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 1. Title + date line */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold border bg-slate-100 text-slate-800 border-slate-300">
              {site.thisPage}
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{content.header.title}</h2>
            <p className="mt-3 text-base sm:text-lg text-gray-600">{content.header.dateLine}</p>
          </div>

          {/* 2. Top stories (dashboard picks, then newest) */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
              {content.latest.heading}
            </h2>
            {loading ? (
              <p className="mt-4 text-gray-500">{ui.loading}</p>
            ) : latestArticles.length === 0 ? (
              <p className="mt-4 text-gray-500">{ui.noStories}</p>
            ) : (
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {latestArticles.map((article, index) => (
                  <article key={article.id} className="group bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
                    <a
                      href={`/article/${article.id}`}
                      onClick={() => track('latest_item_click', { item_index: index + 1, article_id: article.id })}
                      className="flex gap-3 p-3"
                    >
                      {article.imageUrl && (
                        <img
                          src={article.imageUrl}
                          alt=""
                          className="w-24 h-20 sm:w-32 sm:h-24 object-cover rounded-md flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                          {getTitle(article)}
                        </h3>
                        {/* Source only (no date); wraps in full on narrow screens */}
                        <p className="mt-2 text-xs font-medium text-gray-600">{article.source}</p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
            <p className="mt-4 text-sm italic text-gray-500">{content.latest.note}</p>
          </section>

          {/* 3. Candidate carousel */}
          <div className="mt-10">
            <Carousel slides={content.slides} candidates={candidates} ui={ui} showPhotos={showPhotos} onSlideView={handleSlideView} />
          </div>

          {/* Newsletter invitation bar (full width, the page's only signup) */}
          <div className={`mt-8 ${SITE.theme.newsletterBox} rounded-lg p-5 sm:p-6`}>
            <div className="md:flex md:items-center md:gap-6">
              <div className="md:flex-1">
                <h2 className="text-lg font-bold text-gray-900">{site.newsletterHeading}</h2>
                <p className="mt-1 text-sm text-gray-600">{site.newsletterBody}</p>
              </div>
              <form
                onSubmit={(ev) => handleNewsletterSignup(ev, 'bar')}
                className="mt-3 md:mt-0 flex flex-col sm:flex-row gap-2 md:w-[26rem] md:flex-shrink-0"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(ev) => setNewsletterEmail(ev.target.value)}
                  placeholder={site.newsletterPlaceholder}
                  disabled={newsletterStatus === 'loading'}
                  aria-label={site.newsletterPlaceholder}
                  className={`flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 ${SITE.theme.newsletterRing} disabled:opacity-50`}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className={`${SITE.theme.newsletterButton} text-white px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {newsletterStatus === 'loading' ? site.newsletterLoading : site.newsletterButton}
                </button>
              </form>
            </div>
            {newsletterMessage && (
              <div className={`mt-2 text-sm ${newsletterStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {newsletterMessage}
              </div>
            )}
          </div>

          {/* 4. What the Railroad Commission does */}
          <section className="mt-12">
            <div className="border-l-4 border-slate-600 bg-slate-50 rounded-r-lg px-5 py-4 mb-5">
              <h2 className={sectionHeading}>{content.explainer.heading}</h2>
            </div>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              {content.explainer.paragraphs.map((p, i) => (
                <p key={i}><RichText text={p} /></p>
              ))}
            </div>
            {content.audioUrl && (
              <div className="mt-5">
                <p className="text-sm font-medium text-gray-700 mb-2">{ui.listen}</p>
                <audio
                  controls
                  preload="none"
                  src={content.audioUrl}
                  onPlay={() => track('audio_play', { audio: 'explainer' })}
                  className="w-full"
                />
              </div>
            )}
          </section>

          {/* 5. How to vote in Texas */}
          <section className="mt-12">
            <div className="border-l-4 border-slate-600 bg-slate-50 rounded-r-lg px-5 py-4 mb-5">
              <h2 className={sectionHeading}>{content.howToVote.heading}</h2>
            </div>
            <ul className="space-y-3 text-lg text-gray-700 leading-relaxed">
              {content.howToVote.items.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-orange-600" aria-hidden="true">•</span>
                  <span>
                    <strong className="text-gray-900">{item.lead}</strong>{' '}
                    <RichText
                      text={item.text}
                      links={content.links}
                      onLinkClick={(link) => track('voting_link_click', { link })}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. The candidates side by side */}
          <section className="mt-12">
            <div className="border-l-4 border-slate-600 bg-slate-50 rounded-r-lg px-5 py-4 mb-5">
              <h2 className={sectionHeading}>{content.candidatesSection.heading}</h2>
            </div>
            {/* Process note: how the profiles are built and the "In the news" standard */}
            <p className="text-sm sm:text-base italic text-gray-600 leading-relaxed border-l-2 border-gray-300 pl-4">
              <RichText text={content.candidatesSection.intro} />
            </p>

            {/* Comparison table (640px and up; scrolls inside its own box) */}
            <div className="hidden sm:block mt-6 overflow-x-auto border border-gray-200 rounded-lg">
              {/* Fixed layout: label column gets a set width, candidates split the rest equally */}
              <table className="w-full min-w-[760px] table-fixed text-sm text-left">
                <colgroup>
                  <col style={{ width: '11rem' }} />
                  {candidates.map((c) => <col key={c.id} />)}
                </colgroup>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="p-3"><span className="sr-only">{ui.candidateColumn}</span></th>
                    {candidates.map((c) => (
                      <th key={c.id} scope="col" className={`p-3 align-top ${PARTY_TABLE_HEAD[c.partyKey] || ''}`}>
                        <div className="flex items-center gap-3">
                          <CandidatePhoto candidate={c} showPhotos={showPhotos} />
                          <div>
                            <p className="text-base font-bold text-gray-900">{splitName(c.name).primary}</p>
                          {splitName(c.name).english && <p className="text-xs font-normal text-gray-500">({splitName(c.name).english})</p>}
                            <p className="text-sm font-normal text-gray-600">{c.party}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.candidatesSection.rows.map((row) => row.group ? (
                    <tr key={row.group} className="border-t border-gray-200 bg-slate-100">
                      <th scope="colgroup" colSpan={candidates.length + 1} className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-700">
                        {row.group}
                      </th>
                    </tr>
                  ) : (
                    <tr key={row.key} className="border-t border-gray-200">
                      <th scope="row" className="p-3 align-top font-semibold text-gray-900 bg-gray-50">{row.label}</th>
                      {candidates.map((c) => (
                        <td key={c.id} className={`p-3 align-top text-gray-700 leading-relaxed ${PARTY_TABLE_CELL[c.partyKey] || ''}`}>
                          {row.key === 'website' ? (
                            <a href={c.website} target="_blank" rel="noopener noreferrer" className="underline text-orange-700">{c.websiteLabel}</a>
                          ) : (
                            <RichText text={c.table[row.key]} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Per-candidate cards below 640px (same order, same fields) */}
            <div className="sm:hidden mt-6 space-y-4">
              {candidates.map((c) => (
                <div key={c.id} className={`border rounded-lg p-4 ${PARTY_PROFILE[c.partyKey] || 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <CandidatePhoto candidate={c} showPhotos={showPhotos} />
                    <div>
                      <p className="text-base font-bold text-gray-900">{splitName(c.name).primary}</p>
                          {splitName(c.name).english && <p className="text-xs font-normal text-gray-500">({splitName(c.name).english})</p>}
                      <p className="text-sm text-gray-600">{c.party}</p>
                    </div>
                  </div>
                  <dl className="mt-3 space-y-3 text-sm">
                    {content.candidatesSection.rows.map((row) => row.group ? (
                      <div key={row.group} className="pt-2 border-t border-gray-200">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-600">{row.group}</p>
                      </div>
                    ) : (
                      <div key={row.key}>
                        <dt className="font-semibold text-gray-900">{row.label}</dt>
                        <dd className="text-gray-700 leading-relaxed">
                          {row.key === 'website' ? (
                            <a href={c.website} target="_blank" rel="noopener noreferrer" className="underline text-orange-700">{c.websiteLabel}</a>
                          ) : (
                            <RichText text={c.table[row.key]} />
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {/* Profiles */}
            <div className="mt-10 space-y-6">
              {candidates.map((c) => (
                <article key={c.id} className={`rounded-xl border p-5 sm:p-6 ${PARTY_PROFILE[c.partyKey] || 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center gap-4">
                    <CandidatePhoto candidate={c} showPhotos={showPhotos} size="w-16 h-16" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {splitName(c.name).primary}, {c.party}
                      {splitName(c.name).english && (
                        <span className="block text-base font-medium text-gray-500">({splitName(c.name).english})</span>
                      )}
                    </h3>
                  </div>
                  <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{content.candidatesSection.backgroundLabel}</strong>{' '}
                    <RichText text={c.background} />
                  </p>
                  <p className="mt-3 text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{content.candidatesSection.inWordsLabel}</strong>{' '}
                    <RichText text={c.inWords} />
                  </p>
                  <p className="mt-3 text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">{content.candidatesSection.endorsementsLabel}</strong>{' '}
                    <RichText text={c.table.endorsements} />
                  </p>
                  {/* Only for matters with statewide coverage that were widely criticized; same bar for all three */}
                  {c.inTheNews && (
                    <p className="mt-3 text-lg text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">{content.candidatesSection.inTheNewsLabel}</strong>{' '}
                      <RichText text={c.inTheNews} />
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* 7. Coverage of the race (hub-style card grid; stories after the Latest four) */}
        {(loading || coverageArticles.length > 0) && (
        <section className="mt-16">
          <div className="border-l-4 border-slate-600 bg-slate-50 rounded-r-lg px-5 py-4 mb-6">
            <h2 className={sectionHeading}>{content.coverage.heading}</h2>
            <p className="text-sm text-gray-500">{content.coverage.intro}</p>
          </div>
          {loading ? (
            <p className="text-gray-500">{ui.loading}</p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500">{ui.noStories}</p>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {coverageArticles.slice(0, visibleCoverage).map((article) => (
                  <article key={article.id} className="group">
                    <a
                      href={`/article/${article.id}`}
                      onClick={() => track('coverage_click', { article_id: article.id, link: 'translation' })}
                      className="block"
                    >
                      {article.imageUrl && (
                        <img src={article.imageUrl} alt={getTitle(article)} className="w-full h-48 object-cover rounded-lg mb-3" />
                      )}
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-tight mb-2">
                        {getTitle(article)}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{getSummary(article)}</p>
                    </a>
                    {edition.titleLanguage && article.originalTitle && (
                      <p className="text-xs text-gray-500 mb-2">{ui.originalHeadline}: {article.originalTitle}</p>
                    )}
                    <div className="flex flex-wrap items-center text-xs text-gray-500 gap-x-2">
                      <span>{article.source}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(article.publishedDate)}</span>
                      </div>
                      {article.originalUrl && (
                        <>
                          <span>•</span>
                          <a
                            href={article.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('coverage_click', { article_id: article.id, link: 'original' })}
                            className="inline-flex items-center gap-1 hover:text-gray-800"
                          >
                            {ui.original}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              {coverageArticles.length > visibleCoverage && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setVisibleCoverage((n) => n + 6)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow"
                  >
                    {site.loadMore}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
        )}

        {/* 8. Guide footer: disclaimer, sources, corrections */}
        <section className="mt-16 max-w-5xl mx-auto border-t border-gray-200 pt-8 text-sm text-gray-600">
          <p className="font-medium text-gray-800">
            {content.footer.disclaimer}{showPhotos && ` ${content.footer.photoCredit}`}
          </p>

          <h2 className="mt-8 text-base font-bold text-gray-900">{ui.sourcesHeading}</h2>
          <ol className="mt-3 space-y-2">
            {content.sources.map((s) => (
              <li key={s.id} id={`source-${s.id}`} className="scroll-mt-48 flex gap-2">
                <span className="text-gray-400 flex-shrink-0">[{s.id}]</span>
                <span>
                  {s.text}:{' '}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline break-all text-gray-700 hover:text-gray-900">
                    {s.url}
                  </a>
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-8">
            {content.footer.corrections}{' '}
            <a href={`mailto:${content.footer.correctionsEmail}`} className="underline text-gray-700">{content.footer.correctionsEmail}</a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <SiteLogo />
                <div>
                  <h3 className="text-lg font-bold">{SITE.name}</h3>
                  <p className="text-sm text-gray-400">{SITE.englishName}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{site.footerTagline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{site.footerAbout}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">{site.footerMission}</Link></li>
                <li><a href={`mailto:${SITE.contactEmail}`} className="text-gray-400 hover:text-white">{site.contact}</a></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">{site.footerPrivacy}</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">{site.footerTerms}</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>{site.footerRights}</p>
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
