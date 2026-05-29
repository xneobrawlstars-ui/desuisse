/**
 * Rate limiter backed by Upstash.
 *
 * Why not the in-memory Map approach we had before? Vercel serverless
 * functions are stateless — every cold start resets the Map, so an
 * attacker who paces requests past the cold-start interval gets unlimited
 * tries. Upstash persists state across invocations.
 */
import { kvIncrWithTtl, kvTtl, getRedis } from './upstash';

export interface RateLimitResult {
  allowed: boolean;
  remainingMs: number;
  attemptsLeft: number;
}

interface RateLimitOptions {
  /** Unique key (e.g. "login:1.2.3.4"). */
  key: string;
  /** Max attempts allowed within the window. */
  max: number;
  /** Window length in seconds. */
  windowSeconds: number;
}

/**
 * Records an attempt and returns whether it's allowed.
 * Returns { allowed: false, ... } once max is exceeded for the remainder
 * of the current window.
 */
export async function checkAndRecord(opts: RateLimitOptions): Promise<RateLimitResult> {
  const fullKey = `ds:rl:${opts.key}`;
  const count = await kvIncrWithTtl(fullKey, opts.windowSeconds);

  // If Upstash unavailable, fail OPEN (allow) — we don't want to lock out
  // every user when the rate-limit backend is down. A second layer should
  // exist in front (e.g. Vercel's built-in DDoS protection).
  if (count === null) {
    return { allowed: true, remainingMs: 0, attemptsLeft: opts.max };
  }

  if (count > opts.max) {
    const ttl = await kvTtl(fullKey);
    const remainingMs = ttl > 0 ? ttl * 1000 : opts.windowSeconds * 1000;
    return { allowed: false, remainingMs, attemptsLeft: 0 };
  }

  return { allowed: true, remainingMs: 0, attemptsLeft: opts.max - count };
}

/** Check current status without incrementing (for UI hints). */
export async function peek(opts: RateLimitOptions): Promise<RateLimitResult> {
  const r = getRedis();
  if (!r) return { allowed: true, remainingMs: 0, attemptsLeft: opts.max };
  const fullKey = `ds:rl:${opts.key}`;
  try {
    const raw = await r.get<number | string>(fullKey);
    const count = raw === null || raw === undefined ? 0 : Number(raw);
    if (count > opts.max) {
      const ttl = await kvTtl(fullKey);
      return {
        allowed: false,
        remainingMs: ttl > 0 ? ttl * 1000 : 0,
        attemptsLeft: 0,
      };
    }
    return { allowed: true, remainingMs: 0, attemptsLeft: Math.max(0, opts.max - count) };
  } catch {
    return { allowed: true, remainingMs: 0, attemptsLeft: opts.max };
  }
}

/** Clear the counter on success (so a correct login resets the window). */
export async function clear(key: string): Promise<void> {
  const r = getRedis();
  if (!r) return;
  try {
    await r.del(`ds:rl:${key}`);
  } catch {
    /* swallow — best-effort */
  }
}

/** Extract the client IP from request headers. */
export function getClientIp(req: { headers: { get(name: string): string | null } }): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
