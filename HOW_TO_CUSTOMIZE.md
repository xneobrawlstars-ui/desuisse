# How to Customize Your DeSuisse Website

---

## 🖼️ Adding the Hero Image

The hero on the homepage tries to load `/images/hero-ring.jpg`.

**Step 1:** In your project folder, find the `public/` folder (it's at the root — same level as `src/`). If it doesn't exist, create it.

**Step 2:** Inside `public/`, create a folder called `images/`.

**Step 3:** Save your ring photo (the one you shared earlier) as `hero-ring.jpg` and drop it into `public/images/`.

The full path should be: `desuisse/public/images/hero-ring.jpg`

That's it — the hero will load it automatically.

**To use a different filename or format:**
Open `src/app/page.tsx`, find this line:

```
src="/images/hero-ring.jpg"
```

Change it to whatever your file is called, e.g.:

```
src="/images/my-ring-photo.png"
```

---

## 🔤 Making Fonts Bigger or Smaller

All text sizes are in the inline `style` props using `fontSize`.

**Product name on the product page:**
File: `src/app/product/[id]/page.tsx`
Find: `fontSize: 'clamp(2rem, 3.5vw, 2.8rem)'`
Change to: `fontSize: '3.5rem'` (bigger) or `fontSize: '2rem'` (smaller)

**Price display:**
Same file, find: `fontSize: '1.8rem'`
Increase it to `fontSize: '2.2rem'` for bigger.

**Navigation links:**
File: `src/components/Header.tsx`
Find: `.nav-link` in `src/app/globals.css`
Change: `font-size: 11px;` to `font-size: 13px;`

**General body text** (all pages):
File: `src/app/globals.css`
The `section-subtitle` class controls description text. Find `.section-subtitle` and change `font-size: 13px;`.

**Quick reference — common sizes used:**

- `10px` = very small labels
- `11px` = small caps labels
- `13px` = normal body text
- `1.2rem` = product names in cards (~19px)
- `1.8rem` = price display (~29px)
- `2.8rem` = page headings (~45px)

---

## 🖼️ Adding Images to Pages

### On any page (e.g. ring-sizer, diamond-guide):

1. Put your image in `public/images/` — e.g. `public/images/ring-sizer.jpg`
2. Open the page file, e.g. `src/app/ring-sizer/page.tsx`
3. Add at the top: `import Image from 'next/image';`
4. Then use it inside the page:

```tsx
<Image
  src="/images/ring-sizer.jpg"
  alt="Ring sizer guide"
  width={800}
  height={500}
  style={{ width: "100%", height: "auto" }}
/>
```

### To add an image from the internet (URL):

```tsx
<Image
  src="https://example.com/your-image.jpg"
  alt="Description"
  width={800}
  height={500}
  style={{ width: "100%", height: "auto" }}
  unoptimized
/>
```

---

## ✏️ Changing the Info Tile Pages

The 4 tiles on every product page (ring size, diamond guide, delivery, warranty) link to:

- `/ring-sizer` → `src/app/ring-sizer/page.tsx`
- `/diamond-guide` → `src/app/diamond-guide/page.tsx`
- `/shipping` → `src/app/shipping/page.tsx`
- `/warranty` → `src/app/warranty/page.tsx`

Open any of these files and replace the placeholder text with your actual content. You can use the same pattern as other pages — just change the text inside the `<p>` tags.

---

## 🎨 Changing Brand Colors

File: `src/app/globals.css`

```css
:root {
  --ds-dark: #1a0a0a; /* dark brown/black */
  --ds-gold: #c9a84c; /* gold accent */
  --ds-cream: #f7f3ee; /* warm off-white background */
  --ds-warm: #f0e8d8; /* warm section backgrounds */
}
```

Change `#c9a84c` to any gold color you prefer.

---

## 📝 Changing Translations (text in ALB/EN)

File: `src/lib/translations.ts`

Every piece of text in the site is there. For example to change the announcement banner:

```ts
banner: 'Diamond Week is Coming. Prep your wishlist.',
```

Change it to whatever you want. The Albanian version is right below under `sq:`.

---

## 🏠 Changing the Category Images on the Homepage

File: `src/app/page.tsx`

Find the `categories` array:

```tsx
{
  key: 'everyday-rings',
  label: ...,
  img: 'https://desuisse.com/wp-content/uploads/...',
  href: '/shop?category=everyday-rings',
},
```

Replace the `img` URL with your own image URL, or put a photo in `public/images/` and use `/images/yourfile.jpg`.
