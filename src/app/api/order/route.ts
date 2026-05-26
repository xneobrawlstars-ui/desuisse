import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const orderLog = new Map<string, { count: number; firstAt: number }>();

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

function sanitize(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.slice(0, max).replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').trim();
}

function isValidEmail(e: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e);
}

const VALID_COUNTRIES = [
  'Kosovo','Albania','North Macedonia','Serbia','Czech Republic',
  'Germany','Switzerland','Austria','United Kingdom','United States','Other',
];

const VALID_SHIPPING = ['standard', 'express'];
const VALID_PAYMENT  = ['card', 'transfer'];

export async function POST(req: NextRequest) {
  // Reject non-JSON
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  const ip  = getIp(req);
  const now = Date.now();

  // Rate limit: 5 orders per hour per IP
  const state = orderLog.get(ip);
  if (state && now - state.firstAt < 3_600_000 && state.count >= 5) {
    return NextResponse.json({ error: 'Too many requests' }, {
      status: 429,
      headers: { 'Retry-After': '3600' },
    });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  const firstName     = sanitize(b.firstName, 100);
  const lastName      = sanitize(b.lastName, 100);
  const email         = sanitize(b.email, 254).toLowerCase();
  const address       = sanitize(b.address, 200);
  const city          = sanitize(b.city, 100);
  const zip           = sanitize(b.zip, 20);
  const country       = sanitize(b.country, 60);
  const shippingMethod = sanitize(b.shippingMethod, 20);
  const paymentMethod  = sanitize(b.paymentMethod, 20);

  // Whitelist validation
  if (!firstName || !lastName)           return NextResponse.json({ error: 'Name required' }, { status: 400 });
  if (!isValidEmail(email))              return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  if (!address || !city || !zip)         return NextResponse.json({ error: 'Full address required' }, { status: 400 });
  if (!VALID_COUNTRIES.includes(country))return NextResponse.json({ error: 'Invalid country' }, { status: 400 });
  if (!VALID_SHIPPING.includes(shippingMethod)) return NextResponse.json({ error: 'Invalid shipping method' }, { status: 400 });
  if (!VALID_PAYMENT.includes(paymentMethod))   return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });

  // Hard block: never accept raw card data
  if (b.cardNumber || b.cvv || b.expiry) {
    return NextResponse.json(
      { error: 'Raw card data must not be submitted. Use Stripe Elements.' },
      { status: 400 }
    );
  }

  // Record attempt
  orderLog.set(ip, {
    count: (!state || now - state.firstAt > 3_600_000) ? 1 : state.count + 1,
    firstAt: (!state || now - state.firstAt > 3_600_000) ? now : state.firstAt,
  });

  // Cryptographically secure order ID
  const orderId = `DS-${randomBytes(6).toString('hex').toUpperCase()}`;

  // TODO: integrate Stripe Payment Intent here
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const intent = await stripe.paymentIntents.create({ amount, currency: 'eur', ... });
  // return NextResponse.json({ clientSecret: intent.client_secret, orderId });

  return NextResponse.json({ success: true, orderId }, { status: 200 });
}
