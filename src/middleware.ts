/**
 * Edge middleware — bot blocking, security headers, CSRF check.
 *
 * Layers, in order of execution:
 *   1. Block abuse paths (WordPress probes, /.env, /wp-admin, etc.)
 *   2. Block known-bad user-agents (AI scrapers, SEO snoopers, vuln scanners)
 *   3. Cross-origin CSRF check for state-changing API calls
 *   4. Append standard security headers to all responses
 *
 * IMPORTANT: full admin session validation happens inside each protected
 * API route via authenticateRequest(), because @upstash/redis isn't
 * reliably available in the edge runtime. We don't try to validate
 * sessions here.
 *
 * Bots and abuse paths return at the Edge (cheap), before any Server
 * Function is invoked — this is the biggest cost saving.
 */
import { NextRequest, NextResponse } from 'next/server';

// ─── BLOCKED USER-AGENTS ────────────────────────────────────────────────
// Substring match against the User-Agent header (lowercased).
// Listed bots are aggressive, ignore robots.txt, and provide zero traffic.
const BLOCKED_UA_SUBSTRINGS = [
  // AI scrapers — large bandwidth, no traffic in return
  'gptbot', 'chatgpt-user', 'ccbot', 'anthropic-ai', 'claudebot', 'claude-web',
  'perplexitybot', 'perplexity-user', 'cohere-ai', 'diffbot',
  'facebookbot', 'meta-externalagent', 'bytespider', 'amazonbot',
  'applebot-extended', 'google-extended', 'youbot', 'oai-searchbot',
  // SEO/competitive scrapers
  'ahrefsbot', 'semrushbot', 'dotbot', 'mj12bot', 'blexbot', 'petalbot',
  'dataforseobot', 'serpstatbot', 'megaindex', 'rogerbot',
  // Vulnerability scanners and known abuse tools
  'nikto', 'sqlmap', 'masscan', 'nmap', 'fuzz', 'wpscan', 'acunetix',
  'netsparker', 'burpcollaborator',
  // Generic scrapers / command-line downloaders
  'httrack', 'wget/', 'curl/', 'python-requests', 'python-urllib',
  'go-http-client', 'java/', 'ruby/', 'libwww-perl',
  'scrapy', 'apache-httpclient', 'okhttp',
  // Headless browsers used by spam/scraping
  'phantomjs', 'headlesschrome', 'puppeteer',
  // Misc
  'spbot', 'screaming frog', 'sistrix',
];

// ─── ALLOWED CRAWLERS ───────────────────────────────────────────────────
// Checked BEFORE the blocklist. Some allowed bots have substrings that
// match blocked entries (e.g. FacebookBot vs facebookexternalhit).
const ALLOWED_UA_SUBSTRINGS = [
  'googlebot',
  'bingbot',
  'duckduckbot',
  'applebot/',          // slash distinguishes from Applebot-Extended (AI training)
  'facebookexternalhit', // link previews — NOT FacebookBot
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'slackbot',
  'telegrambot',
  'discordbot',
];

// ─── ABUSE PATHS ───────────────────────────────────────────────────────
// Path prefixes attackers probe on every site. We return early with no
// body to save bandwidth. Each block here = ~1 Edge Request, 0 Functions.
const BLOCKED_PATH_PREFIXES = [
  '/wp-admin', '/wp-login', '/wp-content', '/wp-includes',
  '/xmlrpc.php', '/wp-config', '/wp-json',
  '/.env', '/.git', '/.aws', '/.ssh',
  '/phpmyadmin', '/phpunit', '/admin.php', '/eval-stdin.php',
  '/cgi-bin', '/owa/', '/Autodiscover.xml',
];

function isBotByUserAgent(ua: string): 'blocked' | 'allowed' | 'unknown' {
  const lower = ua.toLowerCase();
  for (const allowed of ALLOWED_UA_SUBSTRINGS) {
    if (lower.includes(allowed)) return 'allowed';
  }
  for (const blocked of BLOCKED_UA_SUBSTRINGS) {
    if (lower.includes(blocked)) return 'blocked';
  }
  return 'unknown';
}

function isAbusePath(pathname: string): boolean {
  const lower = pathname.toLowerCase();
  for (const prefix of BLOCKED_PATH_PREFIXES) {
    if (lower.startsWith(prefix)) return true;
  }
  // PHP/ASP file extensions on a Next.js site = probe
  if (/\.(php|aspx?|jsp|cgi)$/i.test(pathname)) return true;
  return false;
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const ua = req.headers.get('user-agent') || '';

  // ─── 1. Block abuse paths ─────────────────────────────────────────────
  // Status 444 (nginx convention) — close the connection without a body.
  // Browsers don't reach these URLs through normal use, so blocking is safe.
  if (isAbusePath(pathname)) {
    return new NextResponse(null, { status: 444 });
  }

  // ─── 2. Block bots by user-agent ──────────────────────────────────────
  // Empty or extremely short UA = also a bot (real browsers send long UAs).
  if (!ua || ua.length < 10) {
    return new NextResponse(null, { status: 403 });
  }
  if (isBotByUserAgent(ua) === 'blocked') {
    return new NextResponse(null, { status: 403 });
  }

  // ─── 3. Cross-origin CSRF check (PRESERVED from existing middleware) ──
  // State-changing API calls (POST/PUT/DELETE/PATCH) must originate from
  // the same host. GETs are read-only and don't need the check.
  if (pathname.startsWith('/api/') && req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    // Server-to-server requests don't send Origin; auth happens in the route handler.
    if (origin) {
      try {
        const o = new URL(origin);
        if (o.host !== host) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
  }

  // ─── 4. Standard response with security headers ───────────────────────
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
