/**
 * Centralised Upstash Redis client.
 * Uses the official @upstash/redis library (already a project dependency)
 * which handles encoding/decoding properly — no manual JSON.stringify games.
 *
 * If the env vars are missing, every helper logs a clear error and returns
 * `null` / `false` so callers can degrade gracefully (or surface the failure
 * to the user). This is far better than the silent-failure pattern that was
 * masking sync issues across devices.
 */
import { Redis } from '@upstash/redis';

let _redis: Redis | null = null;
let _warned = false;

export function getRedis(): Redis | null {
  if (_redis) return _redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (!_warned) {
      console.error(
        '[upstash] UPSTASH_REDIS_REST_URL and/or UPSTASH_REDIS_REST_TOKEN ' +
        'are not set. Set both in Vercel → Project → Settings → Environment ' +
        'Variables (Production AND Preview), then redeploy. Without these, ' +
        'admin changes will NOT sync across devices.'
      );
      _warned = true;
    }
    return null;
  }

  _redis = new Redis({ url, token });
  return _redis;
}

// ── Typed key/value helpers ────────────────────────────────────────────

/** Read a JSON value at the given key. Returns null if missing or on error. */
export async function kvGetJson<T>(key: string): Promise<T | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    // The Upstash client auto-deserialises JSON values.
    const val = await r.get<T>(key);
    return val ?? null;
  } catch (err) {
    console.error(`[upstash] GET ${key} failed:`, err);
    return null;
  }
}

/** Write a JSON value at the given key. Returns false on failure. */
export async function kvSetJson<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;
  try {
    if (ttlSeconds) {
      await r.set(key, value, { ex: ttlSeconds });
    } else {
      await r.set(key, value);
    }
    return true;
  } catch (err) {
    console.error(`[upstash] SET ${key} failed:`, err);
    return false;
  }
}

/** Delete a key. */
export async function kvDel(key: string): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;
  try {
    await r.del(key);
    return true;
  } catch (err) {
    console.error(`[upstash] DEL ${key} failed:`, err);
    return false;
  }
}

/** Atomic increment with TTL on first creation — used for rate limiting. */
export async function kvIncrWithTtl(key: string, ttlSeconds: number): Promise<number | null> {
  const r = getRedis();
  if (!r) return null;
  try {
    const count = await r.incr(key);
    if (count === 1) {
      // First increment in this window — set the TTL
      await r.expire(key, ttlSeconds);
    }
    return count;
  } catch (err) {
    console.error(`[upstash] INCR ${key} failed:`, err);
    return null;
  }
}

/** TTL in seconds remaining, or -2 if missing, -1 if no TTL set. */
export async function kvTtl(key: string): Promise<number> {
  const r = getRedis();
  if (!r) return -2;
  try {
    return await r.ttl(key);
  } catch {
    return -2;
  }
}

/** Check whether Upstash is configured (for health checks / UI hints). */
export function isUpstashConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}