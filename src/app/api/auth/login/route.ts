/**
 * POST /api/auth/login
 * Body: { email, password }
 *
 * Security:
 *   - Rate-limited per IP (10/hour) AND per email (5/hour) to prevent
 *     credential-stuffing AND targeted brute force.
 *   - Returns the same error message for "user not found" vs "wrong
 *     password" to prevent enumeration.
 *   - Requires emailVerified before login succeeds.
 *   - Sets HttpOnly session cookie via setSessionCookie.
 */
import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, normalizeEmail, isValidEmail } from '@/lib/auth';
import { getUserByEmail } from '@/lib/userStore';
import { createUserSession, setSessionCookie } from '@/lib/userSession';
import { checkAndRecord, getClientIp } from '@/lib/rateLimit';

const GENERIC_ERROR = 'Email or password is incorrect.';
const NOT_VERIFIED_ERROR = 'Please verify your email address before signing in. Check your inbox for the verification link.';

export async function POST(req: NextRequest) {
  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  // Two rate-limit dimensions:
  //   - by IP (10/hour): stops a single attacker from rotating emails
  //   - by email (5/hour): stops slow-and-low attacks on a specific account
  const ip = getClientIp(req);

  const ipRl = await checkAndRecord({
    key: `login-ip:${ip}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (!ipRl.allowed) {
    return NextResponse.json({ error: 'Too many login attempts. Try again later.' }, { status: 429 });
  }

  let body: { email?: string; password?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { email, password } = body;
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }
  if (typeof password !== 'string' || password.length === 0) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  const normalized = normalizeEmail(email);

  // Per-email rate limit
  const emailRl = await checkAndRecord({
    key: `login-email:${normalized}`,
    max: 5,
    windowSeconds: 60 * 60,
  });
  if (!emailRl.allowed) {
    return NextResponse.json({ error: 'Too many login attempts for this account. Try again later.' }, { status: 429 });
  }

  // Look up + verify. Always do password verification, even when user
  // doesn't exist, so timing doesn't leak user existence.
  const user = await getUserByEmail(normalized);
  const dummyHash = '$2a$12$abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQR';
  const validHash = user?.passwordHash ?? dummyHash;
  const passwordOK = await verifyPassword(password, validHash);

  if (!user || !passwordOK) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 401 });
  }

  if (!user.emailVerified) {
    return NextResponse.json({ error: NOT_VERIFIED_ERROR, needsVerification: true }, { status: 403 });
  }

  // Create session + set cookie
  const sessionId = await createUserSession(user.id);
  if (!sessionId) {
    return NextResponse.json({ error: 'Could not create session' }, { status: 503 });
  }

  const res = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
  setSessionCookie(res, sessionId);
  return res;
}
