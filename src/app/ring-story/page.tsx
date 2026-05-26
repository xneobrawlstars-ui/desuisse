'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function RingStoryPage() {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const sectionRefs = {
    idea:          useRef<HTMLDivElement>(null),
    sketch:        useRef<HTMLDivElement>(null),
    visualization: useRef<HTMLDivElement>(null),
    prototype:     useRef<HTMLDivElement>(null),
    finalization:  useRef<HTMLDivElement>(null),
  };

  const scrollTo = (key: keyof typeof sectionRefs) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveStep(key);
  };

  const t = {
    title:   language === 'sq' ? 'Historia e Unazës' : 'The Story of the Ring',
    intro:   language === 'sq'
      ? 'Rruga drejt më të mirës është e gjatë por e bukur. Pavarësisht nëse kjo është marrëdhënia me dikë që e doni apo me një unazë.'
      : 'The path to the best is long but beautiful. Whether this is a relationship with someone you love or a ring.',
    btnLabel: language === 'sq' ? 'LE TË UDHËTOJMË SË BASHKU' : "LET'S TAKE THIS JOURNEY TOGETHER",
    steps: [
      {
        key: 'idea', label: language === 'sq' ? 'IDEJA' : 'IDEA',
        title: language === 'sq' ? 'Ideja' : 'The Idea',
        content: language === 'sq'
          ? 'Çdo unazë e jashtëzakonshme fillon me një ide. Na tregoni ëndrrën tuaj — çfarë dëshironi të shprehni me unazën tuaj. Takohuni me argjendarët tanë për të eksploruar mundësitë pa kufij.'
          : 'Every extraordinary ring begins with an idea. Tell us your dream — what you want to express with your ring. Meet with our goldsmiths to explore endless possibilities.',
      },
      {
        key: 'sketch', label: language === 'sq' ? 'SKICA' : 'SKETCH',
        title: language === 'sq' ? 'Skica' : 'The Sketch',
        content: language === 'sq'
          ? 'Dizajnerët tanë kthejnë idenë tuaj në skica të detajuara. Do të shihni të paktën tre variacione të ndryshme të dizajnit para se të kalojmë në fazën tjetër.'
          : 'Our designers transform your idea into detailed sketches. You will see at least three different design variations before we move to the next phase.',
      },
      {
        key: 'visualization', label: language === 'sq' ? 'VIZUALIZIMI' : 'VISUALIZATION',
        title: language === 'sq' ? 'Vizualizimi' : 'Visualization',
        content: language === 'sq'
          ? 'Duke përdorur teknologjinë 3D të avancuar, krijohet një model dixhital i saktë i unazës suaj. Mund ta shihni nga çdo kënd para se të fillohet prodhimi.'
          : 'Using advanced 3D technology, a precise digital model of your ring is created. You can view it from every angle before production begins.',
      },
      {
        key: 'prototype', label: language === 'sq' ? 'PROTOTIPI' : 'PROTOTYPE',
        title: language === 'sq' ? 'Prototipi' : 'The Prototype',
        content: language === 'sq'
          ? 'Krijohet një prototip fizik i unazës suaj. Kjo ju lejon ta ndieni, ta provoni dhe të bëni çdo ndryshim të fundit para prodhimit final në ar ose platin.'
          : 'A physical prototype of your ring is created. This allows you to feel it, try it on, and make any final adjustments before final production in gold or platinum.',
      },
      {
        key: 'finalization', label: language === 'sq' ? 'FINALIZIMI' : 'FINALIZATION',
        title: language === 'sq' ? 'Finalizimi' : 'Finalization',
        content: language === 'sq'
          ? 'Argjendarët tanë me eksperiencë prodhojnë unazën tuaj me saktësi të lartë. Çdo detal kontrollohet dhe polirohet deri në përsosmëri para dorëzimit final.'
          : 'Our experienced goldsmiths produce your ring with the highest precision. Every detail is checked and polished to perfection before the final delivery.',
      },
    ],
  };

  return (
    <>
      <Header />

      {/* Hero — photos + intro text */}
      <section style={{ position: 'relative', minHeight: '70vh', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden' }}>
        {/* Photos left side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4, background: '#1a0a0a' }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{ background: '#2a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 200 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <p style={{ fontFamily: 'Montserrat', fontSize: 9, color: '#555', textAlign: 'center' }}>public/images/story-{n}.jpg</p>
            </div>
          ))}
        </div>

        {/* Text right side */}
        <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px' }}>
          <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 20 }}>✦ DeSuisse</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.2, marginBottom: 24 }}>
            {t.title}
          </h1>
          <p style={{ fontFamily: 'Montserrat', fontSize: 14, color: '#666', lineHeight: 2, marginBottom: 36 }}>
            {t.intro}
          </p>
          <Link href="#idea" onClick={(e) => { e.preventDefault(); scrollTo('idea'); }} style={{ display: 'inline-block', padding: '14px 28px', border: '1px solid #1a0a0a', color: '#1a0a0a', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s', alignSelf: 'flex-start' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1a0a0a'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#1a0a0a'; }}
          >
            {t.btnLabel}
          </Link>
        </div>
      </section>

      {/* Step navigation bar */}
      <div style={{ background: '#fff', borderTop: '1px solid #e8e0d4', borderBottom: '1px solid #e8e0d4', position: 'sticky', top: 73, zIndex: 50 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          {t.steps.map((step, i) => (
            <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={() => scrollTo(step.key as keyof typeof sectionRefs)} style={{
                padding: '20px 28px', background: 'none', border: 'none',
                borderBottom: `2px solid ${activeStep === step.key ? '#c9a84c' : 'transparent'}`,
                fontFamily: 'Montserrat', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: activeStep === step.key ? '#c9a84c' : '#888',
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
                {step.label}
              </button>
              {i < t.steps.length - 1 && <span style={{ color: '#ddd', fontSize: 14 }}>—</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Step sections */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px 80px' }}>
        {t.steps.map((step, i) => (
          <div key={step.key} ref={sectionRefs[step.key as keyof typeof sectionRefs]} style={{ paddingTop: 80, display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Photo (alternates sides) */}
            {i % 2 !== 0 && (
              <div style={{ background: '#f7f3ee', border: '1px dashed #e8e0d4', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#ccc' }}>public/images/story-{step.key}.jpg</p>
              </div>
            )}
            <div>
              <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 12 }}>◆ Step {i + 1}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 400, color: '#1a0a0a', marginBottom: 20 }}>{step.title}</h2>
              <div style={{ width: 40, height: 1, background: '#c9a84c', marginBottom: 20 }} />
              <p style={{ fontFamily: 'Montserrat', fontSize: 14, color: '#666', lineHeight: 2 }}>{step.content}</p>
            </div>
            {/* Photo (even steps) */}
            {i % 2 === 0 && (
              <div style={{ background: '#f7f3ee', border: '1px dashed #e8e0d4', aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#ccc' }}>public/images/story-{step.key}.jpg</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"][style*="gap: 64px"] { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </>
  );
}
