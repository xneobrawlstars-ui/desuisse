# DeSuisse — Image Specifications Guide

Reference card for every photo on the site: what dimensions, what file
size, and how to add it. Print this out or bookmark it.

---

## Universal rules (apply to ALL photos)

| Rule | Value |
|---|---|
| **Format** | JPG for photos, PNG only if you need transparency (e.g. logos) |
| **Color profile** | sRGB (this is what every phone shoots by default — don't worry unless you've manually set Adobe RGB) |
| **Max file size** | 300 KB per photo. Bigger photos slow your site down, especially on mobile. |
| **Filename rules** | Lowercase only, no spaces, no special characters. Use dashes: `ring-photo-1.jpg` ✓, `Ring Photo 1.JPG` ✗ |
| **Compression** | JPG quality 80–85% (looks identical to 100% but half the file size) |

**Easy resizing tools:**
- **Online (no install):** squoosh.app (drag photo in, set width, download)
- **Mac:** Preview → Tools → Adjust Size
- **Windows:** Photos app → ⋯ menu → Resize
- **Phone:** any photo editor app, or the share sheet's "Resize" option

---

## Image specifications per location

### 1. Homepage hero (background photo behind "deSuisse" logo)

| | |
|---|---|
| **Recommended size** | 2400 × 1350 px (16:9 landscape) |
| **Minimum size** | 1920 × 1080 px |
| **File size** | Max 400 KB (this one is fine to be slightly bigger — it's the only image on first load) |
| **Where to change** | `/admin` → Site Images tab → "Hero Image" field |
| **How to change** | Upload to `public/images/` with any name, OR paste an `https://` URL from anywhere |

### 2. Homepage categories (6 photos: everyday/engagement/wedding rings, earrings, bracelets, necklaces)

| | |
|---|---|
| **Recommended size** | 860 × 1076 px (aspect ratio 4:5 — portrait) |
| **Minimum size** | 600 × 750 px |
| **File size** | Max 200 KB each |
| **Filenames** | `cat-everyday.jpg`, `cat-engagement.jpg`, `cat-wedding.jpg`, `cat-earrings.jpg`, `cat-bracelets.jpg`, `cat-necklaces.jpg` |
| **Where to change** | `/admin` → Site Images tab → respective field |

### 3. Homepage featured collections (2 photos)

| | |
|---|---|
| **Recommended size** | 800 × 1000 px (portrait works best) |
| **File size** | Max 200 KB each |
| **Filenames** | `collection-classic.jpg`, `collection-parker.jpg` |
| **Where to change** | `/admin` → Site Images tab → "Featured Collection" fields |

### 4. Homepage "Get Inspired" carousel (5 photos)

| | |
|---|---|
| **Recommended size** | 800 × 1066 px (aspect ratio 3:4 — portrait) |
| **File size** | Max 180 KB each |
| **Filenames** | `inspiration-1.jpg` through `inspiration-5.jpg` |
| **Where to change** | Currently HARDCODED — must add files to `public/images/` |

### 5. Product photos (in `/admin` → Products tab)

| | |
|---|---|
| **Recommended size** | 1000 × 1250 px (aspect ratio 4:5 — portrait) |
| **Minimum size** | 800 × 1000 px |
| **File size** | Max 200 KB each |
| **Format note** | Use a clean background (white, cream, satin). Square or portrait works; landscape will get cropped on some pages. |
| **Where to change** | `/admin` → Products → Add or Edit a product → "Image URL" field |
| **How to use external URLs** | Must be `https://` (not `http://`). Cloudinary, imgur, your existing WP media library all work. |

### 6. Boutique photos (`/boutiques` page)

| | |
|---|---|
| **Recommended size** | 1200 × 800 px (aspect ratio 3:2 — landscape) |
| **File size** | Max 250 KB each |
| **Filenames** | `boutique-1.jpg` through `boutique-5.jpg` |
| **Where to change** | HARDCODED — files go in `public/images/` |

### 7. Custom Design page hero (`/custom-design`)

| | |
|---|---|
| **Recommended size** | 1920 × 1080 px (landscape) |
| **File size** | Max 300 KB |
| **Filename** | `custom-hero.jpg` |
| **Where to change** | HARDCODED — file goes in `public/images/` |

### 8. Logo files (don't change these unless you have a new brand asset)

| | |
|---|---|
| **Filenames** | `desuisse-logo.png` (dark, for white headers), `desuisse-logo-white.png` (white, for dark hero) |
| **Recommended size** | 1200 px wide, transparent PNG |
| **Where to change** | Files in `public/images/` |

---

## Step-by-step: adding a new product photo

Two paths, pick the one that fits you.

### Path A — upload the photo to your own project (recommended)

1. **Resize** your photo to 1000×1250 px (or thereabouts — slightly different is fine).
2. **Compress** at squoosh.app to under 200 KB. Save as `.jpg`.
3. **Rename** it to something descriptive — e.g. `signet-chain-ring.jpg`. Lowercase, dashes only.
4. **Copy** the file into `public/images/` in your project folder:
   ```bash
   cp ~/Downloads/signet-chain-ring.jpg desuisse/public/images/signet-chain-ring.jpg
   ```
5. **Push** to deploy:
   ```bash
   cd desuisse
   git add public/images/signet-chain-ring.jpg
   git commit -m "Add signet-chain-ring product photo"
   git push
   ```
6. **In your admin panel** (`/admin` → Products → Add Product), set the image URL to:
   ```
   /images/signet-chain-ring.jpg
   ```
   (note the leading slash, no domain)

### Path B — host the photo elsewhere (e.g. Cloudinary, your WordPress)

1. Upload your photo to your hosting service.
2. Copy the **HTTPS** URL — must start with `https://`.
3. In your admin panel, paste that full URL into the image field. Done.

The difference: Path A is permanent and fast (file ships with your site). Path B is faster to set up but depends on the other service staying up.

---

## What I did for the two photos you sent

### `wedding-rings.jpg` → homepage "Wedding Rings" category

- Resized to 900 × 1200 px (matches the 4:5 category aspect)
- Compressed to 98 KB
- Saved as `cat-wedding.jpg`

Put it in `public/images/cat-wedding.jpg` — this overrides what the admin panel had set (`cat-wedding.jpg` is the local default the admin falls back to).

### `normal-ring.jpg` → a product

- Resized to 960 × 1200 px (4:5 portrait)
- Compressed to 183 KB
- Saved as `product-signet-chain.jpg`

To add it as a product:
1. Drop `product-signet-chain.jpg` into your `public/images/` folder
2. Push to deploy
3. Go to `/admin` → Products tab → Add Product
4. Fill in: name, price, category (probably "Everyday Rings" since it's a signet)
5. In the Image URL field, paste: `/images/product-signet-chain.jpg`
6. Save

---

## How to know if a photo will look good on every device

The site is **responsive** — same photo gets displayed at different sizes on phone vs tablet vs desktop. Two things matter for cross-device quality:

1. **Resolution.** A photo that looks great on your laptop at 800px wide will look blurry on a 4K monitor unless you provide it at 1600px+. The recommended sizes above are 2× the largest display they'll show in, so they stay sharp on retina/4K screens.

2. **Aspect ratio.** If you upload a square photo for a portrait slot, the CSS will crop it. Match the aspect ratios I listed above so you control what gets cropped.

If a photo looks bad on mobile but fine on desktop, the cause is almost always:
- File too big → slow loading → mobile data limit
- Wrong aspect ratio → mobile browser crops badly

---

## Common mistakes (and how to avoid them)

| Mistake | What goes wrong | Fix |
|---|---|---|
| Filename has spaces or capitals (`My Ring.JPG`) | Image works locally but breaks on Vercel | Use `my-ring.jpg` |
| File is 5+ MB | Site is slow, mobile users bounce | Resize + compress to under 300 KB |
| URL starts with `http://` instead of `https://` | Browser blocks the image, you see a broken icon | Always use `https://` |
| Image is square but slot is portrait | Top/bottom of photo gets cut off | Crop to the right aspect ratio first |
| Updated photo but old one still shows | Browser cache | Hard refresh (close tab, reopen) or use incognito |
| Photo doesn't appear after pushing | Forgot `git add public/images/` | Run `git status` to verify the file is tracked |

---

## Where each image is defined in code (for reference)

If you ever need to change where an image is loaded from in the code:

| Page | File to edit |
|---|---|
| Homepage hero, categories, featured collections | `/admin` panel (no code editing) |
| Homepage "Get Inspired" carousel | `src/app/page.tsx` (search for `inspiration-`) |
| Product cards on shop & home | `/admin` Products panel |
| Boutiques page | `src/app/boutiques/page.tsx` (search for `image:`) |
| Custom Design page | `src/app/custom-design/page.tsx` (search for `custom-hero`) |
| About Us | `src/app/about/page.tsx` |
| Header / Footer / Admin logo | `src/components/Header.tsx`, `Footer.tsx`, etc. |
