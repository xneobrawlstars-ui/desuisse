'use client';
/**
 * Loading animation: a tall ring box that opens to reveal an
 * engagement ring on a cream cushion.
 *
 * Proportions based on the user's reference image:
 *   - Tall box, roughly square overall when closed
 *   - Lid is ~45% of the box height
 *   - Lid opens FULLY back (over the top of the box), not just slightly
 *   - When open you can see:
 *       1. The cream-cushioned interior of the box
 *       2. The ring sitting on the cushion
 *       3. The (now lifted) lid leaning back behind
 *
 * Animation cycle (~2.8s):
 *   1. Closed (lid covers top of box) — logo visible on the front of lid
 *   2. Lid lifts back ~110deg (so its bottom face becomes visible above)
 *   3. Ring rises from inside the box
 *   4. Brief pause with ring fully visible
 *   5. Ring lowers back down
 *   6. Lid closes back down
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
        /* Lid: hinged at top-back edge (line at y=42 in the SVG).
           At rest (closed): rotate(0deg) — covering the top of the box.
           Open: rotate(-110deg) — lifted up and over, back of lid now visible. */
        .ds-loader-lid {
          transform-origin: 50px 42px;
          transform-box: fill-box;
          animation: ds-loader-lid-open 2.8s infinite ease-in-out;
        }
        .ds-loader-ring {
          transform-origin: 50px 70px;
          animation: ds-loader-ring-rise 2.8s infinite ease-in-out;
        }
        .ds-loader-sparkle1 {
          animation: ds-loader-sparkle1 1.4s infinite ease-in-out;
          transform-origin: center;
        }
        .ds-loader-sparkle2 {
          animation: ds-loader-sparkle2 1.8s infinite ease-in-out;
          transform-origin: center;
        }
        @keyframes ds-loader-lid-open {
          0%, 10%   { transform: rotate(0deg); }
          40%, 70%  { transform: rotate(-118deg); }
          92%, 100% { transform: rotate(0deg); }
        }
        @keyframes ds-loader-ring-rise {
          0%, 22%   { transform: translateY(18px); opacity: 0; }
          45%, 68%  { transform: translateY(0px);  opacity: 1; }
          88%, 100% { transform: translateY(18px); opacity: 0; }
        }
        @keyframes ds-loader-sparkle1 {
          0%, 100% { opacity: 0; transform: scale(0.4); }
          50%      { opacity: 1; transform: scale(1.2); }
        }
        @keyframes ds-loader-sparkle2 {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          40%      { opacity: 0.9; transform: scale(1); }
        }
      `}</style>

      <svg
        viewBox="0 0 100 110"
        style={{ width: size, height: size, overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* ═══════════════════════════════════════════════════════════
            BOX INTERIOR (cream cushion) — visible when lid is open
            ═══════════════════════════════════════════════════════════ */}
        {/* Dark inner walls (sides + back of the open box) */}
        <rect x="18" y="42" width="64" height="48" fill="#0a0303" />
        {/* Cream cushion that fills most of the interior */}
        <path d="M 22 46 L 78 46 L 78 86 Q 78 88 76 88 L 24 88 Q 22 88 22 86 Z"
              fill="#f0e6d6" />
        {/* Cushion shading — slightly darker at top for depth */}
        <path d="M 22 46 L 78 46 L 78 52 L 22 52 Z" fill="#e0d4bc" opacity="0.5" />
        {/* Cushion seam down the middle */}
        <line x1="50" y1="46" x2="50" y2="88" stroke="#d8c8a8" strokeWidth="0.3" opacity="0.5" />

        {/* ═══════════════════════════════════════════════════════════
            RING — rises up from inside when lid opens
            ═══════════════════════════════════════════════════════════ */}
        <g className="ds-loader-ring">
          {/* Soft shadow under the ring on the cushion */}
          <ellipse cx="50" cy="84" rx="14" ry="2" fill="#1a0a0a" opacity="0.18" />

          {/* Gold band — front view, oval (because viewed at slight angle) */}
          <ellipse cx="50" cy="78" rx="13" ry="9" fill="none" stroke="#c9a84c" strokeWidth="2.5" />
          {/* Inner highlight on band */}
          <ellipse cx="50" cy="78" rx="11" ry="7.5" fill="none" stroke="#e8cf8a" strokeWidth="0.6" opacity="0.7" />
          {/* Subtle inner shadow */}
          <ellipse cx="50" cy="79" rx="11" ry="7" fill="none" stroke="#8a7028" strokeWidth="0.4" opacity="0.5" />

          {/* Prongs holding diamond */}
          <line x1="44" y1="69" x2="42" y2="60" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="56" y1="69" x2="58" y2="60" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="50" y1="68" x2="50" y2="58" stroke="#c9a84c" strokeWidth="1" strokeLinecap="round" />

          {/* DIAMOND — round-brilliant cut, front view, sitting on the band */}
          <g>
            {/* Crown (upper trapezoid) */}
            <polygon points="34,60 66,60 58,48 42,48"
                     fill="#f0f8ff" stroke="#9eb4c8" strokeWidth="0.8" strokeLinejoin="round" />
            {/* Table (flat top) */}
            <polygon points="42,48 58,48 55,51 45,51" fill="#ffffff" stroke="#9eb4c8" strokeWidth="0.4" />

            {/* Pavilion (lower triangle) */}
            <polygon points="34,60 66,60 50,76"
                     fill="#c8d8e8" stroke="#9eb4c8" strokeWidth="0.8" strokeLinejoin="round" />

            {/* Crown facet lines */}
            <line x1="42" y1="48" x2="38" y2="60" stroke="#9eb4c8" strokeWidth="0.4" />
            <line x1="58" y1="48" x2="62" y2="60" stroke="#9eb4c8" strokeWidth="0.4" />
            <line x1="50" y1="48" x2="50" y2="60" stroke="#9eb4c8" strokeWidth="0.4" opacity="0.6" />
            <line x1="42" y1="48" x2="46" y2="60" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.5" />
            <line x1="58" y1="48" x2="54" y2="60" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.5" />

            {/* Pavilion facet lines */}
            <line x1="38" y1="60" x2="50" y2="76" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.6" />
            <line x1="62" y1="60" x2="50" y2="76" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.6" />
            <line x1="46" y1="60" x2="50" y2="76" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.4" />
            <line x1="54" y1="60" x2="50" y2="76" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.4" />
            <line x1="50" y1="60" x2="50" y2="76" stroke="#9eb4c8" strokeWidth="0.3" opacity="0.3" />

            {/* Highlight on crown — gives life */}
            <ellipse cx="46" cy="52" rx="2.5" ry="0.8" fill="#ffffff" opacity="0.95" />
            <ellipse cx="54" cy="56" rx="1.5" ry="0.5" fill="#ffffff" opacity="0.7" />

            {/* Sparkle 1 — animated star on the diamond */}
            <g className="ds-loader-sparkle1">
              <path d="M 56 50 L 56.6 51.4 L 58 52 L 56.6 52.6 L 56 54 L 55.4 52.6 L 54 52 L 55.4 51.4 Z"
                    fill="#ffffff" />
            </g>
          </g>

          {/* Floating sparkles around the ring (like in your reference image) */}
          <g className="ds-loader-sparkle2">
            <path d="M 30 52 L 30.5 53.2 L 31.6 53.5 L 30.5 53.8 L 30 55 L 29.5 53.8 L 28.4 53.5 L 29.5 53.2 Z"
                  fill="#ffd87a" />
          </g>
          <g className="ds-loader-sparkle1" style={{ animationDelay: '0.3s' }}>
            <path d="M 70 56 L 70.4 57 L 71.4 57.3 L 70.4 57.6 L 70 58.6 L 69.6 57.6 L 68.6 57.3 L 69.6 57 Z"
                  fill="#ffd87a" />
          </g>
          <g className="ds-loader-sparkle2" style={{ animationDelay: '0.6s' }}>
            <path d="M 36 44 L 36.4 44.8 L 37.2 45 L 36.4 45.2 L 36 46 L 35.6 45.2 L 34.8 45 L 35.6 44.8 Z"
                  fill="#ffd87a" />
          </g>
        </g>

        {/* ═══════════════════════════════════════════════════════════
            BOX BASE (front face, always visible)
            ═══════════════════════════════════════════════════════════ */}
        {/* Front of box */}
        <rect x="16" y="60" width="68" height="38" rx="2.5"
              fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.7" />
        {/* Darker shading at bottom for depth */}
        <rect x="16" y="92" width="68" height="6" rx="2.5"
              fill="#0a0303" opacity="0.6" />
        {/* Gold trim line near bottom */}
        <rect x="18" y="94.5" width="64" height="0.8" fill="#c9a84c" opacity="0.7" />
        {/* Top edge where lid meets — gold seam */}
        <rect x="16" y="59.5" width="68" height="1" fill="#c9a84c" opacity="0.4" />

        {/* ═══════════════════════════════════════════════════════════
            LID — taller, hinged at top edge, opens fully back
            ═══════════════════════════════════════════════════════════ */}
        <g className="ds-loader-lid">
          {/* Main lid body — tall and rectangular like a real ring box lid */}
          <rect x="16" y="42" width="68" height="18" rx="2.5"
                fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.7" />
          {/* Slight inner shading on the front of the lid */}
          <rect x="16" y="42" width="68" height="3" fill="#0a0303" opacity="0.5" />
          <rect x="16" y="57" width="68" height="3" fill="#0a0303" opacity="0.4" />
          {/* Gold trim top */}
          <rect x="18" y="43.5" width="64" height="0.6" fill="#c9a84c" opacity="0.5" />
          {/* Gold trim bottom (where lid meets base) */}
          <rect x="18" y="58.5" width="64" height="0.6" fill="#c9a84c" opacity="0.5" />

          {/* deSuisse logo on the front of the lid (white version, since box is dark) */}
          <image
            href="/images/desuisse-logo-white.png"
            x="26"
            y="46"
            width="48"
            height="11"
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
