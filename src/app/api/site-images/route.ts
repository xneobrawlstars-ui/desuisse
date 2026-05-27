import { NextRequest, NextResponse } from 'next/server';
import { SiteImages, DEFAULT_SITE_IMAGES } from '@/lib/siteImages';

const KV_KEY = 'ds:site-images';

async function kvGet(): Promise<SiteImages | null> {
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
    return JSON.parse(json.result) as SiteImages;
  } catch { return null; }
}

async function kvSet(data: SiteImages): Promise<boolean> {
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;
  try {
    const res = await fetch(`${url}/set/${KV_KEY}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(JSON.stringify(data)),
    });
    const json = await res.json() as { result: string };
    return json.result === 'OK';
  } catch { return false; }
}

function isAuthenticated(req: NextRequest): boolean {
  const session = req.cookies.get('ds_admin_session');
  return Boolean(session?.value && session.value.length === 64);
}

function sanitizeImageUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim().slice(0, 2048);
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('https://')) return trimmed;
  return '';
}

export async function GET() {
  const stored = await kvGet();
  return NextResponse.json(stored ?? DEFAULT_SITE_IMAGES, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const images: SiteImages = {
    hero:              sanitizeImageUrl(String(b.hero || '')),
    catEveryday:       sanitizeImageUrl(String(b.catEveryday || '')),
    catEngagement:     sanitizeImageUrl(String(b.catEngagement || '')),
    catWedding:        sanitizeImageUrl(String(b.catWedding || '')),
    catEarrings:       sanitizeImageUrl(String(b.catEarrings || '')),
    catBracelets:      sanitizeImageUrl(String(b.catBracelets || '')),
    catNecklaces:      sanitizeImageUrl(String(b.catNecklaces || '')),
    collectionClassic: sanitizeImageUrl(String(b.collectionClassic || '')),
    collectionParker:  sanitizeImageUrl(String(b.collectionParker || '')),
  };
  const ok = await kvSet(images);
  if (!ok) return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  return NextResponse.json({ success: true }, { status: 200 });
}
