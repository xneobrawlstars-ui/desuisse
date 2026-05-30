'use client';
/**
 * Loading animation: a ring box viewed head-on (front-facing).
 *
 * Animation cycle (~2.6s):
 *  - Closed: box with deSuisse logo on the front of the lid
 *  - Lid lifts UP and tilts back (hinged at top-back edge)
 *  - Ring with diamond rises from inside the box
 *  - Pause briefly with ring visible
 *  - Ring lowers back into box
 *  - Lid closes
 *
 * The logo is embedded directly from /public/images/desuisse-logo-white.png
 * (the white version, since the box is dark burgundy).
 *
 * Note for future maintenance: the lid uses transform-origin at its TOP
 * edge so it pivots backward (like opening a treasure chest), not to the
 * side. This keeps the box facing the viewer the whole time.
 */
import { CSSProperties } from 'react';

interface Props {
  fullscreen?: boolean;
  inline?: boolean;
  size?: number;
  label?: string;
}

export default function RingBoxLoader({
  fullscreen = false,
  inline = false,
  size = 120,
  label,
}: Props) {
  const containerStyle: CSSProperties = fullscreen
    ? {
        position: 'fixed', inset: 0, zIndex: 9998,
        background: 'rgba(247, 243, 238, 0.92)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 18,
        backdropFilter: 'blur(4px)',
      }
    : inline
    ? { display: 'inline-flex', alignItems: 'center', gap: 10 }
    : {
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
        padding: 40,
      };

  return (
    <div style={containerStyle} role="status" aria-live="polite">
      <style>{`
        /* Lid hinged at top edge — pivots BACKWARD when opening (like a
           treasure chest opening towards the viewer). We simulate the
           back-tilt by both rotating and scaling vertically to fake the
           foreshortening. */
        .ds-loader-lid {
          transform-origin: 50px 48px;
          animation: ds-loader-lid-open 2.6s infinite ease-in-out;
        }
        .ds-loader-ring {
          transform-origin: 50px 60px;
          animation: ds-loader-ring-rise 2.6s infinite ease-in-out;
        }
        .ds-loader-sparkle {
          animation: ds-loader-sparkle 1.4s infinite ease-in-out;
          transform-origin: center;
        }
        @keyframes ds-loader-lid-open {
          0%, 12%   { transform: rotate(0deg) scaleY(1); }
          45%, 75%  { transform: rotate(0deg) scaleY(-0.25) translateY(38px); }
          95%, 100% { transform: rotate(0deg) scaleY(1); }
        }
        @keyframes ds-loader-ring-rise {
          0%, 18%   { transform: translateY(14px); opacity: 0; }
          45%, 72%  { transform: translateY(0px);  opacity: 1; }
          90%, 100% { transform: translateY(14px); opacity: 0; }
        }
        @keyframes ds-loader-sparkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
      `}</style>

      <svg
        viewBox="0 0 100 100"
        style={{ width: size, height: size, overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ── INTERIOR OF BOX (the dark slot, visible when lid is open) ── */}
        {/* Dark inner space */}
        <rect x="22" y="48" width="56" height="22" fill="#0a0303" />
        {/* Cream satin lining strip at the top */}
        <rect x="22" y="48" width="56" height="2.5" fill="#f0e6d6" />

        {/* ── RING — rises from inside when lid is open ── */}
        <g className="ds-loader-ring">
          {/* Gold band */}
          <circle cx="50" cy="60" r="11" fill="none" stroke="#c9a84c" strokeWidth="2.2" />
          {/* Inner highlight on band */}
          <circle cx="50" cy="60" r="9.5" fill="none" stroke="#e1c987" strokeWidth="0.5" opacity="0.6" />

          {/* Prongs */}
          <line x1="45" y1="51" x2="44" y2="45" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="55" y1="51" x2="56" y2="45" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />

          {/* DIAMOND — round-brilliant cut, side view */}
          <g>
            <polygon points="38,45 62,45 56,35 44,35" fill="#f5faff" stroke="#c9a84c" strokeWidth="0.8" strokeLinejoin="round" />
            <polygon points="44,35 56,35 54,37 46,37" fill="#ffffff" stroke="#c9a84c" strokeWidth="0.4" />
            <polygon points="38,45 62,45 50,57" fill="#dbe7f0" stroke="#c9a84c" strokeWidth="0.8" strokeLinejoin="round" />

            {/* Facet lines */}
            <line x1="44" y1="35" x2="42" y2="45" stroke="#c9a84c" strokeWidth="0.4" opacity="0.8" />
            <line x1="56" y1="35" x2="58" y2="45" stroke="#c9a84c" strokeWidth="0.4" opacity="0.8" />
            <line x1="50" y1="35" x2="50" y2="45" stroke="#c9a84c" strokeWidth="0.4" opacity="0.5" />
            <line x1="42" y1="45" x2="50" y2="57" stroke="#c9a84c" strokeWidth="0.4" opacity="0.6" />
            <line x1="58" y1="45" x2="50" y2="57" stroke="#c9a84c" strokeWidth="0.4" opacity="0.6" />
            <line x1="50" y1="45" x2="50" y2="57" stroke="#c9a84c" strokeWidth="0.4" opacity="0.4" />

            {/* Highlight */}
            <ellipse cx="47" cy="38" rx="2" ry="0.6" fill="#ffffff" opacity="0.9" />

            {/* Sparkle */}
            <g className="ds-loader-sparkle">
              <path d="M 53 36 L 53.5 37.5 L 55 38 L 53.5 38.5 L 53 40 L 52.5 38.5 L 51 38 L 52.5 37.5 Z" fill="#ffffff" />
            </g>
          </g>
        </g>

        {/* ── BOX BASE (front face, always visible) ── */}
        <rect x="22" y="62" width="56" height="28" rx="2" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.7" />
        {/* Subtle gradient (darker at bottom) */}
        <rect x="22" y="84" width="56" height="6" rx="2" fill="#0a0303" opacity="0.5" />
        {/* Gold trim along bottom */}
        <rect x="24" y="87" width="52" height="0.8" fill="#c9a84c" opacity="0.7" />
        {/* Front gold-trim seam line where the lid would sit */}
        <rect x="22" y="61.5" width="56" height="1" fill="#c9a84c" opacity="0.3" />

        {/* ── LID — front-facing, opens UP (hinged at top) ── */}
        <g className="ds-loader-lid">
          {/* Main lid body — front-facing rectangle */}
          <rect x="22" y="48" width="56" height="14" rx="2" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.7" />
          {/* Subtle inner shading at top */}
          <rect x="22" y="48" width="56" height="2" fill="#0a0303" opacity="0.6" />
          {/* Gold trim along top */}
          <rect x="24" y="49" width="52" height="0.6" fill="#c9a84c" opacity="0.5" />

          {/* deSuisse logo on the front of the lid (white version on dark box) */}
          <image
            href="/images/desuisse-logo-white.png"
            x="32"
            y="51"
            width="36"
            height="9"
            preserveAspectRatio="xMidYMid meet"
            opacity="0.95"
          />
        </g>
      </svg>

      {label && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#999',
        }}>{label}</p>
      )}
    </div>
  );
}
