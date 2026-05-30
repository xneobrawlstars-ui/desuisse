import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't let crawlers index admin or API
        disallow: ['/admin', '/api/', '/checkout'],
      },
    ],
    sitemap: 'https://desuisse.com/sitemap.xml',
    host: 'https://desuisse.com',
  };
}
