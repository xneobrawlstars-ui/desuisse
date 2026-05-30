'use client';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Customer Reviews / Testimonials page.
 *
 * The reviews here are PLACEHOLDERS designed to show the layout.
 * Replace each one with a real customer review and (optionally) a photo
 * in /public/images/ named: review-1.jpg, review-2.jpg, etc.
 *
 * If a photo file doesn't exist, an elegant initial-letter avatar is shown
 * instead — so the page always looks good even with no photos.
 */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// 5-star rating display
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#c9a84c' : '#e8e0d4'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

// Avatar with photo or fallback initial
function Avatar({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);
  const initial = name.charAt(0).toUpperCase();
  const showPhoto = photo && !failed;

  return (
    <div style={{
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#1a0a0a',
      color: '#c9a84c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-serif)',
      fontSize: 22,
      fontWeight: 400,
      flexShrink: 0,
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #e8e0d4',
    }}>
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}

interface Review {
  name: string;
  location: string;
  product: string;
  rating: number;
  text: string;
  photo?: string;
  date: string;
}

export default function ReviewsPage() {
  const { language } = useLanguage();
  const sq = language === 'sq';

  // PLACEHOLDER reviews. Replace these with real customer content.
  // To add a photo for a review: put e.g. review-1.jpg in /public/images/
  // and set photo: '/images/review-1.jpg' in the corresponding entry.
  const reviews: Review[] = sq ? [
    {
      name: 'Klienti i Vërtetë #1',
      location: 'Prishtinë, Kosovë',
      product: 'Unaza e Fejesës',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni me një vlerësim të vërtetë nga klienti. P.sh. "Shërbimi ishte i jashtëzakonshëm. Stafi më ndihmoi të zgjedh unazën perfekte për fejesën time. Cilësia e diamantit dhe e arit janë të padiskutueshme."]]',
      photo: '/images/review-1.jpg',
      date: 'Maj 2026',
    },
    {
      name: 'Klienti i Vërtetë #2',
      location: 'Karlovy Vary, Çeki',
      product: 'Bizhuteri me Porosi',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni me një vlerësim të vërtetë. P.sh. "Bashkëpunova me dizajnerët e deSuisse për një kolan unik për gruan time. Rezultati i ka kaluar pritjet tona — bizhuteri vërtet e personalizuar dhe e jashtëzakonshme."]]',
      photo: '/images/review-2.jpg',
      date: 'Prill 2026',
    },
    {
      name: 'Klienti i Vërtetë #3',
      location: 'Pejë, Kosovë',
      product: 'Unazat e Martesës',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni. P.sh. "Zgjodhëm unazat tona të martesës këtu dhe nuk pendohemi as një moment. Profesionalizëm, durim, dhe një ndjenjë e vërtetë e luksit nga momenti që hyre në boutique."]]',
      photo: '/images/review-3.jpg',
      date: 'Mars 2026',
    },
    {
      name: 'Klienti i Vërtetë #4',
      location: 'Prizren, Kosovë',
      product: 'Vathë me Diamant',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni me një vlerësim të vërtetë.]]',
      photo: '/images/review-4.jpg',
      date: 'Shkurt 2026',
    },
    {
      name: 'Klienti i Vërtetë #5',
      location: 'Praga, Çeki',
      product: 'Byzylyk i Personalizuar',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni me një vlerësim të vërtetë.]]',
      photo: '/images/review-5.jpg',
      date: 'Shkurt 2026',
    },
    {
      name: 'Klienti i Vërtetë #6',
      location: 'Tiranë, Shqipëri',
      product: 'Kolan Floriri',
      rating: 5,
      text: '[[PLACEHOLDER — Zëvendësoni me një vlerësim të vërtetë.]]',
      photo: '/images/review-6.jpg',
      date: 'Janar 2026',
    },
  ] : [
    {
      name: 'Real Customer #1',
      location: 'Pristina, Kosovo',
      product: 'Engagement Ring',
      rating: 5,
      text: '[[PLACEHOLDER — Replace with a real customer review. e.g. "The service was exceptional. The staff helped me choose the perfect ring for my engagement. The quality of the diamond and gold are unquestionable."]]',
      photo: '/images/review-1.jpg',
      date: 'May 2026',
    },
    {
      name: 'Real Customer #2',
      location: 'Karlovy Vary, Czech Republic',
      product: 'Custom Piece',
      rating: 5,
      text: '[[PLACEHOLDER — Replace with a real review. e.g. "I worked with the deSuisse designers on a unique necklace for my wife. The result exceeded our expectations — truly bespoke and extraordinary jewellery."]]',
      photo: '/images/review-2.jpg',
      date: 'April 2026',
    },
    {
      name: 'Real Customer #3',
      location: 'Pejë, Kosovo',
      product: 'Wedding Bands',
      rating: 5,
      text: '[[PLACEHOLDER — Replace. e.g. "We chose our wedding rings here and have not regretted it for a moment. Professionalism, patience, and a real sense of luxury from the moment you enter the boutique."]]',
      photo: '/images/review-3.jpg',
      date: 'March 2026',
    },
    {
      name: 'Real Customer #4',
      location: 'Prizren, Kosovo',
      product: 'Diamond Earrings',
      rating: 5,
      text: '[[PLACEHOLDER — Replace with a real review.]]',
      photo: '/images/review-4.jpg',
      date: 'February 2026',
    },
    {
      name: 'Real Customer #5',
      location: 'Prague, Czech Republic',
      product: 'Custom Bracelet',
      rating: 5,
      text: '[[PLACEHOLDER — Replace with a real review.]]',
      photo: '/images/review-5.jpg',
      date: 'February 2026',
    },
    {
      name: 'Real Customer #6',
      location: 'Tirana, Albania',
      product: 'Gold Necklace',
      rating: 5,
      text: '[[PLACEHOLDER — Replace with a real review.]]',
      photo: '/images/review-6.jpg',
      date: 'January 2026',
    },
  ];

  const t = sq ? {
    eyebrow: '◆ Klientët Tanë',
    title: 'Çfarë Thonë Klientët Tanë',
    subtitle: 'Çdo unazë mban një histori. Këto janë disa nga klientët tanë që na lejuan të jemi pjesë e historisë së tyre.',
    cta: 'Vizitoni një nga butikët tanë',
    ctaBody: 'Eksperti ynë do t\u2019ju ndihmojë të gjeni copën që rezonon me ju.',
    ctaBtn: 'Shihni butikët',
    leaveReview: 'Doni të ndani përvojën tuaj? Na shkruani në info@desuisse.com',
  } : {
    eyebrow: '◆ Our Clients',
    title: 'What Our Clients Say',
    subtitle: 'Every ring carries a story. These are some of the clients who let us be part of theirs.',
    cta: 'Visit one of our boutiques',
    ctaBody: 'Our expert will help you find the piece that resonates with you.',
    ctaBtn: 'See our boutiques',
    leaveReview: 'Want to share your experience? Write to us at info@desuisse.com',
  };

  return (
    <>
      <Header />

      {/* Header */}
      <div style={{ background: '#f7f3ee', padding: '70px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>{t.eyebrow}</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.15, maxWidth: 800, margin: '0 auto' }}>{t.title}</h1>
        <div style={{ width: 48, height: 1, background: '#c9a84c', margin: '24px auto 0' }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#666', lineHeight: 1.85, maxWidth: 580, margin: '24px auto 0' }}>{t.subtitle}</p>
      </div>

      {/* Reviews grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 60}>
              <article style={{
                background: '#fff',
                border: '1px solid #e8e0d4',
                padding: '28px 28px 26px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}>
                {/* Header: avatar + name */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <Avatar name={r.name} photo={r.photo} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: '#1a0a0a', fontWeight: 500, marginBottom: 2 }}>
                      {r.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#999', letterSpacing: '0.04em' }}>
                      {r.location}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <Stars count={r.rating} />

                {/* Review text */}
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 15,
                  color: '#444',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                  flex: 1,
                }}>
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Footer: product + date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid #f0ebe3' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 600 }}>
                    {r.product}
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#aaa', letterSpacing: '0.04em' }}>
                    {r.date}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Leave a review */}
        <p style={{
          textAlign: 'center',
          marginTop: 60,
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#888',
          letterSpacing: '0.04em',
        }}>{t.leaveReview}</p>
      </section>

      {/* CTA */}
      <section style={{ background: '#1a0a0a', padding: '70px 40px', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.4em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 16 }}>◆</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, color: '#fff', marginBottom: 12 }}>{t.cta}</h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#bbb', maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.85 }}>{t.ctaBody}</p>
          <a href="/boutiques" style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: '#c9a84c',
            color: '#1a0a0a',
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}>{t.ctaBtn}</a>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
