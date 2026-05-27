/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow any https hostname so admin-entered image URLs work on all devices
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    // Disable Next.js image optimization for external URLs
    // so images load directly without going through the proxy
    unoptimized: true,
  },

  turbopack: {
    root: __dirname,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
