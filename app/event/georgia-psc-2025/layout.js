export const metadata = {
  title: '2025 조지아 공공서비스 위원회 선거 | 한미목소리',
  description: '2025년 조지아 주 공공서비스 위원회 선거 최신 뉴스. 한인 유권자를 위한 에너지 정책 선거 가이드.',
  openGraph: {
    title: '2025 조지아 PSC 선거 특별 보도',
    description: '한미목소리가 전하는 조지아 공공서비스 위원회 선거 종합 보도. 에너지 요금과 정책에 영향을 미치는 중요 선거.',
    url: 'https://koreanamericanvoices.us/event/georgia-psc-2025',
    siteName: '한미목소리',
    images: [
      {
        url: 'https://koreanamericanvoices.us/ga-psc-2025-preview.png',
        width: 1200,
        height: 630,
        alt: '2025 조지아 PSC 선거 - 한미목소리'
      }
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2025 조지아 PSC 선거 | 한미목소리',
    description: '조지아 공공서비스 위원회 선거 - 에너지 정책의 미래',
    images: ['https://koreanamericanvoices.us/ga-psc-2025-preview.png'],
  },
  keywords: ['조지아 PSC', 'Georgia PSC', '공공서비스 위원회', 'Public Service Commission', '에너지 정책', '한인 유권자'],
}

export default function Layout({ children }) {
  return children;
}