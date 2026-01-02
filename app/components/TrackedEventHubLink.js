'use client';

import Link from 'next/link';
import { useEffect } from 'react';

// Component that tracks clicks on event hub buttons
export default function TrackedEventHubLink({ href, children, className, eventName }) {

  // Initialize GA4 tracking
  useEffect(() => {
    // Check if gtag is available
    if (typeof window !== 'undefined' && !window.gtag) {
      // Load Google Analytics if not already loaded
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR-GA4-ID'; // Replace with actual GA4 ID
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-YOUR-GA4-ID'); // Replace with actual GA4 ID
    }
  }, []);

  const handleClick = async () => {
    const clickData = {
      event_name: eventName,
      destination_url: href,
      click_location: 'event_hub_header',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0] // For daily aggregation
    };

    // Send to GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'event_hub_click', {
        event_category: 'Navigation',
        event_label: eventName,
        destination_url: href,
        click_date: clickData.date,
        value: 1
      });
    }

    // Also send to internal analytics API for dashboard
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event_type: 'event_hub_click',
          metadata: clickData
        })
      });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}