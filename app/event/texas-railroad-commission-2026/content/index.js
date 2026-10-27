// Edition loader (identical on every site). The site's own language edition is the
// default; ?lang=en shows the English master for content review. Each edition
// supplies its own copy; shared.js supplies the candidate roster (ballot order),
// photos, links and sources; site.js supplies the per-site settings.
import en from './en';
import * as shared from './shared';
import { SITE, SITE_EDITIONS } from './site';

export { SITE };
export const DEFAULT_EDITION = SITE.defaultEdition;
const EDITIONS = { en, ...SITE_EDITIONS };

// The shared English copy says "{outlet}" wherever the page names itself; readers
// know the outlet (e.g. "Chinese American Voices"), not "AAVM".
function fillOutlet(value, outlet) {
  if (typeof value === 'string') return value.split('{outlet}').join(outlet);
  if (Array.isArray(value)) return value.map((v) => fillOutlet(v, outlet));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fillOutlet(v, outlet)]));
  }
  return value; // functions (ui.slideOf etc.) pass through unchanged
}

export function getContent(lang) {
  const key = EDITIONS[lang] ? lang : DEFAULT_EDITION;
  const outlet = key === 'en' ? SITE.englishName : SITE.name;
  const edition = fillOutlet(EDITIONS[key], outlet);
  return {
    ...edition,
    candidates: shared.candidates.map((c) => ({ ...c, ...edition.candidateText[c.id] })),
    sources: shared.sources,
    links: shared.links,
    audioUrl: shared.audioUrl,
    ogImage: SITE.ogImage,
    lastUpdated: shared.lastUpdated,
  };
}
