/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Using remotePatterns only — domains is deprecated
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'desuisse.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  // Fix Turbopack workspace root warning
  turbopack: {
    root: __dirname,
  },

  // Security headers on every page
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',           value: 'DENY' },
          { key: 'X-Content-Type-Options',     value: 'nosniff' },
          { key: 'Referrer-Policy',            value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',         value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-XSS-Protection',           value: '1; mode=block' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
