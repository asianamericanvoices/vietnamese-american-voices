// Event Hub Configuration for Vietnamese American Voices
// Toggle active: false to archive an event hub after the event is over

export const EVENT_HUBS = [
  {
    slug: 'georgia-psc-2025',
    active: true,
    color: 'green', // Color coding for badges and UI elements
    displayName: {
      en: 'Georgia PSC Election 2025',
      vi: 'Bầu cử Ủy ban Dịch vụ Công Georgia 2025',
    },
    shortName: {
      en: 'GA PSC 2025',
      vi: 'GA PSC 2025'
    },
    targetedEvent: 'Georgia PSC Election', // Must match database targeted_event field
    description: {
      en: 'Coverage of the Georgia Public Service Commission election',
      vi: 'Đưa tin về cuộc bầu cử Ủy ban Dịch vụ Công Georgia'
    },
    showInNav: true, // Show in category ticker navigation
    sortOrder: 1
  },
  {
    slug: 'pennsylvania-supreme-court-2025',
    active: true,
    color: 'green', // Color coding for badges and UI elements
    displayName: {
      en: 'Pennsylvania Supreme Court 2025',
      vi: 'Bầu cử Tòa án Tối cao Pennsylvania 2025',
    },
    shortName: {
      en: 'PA Supreme Court',
      vi: 'Tòa Tối cao PA'
    },
    targetedEvent: 'Pennsylvania Supreme Court 2025', // Must match database targeted_event field
    description: {
      en: 'Coverage of the Pennsylvania Supreme Court election',
      vi: 'Đưa tin về cuộc bầu cử Tòa án Tối cao Pennsylvania'
    },
    showInNav: true, // Show in category ticker navigation
    sortOrder: 2
  },
  {
    slug: 'north-carolina-elections-2026',
    active: true,
    color: 'green', // Color coding for badges and UI elements
    displayName: {
      en: 'North Carolina Elections 2026',
      vi: 'Bầu cử North Carolina 2026',
    },
    shortName: {
      en: 'NC Elections 2026',
      vi: 'NC 2026'
    },
    targetedEvent: 'North Carolina Elections 2026', // Must match database targeted_event field
    description: {
      en: 'Coverage of North Carolina Senate, Supreme Court, and Election Board races',
      vi: 'Đưa tin về cuộc bầu cử Thượng viện, Tòa án Tối cao và Ủy ban Bầu cử North Carolina'
    },
    showInNav: false, // Hidden until ready for public visibility
    sortOrder: 3
  }
];

// Helper function to get active event hubs
export function getActiveEventHubs() {
  return EVENT_HUBS.filter(hub => hub.active);
}

// Helper function to get event hub by slug
export function getEventHubBySlug(slug) {
  return EVENT_HUBS.find(hub => hub.slug === slug);
}

// Helper function to get event hubs for navigation
export function getNavEventHubs() {
  return EVENT_HUBS.filter(hub => hub.active && hub.showInNav)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Helper function to get color classes for badges
export function getEventColorClasses(color) {
  const colorMap = {
    green: {
      badge: 'bg-green-100 text-green-800 border-green-300',
      button: 'bg-green-600 hover:bg-green-700',
      accent: 'border-green-500'
    },
    blue: {
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700',
      accent: 'border-blue-500'
    },
    purple: {
      badge: 'bg-purple-100 text-purple-800 border-purple-300',
      button: 'bg-purple-600 hover:bg-purple-700',
      accent: 'border-purple-500'
    }
  };
  return colorMap[color] || colorMap.green;
}
