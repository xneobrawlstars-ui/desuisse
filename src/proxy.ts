import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/')) {
    const origin = req.headers.get('origin');
    const host = req.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)',],
};