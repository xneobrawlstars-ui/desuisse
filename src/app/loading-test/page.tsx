'use client';
/**
 * Loading animation test/preview page.
 *
 * Lets you see the ring-box loader at different sizes and modes
 * without having to catch it during a real page transition.
 *
 * Visit /loading-test in your browser.
 */
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RingBoxLoader from '@/components/RingBoxLoader';

export default function LoadingTestPage() {
  const [fullscreen, setFullscreen] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  return (
    <>
      <Header />

      {/* Optional fullscreen overlay demo */}
      {fullscreen && (
        <div onClick={() => setFullscreen(false)}>
          <RingBoxLoader fullscreen label={showLabel ? 'Loading' : undefined} />
        </div>
      )}

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 32px 80px' }}>
        {/* Page heading */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>
            ◆ Preview
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.15 }}>
            Loading Animation
          </h1>
          <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '18px auto 0' }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#888', marginTop: 18, maxWidth: 580, margin: '18px auto 0', lineHeight: 1.8 }}>
            This is the branded loading animation that appears between page transitions on the site. Below you can preview it at different sizes.
          </p>
        </div>

        {/* Controls */}
        <div style={{
          background: '#f7f3ee', border: '1px solid #e8e0d4', padding: '20px 28px',
          marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888' }}>
            Controls:
          </span>
          <button
            onClick={() => setFullscreen(true)}
            style={{
              padding: '10px 20px',
              background: '#1a0a0a', color: '#fff', border: 'none',
              fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            Show Fullscreen Overlay
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 12, color: '#444', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showLabel}
              onChange={e => setShowLabel(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            Show &ldquo;Loading&rdquo; label
          </label>
          {fullscreen && (
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#c9a84c', marginLeft: 'auto' }}>
              Click the overlay to dismiss →
            </span>
          )}
        </div>

        {/* Three preview cards at different sizes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Small */}
          <div style={{ background: '#fff', border: '1px solid #e8e0d4', overflow: 'hidden' }}>
            <div style={{ background: '#fafaf8', padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
              <RingBoxLoader size={80} label={showLabel ? 'Loading' : undefined} />
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e8e0d4' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700, marginBottom: 4 }}>
                Small — 80px
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', lineHeight: 1.6 }}>
                For inline buttons, small components, mobile.
              </p>
            </div>
          </div>

          {/* Medium (default) */}
          <div style={{ background: '#fff', border: '1px solid #e8e0d4', overflow: 'hidden' }}>
            <div style={{ background: '#fafaf8', padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
              <RingBoxLoader size={120} label={showLabel ? 'Loading' : undefined} />
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e8e0d4' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700, marginBottom: 4 }}>
                Default — 120px
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', lineHeight: 1.6 }}>
                Standard size for page-level loading states.
              </p>
            </div>
          </div>

          {/* Large */}
          <div style={{ background: '#fff', border: '1px solid #e8e0d4', overflow: 'hidden' }}>
            <div style={{ background: '#fafaf8', padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
              <RingBoxLoader size={180} label={showLabel ? 'Loading' : undefined} />
            </div>
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e8e0d4' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700, marginBottom: 4 }}>
                Large — 180px
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', lineHeight: 1.6 }}>
                For dedicated loading screens or hero placeholders.
              </p>
            </div>
          </div>
        </div>

        {/* On dark background variant */}
        <div style={{ marginTop: 40, background: '#1a0a0a', border: '1px solid #2a1a1a', padding: '60px 32px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>
            On dark background — same gold strokes, transparent fill
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RingBoxLoader size={140} label={showLabel ? 'Loading' : undefined} />
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginTop: 40, padding: '24px 28px', background: '#f7f3ee', border: '1px solid #e8e0d4' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1a0a0a', marginBottom: 10 }}>
            ◆ Notes
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              • 2D line-art engagement ring, gold strokes on transparent background — looks right on any background colour.
            </li>
            <li style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              • The ring gently floats up and down on a 4-second cycle.
            </li>
            <li style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              • The diamond has two sparkle effects: a heart-glow that pulses, and a small star that traverses the facets.
            </li>
            <li style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              • Pure SVG — no images, no JavaScript animation library, scales cleanly at any size.
            </li>
            <li style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555', lineHeight: 1.8 }}>
              • When you delete this test page after launch, the loader still works automatically on page transitions via <code style={{ background: '#fff', padding: '2px 6px', fontSize: 12 }}>src/app/loading.tsx</code>.
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
