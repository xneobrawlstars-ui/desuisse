/**
 * Auto-generated sitemap, served at /sitemap.xml.
 * Submit this URL to Google Search Console after deploy.
 */
import type { MetadataRoute } from 'next';

const BASE = 'https://desuisse.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/boutiques',
    '/contact',
    '/reviews',
    '/custom-design',
    '/diamond-guide',
    '/jewelry-care',
    '/ring-sizer',
    '/sizing-service',
    '/ring-story',
    '/gift-vouchers',
    '/free-engraving',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ];

  return staticRoutes.map(path => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/shop' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path === '/shop' ? 0.9 : 0.7,
  }));
}
