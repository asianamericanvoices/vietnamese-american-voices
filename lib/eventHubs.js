// Event Hub Configuration for Vietnamese American Voices
// Toggle active: false to archive an event hub after the event is over.
//
// NOTE: This config is the source-of-truth "map" of event hubs. As of 2026-10-04
// it mirrors the 7 live homepage buttons (hardcoded hub bar in app/page.js) and the
// app/event/<slug>/page.js pages — keep all three in lockstep.

export const EVENT_HUBS = [
  {
    slug: 'alaska-elections-2026',
    active: true,
    color: 'purple', // Color coding for badges and UI elements
    displayName: {
      en: 'Alaska Elections 2026',
      vi: 'Bầu cử Alaska 2026',
    },
    shortName: {
      en: 'AK Elections 2026',
      vi: 'Bầu cử AK 2026'
    },
    targetedEvent: 'Alaska Elections 2026', // Must match database targeted_event field
    description: {
      en: 'Coverage of Alaska 2026 Senate and statewide races',
      vi: 'Đưa tin về bầu cử Thượng viện và toàn bang Alaska 2026'
    },
    showInNav: true,
    sortOrder: 1
  },
  {
    slug: 'georgia-elections-2026',
    active: true,
    color: 'green', // Color coding for badges and UI elements
    displayName: {
      en: 'Georgia Elections 2026',
      vi: 'Bầu cử Georgia 2026',
    },
    shortName: {
      en: 'GA Elections 2026',
      vi: 'Bầu cử GA 2026'
    },
    targetedEvent: 'Georgia Elections 2026', // Must match database targeted_event field
    description: {
      en: 'Coverage of Georgia 2026 Senate, Governor, PSC, and Congressional races',
      vi: 'Đưa tin về bầu cử Thượng viện, Thống đốc, Ủy ban Dịch vụ Công và Quốc hội Georgia 2026'
    },
    showInNav: true,
    sortOrder: 2
  },
  {
    slug: 'north-carolina-elections-2026',
    active: true,
    color: 'blue', // Color coding for badges and UI elements
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
    showInNav: true,
    sortOrder: 3
  },
  {
    slug: 'michigan-elections-2026',
    active: true,
    color: 'yellow',
    displayName: {
      en: 'Michigan Elections 2026',
      vi: 'Bầu cử Michigan 2026',
    },
    shortName: {
      en: 'MI Elections 2026',
      vi: 'Bầu cử MI 2026'
    },
    targetedEvent: 'Michigan Elections 2026',
    description: {
      en: 'Coverage of Michigan 2026 Governor, Senate, and Congressional races',
      vi: 'Đưa tin về bầu cử Thống đốc, Thượng viện và Quốc hội Michigan 2026'
    },
    showInNav: true,
    sortOrder: 4
  },
  {
    slug: 'nevada-elections-2026',
    active: true,
    color: 'pink',
    displayName: {
      en: 'Nevada Elections 2026',
      vi: 'Bầu cử Nevada 2026',
    },
    shortName: {
      en: 'NV Elections 2026',
      vi: 'Bầu cử NV 2026'
    },
    targetedEvent: 'Nevada Elections 2026',
    description: {
      en: 'Coverage of Nevada 2026 Governor and Congressional races',
      vi: 'Đưa tin về bầu cử Thống đốc và Quốc hội Nevada 2026'
    },
    showInNav: true,
    sortOrder: 5
  },
  {
    slug: 'iowa-senate-2026',
    active: true,
    color: 'amber',
    displayName: {
      en: 'Iowa Senate 2026',
      vi: 'Bầu cử Thượng viện Iowa 2026',
    },
    shortName: {
      en: 'IA Senate 2026',
      vi: 'Iowa 2026'
    },
    targetedEvent: 'Iowa Senate 2026',
    description: {
      en: 'Coverage of the Iowa 2026 U.S. Senate race',
      vi: 'Đưa tin về cuộc bầu cử Thượng viện Hoa Kỳ tại Iowa 2026'
    },
    showInNav: true,
    sortOrder: 6
  },
  {
    slug: 'texas-elections-2026',
    active: true,
    color: 'orange',
    displayName: {
      en: 'Texas Elections 2026',
      vi: 'Bầu cử Texas 2026',
    },
    shortName: {
      en: 'TX Elections 2026',
      vi: 'Bầu cử TX 2026'
    },
    targetedEvent: 'Texas Elections 2026',
    description: {
      en: 'Coverage of Texas 2026 Senate, Governor, and Congressional races (DFW, Houston, Austin, San Antonio)',
      vi: 'Đưa tin về bầu cử Thượng viện, Thống đốc và Quốc hội Texas 2026 (DFW, Houston, Austin, San Antonio)'
    },
    showInNav: true,
    sortOrder: 7
  },
  // ───────────── Archived (event over) ─────────────
  {
    slug: 'georgia-psc-2025',
    active: false, // Archived — 2025 event over
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
    showInNav: false,
    sortOrder: 90
  },
  {
    slug: 'pennsylvania-supreme-court-2025',
    active: false, // Archived — 2025 event over
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
    showInNav: false,
    sortOrder: 91
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
    },
    yellow: {
      badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      button: 'bg-yellow-600 hover:bg-yellow-700',
      accent: 'border-yellow-500'
    },
    amber: {
      badge: 'bg-amber-100 text-amber-800 border-amber-300',
      button: 'bg-amber-600 hover:bg-amber-700',
      accent: 'border-amber-500'
    },
    pink: {
      badge: 'bg-pink-100 text-pink-800 border-pink-300',
      button: 'bg-pink-600 hover:bg-pink-700',
      accent: 'border-pink-500'
    },
    orange: {
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      button: 'bg-orange-600 hover:bg-orange-700',
      accent: 'border-orange-500'
    }
  };
  return colorMap[color] || colorMap.green;
}
