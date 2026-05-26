'use client';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function ShippingPage() {
  const { language } = useLanguage();
  return (
    <>
      <Header />
      <div style={{ background: '#f7f3ee', padding: '48px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <h1 className="section-title">{language === 'sq' ? 'Dërgesa' : 'Shipping'}</h1>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '16px auto 0' }} />
      </div>
      <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, border: '1px solid #e8e0d4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28, color: '#c9a84c' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.2rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 16 }}>
          {language === 'sq' ? 'Së shpejti' : 'Coming Soon'}
        </h2>
        <p style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#888', maxWidth: 440, lineHeight: 1.8, marginBottom: 32 }}>
          {language === 'sq'
            ? 'Informacioni i plotë për dërgimin do të shtohet së shpejti. Nëse keni pyetje, na kontaktoni direkt.'
            : 'Full shipping information will be added soon. If you have any questions, please contact us directly.'}
        </p>
        <Link href="/contact" style={{ display: 'inline-block', padding: '13px 32px', background: '#1a0a0a', color: '#fff', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#c9a84c'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#1a0a0a'}
        >
          {language === 'sq' ? 'NA KONTAKTONI' : 'CONTACT US'}
        </Link>
      </div>
      <Footer />
    </>
  );
}
