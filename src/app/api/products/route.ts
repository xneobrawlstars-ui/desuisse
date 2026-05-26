import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_PRODUCTS, Product } from '@/data/products';

const KV_KEY = 'ds:products';

// ── Upstash Redis helpers ────────────────────────────────────────
async function kvGet(): Promise<Product[] | null> {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  try {
    const res = await fetch(`${url}/get/${KV_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const json = await res.json() as { result: string | null };
    if (!json.result) return null;
    return JSON.parse(json.result) as Product[];
  } catch {
    return null;
  }
}

async function kvSet(products: Product[]): Promise<boolean> {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;

  try {
    const res = await fetch(`${url}/set/${KV_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(JSON.stringify(products)), // stringify twice — Redis stores strings
    });
    const json = await res.json() as { result: string };
    return json.result === 'OK';
  } catch {
    return false;
  }
}

// ── Auth check ───────────────────────────────────────────────────
function isAuthenticated(req: NextRequest): boolean {
  const session = req.cookies.get('ds_admin_session');
  return Boolean(session?.value && session.value.length === 64);
}

// ── GET — public ─────────────────────────────────────────────────
export async function GET() {
  const stored = await kvGet();
  const products = stored ?? DEFAULT_PRODUCTS;

  const safe = products.map(p => {
    const result = { ...p };
    if (!result.materials)        result.materials = [];
    if (!result.sizes)            result.sizes = [];
    if (!result.materialVariants) result.materialVariants = [];
    if (!result.stones)           result.stones = [];
    if (!result.stoneSizes)       result.stoneSizes = [];
    if ((result.category as string) === 'rings') result.category = 'everyday-rings';
    return result;
  });

  return NextResponse.json(safe, {
    status: 200,
    headers: { 'Cache-Control': 'no-store' },
  });
}

// ── POST — admin only ────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Expected array of products' }, { status: 400 });
  }

  const products = (body as unknown[]).filter(p => {
    if (!p || typeof p !== 'object') return false;
    const o = p as Record<string, unknown>;
    return (
      typeof o.id === 'string' &&
      typeof o.name === 'string' && o.name.length > 0 && o.name.length <= 200 &&
      typeof o.price === 'number' && o.price >= 0 && o.price <= 999999 &&
      typeof o.category === 'string' &&
      typeof o.image === 'string'
    );
  }) as Product[];

  const ok = await kvSet(products);

  if (!ok) {
    return NextResponse.json({
      error: 'Database not configured',
      hint: 'Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your environment variables.',
    }, { status: 503 });
  }

  return NextResponse.json({ success: true, count: products.length }, { status: 200 });
}
