'use client';
/**
 * Loading animation: a ring box that opens, with the engagement ring
 * popping up from inside, then the lid closes. Loops.
 *
 * Structure (matches the user's design intent):
 *  - The box base stays still throughout (burgundy #1a0a0a)
 *  - The lid is hinged at its BOTTOM-LEFT corner and rotates open
 *    (~-80deg from rest), then back to closed
 *  - When the box is open, the ring rises up from inside the box
 *    (translates up and fades in), then settles back down when the
 *    lid closes
 *
 * Brand styling:
 *  - Burgundy box (#1a0a0a), gold trim (#c9a84c)
 *  - Gold ring band with a proper round-brilliant diamond on top
 *  - The diamond has multiple facets and a moving sparkle
 *  - Brand fonts/colors throughout
 *
 * Built using CSS keyframe animations (rather than SVG SMIL) because
 * CSS animations have more consistent cross-browser support for
 * transform-origin rotations.
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
      {/* Inline styles for keyframe animations.
          Keys are namespaced (ds-loader-) so they don't clash with the
          rest of the app's CSS. */}
      <style>{`
        .ds-loader-lid {
          /* Hinge at bottom-left corner of the lid */
          transform-origin: 25px 60px;
          animation: ds-loader-open 2.6s infinite ease-in-out;
        }
        .ds-loader-ring {
          transform-origin: 50px 55px;
          animation: ds-loader-pop 2.6s infinite ease-in-out;
        }
        .ds-loader-sparkle {
          animation: ds-loader-sparkle 1.4s infinite ease-in-out;
          transform-origin: center;
        }
        @keyframes ds-loader-open {
          0%, 12%  { transform: rotate(0deg); }
          45%, 75% { transform: rotate(-85deg); }
          95%, 100% { transform: rotate(0deg); }
        }
        @keyframes ds-loader-pop {
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
        {/* ── BOX INTERIOR (the dark slot the ring sits in) ── */}
        <rect x="25" y="55" width="50" height="15" fill="#0a0303" />
        {/* Cream satin lining strip at the top of the slot */}
        <rect x="25" y="55" width="50" height="2" fill="#f0e6d6" />

        {/* ── RING ── animated to pop up from inside */}
        <g className="ds-loader-ring">
          {/* Gold band — circle */}
          <circle cx="50" cy="55" r="11" fill="none" stroke="#c9a84c" strokeWidth="2.2" />
          {/* Inner highlight on band */}
          <circle cx="50" cy="55" r="9.5" fill="none" stroke="#e1c987" strokeWidth="0.5" opacity="0.6" />

          {/* Prongs holding the diamond */}
          <line x1="45" y1="46" x2="44" y2="40" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="55" y1="46" x2="56" y2="40" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" />

          {/* DIAMOND — round-brilliant cut, side view */}
          <g>
            {/* Crown (upper trapezoid) */}
            <polygon
              points="38,40 62,40 56,30 44,30"
              fill="#f5faff"
              stroke="#c9a84c"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            {/* Table (flat top) */}
            <polygon
              points="44,30 56,30 54,32 46,32"
              fill="#ffffff"
              stroke="#c9a84c"
              strokeWidth="0.4"
            />
            {/* Pavilion (lower triangle pointing down) */}
            <polygon
              points="38,40 62,40 50,52"
              fill="#dbe7f0"
              stroke="#c9a84c"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Crown facet lines */}
            <line x1="44" y1="30" x2="42" y2="40" stroke="#c9a84c" strokeWidth="0.4" opacity="0.8" />
            <line x1="56" y1="30" x2="58" y2="40" stroke="#c9a84c" strokeWidth="0.4" opacity="0.8" />
            <line x1="50" y1="30" x2="50" y2="40" stroke="#c9a84c" strokeWidth="0.4" opacity="0.5" />

            {/* Pavilion facet lines */}
            <line x1="42" y1="40" x2="50" y2="52" stroke="#c9a84c" strokeWidth="0.4" opacity="0.6" />
            <line x1="58" y1="40" x2="50" y2="52" stroke="#c9a84c" strokeWidth="0.4" opacity="0.6" />
            <line x1="50" y1="40" x2="50" y2="52" stroke="#c9a84c" strokeWidth="0.4" opacity="0.4" />

            {/* Bright highlight on crown — gives the diamond its life */}
            <ellipse cx="47" cy="33" rx="2" ry="0.6" fill="#ffffff" opacity="0.9" />

            {/* Sparkle — a small twinkle on the diamond */}
            <g className="ds-loader-sparkle">
              <path
                d="M 53 31 L 53.5 32.5 L 55 33 L 53.5 33.5 L 53 35 L 52.5 33.5 L 51 33 L 52.5 32.5 Z"
                fill="#ffffff"
              />
            </g>
          </g>
        </g>

        {/* ── BOX BASE (front face of the box, always visible) ── */}
        <rect x="25" y="60" width="50" height="25" rx="2" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.6" />
        {/* Subtle gradient suggestion — slightly darker bottom */}
        <rect x="25" y="78" width="50" height="7" rx="2" fill="#0a0303" opacity="0.5" />
        {/* Gold trim along bottom edge */}
        <rect x="27" y="82" width="46" height="0.8" fill="#c9a84c" opacity="0.7" />

        {/* ── LID ── hinged at bottom-left, rotates open ── */}
        <g className="ds-loader-lid">
          {/* Main lid body — slightly curved top */}
          <path
            d="M 25 60 L 75 60 L 75 48 Q 50 38 25 48 Z"
            fill="#1a0a0a"
            stroke="#c9a84c"
            strokeWidth="0.6"
          />
          {/* Inner edge of lid where it meets the box (slightly lighter) */}
          <path
            d="M 25 60 L 75 60 L 75 58 Q 50 56 25 58 Z"
            fill="#0a0303"
          />
          {/* Subtle highlight along the top curve of the lid */}
          <path
            d="M 28 47 Q 50 39 72 47"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
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
