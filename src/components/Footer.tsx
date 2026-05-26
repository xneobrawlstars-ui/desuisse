'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  return (
    <footer className="site-footer" style={{ padding: '64px 0 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Help */}
          <div>
            <p className="footer-title">{t.footer.help}</p>
            <Link href="/shipping" className="footer-link">{t.footer.shipping}</Link>
            <Link href="/warranty" className="footer-link">{t.footer.warranty}</Link>
            <Link href="/faq" className="footer-link">{t.footer.faq}</Link>
            <Link href="/contact" className="footer-link">{t.footer.contact}</Link>
          </div>

          {/* Stores */}
          <div>
            <p className="footer-title">{t.footer.stores}</p>
            <a href="#" className="footer-link">{t.footer.storesList}</a>
            <a href="#" className="footer-link">{t.footer.piercing}</a>
            <a href="#" className="footer-link">{t.footer.styling}</a>
          </div>

          {/* Resources */}
          <div>
            <p className="footer-title">{t.footer.resources}</p>
            <Link href="/jewelry-care" className="footer-link">{t.footer.jewelryCare}</Link>
            <Link href="/ring-sizer" className="footer-link">{t.footer.ringSizer}</Link>
            <Link href="/diamond-guide" className="footer-link">{t.footer.piercingAftercare}</Link>
            <a href="#" className="footer-link">{t.footer.styleEdit}</a>
          </div>

          {/* About */}
          <div>
            <p className="footer-title">{t.footer.about}</p>
            <Link href="/about" className="footer-link">{t.footer.mission}</Link>
            <a href="#" className="footer-link">{t.footer.empowerment}</a>
            <a href="#" className="footer-link">{t.footer.quality}</a>
            <a href="#" className="footer-link">{t.footer.sustainability}</a>
            <a href="#" className="footer-link">{t.footer.materials}</a>
          </div>

          {/* Newsletter */}
          <div style={{ gridColumn: 'span 1' }}>
            <p className="footer-title">{t.footer.newsletter}</p>
            <p style={{ fontFamily: 'Montserrat', fontSize: 12, color: '#888', lineHeight: 1.7, marginBottom: 16 }}>
              {t.footer.newsletterSub}
            </p>
            <div style={{ display: 'flex', gap: 0 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.newsletterPlaceholder}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #333',
                  background: '#111',
                  color: '#fff',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                  outline: 'none',
                }}
              />
              <button className="btn-gold" style={{ padding: '10px 20px', fontSize: 10 }}>
                {t.footer.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #2a1a1a',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <Image
            src="https://desuisse.com/wp-content/uploads/2023/02/desuisselogo-2.png"
            alt="DeSuisse"
            width={120}
            height={36}
            style={{ objectFit: 'contain', height: 36, width: 'auto', filter: 'brightness(0) invert(1) opacity(0.5)' }}
            unoptimized
          />
          <p style={{ fontFamily: 'Montserrat', fontSize: 11, color: '#555', letterSpacing: '0.08em' }}>
            © {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
