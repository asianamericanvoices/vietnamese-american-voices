export const metadata = {
  title: '2025 뉴저지 주지사 선거 | 한미목소리',
  description: '2025년 11월 뉴저지 주지사 선거 관련 최신 뉴스와 정보. 한인 유권자를 위한 선거 가이드와 후보자 정보.',
  openGraph: {
    title: '2025 뉴저지 주지사 선거 특별 보도',
    description: '한미목소리가 전하는 2025년 뉴저지 주지사 선거 종합 보도. 한인 커뮤니티를 위한 심층 분석과 투표 정보.',
    url: 'https://koreanamericanvoices.us/event/new-jersey-governor-2025',
    siteName: '한미목소리',
    images: [
      {
        url: 'https://koreanamericanvoices.us/nj-governor-2025-preview.png',
        width: 1200,
        height: 630,
        alt: '2025 뉴저지 주지사 선거 - 한미목소리'
      }
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 뉴저지 주지사 선거 | 한미목소리',
    description: '한인 유권자를 위한 2025년 뉴저지 주지사 선거 종합 가이드',
    images: ['https://koreanamericanvoices.us/nj-governor-2025-preview.png'],
  },
  keywords: ['뉴저지 주지사 선거', 'New Jersey Governor', '2025 선거', '한인 유권자', '한미목소리', 'NJ election'],
}

export default function Layout({ children }) {
  return children;
}