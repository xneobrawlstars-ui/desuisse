'use client';
/**
 * Loading animation: a 2D line-art engagement ring with a sparkling
 * round-brilliant diamond.
 *
 * Why this approach (after a failed attempt at a 3D ring box):
 *  - SVG can't fake 3D box-opening convincingly in 2D
 *  - Transparent line-art on no background is more elegant and
 *    matches the site's luxury aesthetic
 *  - The ring is the icon of the brand; no need for a box
 *  - Side-view: thin band as an oval, large diamond crown above
 *
 * The animation:
 *  - The ring gently floats up and down (subtle, 4s cycle)
 *  - A sparkle traverses across the diamond's facets (1.6s cycle)
 *  - The diamond facets brighten and dim slightly (creates the
 *    "fire" effect a real diamond has under moving light)
 *
 * All strokes are gold (#c9a84c) on transparent background, so the
 * loader looks right whether placed on light or dark backgrounds.
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

  // Brand gold for all strokes — looks elegant on any background
  const GOLD = '#c9a84c';
  const GOLD_FAINT = '#e1c987';

  return (
    <div style={containerStyle} role="status" aria-live="polite">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
        fill="none"
      >
        {/* ─────────────────────────────────────────────────────────
            FLOATING GROUP — the entire ring drifts up/down gently.
            ────────────────────────────────────────────────────── */}
        <g>
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -3; 0 0; 0 2; 0 0"
            keyTimes="0; 0.25; 0.5; 0.75; 1"
            dur="4s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />

          {/* ─── RING BAND ───
              A thin oval, viewed slightly tilted forward.
              Two ellipses give it the "circular when seen at an angle" look. */}
          <ellipse
            cx="60" cy="82"
            rx="20" ry="14"
            stroke={GOLD}
            strokeWidth="1.5"
          />
          {/* Inner highlight: thin lighter line just inside, suggesting
              the rounded inner edge of the band */}
          <ellipse
            cx="60" cy="82"
            rx="18.2" ry="12.5"
            stroke={GOLD_FAINT}
            strokeWidth="0.5"
            opacity="0.7"
          />

          {/* ─── PRONG SETTING ───
              Four small claws rising from the ring up to the diamond. */}
          <line x1="52" y1="70" x2="50" y2="62" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
          <line x1="68" y1="70" x2="70" y2="62" stroke={GOLD} strokeWidth="1" strokeLinecap="round" />
          <line x1="58" y1="68" x2="56.5" y2="58" stroke={GOLD} strokeWidth="0.8" strokeLinecap="round" />
          <line x1="62" y1="68" x2="63.5" y2="58" stroke={GOLD} strokeWidth="0.8" strokeLinecap="round" />

          {/* ─── DIAMOND ───
              A round-brilliant cut viewed from the side:
                • Top half (crown): trapezoid with table on top
                • Bottom half (pavilion): triangle pointing down
                • All facet lines visible
              Stroked in gold for consistency. */}
          <g transform="translate(60 48)">
            {/* GIRDLE — widest horizontal line of the diamond */}
            <line x1="-20" y1="0" x2="20" y2="0" stroke={GOLD} strokeWidth="1.3" />

            {/* CROWN (upper trapezoid) — sloping facets */}
            <line x1="-20" y1="0" x2="-14" y2="-12" stroke={GOLD} strokeWidth="1.3" />
            <line x1="20"  y1="0" x2="14"  y2="-12" stroke={GOLD} strokeWidth="1.3" />
            <line x1="-14" y1="-12" x2="14" y2="-12" stroke={GOLD} strokeWidth="1.3" />

            {/* TABLE (flat top facet) — slightly inset within the crown */}
            <line x1="-9"  y1="-12" x2="-7"  y2="-15" stroke={GOLD_FAINT} strokeWidth="0.7" />
            <line x1="9"   y1="-12" x2="7"   y2="-15" stroke={GOLD_FAINT} strokeWidth="0.7" />

            {/* CROWN STAR FACETS — internal lines */}
            <line x1="-14" y1="-12" x2="-7"  y2="-2" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="14"  y1="-12" x2="7"   y2="-2" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="0"   y1="-12" x2="0"   y2="-4" stroke={GOLD_FAINT} strokeWidth="0.6" />

            {/* CROWN MAIN FACETS — V shapes from girdle */}
            <line x1="-10" y1="0" x2="-5" y2="-12" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="10"  y1="0" x2="5"  y2="-12" stroke={GOLD_FAINT} strokeWidth="0.6" />

            {/* PAVILION (lower triangle) — diamond points down */}
            <line x1="-20" y1="0" x2="0" y2="22" stroke={GOLD} strokeWidth="1.3" />
            <line x1="20"  y1="0" x2="0" y2="22" stroke={GOLD} strokeWidth="1.3" />

            {/* PAVILION FACET LINES — give the bottom its depth */}
            <line x1="-13" y1="0" x2="0" y2="22" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="13"  y1="0" x2="0" y2="22" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="-6"  y1="0" x2="0" y2="22" stroke={GOLD_FAINT} strokeWidth="0.6" />
            <line x1="6"   y1="0" x2="0" y2="22" stroke={GOLD_FAINT} strokeWidth="0.6" />

            {/* ─── DIAMOND SHIMMER ───
                A glow that grows and shrinks at the diamond's heart,
                creating the "fire" you see when a real diamond catches light. */}
            <circle cx="0" cy="-6" r="2" fill={GOLD} opacity="0">
              <animate
                attributeName="opacity"
                values="0; 0.8; 0; 0.5; 0"
                keyTimes="0; 0.3; 0.55; 0.75; 1"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="0.5; 3; 0.5; 2; 0.5"
                keyTimes="0; 0.3; 0.55; 0.75; 1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* ─── TRAVELING SPARKLE ───
                A small 4-pointed star that drifts across the diamond. */}
            <g>
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-12 -8; 12 -6; -8 -4; -12 -8"
                keyTimes="0; 0.4; 0.8; 1"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0; 0; 1; 0"
                keyTimes="0; 0.15; 0.35; 0.5; 0.6; 0.8; 1"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <path
                d="M 0 -3 L 0.6 -0.6 L 3 0 L 0.6 0.6 L 0 3 L -0.6 0.6 L -3 0 L -0.6 -0.6 Z"
                fill={GOLD}
              />
            </g>
          </g>

          {/* ─── SECOND SPARKLE — outside the diamond, faint ───
              Adds life to the surrounding area. */}
          <g opacity="0">
            <animate
              attributeName="opacity"
              values="0; 0; 0.7; 0; 0"
              keyTimes="0; 0.5; 0.6; 0.7; 1"
              dur="3s"
              repeatCount="indefinite"
            />
            <path
              d="M 86 40 L 86.4 41.6 L 88 42 L 86.4 42.4 L 86 44 L 85.6 42.4 L 84 42 L 85.6 41.6 Z"
              fill={GOLD_FAINT}
            />
          </g>
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
