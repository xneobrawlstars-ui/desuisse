import { NextRequest, NextResponse } from 'next/server';

const submissions = new Map<string, { count: number; firstAt: number }>();
const MAX = 3;
const WINDOW = 3_600_000; // 1 hour

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

function sanitize(s: unknown, max: number): string {
  if (typeof s !== 'string') return '';
  return s.slice(0, max).replace(/<[^>]*>/g, '').replace(/[<>"'`]/g, '').replace(/javascript:/gi, '').trim();
}

function isValidEmail(e: string): boolean {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e);
}

export async function POST(req: NextRequest) {
  // Reject non-JSON
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  const ip  = getIp(req);
  const now = Date.now();

  const state = submissions.get(ip);
  if (state && now - state.firstAt < WINDOW && state.count >= MAX) {
    return NextResponse.json({ error: 'Too many submissions. Try again later.' }, {
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

  const name    = sanitize(b.name, 100);
  const email   = sanitize(b.email, 254).toLowerCase();
  const phone   = typeof b.phone === 'string' ? b.phone.slice(0, 20).replace(/[^0-9+\-\s()]/g, '') : '';
  const company = sanitize(b.company, 100);
  const message = sanitize(b.message, 2000);

  if (!name)                return NextResponse.json({ error: 'Name required' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  if (!message || message.length < 5) return NextResponse.json({ error: 'Message too short' }, { status: 400 });

  submissions.set(ip, {
    count: (!state || now - state.firstAt > WINDOW) ? 1 : state.count + 1,
    firstAt: (!state || now - state.firstAt > WINDOW) ? now : state.firstAt,
  });

  // TODO: send email via Resend/SendGrid
  // import { Resend } from 'resend';
  // await new Resend(process.env.RESEND_API_KEY).emails.send({
  //   from: 'noreply@desuisse.com',
  //   to: 'info@desuisse.com',
  //   subject: `Contact from ${name}`,
  //   text: `From: ${name} <${email}>\nPhone: ${phone}\nCompany: ${company}\n\n${message}`,
  // });

  return NextResponse.json({ success: true }, { status: 200 });
}
