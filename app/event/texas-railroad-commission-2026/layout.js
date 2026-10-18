import { getContent, DEFAULT_EDITION, SITE } from './content';
import { RRC_PAGE_PUBLIC, RRC_PAGE_PATH } from '../../../lib/rrcPage';

const content = getContent(DEFAULT_EDITION);
const pageUrl = `${SITE.url}${RRC_PAGE_PATH}`;
const ogImage = `${SITE.url}${content.ogImage}`;

export const metadata = {
  title: `${content.meta.title} | ${SITE.name}`,
  description: content.meta.description,
  alternates: { canonical: pageUrl },
  // Unlisted until launch: reachable by direct link, kept out of search results.
  robots: RRC_PAGE_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: pageUrl,
    siteName: SITE.name,
    images: [{ url: ogImage, alt: content.meta.title }],
    locale: content.edition.ogLocale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
    images: [ogImage],
  },
}

export default function Layout({ children }) {
  return children;
}
