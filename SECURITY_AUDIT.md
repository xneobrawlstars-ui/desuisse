# DeSuisse Security Audit Report
Generated: 2026-05-26

---

## ✅ Issues Fixed in This Audit

### 1. Hardcoded Admin Password — FIXED
- **Was:** `const ADMIN_PASSWORD = 'desuisse2024'` hardcoded in source code
- **Now:** Reads from `process.env.NEXT_PUBLIC_ADMIN_PASSWORD`
- **Action needed:** Set a strong password in `.env.local` before deploying

### 2. No Rate Limiting on Login — FIXED
- **Was:** Unlimited login attempts with no lockout
- **Now:** Max 5 attempts per 15 minutes. Lockout counter shown to user. Live countdown timer. Auto-resets on successful login.
- **File:** `src/lib/security.ts` — `isRateLimited`, `recordAttempt`

### 3. No .gitignore — FIXED
- **Was:** No .gitignore — `.env.local` could be committed to git
- **Now:** `.gitignore` created, `.env.local` excluded

### 4. No Input Sanitization — FIXED
- **Was:** Raw `e.target.value` stored and saved without sanitization
- **Now:** All forms sanitize via `src/lib/security.ts`:
  - HTML tags stripped
  - Dangerous characters (`<>"'\``) removed
  - JS injection patterns blocked (`javascript:`, `on*=`)
  - Max length enforced on every field

### 5. Unsanitized Product URLs in Admin — FIXED
- **Was:** Any URL string accepted as image URL
- **Now:** `sanitizeUrl()` validates https:// only, max 2048 chars

### 6. No Payload Size Limits — FIXED
- **Was:** No maximum lengths on any input
- **Now:** All fields have `maxLength` HTML attributes + server-side limits in `LIMITS` constant

### 7. No Input Validation on Admin Save — FIXED
- **Was:** Product data saved to localStorage without validation
- **Now:** All fields sanitized before save, types validated

### 8. localStorage Products Not Validated on Load — FIXED
- **Was:** Raw JSON from localStorage used directly without shape validation
- **Now:** `isValidProduct()` validates each product before use

### 9. Search Input Unbounded — FIXED
- **Was:** Search query had no length limit
- **Now:** Capped at 100 characters

---

## ⚠️ Remaining Vulnerabilities & Recommendations

### HIGH — Admin password is client-side (architectural)
**Risk:** `NEXT_PUBLIC_*` variables are bundled into the browser JS. Anyone can see the admin password by inspecting the JS bundle.

**Proper fix for production:**
1. Create `src/app/api/admin-login/route.ts` (Next.js API route — server only)
2. Move password to `ADMIN_PASSWORD` (no `NEXT_PUBLIC_` prefix)
3. API route compares on server, returns a signed JWT/session token
4. Client stores only the token, never the password

**Until then:** The current setup is fine for a small internal tool. Change the password frequently and don't share it over insecure channels.

### HIGH — No backend: data lives in localStorage
**Risk:** Any user on the same browser can read/modify cart, wishlist, and products via browser console.

**Recommendation:** For production, replace `localStorage` product storage with a proper database (e.g. Vercel Postgres, Supabase, PlanetScale) and move all writes to authenticated API routes.

### MEDIUM — No CSRF protection on forms
**Risk:** Contact form has no CSRF token. Cross-site requests could submit the form.

**Fix:** Add a server-side API route for form submission with CSRF token validation.

### MEDIUM — Checkout form stores card data in React state
**Risk:** Card number, CVV, and expiry are held in component state. This is acceptable only if the page is purely UI (no actual payment processing). You must NEVER send raw card data to your own server.

**Fix:** Replace with Stripe Elements or a similar PCI-compliant payment widget. Card data never touches your code at all.

### MEDIUM — `NEXT_PUBLIC_ADMIN_PASSWORD` visible in bundle
Already noted above. Until you build a proper auth API route, treat this as a soft password, not cryptographic security.

### LOW — No Content Security Policy (CSP) headers
**Risk:** No CSP header means XSS attacks have more room if a vulnerability is introduced.

**Fix:** Add to `next.config.js`:
```js
headers: async () => [{
  source: '/(.*)',
  headers: [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ],
}]
```

### LOW — Image domains allow any path on desuisse.com
`next.config.js` allows all paths under `desuisse.com`. This is acceptable since it's your own domain.

### LOW — No session expiry on admin
**Risk:** Closing the browser clears sessionStorage, but the admin stays logged in during long sessions.

**Fix:** Add a session timeout (e.g. 2 hours of inactivity).

### INFO — No XSS risk from JSX
React's JSX automatically escapes all rendered values. `dangerouslySetInnerHTML` is not used anywhere in the codebase. ✅

### INFO — No SQL injection risk
No database queries exist. All data is localStorage JSON. ✅

---

## Security Files Created
| File | Purpose |
|------|---------|
| `src/lib/security.ts` | Central sanitization, rate limiting, validation |
| `.env.local` | Sensitive config (never commit) |
| `.env.example` | Safe template to commit |
| `.gitignore` | Prevents secrets from being committed |
| `SECURITY_AUDIT.md` | This file |

---

## Immediate Actions Required Before Going Live

1. **Change the admin password** in `.env.local` to something strong (16+ chars, mixed case, numbers, symbols)
2. **Implement Stripe** (or similar) for actual payment processing — never process raw card data yourself
3. **Add a real backend** — replace localStorage with a database for products
4. **Add CSP headers** to `next.config.js`
5. **Set up HTTPS** — ensure your hosting enforces HTTPS (Vercel does this automatically)

