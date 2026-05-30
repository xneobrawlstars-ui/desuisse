'use client';
/**
 * GDPR cookie consent banner.
 *
 * Behaviour:
 *  - Hidden if user has already made a choice (stored in localStorage).
 *  - Visible on first visit and after browser-data-clear.
 *  - Three buttons: Accept all, Reject all, Privacy details (link).
 *  - Choice persists for 365 days.
 *  - Re-shown automatically after 365 days (GDPR best practice).
 *
 * We currently don't load any non-essential cookies/scripts ourselves
 * (no Google Analytics, no Facebook Pixel, etc.), so "reject" doesn't
 * disable anything yet. The banner exists primarily to comply with the
 * legal requirement to disclose cookie usage and give users the choice.
 * Once you add analytics or marketing tools, gate them behind this consent.
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const STORAGE_KEY = 'ds_cookie_consent';
const EXPIRY_DAYS = 365;

interface ConsentState {
  accepted: boolean;
  timestamp: number;
}

export default function CookieBanner() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Small delay so it doesn't pop up before the page settles
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
      const parsed: ConsentState = JSON.parse(raw);
      // Re-prompt after expiry
      const ageMs = Date.now() - parsed.timestamp;
      const maxAgeMs = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
      if (ageMs > maxAgeMs) {
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage blocked (private mode) — show the banner anyway
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (accepted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        accepted,
        timestamp: Date.now(),
      } as ConsentState));
    } catch { /* private mode — ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  const t = language === 'sq' ? {
    title: 'Privatësia juaj',
    body: 'Përdorim cookie thelbësorë për të bërë faqen të funksionojë (p.sh. shporta dhe sesionet e admin-it). Nuk përdorim cookie për reklama dhe nuk ndajmë të dhënat tuaja me palë të treta për marketing.',
    accept: 'Pranoj',
    reject: 'Refuzoj',
    details: 'Lexoni Politikën e Privatësisë',
  } : {
    title: 'Your privacy',
    body: 'We use essential cookies to make the site work (e.g. shopping cart and admin sessions). We do not use advertising cookies and we do not share your data with third parties for marketing.',
    accept: 'Accept',
    reject: 'Reject',
    details: 'Read the Privacy Policy',
  };

  return (
    <div
      role="dialog"
      aria-label={t.title}
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        right: 24,
        maxWidth: 720,
        margin: '0 auto',
        background: '#1a0a0a',
        color: '#fff',
        padding: '20px 24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        border: '1px solid rgba(201,168,76,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: '#c9a84c',
          textTransform: 'uppercase',
        }}>◆ {t.title}</p>
      </div>

      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: '#ddd',
        lineHeight: 1.7,
      }}>{t.body}</p>

      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
        <button
          onClick={() => choose(true)}
          style={{
            padding: '10px 22px',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: '#c9a84c',
            color: '#1a0a0a',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}
        >{t.accept}</button>
        <button
          onClick={() => choose(false)}
          style={{
            padding: '10px 22px',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
        >{t.reject}</button>
        <Link
          href="/privacy"
          onClick={() => choose(true)}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: '#c9a84c',
            textDecoration: 'underline',
            marginLeft: 'auto',
          }}
        >{t.details}</Link>
      </div>
    </div>
  );
}
