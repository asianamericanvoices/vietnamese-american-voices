// Click tracking utility for event hub and popup links
export async function trackClick(eventType, metadata) {
  try {
    // Get session ID from localStorage or generate new one
    let sessionId = null;
    if (typeof window !== 'undefined') {
      sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('session_id', sessionId);
      }
    }

    const payload = {
      event_type: eventType,
      metadata: {
        ...metadata,
        session_id: sessionId,
        page_url: window.location.href,
        page_title: document.title,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        platform: navigator.platform,
        timestamp: new Date().toISOString(),
        language: 'korean' // or detect from page
      }
    };

    // Send to analytics API
    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('Failed to track click:', response.status);
    }

    return response;
  } catch (error) {
    console.error('Error tracking click:', error);
    // Don't let tracking errors break the user experience
    return null;
  }
}

// Specific tracking functions for different click types
export function trackEventHubClick(eventName, destination) {
  return trackClick('event_hub_click', {
    event_name: eventName,
    destination_url: destination,
    button_location: 'header',
    interaction_type: 'navigation'
  });
}

export function trackPopupLinkClick(linkType, linkUrl, linkText, state) {
  return trackClick('popup_link_click', {
    link_type: linkType,
    link_url: linkUrl,
    link_text: linkText,
    user_state: state,
    popup_type: 'location_based',
    interaction_type: 'external_resource'
  });
}

export function trackPopupDismiss(dismissType, state) {
  return trackClick('popup_dismiss', {
    dismiss_type: dismissType, // 'x_button', 'later_button', 'confirm_button', 'backdrop'
    user_state: state,
    popup_type: 'location_based'
  });
}

export function trackPopupShow(state, wasAutoShown) {
  return trackClick('popup_shown', {
    user_state: state,
    auto_shown: wasAutoShown,
    popup_type: 'location_based'
  });
}