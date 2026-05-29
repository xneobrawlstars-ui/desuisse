/**
 * Edge middleware — security headers, CSRF basic check, and gating of
 * non-GET admin API calls from cross-origin requests.
 *
 * Note: we don't perform full session validation here because @upstash/redis
 * isn't reliably available in the edge runtime. Full validation happens
 * inside each protected API route via authenticateRequest().
 *
 * Note: the /admin PAGE itself renders the login form when no valid session
 * exists; gating that page would be redundant.
 */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Cross-origin protection for state-changing API requests.
  // GETs are read-only; only POSTs need the check.
  if (pathname.startsWith('/api/') && req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    // Require origin to match host. Server-to-server (no origin) is allowed
    // since the actual auth check happens in the route handler.
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