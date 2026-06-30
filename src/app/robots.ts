import type { MetadataRoute } from 'next';

/**
 * robots.txt configuration.
 *
 * Strategy: explicitly allow the good crawlers (Google, Bing, social
 * media link-preview bots), explicitly DENY the known bad/expensive
 * ones (AI scrapers that eat bandwidth without sending traffic), and
 * default-deny everything else.
 *
 * Bots can ignore robots.txt — this is the polite-first layer. The
 * middleware also blocks by user-agent for the dishonest ones.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Good bots — explicitly allowed
      { userAgent: 'Googlebot',       allow: '/', disallow: ['/admin', '/api/', '/checkout', '/account/'] },
      { userAgent: 'Bingbot',         allow: '/', disallow: ['/admin', '/api/', '/checkout', '/account/'] },
      { userAgent: 'DuckDuckBot',     allow: '/', disallow: ['/admin', '/api/', '/checkout', '/account/'] },
      // Social media link previews
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot',          allow: '/' },
      { userAgent: 'LinkedInBot',         allow: '/' },
      { userAgent: 'WhatsApp',            allow: '/' },
      { userAgent: 'Slackbot',            allow: '/' },
      { userAgent: 'TelegramBot',         allow: '/' },

      // AI scrapers — explicitly disallowed (they eat huge bandwidth, send zero traffic)
      { userAgent: 'GPTBot',          disallow: '/' }, // OpenAI
      { userAgent: 'ChatGPT-User',    disallow: '/' },
      { userAgent: 'CCBot',           disallow: '/' }, // Common Crawl (feeds AI training)
      { userAgent: 'anthropic-ai',    disallow: '/' },
      { userAgent: 'ClaudeBot',       disallow: '/' },
      { userAgent: 'Claude-Web',      disallow: '/' },
      { userAgent: 'PerplexityBot',   disallow: '/' },
      { userAgent: 'Perplexity-User', disallow: '/' },
      { userAgent: 'cohere-ai',       disallow: '/' },
      { userAgent: 'Diffbot',         disallow: '/' },
      { userAgent: 'FacebookBot',     disallow: '/' }, // separate from facebookexternalhit; this is Meta AI training
      { userAgent: 'Meta-ExternalAgent', disallow: '/' },
      { userAgent: 'Bytespider',      disallow: '/' }, // ByteDance/TikTok crawler
      { userAgent: 'Amazonbot',       disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' }, // Apple AI scraper (regular Applebot is allowed)
      { userAgent: 'Google-Extended', disallow: '/' }, // Bard/Gemini training (regular Googlebot is allowed)
      { userAgent: 'YouBot',          disallow: '/' },
      { userAgent: 'OAI-SearchBot',   disallow: '/' },

      // SEO snoopers — disallowed (huge crawlers that mine competitive intel)
      { userAgent: 'AhrefsBot',       disallow: '/' },
      { userAgent: 'SemrushBot',      disallow: '/' },
      { userAgent: 'DotBot',          disallow: '/' },
      { userAgent: 'MJ12bot',         disallow: '/' },
      { userAgent: 'BLEXBot',         disallow: '/' },
      { userAgent: 'PetalBot',        disallow: '/' },
      { userAgent: 'DataForSeoBot',   disallow: '/' },
      { userAgent: 'serpstatbot',     disallow: '/' },
      { userAgent: 'megaindex',       disallow: '/' },

      // Default — for any user-agent not listed above, allow basic browsing
      // but block sensitive paths. The middleware handles dishonest UAs.
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/checkout', '/account/'] },
    ],
    sitemap: 'https://desuisse.com/sitemap.xml',
    host: 'https://desuisse.com',
  };
}
