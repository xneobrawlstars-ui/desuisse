/**
 * Authentication primitives — password hashing and secure-token generation.
 *
 * SECURITY NOTES:
 *   - bcryptjs cost factor 12 → ~250ms per hash on serverless. Slow enough
 *     to deter brute force, fast enough not to time out.
 *   - Tokens are 32-byte URL-safe random strings (256 bits of entropy).
 *     Generated via crypto.getRandomValues — cryptographically secure.
 *   - Constant-time comparison for token validation to prevent timing attacks.
 *   - Email normalization to lowercase + trim BEFORE any lookup or hashing.
 *
 * This file has NO server-side runtime dependencies (Upstash etc.) — it's
 * pure crypto helpers usable from any context. Storage lives in userStore.ts.
 */
import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

/** Hash a plaintext password. Returns a self-contained string. */
export async function hashPassword(plaintext: string): Promise<string> {
  if (typeof plaintext !== 'string' || plaintext.length === 0) {
    throw new Error('Password required');
  }
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}

/** Verify a plaintext against a stored hash. Always takes constant-ish time. */
export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  if (typeof plaintext !== 'string' || typeof hash !== 'string') return false;
  try {
    return await bcrypt.compare(plaintext, hash);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically random URL-safe token (32 bytes → ~43 chars
 * base64url). Used for: email verification, password reset, session IDs.
 */
export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  // Convert to base64url (URL-safe, no padding)
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Constant-time string comparison. Prevents timing attacks when comparing
 * secret tokens (where an attacker might measure response time to leak the
 * token character by character).
 */
export function timingSafeEqual(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/** Normalize an email for storage/lookup: lowercase + trim. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Validate an email format. Conservative regex, intentionally not RFC 5322. */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC max
  // user@host.tld, with reasonable character sets
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validate password strength.
 * Requirements:
 *   - at least 8 characters
 *   - at least one letter
 *   - at least one number
 *
 * Intentionally NOT requiring special characters or mixed case — research
 * shows these requirements push users toward predictable patterns.
 * Length + a number is enough for a luxury jewellery storefront.
 */
export function validatePassword(password: string): { valid: boolean; reason?: string } {
  if (typeof password !== 'string') return { valid: false, reason: 'Password is required' };
  if (password.length < 8) return { valid: false, reason: 'Password must be at least 8 characters' };
  if (password.length > 128) return { valid: false, reason: 'Password too long (max 128)' };
  if (!/[a-zA-Z]/.test(password)) return { valid: false, reason: 'Password must contain a letter' };
  if (!/[0-9]/.test(password)) return { valid: false, reason: 'Password must contain a number' };
  return { valid: true };
}

/** Validate a user-supplied display name. */
export function validateName(name: string): { valid: boolean; reason?: string } {
  if (typeof name !== 'string') return { valid: false, reason: 'Name is required' };
  const trimmed = name.trim();
  if (trimmed.length === 0) return { valid: false, reason: 'Name is required' };
  if (trimmed.length > 100) return { valid: false, reason: 'Name too long' };
  return { valid: true };
}
