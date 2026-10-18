// Per-site settings for the Texas Railroad Commission voter guide.
// This file and the site's language edition are the ONLY files in this folder that
// differ between the four sites; page.js, layout.js, index.js, shared.js and en.js
// are identical everywhere.
import vi from './vi';

export const SITE = {
  url: "https://www.tiengnoinguoimygocviet.us",
  name: "Tiếng Nói Người Mỹ Gốc Việt",
  englishName: "Vietnamese American Voices",
  logoLines: [
    "Tiếng Nói",
    "Người Mỹ",
    "Gốc Việt"
  ],
  logoBg: "bg-orange-500",
  logoTextClass: "text-[7px] leading-none",
  contactEmail: "contact@tiengnoinguoimygocviet.us",
  language: "vietnamese",
  fontClass: "font-vietnamese",
  defaultEdition: "vi",
  ogImage: "/og-logo-vietnamese-3.png",
  theme: {
    contactHover: "hover:text-orange-600",
    hubBarGradient: "from-orange-50 via-orange-50 to-red-50",
    newsletterBox: "bg-orange-50",
    newsletterRing: "focus:ring-green-500",
    newsletterButton: "bg-orange-600 hover:bg-orange-700"
  }
};

export const SITE_EDITIONS = { vi };
