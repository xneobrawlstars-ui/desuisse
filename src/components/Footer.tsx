'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const FB_URL    = 'https://www.facebook.com/artdesuisse?locale=cs_CZ';
const INSTA_URL = 'https://www.instagram.com/desuisse__/';

function SocialBar({ language }: { language: string }) {
  const label = language === 'sq' ? 'NDIQNI NE' : 'FOLLOW US';
  return (
    <div style={{ borderTop: '1px solid #2a1a1a', padding: '36px 0', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#666', marginBottom: 20 }}>
        {label}
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        {/* Facebook */}
        <a href={FB_URL} target="_blank" rel="noreferrer" aria-label="Facebook"
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c9a84c'; (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#333'; (e.currentTarget as HTMLAnchorElement).style.color = '#888'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        {/* Instagram */}
        <a href={INSTA_URL} target="_blank" rel="noreferrer" aria-label="Instagram"
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c9a84c'; (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#333'; (e.currentTarget as HTMLAnchorElement).style.color = '#888'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');

  return (
    <footer className="site-footer" style={{ padding: '64px 0 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Rings */}
          <div>
            <p className="footer-title">{language === 'sq' ? 'Unaza DeSuisse' : 'DeSuisse Rings'}</p>
            <Link href="/shop?category=engagement-rings" className="footer-link">{language === 'sq' ? 'Unaza Fejese' : 'Engagement Rings'}</Link>
            <Link href="/shop?category=wedding-rings"    className="footer-link">{language === 'sq' ? 'Unaza Martese' : 'Wedding Rings'}</Link>
            <Link href="/free-engraving"                 className="footer-link">{language === 'sq' ? 'Gravim Falas' : 'Free Engraving'}</Link>
            <Link href="/sizing-service"                 className="footer-link">{language === 'sq' ? 'Madhësia dhe Shërbimi' : 'Sizing & Service'}</Link>
            <Link href="/jewelry-care"                   className="footer-link">{language === 'sq' ? 'Kujdesi' : 'Ring Care'}</Link>
          </div>

          {/* Jewellery */}
          <div>
            <p className="footer-title">{language === 'sq' ? 'Bizhuteri DeSuisse' : 'DeSuisse Jewellery'}</p>
            <Link href="/shop?category=everyday-rings" className="footer-link">{language === 'sq' ? 'Unaza' : 'Rings'}</Link>
            <Link href="/shop?category=earrings"       className="footer-link">{language === 'sq' ? 'Vathë' : 'Earrings'}</Link>
            <Link href="/shop?category=necklaces"      className="footer-link">{language === 'sq' ? 'Qafore' : 'Necklaces'}</Link>
            <Link href="/shop?category=bracelets"      className="footer-link">{language === 'sq' ? 'Byzylykë' : 'Bracelets'}</Link>
            <Link href="/gift-vouchers"                className="footer-link">{language === 'sq' ? 'Kuponë Dhuratë' : 'Gift Vouchers'}</Link>
          </div>

          {/* Help */}
          <div>
            <p className="footer-title">{t.footer.help}</p>
            <Link href="/shipping"  className="footer-link">{t.footer.shipping}</Link>
            <Link href="/warranty"  className="footer-link">{t.footer.warranty}</Link>
            <Link href="/faq"       className="footer-link">{t.footer.faq}</Link>
            <Link href="/contact"   className="footer-link">{t.footer.contact}</Link>
            <Link href="/ring-sizer" className="footer-link">{language === 'sq' ? 'Matësi i Unazës' : 'Ring Sizer'}</Link>
          </div>

          {/* DeSuisse */}
          <div>
            <p className="footer-title">DeSuisse</p>
            <Link href="/about"          className="footer-link">{language === 'sq' ? 'Historia Jonë' : 'Our History'}</Link>
            <Link href="/boutiques"      className="footer-link">{language === 'sq' ? 'Boutique-t' : 'Boutiques'}</Link>
            <Link href="/custom-design"  className="footer-link">{language === 'sq' ? 'Dizajn i Personalizuar' : 'Custom Design'}</Link>
            <Link href="/ring-story"     className="footer-link">{language === 'sq' ? 'Historia e Unazës' : 'Ring Story'}</Link>
            <Link href="/contact"        className="footer-link">{t.footer.contact}</Link>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-title">{t.footer.newsletter}</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', lineHeight: 1.7, marginBottom: 16 }}>
              {t.footer.newsletterSub}
            </p>
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                style={{ flex: '1 1 180px', minWidth: 0, padding: '10px 14px', border: '1px solid #333', background: '#111', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 12, outline: 'none' }}
              />
              <button className="btn-gold" style={{ padding: '10px 18px', fontSize: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>{t.footer.subscribe}</button>
            </div>
          </div>
        </div>

        {/* Social icons row — above the bottom bar */}
        <SocialBar language={language} />

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #2a1a1a', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <img
            src="/images/desuisse-logo-white.png"
            alt="DeSuisse Luxury Jewellery"
            style={{ height: 36, width: 'auto', display: 'block', opacity: 0.7 }}
          />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#555', letterSpacing: '0.08em' }}>
            © {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}