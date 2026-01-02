// app/layout.js - Vietnamese American Voices with GA4 and multi-language analytics
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Tiếng Nói Người Mỹ Gốc Việt | Vietnamese American Voices',
  description: 'Tin tức độc lập cho cộng đồng người Mỹ gốc Việt. Cập nhật về chính trị, y tế, giáo dục, di trú và đời sống cộng đồng.',
  keywords: 'Vietnamese American, Asian American, news, politics, healthcare, education, immigration, community, Việt kiều, người Mỹ gốc Việt, tin tức',
  authors: [{ name: 'Vietnamese American Voices', url: 'https://vietnamese-american-voices.vercel.app' }],
  metadataBase: new URL('https://vietnamese-american-voices.vercel.app'),
  openGraph: {
    title: 'Tiếng Nói Người Mỹ Gốc Việt | Vietnamese American Voices',
    description: 'Tin tức độc lập cho cộng đồng người Mỹ gốc Việt | Independent news for Vietnamese American communities',
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    siteName: 'Vietnamese American Voices',
    url: 'https://vietnamese-american-voices.vercel.app',
    images: [
      {
        url: '/og-logo-vietnamese.png',
        width: 1200,
        height: 630,
        alt: 'Tiếng Nói Người Mỹ Gốc Việt - Vietnamese American Voices News',
        type: 'image/jpeg',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VietAmVoices',
    title: 'Tiếng Nói Người Mỹ Gốc Việt | Vietnamese American Voices',
    description: 'Tin tức độc lập cho cộng đồng người Mỹ gốc Việt',
    images: ['/og-logo-vietnamese.png']
  },
  alternates: {
    languages: {
      'en': '/en',
      'vi': '/vi'
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Google Tag Manager - TBD for Vietnamese */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PLACEHOLDER');
          `}
        </Script>

        {/* Google Analytics 4 - Add your GA_MEASUREMENT_ID to Vercel env vars */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'Vietnamese American News',
              send_page_view: true,
              // Enhanced measurement for better insights
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });

            // Custom dimension for article language tracking
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              'custom_map': {
                'custom_parameter_1': 'article_id',
                'custom_parameter_2': 'article_language',
                'custom_parameter_3': 'social_platform'
              }
            });
          `}
        </Script>

        {/* Analytics Helper Functions - Global */}
        <Script id="analytics-helpers" strategy="afterInteractive">
          {`
            // Generate or get session ID
            window.getSessionId = function() {
              let sessionId = sessionStorage.getItem('vav_session_id');
              if (!sessionId) {
                sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('vav_session_id', sessionId);
              }
              return sessionId;
            };

            // Detect platform (WeChat, WhatsApp, etc.)
            window.detectPlatform = function() {
              const userAgent = navigator.userAgent;
              const referrer = document.referrer;
              const urlParams = new URLSearchParams(window.location.search);

              if (/MicroMessenger/i.test(userAgent) && !/wxwork/i.test(userAgent)) return 'wechat';
              if (/wxwork/i.test(userAgent)) return 'wechat_work';
              if (referrer.includes('whatsapp') || urlParams.get('utm_source') === 'whatsapp') return 'whatsapp';
              if (referrer.includes('facebook') || referrer.includes('fb.com')) return 'facebook';
              if (referrer.includes('twitter') || referrer.includes('t.co') || referrer.includes('x.com')) return 'twitter';
              if (referrer.includes('linkedin')) return 'linkedin';
              if (urlParams.get('utm_source')) return urlParams.get('utm_source');
              if (referrer) return 'referral';

              return 'direct';
            };

            // Track custom events to both GA4 and our database
            window.trackEvent = async function(eventType, data = {}) {
              const sessionId = window.getSessionId();
              const platform = window.detectPlatform();

              // Enhanced data object
              const eventData = {
                ...data,
                session_id: sessionId,
                platform: platform,
                timestamp: new Date().toISOString(),
                page_url: window.location.href,
                page_title: document.title,
                user_agent: navigator.userAgent,
                referrer: document.referrer
              };

              // Send to GA4
              if (typeof gtag !== 'undefined') {
                gtag('event', eventType, eventData);
              }

              // Send to our Supabase analytics (non-blocking)
              try {
                fetch('/api/analytics/track', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    event_type: eventType,
                    metadata: eventData
                  })
                }).catch(err => console.log('Analytics track failed:', err));
              } catch (error) {
                console.log('Analytics track error:', error);
              }
            };

            // Track page views automatically
            window.trackPageView = function(additionalData = {}) {
              window.trackEvent('page_view', additionalData);
            };
          `}
        </Script>

        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" sizes="32x32" href="/Vietnamese-Icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Vietnamese-Icon.png" />
        <link rel="apple-touch-icon" href="/Vietnamese-Icon.png" />
        <link rel="shortcut icon" href="/Vietnamese-Icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#EAB308" />
      </head>
      <body className="bg-white font-inter antialiased">
        {/* Google Tag Manager (noscript) - TBD for Vietnamese */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLACEHOLDER"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
