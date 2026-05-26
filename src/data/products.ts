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
  {
    id: '1', name: 'Adele', price: 800, category: 'everyday-rings',
    description: 'Elegant diamond solitaire ring in white gold.',
    image: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_8559-700x700.jpg',
    image2: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_8712-700x700.jpg',
    featured: true, materials: ['White Gold', 'Yellow Gold'],
    materialVariants: [
      { name: 'White Gold 14ct', price: 800 }, { name: 'White Gold 18ct', price: 1050 },
      { name: 'Yellow Gold 14ct', price: 750 }, { name: 'Yellow Gold 18ct', price: 980 },
    ],
    sizes: ['46','48','50','52','54','56'], sku: 'DS-001',
    stones: ['Diamond', 'Lab Diamond'], stoneSizes: ['0.30ct','0.50ct','0.75ct'],
    hasEngraving: true, hasCoupleOption: false,
  },
  {
    id: '2', name: 'Afrodita', price: 300, priceMax: 600, category: 'everyday-rings',
    description: 'A divine ring inspired by the goddess of beauty.',
    image: 'https://desuisse.com/wp-content/uploads/2024/09/modeli-1-YG-700x700.png',
    featured: true, materials: ['Yellow Gold', 'Rose Gold', 'White Gold'],
    materialVariants: [
      { name: 'Yellow Gold 14ct', price: 300 }, { name: 'Yellow Gold 18ct', price: 420 },
      { name: 'Rose Gold 14ct', price: 310 },   { name: 'Rose Gold 18ct', price: 430 },
      { name: 'White Gold 14ct', price: 340 },  { name: 'White Gold 18ct', price: 600 },
    ],
    sizes: ['46','48','50','52','54'], sku: 'DS-002', hasEngraving: true,
  },
  {
    id: '3', name: 'Anastasia', price: 3000, category: 'engagement-rings',
    description: 'A regal engagement ring fit for royalty.',
    image: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_8583-700x700.jpg',
    image2: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_8703-700x700.jpg',
    featured: true, materials: ['White Gold', 'Platinum'],
    materialVariants: [{ name: 'White Gold 18ct', price: 3000 }, { name: 'Platinum', price: 3800 }],
    sizes: ['48','50','52','54','56'], sku: 'DS-003',
    stones: ['Diamond', 'Lab Diamond', 'Moissanite'],
    stoneSizes: ['0.50ct','0.75ct','1.00ct','1.50ct','2.00ct'], hasEngraving: true,
  },
  {
    id: '4', name: 'Aria', price: 520, category: 'wedding-rings',
    description: 'Delicate wedding ring with a timeless design.',
    image: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_8865-700x700.jpg',
    image2: 'https://desuisse.com/wp-content/uploads/2024/09/IMG_9138-700x700.jpg',
    featured: true, materials: ['Rose Gold', 'Yellow Gold'],
    materialVariants: [
      { name: 'Rose Gold 14ct', price: 520 },  { name: 'Rose Gold 18ct', price: 680 },
      { name: 'Yellow Gold 14ct', price: 510 },{ name: 'Yellow Gold 18ct', price: 660 },
    ],
    sizes: ['46','48','50','52'], sku: 'DS-004', hasCoupleOption: true, hasEngraving: true,
  },
  {
    id: '5', name: 'Aurora', price: 450, category: 'earrings',
    description: 'Sunrise-inspired earrings with brilliant stones.',
    image: 'https://desuisse.com/wp-content/uploads/2023/12/Vathe-430x538.jpg',
    featured: false, materials: ['Yellow Gold', 'Silver'],
    materialVariants: [
      { name: 'Yellow Gold 14ct', price: 450 }, { name: 'Yellow Gold 18ct', price: 580 },
      { name: 'Silver', price: 220 },
    ],
    sizes: [], sku: 'DS-005',
  },
  {
    id: '6', name: 'Celeste', price: 320, category: 'necklaces',
    description: 'A heavenly necklace with a star pendant.',
    image: 'https://desuisse.com/wp-content/uploads/2023/12/Qafore-430x538.jpg',
    featured: false, materials: ['Silver', 'White Gold'],
    materialVariants: [
      { name: 'Silver', price: 320 }, { name: 'White Gold 14ct', price: 520 }, { name: 'White Gold 18ct', price: 680 },
    ],
    sizes: ['40cm','45cm','50cm'], sku: 'DS-006',
  },
  {
    id: '7', name: 'Luna', price: 280, category: 'bracelets',
    description: 'Moon-shaped links in 18k white gold.',
    image: 'https://desuisse.com/wp-content/uploads/2023/12/Byzylyk-430x538.jpg',
    featured: false, materials: ['White Gold'],
    materialVariants: [{ name: 'White Gold 14ct', price: 280 }, { name: 'White Gold 18ct', price: 380 }],
    sizes: ['17cm','18cm','19cm'], sku: 'DS-007',
  },
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
