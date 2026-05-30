'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Custom 404 page (handles any unknown URL on the site).
 *
 * Note: 'use client' is required because we use useLanguage(). Next.js
 * still serves this with HTTP 404 because of the not-found.tsx convention.
 */
export default function NotFound() {
  const { language } = useLanguage();
  const sq = language === 'sq';

  const t = sq ? {
    eyebrow: '◆ 404',
    title: 'Faqja që kërkoni nuk u gjet',
    body: 'Ndoshta lidhja është e thyer, ose faqja është zhvendosur. Le t\u2019ju ndihmojmë të gjeni rrugën përsëri.',
    home: 'Faqja kryesore',
    shop: 'Shfleto dyqanin',
    contact: 'Na kontaktoni',
  } : {
    eyebrow: '◆ 404',
    title: 'The page you are looking for cannot be found',
    body: 'Perhaps the link is broken, or the page has moved. Let us help you find your way back.',
    home: 'Home',
    shop: 'Browse the shop',
    contact: 'Contact us',
  };

  return (
    <>
      <Header />

      <main style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)',
      }}>
        {/* Decorative diamond glyph */}
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1" style={{ marginBottom: 24, opacity: 0.7 }}>
          <path d="M6 3h12l4 6-10 13L2 9z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </svg>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          letterSpacing: '0.4em',
          color: '#c9a84c',
          textTransform: 'uppercase',
          marginBottom: 18,
        }}>{t.eyebrow}</p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.7rem, 4vw, 2.6rem)',
          fontWeight: 400,
          color: '#1a0a0a',
          maxWidth: 640,
          lineHeight: 1.2,
          marginBottom: 16,
        }}>{t.title}</h1>

        <div style={{ width: 48, height: 1, background: '#c9a84c', margin: '8px auto 24px' }} />

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: '#666',
          lineHeight: 1.85,
          maxWidth: 480,
          marginBottom: 36,
        }}>{t.body}</p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            padding: '13px 28px',
            background: '#1a0a0a',
            color: '#fff',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}>{t.home}</Link>
          <Link href="/shop" style={{
            padding: '13px 28px',
            background: 'transparent',
            color: '#1a0a0a',
            border: '1px solid #1a0a0a',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>{t.shop}</Link>
          <Link href="/contact" style={{
            padding: '13px 28px',
            background: 'transparent',
            color: '#888',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>{t.contact}</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
