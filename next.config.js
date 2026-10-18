/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Short link for ads; query strings (utm_*) carry through the redirect.
  async redirects() {
    return [
      {
        source: '/texas/railroad-commission',
        destination: '/event/texas-railroad-commission-2026',
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'your-supabase-project.supabase.co',
      'via.placeholder.com'
    ]
  }
}

module.exports = nextConfig
