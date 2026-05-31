/**
 * POST /api/auth/logout
 * Destroys the current session server-side and clears the session cookie.
 */
import { NextRequest, NextResponse } from 'next/server';
import { destroyUserSession, clearSessionCookie, USER_SESSION_COOKIE } from '@/lib/userSession';

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get(USER_SESSION_COOKIE)?.value;
  if (sessionId) await destroyUserSession(sessionId);

  const res = NextResponse.json({ success: true });
  clearSessionCookie(res);
  return res;
}
