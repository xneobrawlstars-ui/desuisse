/**
 * Email HTML templates for authentication flows.
 *
 * Why inline styles: most email clients (Gmail, Outlook, Apple Mail) strip
 * external CSS and many ignore <style> blocks. Inline styles are the only
 * way to guarantee consistent rendering.
 *
 * The templates are intentionally simple — luxury jewellery brands send
 * elegant minimal emails, not heavy HTML newsletters.
 */

const BRAND = {
  burgundy: '#1a0a0a',
  gold: '#c9a84c',
  cream: '#f7f3ee',
  text: '#444',
  textLight: '#888',
};

/** Wrap content in the standard branded email shell. */
function shell(opts: { title: string; preheader?: string; bodyHtml: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:Georgia,serif;color:${BRAND.text};">
  ${opts.preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(opts.preheader)}</div>` : ''}
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;max-width:560px;border:1px solid #e8e0d4;">
        <!-- Header -->
        <tr><td style="padding:32px 40px 28px;text-align:center;border-bottom:1px solid #f0ebe3;background:#fff;">
          <img src="https://desuisse.com/images/desuisse-logo.png" alt="deSuisse" width="180" style="display:block;margin:0 auto;max-width:180px;height:auto;border:0;" />
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          ${opts.bodyHtml}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;background:${BRAND.cream};text-align:center;border-top:1px solid #f0ebe3;">
          <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:11px;color:${BRAND.textLight};">deSuisse Luxury Jewellery</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#aaa;">
            Karlovy Vary · Pejë &nbsp;·&nbsp;
            <a href="https://desuisse.com" style="color:${BRAND.gold};text-decoration:none;">desuisse.com</a>
          </p>
        </td></tr>
      </table>
      <p style="margin:20px auto 0;font-family:Arial,sans-serif;font-size:10px;color:#bbb;max-width:560px;">
        You received this email because someone (hopefully you) requested it from desuisse.com. If this wasn't you, you can safely ignore this message.
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ctaButton(label: string, href: string): string {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:24px auto;">
      <tr><td style="background:${BRAND.burgundy};">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 32px;color:#fff;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">${escapeHtml(label)}</a>
      </td></tr>
    </table>`;
}

// ─── VERIFICATION EMAIL ────────────────────────────────────────────────

export function verificationEmail(opts: {
  name: string;
  verifyUrl: string;
  language: 'en' | 'sq';
}): { subject: string; html: string } {
  const sq = opts.language === 'sq';
  const subject = sq
    ? 'Verifikoni adresën tuaj të emailit'
    : 'Verify your email address';

  const greeting = sq ? `Përshëndetje ${escapeHtml(opts.name)},` : `Hello ${escapeHtml(opts.name)},`;
  const body = sq
    ? 'Faleminderit që krijuat një llogari në deSuisse. Për të përfunduar regjistrimin tuaj, klikoni butonin më poshtë për të verifikuar adresën tuaj të emailit.'
    : 'Thank you for creating an account at deSuisse. To complete your registration, click the button below to verify your email address.';
  const button = sq ? 'Verifiko Emailin' : 'Verify Email';
  const fallback = sq
    ? 'Nëse butoni nuk funksionon, kopjoni dhe ngjisni këtë lidhje në shfletuesin tuaj:'
    : 'If the button does not work, copy and paste this link into your browser:';
  const expires = sq
    ? 'Kjo lidhje skadon për 24 orë.'
    : 'This link expires in 24 hours.';

  const bodyHtml = `
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:${BRAND.burgundy};">${greeting}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;line-height:1.85;color:${BRAND.text};">${body}</p>
    ${ctaButton(button, opts.verifyUrl)}
    <p style="margin:24px 0 8px;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:${BRAND.textLight};">${fallback}</p>
    <p style="margin:0 0 18px;word-break:break-all;font-family:'Courier New',monospace;font-size:11px;color:${BRAND.gold};">${escapeHtml(opts.verifyUrl)}</p>
    <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:12px;color:${BRAND.textLight};font-style:italic;">${expires}</p>
  `;

  return { subject, html: shell({ title: subject, preheader: body.slice(0, 100), bodyHtml }) };
}

// ─── PASSWORD RESET EMAIL ──────────────────────────────────────────────

export function passwordResetEmail(opts: {
  name: string;
  resetUrl: string;
  language: 'en' | 'sq';
}): { subject: string; html: string } {
  const sq = opts.language === 'sq';
  const subject = sq ? 'Rivendos fjalëkalimin tuaj' : 'Reset your password';
  const greeting = sq ? `Përshëndetje ${escapeHtml(opts.name)},` : `Hello ${escapeHtml(opts.name)},`;
  const body = sq
    ? 'Ne morëm një kërkesë për të rivendosur fjalëkalimin e llogarisë suaj në deSuisse. Klikoni butonin më poshtë për të vendosur një fjalëkalim të ri. Nëse nuk e kërkuat këtë, mund ta injoroni këtë email — fjalëkalimi juaj nuk do të ndryshojë.'
    : 'We received a request to reset the password for your deSuisse account. Click the button below to set a new password. If you did not request this, you can safely ignore this email — your password will not change.';
  const button = sq ? 'Rivendos Fjalëkalimin' : 'Reset Password';
  const fallback = sq
    ? 'Nëse butoni nuk funksionon, kopjoni dhe ngjisni këtë lidhje në shfletuesin tuaj:'
    : 'If the button does not work, copy and paste this link into your browser:';
  const expires = sq
    ? 'Kjo lidhje skadon për 1 orë dhe mund të përdoret vetëm një herë.'
    : 'This link expires in 1 hour and can only be used once.';

  const bodyHtml = `
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:${BRAND.burgundy};">${greeting}</p>
    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;line-height:1.85;color:${BRAND.text};">${body}</p>
    ${ctaButton(button, opts.resetUrl)}
    <p style="margin:24px 0 8px;font-family:Arial,sans-serif;font-size:12px;line-height:1.7;color:${BRAND.textLight};">${fallback}</p>
    <p style="margin:0 0 18px;word-break:break-all;font-family:'Courier New',monospace;font-size:11px;color:${BRAND.gold};">${escapeHtml(opts.resetUrl)}</p>
    <p style="margin:24px 0 0;font-family:Arial,sans-serif;font-size:12px;color:${BRAND.textLight};font-style:italic;">${expires}</p>
  `;

  return { subject, html: shell({ title: subject, preheader: body.slice(0, 100), bodyHtml }) };
}

// ─── RESEND SENDER ─────────────────────────────────────────────────────

/**
 * Send an email via Resend. Returns true on success.
 * Throws on configuration error; logs and returns false on network/API errors.
 */
export async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY not set — cannot send email');
    return false;
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'deSuisse <noreply@desuisse.com>',
        to: args.to,
        subject: args.subject,
        html: args.html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[email] Resend returned ${res.status}: ${text.slice(0, 300)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[email] send failed:', err);
    return false;
  }
}
