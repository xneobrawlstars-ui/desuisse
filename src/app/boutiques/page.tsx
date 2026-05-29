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
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, visible };
}
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>{children}</div>;
}

export default function BoutiquesPage() {
  const { language } = useLanguage();

  const t = {
    title: language === 'sq' ? 'Boutique-t Tona' : 'Boutiques',
    subtitle: language === 'sq'
      ? 'Vizitoni njërën nga boutique-t tona dhe lëreni veten të frymëzoheni nga koleksionet tona.'
      : 'Visit one of our boutiques and let yourself be inspired by our collections.',
    schedule: language === 'sq' ? 'CAKTO NJË TAKIM' : 'SCHEDULE A MEETING',
    mapLink: language === 'sq' ? 'Shiko në hartë' : 'View on map',
    comingSoon: language === 'sq' ? 'Foto së shpejti' : 'Photo coming soon',
    photoNote: language === 'sq' ? 'Shtoni foton' : 'Add photo',
    websiteLink: 'artdesuisse.com',
  };

  const boutiques = [
    {
      name: 'Art de Suisse I',
      address: 'Stará Louka 335/48, 360 01 Karlovy Vary',
      phone: '+420 725 009 809',
      email: 'info@artdesuisse.com',
      hours: language === 'sq' ? 'E Hënë – E Diel: 10:00 – 19:00' : 'Monday – Sunday: 10:00 – 19:00',
      mapUrl: 'https://maps.app.goo.gl/fN3hvrF5KonRYa966',
      website: 'https://artdesuisse.com',
      image: '/images/boutique-1.jpg',
    },
    {
      name: 'Art de Suisse II',
      address: 'Lázeňská 693, 360 01 Karlovy Vary',
      phone: '+420 725 009 809',
      email: 'info@artdesuisse.com',
      hours: language === 'sq' ? 'E Hënë – E Diel: 10:00 – 19:00' : 'Monday – Sunday: 10:00 – 19:00',
      mapUrl: '',
      website: 'https://artdesuisse.com',
      image: '/images/boutique-2.jpg',
    },
    {
      name: 'Art de Suisse III',
      address: 'Stará Louka 335/50, 360 01 Karlovy Vary',
      phone: '+420 725 009 809',
      email: 'info@artdesuisse.com',
      hours: language === 'sq' ? 'E Hënë – E Diel: 10:00 – 19:00' : 'Monday – Sunday: 10:00 – 19:00',
      mapUrl: '',
      website: 'https://artdesuisse.com',
      image: '/images/boutique-3.jpg',
    },
    {
      name: 'Chopard Boutique',
      address: 'Stará Louka 326/64, 360 01 Karlovy Vary',
      phone: '+420 601 593 322',
      email: 'info@artdesuisse.com',
      hours: language === 'sq' ? 'E Hënë – E Diel: 10:00 – 19:00' : 'Monday – Sunday: 10:00 – 19:00',
      mapUrl: '',
      website: 'https://artdesuisse.com',
      image: '/images/boutique-4.jpg',
    },
    {
      name: 'deSuisse',
      address: 'Eliot Engell 25, 30000 Pejë',
      phone: '+383 48 233 400',
      email: 'info@desuisse.com',
      hours: language === 'sq' ? 'E Hënë – E Shtunë: 10:00 – 18:00' : 'Monday – Saturday: 10:00 – 18:00',
      mapUrl: '',
      website: 'https://desuisse.com',
      image: '', // Photo coming soon — placeholder will render
    },
  ];

  const icons = {
    address: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    email:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    phone:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    clock:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    globe:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  };

  return (
    <>
      <Header />

      <div style={{ background: '#f7f3ee', padding: '72px 40px 60px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>✦ deSuisse</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: '#1a0a0a', letterSpacing: '0.08em', marginBottom: 16 }}>{t.title}</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#888', maxWidth: 500, margin: '0 auto', lineHeight: 1.9 }}>{t.subtitle}</p>
      </div>

      {boutiques.map((b, i) => {
        const isEven = i % 2 === 0;
        return (
          <Reveal key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 480, borderBottom: '1px solid #e8e0d4' }} className="boutique-row">

              {/* Info panel */}
              <div style={{ order: isEven ? 1 : 2, padding: '60px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#fff' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>◆ Boutique</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 20 }}>{b.name}</h2>
                <div style={{ width: 40, height: 1, background: '#c9a84c', marginBottom: 24 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {[
                    { icon: icons.address, value: b.address },
                    { icon: icons.email,   value: b.email },
                    { icon: icons.phone,   value: b.phone },
                    { icon: icons.clock,   value: b.hours },
                    { icon: icons.globe,   value: b.website.replace('https://', ''), href: b.website },
                  ].map((row, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ marginTop: 2, flexShrink: 0 }}>{row.icon}</span>
                      {row.href ? (
                        <a href={row.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#c9a84c', textDecoration: 'none' }}>{row.value}</a>
                      ) : (
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#444', lineHeight: 1.5 }}>{row.value}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', background: '#1a0a0a', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#c9a84c'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#1a0a0a'}
                  >{t.schedule}</Link>
                  {b.mapUrl && (
                    <a href={b.mapUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '12px 20px', border: '1px solid #e8e0d4', color: '#666', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {t.mapLink}
                    </a>
                  )}
                </div>
              </div>

              {/* Photo panel */}
              <div style={{ order: isEven ? 2 : 1, position: 'relative', minHeight: 480, background: '#ede8e0', overflow: 'hidden' }}>
                {b.image ? (
                  <Image
                    src={b.image}
                    alt={b.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  // Elegant placeholder — only shown when no photo is set
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #ede8e0 0%, #d8cfc0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#bba98a" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#a89878', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{t.comingSoon}</p>
                  </div>
                )}
              </div>

            </div>
          </Reveal>
        );
      })}

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .boutique-row { grid-template-columns: 1fr !important; }
          .boutique-row > div { order: unset !important; min-height: 300px !important; padding: 40px 24px !important; }
        }
      `}</style>
    </>
  );
}
