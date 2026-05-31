/**
 * GET /api/auth/verify?token=...
 *
 * Flow:
 *   1. Consume the verification token (single-use, deletes on success)
 *   2. Mark the user's emailVerified flag = true
 *   3. Create a new user session (logs them in automatically)
 *   4. Redirect to /account/verify with status indicator
 */
import { NextRequest, NextResponse } from 'next/server';
import { consumeVerificationToken, getUserById, saveUser } from '@/lib/userStore';
import { createUserSession, setSessionCookie } from '@/lib/userSession';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) {
    return redirectWithStatus(req, 'missing');
  }

  const userId = await consumeVerificationToken(token);
  if (!userId) {
    return redirectWithStatus(req, 'invalid');
  }

  const user = await getUserById(userId);
  if (!user) {
    return redirectWithStatus(req, 'invalid');
  }

  // Mark verified (idempotent — no harm if already verified)
  if (!user.emailVerified) {
    user.emailVerified = true;
    await saveUser(user);
  }

  // Auto-login by creating a session
  const sessionId = await createUserSession(user.id);
  const res = redirectWithStatus(req, 'success');
  if (sessionId) setSessionCookie(res, sessionId);
  return res;
}

function redirectWithStatus(req: NextRequest, status: 'success' | 'invalid' | 'missing'): NextResponse {
  const url = new URL('/account/verify', req.url);
  url.searchParams.set('status', status);
  return NextResponse.redirect(url);
}
