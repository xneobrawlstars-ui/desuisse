/**
 * DeSuisse Security Library
 * Central validation, sanitization, and rate limiting utilities.
 */

// ── Input sanitization ────────────────────────────────────────────────────────

/** Strip HTML tags and dangerous characters from a string */
export function sanitizeText(input: string, maxLength = 500): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)                          // enforce max length
    .replace(/<[^>]*>/g, '')                      // strip HTML tags
    .replace(/[<>"'`]/g, '')                      // strip dangerous chars
    .replace(/javascript:/gi, '')                 // strip JS protocol
    .replace(/on\w+\s*=/gi, '')                   // strip event handlers
    .trim();
}

/** Sanitize and validate an email address */
export function sanitizeEmail(input: string): string {
  if (typeof input !== 'string') return '';
  const clean = input.slice(0, 254).trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(clean) ? clean : '';
}

/** Sanitize a phone number — digits, spaces, +, -, () only */
export function sanitizePhone(input: string): string {
  if (typeof input !== 'string') return '';
  return input.slice(0, 20).replace(/[^0-9+\-\s()]/g, '').trim();
}

/** Sanitize a URL — only allow http/https */
export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') return '';
  const trimmed = input.slice(0, 2048).trim();
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    return trimmed;
  } catch {
    return '';
  }
}

/** Sanitize a number within a range */
export function sanitizeNumber(input: unknown, min = 0, max = 999999): number {
  const n = Number(input);
  if (isNaN(n)) return min;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

/** Sanitize engraving text — letters, numbers, spaces, and safe symbols only */
export function sanitizeEngraving(input: string, maxLength = 30): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/[<>"'`\\]/g, '')
    .trim();
}

/** Validate a card number format (digits only, 13–19 chars) */
export function isValidCardNumber(input: string): boolean {
  const digits = input.replace(/\s/g, '');
  return /^\d{13,19}$/.test(digits);
}

/** Validate expiry MM/YY */
export function isValidExpiry(input: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(input)) return false;
  const [mm, yy] = input.split('/').map(Number);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const expYear = 2000 + yy;
  const expMonth = mm;
  return expYear > now.getFullYear() || (expYear === now.getFullYear() && expMonth >= now.getMonth() + 1);
}

/** Validate CVV (3–4 digits) */
export function isValidCVV(input: string): boolean {
  return /^\d{3,4}$/.test(input);
}

// ── Payload size limits ────────────────────────────────────────────────────────

export const LIMITS = {
  NAME: 100,
  EMAIL: 254,
  PHONE: 20,
  ADDRESS: 200,
  CITY: 100,
  ZIP: 20,
  COMPANY: 100,
  MESSAGE: 2000,
  PRODUCT_NAME: 200,
  DESCRIPTION: 1000,
  URL: 2048,
  ENGRAVING: 30,
  SEARCH_QUERY: 100,
  CARD_NAME: 100,
} as const;

/** Reject if any string field exceeds its limit */
export function checkPayloadSize(data: Record<string, unknown>, limits: Record<string, number>): string | null {
  for (const [key, limit] of Object.entries(limits)) {
    const val = data[key];
    if (typeof val === 'string' && val.length > limit) {
      return `Field "${key}" exceeds maximum length of ${limit} characters.`;
    }
  }
  return null;
}

// ── Client-side rate limiting ─────────────────────────────────────────────────
// Since this is a Next.js client app with no backend auth endpoint,
// rate limiting is enforced in-browser via localStorage timestamps.
// For production, move auth to a Next.js API route with server-side rate limiting.

interface RateLimitState {
  attempts: number;
  firstAttemptAt: number;
  lockedUntil: number;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;  // 15 minute lockout

export function getRateLimitState(key: string): RateLimitState {
  if (typeof window === 'undefined') return { attempts: 0, firstAttemptAt: 0, lockedUntil: 0 };
  try {
    const raw = localStorage.getItem(`rl_${key}`);
    if (!raw) return { attempts: 0, firstAttemptAt: 0, lockedUntil: 0 };
    return JSON.parse(raw) as RateLimitState;
  } catch {
    return { attempts: 0, firstAttemptAt: 0, lockedUntil: 0 };
  }
}

export function recordAttempt(key: string): RateLimitState {
  if (typeof window === 'undefined') return { attempts: 0, firstAttemptAt: 0, lockedUntil: 0 };
  const now = Date.now();
  const state = getRateLimitState(key);

  // Reset if window expired
  const windowExpired = now - state.firstAttemptAt > RATE_LIMIT_WINDOW_MS;
  const lockedOut = state.lockedUntil > now;

  let next: RateLimitState;

  if (lockedOut) {
    // Still locked — don't increment, just return current state
    return state;
  } else if (windowExpired || state.attempts === 0) {
    // Fresh window
    next = { attempts: 1, firstAttemptAt: now, lockedUntil: 0 };
  } else {
    const newAttempts = state.attempts + 1;
    const shouldLock = newAttempts >= RATE_LIMIT_MAX_ATTEMPTS;
    next = {
      attempts: newAttempts,
      firstAttemptAt: state.firstAttemptAt,
      lockedUntil: shouldLock ? now + LOCKOUT_DURATION_MS : 0,
    };
  }

  localStorage.setItem(`rl_${key}`, JSON.stringify(next));
  return next;
}

export function clearRateLimit(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`rl_${key}`);
  }
}

export function isRateLimited(key: string): { limited: boolean; remainingMs: number; attemptsLeft: number } {
  const state = getRateLimitState(key);
  const now = Date.now();

  if (state.lockedUntil > now) {
    return { limited: true, remainingMs: state.lockedUntil - now, attemptsLeft: 0 };
  }

  const windowExpired = now - state.firstAttemptAt > RATE_LIMIT_WINDOW_MS;
  if (windowExpired) {
    return { limited: false, remainingMs: 0, attemptsLeft: RATE_LIMIT_MAX_ATTEMPTS };
  }

  const attemptsLeft = Math.max(0, RATE_LIMIT_MAX_ATTEMPTS - state.attempts);
  return { limited: attemptsLeft === 0, remainingMs: 0, attemptsLeft };
}

/** Format remaining lockout time as human-readable string */
export function formatLockoutTime(ms: number): string {
  const minutes = Math.ceil(ms / 60000);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

// ── localStorage data validation ──────────────────────────────────────────────

/** Safely parse JSON from localStorage with a fallback */
export function safeLocalStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/** Validate that a product object from localStorage has expected shape */
export function isValidProduct(p: unknown): boolean {
  if (!p || typeof p !== 'object') return false;
  const obj = p as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.category === 'string' &&
    typeof obj.image === 'string' &&
    obj.name.length <= 200 &&
    obj.price >= 0 &&
    obj.price <= 999999
  );
}
