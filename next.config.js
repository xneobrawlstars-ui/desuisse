/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image config — preserved from existing config
  images: {
    // Admin pastes arbitrary https image URLs, so we allow any https hostname.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    // Disable Next.js image optimization for external URLs so they load
    // directly without going through the optimization proxy (which would
    // count as Function Invocations).
    unoptimized: true,
  },

  // Turbopack root — preserved from existing config (build tooling)
  turbopack: {
    root: __dirname,
  },

  // Custom HTTP headers — applied per route by Vercel's CDN.
  // Aggressive caching of static assets is a free optimization: cached
  // hits are served from the CDN edge, costing Edge Requests but NOT
  // Function Invocations.
  async headers() {
    return [
      // Static images — cache for 1 year. Filenames are content-stable.
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // API routes — never cache. Customer-specific data, sessions, etc.
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, max-age=0' },
        ],
      },
      // Sitemap and robots — lightly cache (rare changes, often crawled)
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ],
      },
      // Standard security headers on all responses — preserved from existing config
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          // HSTS — added by this update. Forces HTTPS for 1 year.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },

  // Don't broadcast that we're running Next.js — tiny security win
  poweredByHeader: false,
};

module.exports = nextConfig;
