# DeSuisse – Next.js Website

A full Next.js 14 rebuild of [desuisse.com](https://desuisse.com) with bilingual support (Albanian / English), a product admin panel, and all main pages.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📄 Pages

| URL | Description |
|-----|-------------|
| `/` | Home page with hero, categories, featured products |
| `/shop` | Full product shop with category filter |
| `/about` | About Us / company history |
| `/contact` | Contact form + FAQ |
| `/admin` | **Admin panel** (password protected) |

---

## 🔐 Admin Panel (`/admin`)

**Password:** `desuisse2024`

Your colleague can use the admin panel to:
- ✅ **Add** new products (name, price, category, image URL, description)
- ✅ **Edit** existing products
- ✅ **Delete** products
- ✅ **Mark as featured** (shows on homepage)
- ✅ **Set hover image** (second image shown on hover)
- ✅ **Search & filter** by category

> To change the admin password, edit `ADMIN_PASSWORD` in `src/app/admin/page.tsx`

---

## 🌐 Language Switching

The header has an **ALB | EN** switcher. The language preference is saved in the browser so it persists between visits.

---

## 🗄️ Product Storage

Products are stored in the **browser's localStorage**, so they persist across page refreshes. For a production setup with a real database, replace the `getProducts()` / `saveProducts()` functions in `src/data/products.ts` with API calls.

---

## 🎨 Customization

| File | What to change |
|------|----------------|
| `src/lib/translations.ts` | All Albanian & English text |
| `src/data/products.ts` | Default product list |
| `src/app/globals.css` | Colors, fonts, spacing |
| `tailwind.config.js` | Design tokens |

---

## 🖼️ Adding a Local Hero Image

Place your main ring photo at:
```
public/images/hero-ring.jpg
```

It will automatically be used as the hero background.

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Cormorant Garamond** + **Montserrat** fonts (Google Fonts)
- No external database required (localStorage for products)
