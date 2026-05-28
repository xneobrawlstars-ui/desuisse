import { NextRequest, NextResponse } from 'next/server';

const submissions = new Map<string, { count: number; firstAt: number }>();
const MAX = 3;
const WINDOW = 3_600_000;

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

async function sendEmail(subject: string, html: string, replyTo: string): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? 'info@desuisse.com';

  if (!apiKey) {
    console.error('[email] RESEND_API_KEY environment variable is not set');
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  console.log(`[email] Sending to: ${toEmail}, reply-to: ${replyTo}`);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'DeSuisse Website <noreply@desuisse.com>',
        to: [toEmail],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const data = await res.json() as Record<string, unknown>;

    if (!res.ok) {
      console.error('[email] Resend API error:', res.status, JSON.stringify(data));
      return { ok: false, error: `Resend error ${res.status}: ${JSON.stringify(data)}` };
    }

    console.log('[email] Sent successfully. ID:', data.id);
    return { ok: true };
  } catch (err) {
    console.error('[email] Network error:', err);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: NextRequest) {
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  const ip  = getIp(req);
  const now = Date.now();
  const state = submissions.get(ip);

  if (state && now - state.firstAt < WINDOW && state.count >= MAX) {
    return NextResponse.json({ error: 'Too many submissions. Try again later.' }, {
      status: 429, headers: { 'Retry-After': '3600' },
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
  const type    = sanitize(b.type, 20) || 'contact';

  if (!name)                return NextResponse.json({ error: 'Name required' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  if (!message || message.length < 2) return NextResponse.json({ error: 'Message too short' }, { status: 400 });

  submissions.set(ip, {
    count: (!state || now - state.firstAt > WINDOW) ? 1 : state.count + 1,
    firstAt: (!state || now - state.firstAt > WINDOW) ? now : state.firstAt,
  });

  const isMeeting = type === 'meeting';
  const subject = isMeeting
    ? `📅 New Meeting Request — ${name}`
    : `✉️ New Contact Message — ${name}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <div style="background:#1a0a0a;padding:20px 24px;margin-bottom:24px">
        <h1 style="color:#c9a84c;margin:0;font-size:20px;font-weight:400;letter-spacing:2px">
          ${isMeeting ? 'MEETING REQUEST' : 'CONTACT MESSAGE'}
        </h1>
        <p style="color:#888;margin:6px 0 0;font-size:12px">DeSuisse Website — desuisse.com</p>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px;width:100px">NAME</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a0a0a"><strong>${name}</strong></td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px">EMAIL</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><a href="mailto:${email}" style="color:#c9a84c">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px">PHONE</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a0a0a">${phone}</td></tr>` : ''}
        ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#888;font-size:12px">COMPANY</td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#1a0a0a">${company}</td></tr>` : ''}
      </table>
      <div style="margin-top:24px;padding:16px;background:#f7f3ee;border-left:3px solid #c9a84c">
        <p style="margin:0 0 8px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">MESSAGE</p>
        <p style="margin:0;font-size:14px;color:#1a0a0a;line-height:1.7">${message.replace(/\n/g, '<br>')}</p>
      </div>
      <p style="margin-top:24px;font-size:11px;color:#bbb;text-align:center">
        Sent from desuisse.com — Reply directly to <a href="mailto:${email}" style="color:#c9a84c">${email}</a>
      </p>
    </div>
  `;

  const emailResult = await sendEmail(subject, html, email);

  if (!emailResult.ok) {
    // Still return success to the user — don't expose internal errors
    console.error('[contact] Email failed but returning success to user:', emailResult.error);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
