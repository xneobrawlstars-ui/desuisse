/**
 * Server-side admin login — fully secured.
 * - IP-based rate limiting (5 attempts / 15 min)
 * - Constant-time password comparison (no timing attacks)
 * - Cryptographically secure session token (randomBytes, not Math.random)
 * - httpOnly + Secure + SameSite=strict cookie
 * - Password never in NEXT_PUBLIC_ — stays server-only
 */
import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual, randomBytes } from 'crypto';

const attempts = new Map<string, { count: number; firstAt: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS    = 15 * 60 * 1000;
const LOCKOUT_MS   = 15 * 60 * 1000;
const SESSION_TTL  = 60 * 60 * 2; // 2 hours in seconds

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkLimit(ip: string): { allowed: boolean; remainingMs: number } {
  const now   = Date.now();
  const state = attempts.get(ip);
  if (!state) return { allowed: true, remainingMs: 0 };
  if (state.lockedUntil > now) return { allowed: false, remainingMs: state.lockedUntil - now };
  if (now - state.firstAt > WINDOW_MS) { attempts.delete(ip); return { allowed: true, remainingMs: 0 }; }
  return { allowed: state.count < MAX_ATTEMPTS, remainingMs: 0 };
}

function recordFail(ip: string): void {
  const now   = Date.now();
  const state = attempts.get(ip);
  if (!state || now - state.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now, lockedUntil: 0 });
    return;
  }
  const c = state.count + 1;
  attempts.set(ip, { count: c, firstAt: state.firstAt, lockedUntil: c >= MAX_ATTEMPTS ? now + LOCKOUT_MS : 0 });
}

function safeCompare(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export async function POST(req: NextRequest) {
  // Reject non-JSON content-type
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  const ip = getIp(req);
  const limit = checkLimit(ip);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts', remainingMs: limit.remainingMs },
      { status: 429, headers: { 'Retry-After': String(Math.ceil(limit.remainingMs / 1000)) } }
    );
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { password } = body as Record<string, unknown>;
  if (typeof password !== 'string' || password.length < 1 || password.length > 128) {
    recordFail(ip);
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const serverPwd = process.env.ADMIN_PASSWORD ?? '';
  if (!serverPwd) {
    console.error('[auth] ADMIN_PASSWORD not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (!safeCompare(password, serverPwd)) {
    recordFail(ip);
    const newState = attempts.get(ip);
    const attemptsLeft = newState ? Math.max(0, MAX_ATTEMPTS - newState.count) : MAX_ATTEMPTS;
    return NextResponse.json({ error: 'Invalid credentials', attemptsLeft }, { status: 401 });
  }

  // Success — clear rate limit
  attempts.delete(ip);

  // Cryptographically secure session token (not Math.random)
  const sessionToken = randomBytes(32).toString('hex');

  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.set('ds_admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TTL,
    path: '/',
  });
  return res;
}
