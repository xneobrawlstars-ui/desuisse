'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function BoutiquesPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'sq' ? 'Boutique-t Tona' : 'Boutiques',
    subtitle: language === 'sq'
      ? 'Brendi DeSuisse lindi në rajonin Karlovy Vary, zemra e Republikës Çeke, si simbol i eksepsionalizmit dhe elegancës. Nga samimi, ai ka qenë sinonim i historisë dhe i një guri të çmuar të Bohemisë, duke përfaqësuar traditën, cilësinë dhe luksin.'
      : 'The DeSuisse brand was born in the Karlovy Vary region, the heart of the Czech Republic, as a symbol of exceptionalism and elegance. From the very beginning, it has been synonymous with history and a gem of Bohemia, representing tradition, quality, and luxury.',
    schedule: language === 'sq' ? 'CAKTO NJË TAKIM' : 'SCHEDULE A MEETING',
    mapLink: language === 'sq' ? 'Shiko në hartë' : 'View on map',
    comingSoon: language === 'sq' ? 'Së shpejti' : 'Coming Soon',
    comingSoonSub: language === 'sq' ? 'Kjo boutique do të hapet së shpejti. Qëndroni të informuar.' : 'This boutique will be opening soon. Stay tuned.',
    photoNote: language === 'sq' ? 'Shtoni foton e boutique-s këtu' : 'Add your boutique photo here',
    photoHow: language === 'sq'
      ? 'Vendosni foton në public/images/boutique-1.jpg'
      : 'Place your photo at public/images/boutique-1.jpg',
  };

  // ── HOW TO ADD PHOTOS ──────────────────────────────────────
  // 1. Put your boutique photos in the public/images/ folder:
  //    public/images/boutique-1.jpg   (DeSuisse I)
  //    public/images/boutique-2.jpg   (DeSuisse II)
  //    public/images/boutique-3.jpg   (DeSuisse III)
  //    public/images/boutique-4.jpg   (DeSuisse IV)
  //
  // 2. Change the `image` field below for each boutique:
  //    image: '/images/boutique-1.jpg'
  //
  // 3. To edit boutique info (name, address, phone, etc.):
  //    Just edit the values in the boutiques array below.
  //    Each field is labelled clearly.
  // ────────────────────────────────────────────────────────────

  const boutiques = [
    {
      name: 'DeSuisse I',
      // ↓ Replace with your actual address
      address: 'Stará Louka 335/48, 360 01 Karlovy Vary',
      // ↓ Replace with your phone
      phone: '+420 725 009 809',
      // ↓ Replace with your email
      email: 'info@desuisse.com',
      // ↓ Replace with your hours
      hours: language === 'sq' ? 'E Hënë – E Shtunë: 10:00 – 19:00' : 'Monday – Saturday: 10:00 – 19:00',
      // ↓ Google Maps link
      mapUrl: 'https://maps.app.goo.gl/fN3hvrF5KonRYa966',
      // ↓ Path to your photo (put file in public/images/)
      image: '/images/boutique-1.jpg',
      comingSoon: false,
    },
    {
      name: 'DeSuisse II',
      address: '',
      phone: '',
      email: '',
      hours: '',
      mapUrl: '',
      image: '/images/boutique-2.jpg',
      comingSoon: true,
    },
    {
      name: 'DeSuisse III',
      address: '',
      phone: '',
      email: '',
      hours: '',
      mapUrl: '',
      image: '/images/boutique-3.jpg',
      comingSoon: true,
    },
    {
      name: 'DeSuisse IV',
      address: '',
      phone: '',
      email: '',
      hours: '',
      mapUrl: '',
      image: '/images/boutique-4.jpg',
      comingSoon: true,
    },
  ];

  const icons = {
    address: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    email: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    phone: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    clock: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  };

  return (
    <>
      <Header />

      {/* Page header */}
      <div style={{ background: '#f7f3ee', padding: '72px 40px 60px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>✦ DeSuisse</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#1a0a0a', letterSpacing: '0.08em', marginBottom: 20 }}>{t.title}</h1>
        <p style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#888', maxWidth: 600, margin: '0 auto', lineHeight: 1.9 }}>{t.subtitle}</p>
      </div>

      {/* Boutiques list */}
      {boutiques.map((b, i) => {
        const isEven = i % 2 === 0;
        // Info panel is LEFT on even, RIGHT on odd (matching artdesuisse.com style)
        return (
          <Reveal key={i} delay={0}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: 500,
              borderBottom: '1px solid #e8e0d4',
            }}>

              {/* INFO PANEL */}
              <div style={{
                order: isEven ? 1 : 2,
                padding: '72px 72px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#fff',
              }}>
                {b.comingSoon ? (
                  <>
                    <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 20, letterSpacing: '0.04em' }}>{b.name}</h2>
                    <div style={{ width: 40, height: 1, background: '#e8e0d4', marginBottom: 20 }} />
                    <p style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#bbb', lineHeight: 1.8, marginBottom: 32 }}>{t.comingSoonSub}</p>
                    <span style={{ display: 'inline-block', padding: '8px 20px', border: '1px solid #e8e0d4', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ccc', alignSelf: 'flex-start' }}>
                      {t.comingSoon}
                    </span>
                  </>
                ) : (
                  <>
                    <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 20, letterSpacing: '0.04em' }}>{b.name}</h2>
                    <div style={{ width: 40, height: 1, background: '#c9a84c', marginBottom: 28 }} />

                    {/* Contact details with icons — matching artdesuisse.com style */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                      {b.address && (
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                          {icons.address}
                          <span style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#444', lineHeight: 1.5 }}>{b.address}</span>
                        </div>
                      )}
                      {b.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {icons.email}
                          <a href={`mailto:${b.email}`} style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#444', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'}
                            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#444'}
                          >{b.email}</a>
                        </div>
                      )}
                      {b.phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {icons.phone}
                          <span style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#444' }}>{b.phone}</span>
                        </div>
                      )}
                      {b.hours && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {icons.clock}
                          <span style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#444' }}>{b.hours}</span>
                        </div>
                      )}
                    </div>

                    {/* Schedule a meeting button */}
                    <Link href="/contact" style={{
                      display: 'inline-block',
                      padding: '14px 28px',
                      background: '#1a0a0a',
                      color: '#fff',
                      fontFamily: 'Montserrat',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      alignSelf: 'flex-start',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#c9a84c'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#1a0a0a'}
                    >
                      {t.schedule}
                    </Link>
                  </>
                )}
              </div>

              {/* PHOTO PANEL */}
              <div style={{
                order: isEven ? 2 : 1,
                position: 'relative',
                minHeight: 500,
                background: '#f0ebe3',
                overflow: 'hidden',
              }}>
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
                  unoptimized
                  onError={() => {}}
                />
                {/* Coming soon overlay if image is missing */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: '#e8e0d4',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
                }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#bbb', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {language === 'sq' ? 'Shtoni foton' : 'Add photo'}
                    </p>
                    <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#ccc', letterSpacing: '0.06em' }}>
                      public/images/boutique-{i + 1}.jpg
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        );
      })}

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .boutique-row { grid-template-columns: 1fr !important; }
          .boutique-row > div { order: unset !important; min-height: 280px !important; padding: 40px 28px !important; }
        }
        @media (max-width: 768px) {
          .boutique-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
