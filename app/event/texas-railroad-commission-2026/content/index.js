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

export function getContent(lang) {
  const edition = EDITIONS[lang] || EDITIONS[DEFAULT_EDITION];
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
