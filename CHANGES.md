# DeSuisse — Setup & Changes

## What changed in this update

### 1. Logo (mobile font issue fixed)
The logo SVGs in `public/images/` are now **path-based** (outlined vector
shapes), not text rendered with a font. They render identically on every
device, regardless of which fonts are installed. The empty bordered box
you saw on your phone is gone.

### 2. Font loading
Fonts now load via `next/font/google` which **self-hosts them with your
build**. They no longer rely on a runtime `fonts.googleapis.com` request
that can fail on slow mobile connections.

### 3. Products / site images now sync across devices
Two real bugs were hiding this:
- `saveProductsToDb` was also writing to `localStorage`. When the Upstash
  write silently failed (e.g. missing env var) the admin still saw their
  changes locally and assumed they were saved.
- Errors from the API are now surfaced precisely. When a save fails, the
  admin gets a dialog telling them exactly what's wrong (missing env var,
  expired session, network).

If you still don't see changes on other devices after this update, check
the cause is now visible in:
- Vercel → Project → Functions → Logs (look for `[upstash] …` errors)
- The browser console of the admin (alerts will quote the server's error)

### 4. CRITICAL — admin auth was bypassable
**Old behaviour:** the products and site-images APIs accepted any 64-char
hex string as a valid session. Anyone could open devtools, set the cookie
to `aaaa…` (64 a's), and modify your catalogue or images.

**Fixed:** session tokens are now stored server-side in Upstash with a
2-hour TTL. Forged cookies fail validation.

Existing logged-in admins on the old build will need to log in once more
after deploying — the old cookie has no matching server-side record.

### 5. Rate limiting now survives serverless cold starts
The login and contact rate limits previously lived in an in-memory `Map`
that reset every time the Vercel function cold-started. An attacker
pacing their requests past the cold-start interval got unlimited tries.
Rate limits now live in Upstash.

### 6. Other fixes
- Removed the unused `Logo.tsx` component (was still font-dependent)
- Removed the orphaned `src/proxy.ts` (was a duplicate of `middleware.ts`)
- Cross-origin check in middleware now parses URLs properly (was using
  substring match — `https://attacker.com/desuisse.com` would have passed)
- `sanitizeText` no longer strips apostrophes and quotes. "Women's Ring"
  is preserved correctly now.
- HTML-escape applied to user input before email-template interpolation
- Admin sidebar and login screen now use the local SVG logo (no external
  WordPress hotlink)

---

## REQUIRED env vars (set ALL of these in Vercel)

Both Production AND Preview scopes, then redeploy:

```
ADMIN_PASSWORD=<long random string, 20+ chars>
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=re_...
CONTACT_EMAIL=info@desuisse.com
```

**If Upstash env vars are missing, login will refuse with a 500.** This is
deliberate — we cannot persist sessions safely without it, so we'd rather
fail loudly than degrade silently.

---

## To run locally

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

---

## What I did NOT do (and why)

- **Payment processing:** still not implemented. The `/api/order` endpoint
  collects an address but does not charge. Integrating Stripe Payment
  Intents is a separate, larger piece of work.
- **Inventory tracking:** still not present. Same product can be sold
  twice with no warning.
- **Customer accounts:** still none. Wishlist and cart live in localStorage
  on each device.
- **SEO per-product metadata:** still missing dynamic `<title>` and
  `og:image` per product page. Easy to add via `generateMetadata` later.

These are pre-existing limitations of the codebase, not caused by this
update. Worth flagging before going live.
