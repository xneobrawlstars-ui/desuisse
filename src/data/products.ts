export interface MaterialVariant {
  name: string;
  price: number;
}

export type Category =
  | 'everyday-rings'
  | 'engagement-rings'
  | 'wedding-rings'
  | 'earrings'
  | 'bracelets'
  | 'necklaces';

export interface Product {
  id: string;
  name: string;
  price: number;
  priceMax?: number;
  category: Category;
  description: string;
  image: string;
  image2?: string;
  featured: boolean;
  materials: string[];
  materialVariants: MaterialVariant[];
  sizes: string[];
  sku?: string;
  stones?: string[];
  stoneSizes?: string[];
  hasCoupleOption?: boolean;
  hasEngraving?: boolean;
}

export const MATERIAL_OPTIONS = ['Yellow Gold','White Gold','Rose Gold','Silver','Platinum'];
export const CARATS = ['14ct', '18ct'];
export const STONE_OPTIONS = ['Diamond', 'Lab Diamond', 'Moissanite', 'No Stone'];
export const STONE_SIZE_OPTIONS = ['0.20ct','0.30ct','0.50ct','0.75ct','1.00ct','1.50ct','2.00ct','3.75mm','4.00mm','4.50mm','5.00mm'];
export const RING_SIZES = ['44','46','48','50','52','54','56','58','60'];
export const BRACELET_SIZES = ['16cm','17cm','18cm','19cm','20cm'];
export const NECKLACE_SIZES = ['40cm','45cm','50cm','55cm','60cm'];
export const ENGRAVING_SYMBOLS = ['♡','♥','∞','✦','✶','☆','★','◆','✿','☾'];

export const CATEGORIES: { key: Category; en: string; sq: string }[] = [
  { key: 'everyday-rings',   en: 'Everyday Rings',   sq: 'Unaza të Përditshme' },
  { key: 'engagement-rings', en: 'Engagement Rings', sq: 'Unaza Fejese' },
  { key: 'wedding-rings',    en: 'Wedding Rings',    sq: 'Unaza Martese' },
  { key: 'earrings',         en: 'Earrings',         sq: 'Vathë' },
  { key: 'bracelets',        en: 'Bracelets',        sq: 'Byzylykë' },
  { key: 'necklaces',        en: 'Necklaces',        sq: 'Qafore' },
];

export const DEFAULT_PRODUCTS: Product[] = [
  // Products are managed through the Admin panel (/admin)
  // They are stored in the database and loaded automatically
  // Add your first product at /admin after deploying
];

// ── Client-side: fetch from API (falls back to localStorage then defaults) ──
export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products', { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return DEFAULT_PRODUCTS;
  } catch {
    // Fallback to localStorage if API fails
    return getProductsFromStorage();
  }
}

// ── Save products via API (admin only) ──────────────────────────
export async function saveProductsToDb(products: Product[]): Promise<boolean> {
  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(products),
    });
    if (res.ok) {
      // Also save to localStorage as backup
      saveProducts(products);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// ── Legacy localStorage helpers (kept as fallback) ──────────────
export function getProductsFromStorage(): Product[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  const stored = localStorage.getItem('ds-products');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((p: Product) => {
        const result = { ...p };
        if (!result.materials) result.materials = [];
        if (!result.sizes) result.sizes = [];
        if (!result.materialVariants) result.materialVariants = [];
        if (!result.stones) result.stones = [];
        if (!result.stoneSizes) result.stoneSizes = [];
        if ((result.category as string) === 'rings') result.category = 'everyday-rings';
        return result;
      });
    } catch { return DEFAULT_PRODUCTS; }
  }
  return DEFAULT_PRODUCTS;
}

// Keep getProducts as sync fallback for non-admin pages
export function getProducts(): Product[] {
  return getProductsFromStorage();
}

export function saveProducts(products: Product[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ds-products', JSON.stringify(products));
  }
}

export function formatPrice(product: Product): string {
  if (product.materialVariants && product.materialVariants.length > 0) {
    const prices = product.materialVariants.map(v => v.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) return `${min.toLocaleString('de-DE')}.00€`;
    return `${min.toLocaleString('de-DE')}.00€ – ${max.toLocaleString('de-DE')}.00€`;
  }
  if (product.priceMax) {
    return `${product.price.toLocaleString('de-DE')}.00€ – ${product.priceMax.toLocaleString('de-DE')}.00€`;
  }
  return `${product.price.toLocaleString('de-DE')}.00€`;
}
