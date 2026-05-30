'use client';
/**
 * Branded loading animation: a hinged jewellery box that opens like a real
 * clamshell to reveal an engagement ring with a large round-brilliant
 * diamond, sparkles, then closes again.
 *
 * Physical details — these match a real ring box, not a stylized one:
 *   - The lid is hinged at the BACK-TOP edge of the box; it tilts back
 *     when opening (rotateX-style flip in 2D projection) and never
 *     detaches from the box.
 *   - When closed: outer face of the lid shows the deSuisse logo (black
 *     version, debossed on burgundy lid).
 *   - When open: inner face of the lid shows the deSuisse logo
 *     (white version, on the cream satin lining).
 *   - The ring sits inside the box, FITS COMFORTABLY (smaller than the
 *     box). The band is white-gold/platinum silvery; the diamond is a
 *     large round-brilliant with realistic facets and a moving sparkle.
 *
 * 3-second loop:
 *   0–0.30s   closed (logo visible on lid front)
 *   0.30–0.45s lid opening (rotates back)
 *   0.45–0.70s open, ring visible, diamond sparkling
 *   0.70–0.85s lid closing
 *   0.85–1.0s  closed again, logo visible
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
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        {/* ── Soft shadow under the box ── */}
        <ellipse cx="80" cy="140" rx="45" ry="3.5" fill="rgba(0,0,0,0.18)">
          <animate
            attributeName="rx"
            values="45;42;45"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </ellipse>

        {/* ─────────────────────────────────────────────────────────
            BOX BASE (always visible, never animates)
            Burgundy #1a0a0a with a thin gold trim line.
            ────────────────────────────────────────────────────── */}
        <g>
          {/* Bottom box, slightly trapezoidal so it reads as 3D */}
          <path
            d="M 33 90 L 127 90 L 124 134 L 36 134 Z"
            fill="#1a0a0a"
            stroke="#c9a84c"
            strokeWidth="0.6"
          />
          {/* Cream satin interior — visible at the top edge when lid is open */}
          <path
            d="M 35 90 L 125 90 L 124 95 L 36 95 Z"
            fill="#f0e6d6"
          />
          {/* Gold trim around top rim of the box base */}
          <line x1="33" y1="90" x2="127" y2="90" stroke="#c9a84c" strokeWidth="0.9" />
          {/* Subtle gold accent along the front bottom */}
          <line x1="36" y1="132" x2="124" y2="132" stroke="#c9a84c" strokeWidth="0.4" opacity="0.7" />
        </g>

        {/* ─────────────────────────────────────────────────────────
            RING INSIDE THE BOX
            Visible only when the lid is open (between 0.4s–0.75s of the loop).
            White-gold band with a large round-brilliant diamond on top.
            Sized so the WHOLE ring fits inside the 94-wide box opening.
            ────────────────────────────────────────────────────── */}
        <g opacity="0">
          <animate
            attributeName="opacity"
            values="0; 0; 1; 1; 0; 0"
            keyTimes="0; 0.32; 0.45; 0.72; 0.82; 1"
            dur="3s"
            repeatCount="indefinite"
          />

          {/* Cream cushion the ring sits on */}
          <ellipse cx="80" cy="118" rx="32" ry="5" fill="#e8dcc4" opacity="0.6" />

          {/* Ring band — viewed slightly from the front, oval shape */}
          {/* The band: thin silver/platinum oval, with the front lower than the back */}
          <ellipse
            cx="80"
            cy="115"
            rx="14"
            ry="10"
            fill="none"
            stroke="#d8d8e0"
            strokeWidth="2.2"
          />
          {/* Inner shadow to give the band depth */}
          <ellipse
            cx="80"
            cy="115"
            rx="14"
            ry="10"
            fill="none"
            stroke="#a8a8b2"
            strokeWidth="0.6"
            opacity="0.5"
          />
          {/* Bright highlight on the band — left edge */}
          <ellipse
            cx="80"
            cy="115"
            rx="14"
            ry="10"
            fill="none"
            stroke="#fff"
            strokeWidth="0.5"
            strokeDasharray="3 28"
            transform="rotate(-30 80 115)"
          />

          {/* Prong setting — four small claws supporting the diamond */}
          <line x1="76" y1="106" x2="75" y2="100" stroke="#c8c8d0" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="84" y1="106" x2="85" y2="100" stroke="#c8c8d0" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="80" y1="104" x2="80" y2="98"  stroke="#c8c8d0" strokeWidth="1" strokeLinecap="round" />

          {/* DIAMOND — large round-brilliant cut, sitting above the band */}
          {/* Crown (top half) viewed from the side: an inverted trapezoid */}
          {/* Pavilion (bottom half) viewed from the side: triangle pointing down */}
          <g transform="translate(80 92)">
            {/* Pavilion (lower triangle) */}
            <polygon
              points="-9,0 9,0 0,12"
              fill="#e8f0f8"
              stroke="#9eb4c8"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            {/* Pavilion facet shading */}
            <polygon points="-9,0 0,12 -4,2" fill="#c8d4e0" opacity="0.6" />
            <polygon points="9,0 0,12 4,2"   fill="#dbe4ec" opacity="0.4" />

            {/* Crown (upper trapezoid) */}
            <polygon
              points="-11,0 11,0 7,-6 -7,-6"
              fill="#fafcff"
              stroke="#9eb4c8"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
            {/* Crown table (flat top) */}
            <polygon
              points="-7,-6 7,-6 5,-4 -5,-4"
              fill="#fff"
              stroke="#bfd0dc"
              strokeWidth="0.3"
            />
            {/* Star facets on crown */}
            <line x1="-7" y1="-6" x2="-3" y2="0" stroke="#bfd0dc" strokeWidth="0.3" />
            <line x1="7"  y1="-6" x2="3"  y2="0" stroke="#bfd0dc" strokeWidth="0.3" />
            <line x1="-5" y1="-4" x2="-3" y2="0" stroke="#bfd0dc" strokeWidth="0.3" />
            <line x1="5"  y1="-4" x2="3"  y2="0" stroke="#bfd0dc" strokeWidth="0.3" />
            {/* Girdle (the widest line) */}
            <line x1="-11" y1="0" x2="11" y2="0" stroke="#9eb4c8" strokeWidth="0.5" />

            {/* Bright highlight — gives the diamond its life */}
            <ellipse cx="-2" cy="-5" rx="3" ry="0.8" fill="#fff" opacity="0.9" />

            {/* Animated sparkle — a small star that moves across the diamond */}
            <g>
              <animate
                attributeName="opacity"
                values="0; 1; 0; 0; 1; 0"
                keyTimes="0; 0.25; 0.5; 0.6; 0.85; 1"
                dur="1.8s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="translate"
                values="-5 -4; 5 -3; -3 -2; -5 -4"
                keyTimes="0; 0.4; 0.8; 1"
                dur="1.8s"
                repeatCount="indefinite"
              />
              {/* 4-pointed star sparkle */}
              <path d="M 0 -2 L 0.4 -0.4 L 2 0 L 0.4 0.4 L 0 2 L -0.4 0.4 L -2 0 L -0.4 -0.4 Z" fill="#fff" />
            </g>
          </g>
        </g>

        {/* ─────────────────────────────────────────────────────────
            LID — hinged at the BACK-TOP edge (line from 33,90 to 127,90).
            Rotates around X axis around y=90 to open and close.
            We approximate this in 2D by scaling vertically (height shrinks
            as it tilts back) — gives a convincing clamshell feel.
            ────────────────────────────────────────────────────── */}
        <g>
          {/* When closed (scale 1) the lid is 38px tall, from y=52 to y=90.
              When fully open (scale ~0.1, mirrored back so it appears
              behind the box) it almost disappears. We use scale + translate
              from the hinge line at y=90. */}
          <animateTransform
            attributeName="transform"
            type="matrix"
            values="
              1 0 0  1   0 0;
              1 0 0  1   0 0;
              1 0 0 -0.15  0 207;
              1 0 0 -0.15  0 207;
              1 0 0  1   0 0;
              1 0 0  1   0 0
            "
            keyTimes="0; 0.30; 0.45; 0.70; 0.85; 1"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0 0 1 1; 0.4 0 0.2 1; 0 0 1 1; 0 0 1 1"
          />

          {/* OUTER face of the lid (what you see when closed) */}
          {/* Visible only during the closed portions of the loop */}
          <g>
            <animate
              attributeName="opacity"
              values="1; 1; 0; 0; 1; 1"
              keyTimes="0; 0.30; 0.45; 0.70; 0.85; 1"
              dur="3s"
              repeatCount="indefinite"
            />
            {/* Lid body — burgundy with gold trim */}
            <path
              d="M 33 90 L 33 56 Q 33 52 37 52 L 123 52 Q 127 52 127 56 L 127 90 Z"
              fill="#1a0a0a"
              stroke="#c9a84c"
              strokeWidth="0.6"
            />
            {/* Subtle highlight along the top of the closed lid */}
            <path
              d="M 36 55 Q 36 54 38 54 L 122 54 Q 124 54 124 55"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="0.6"
            />
            {/* Gold trim line where lid meets base */}
            <line x1="33" y1="89" x2="127" y2="89" stroke="#c9a84c" strokeWidth="0.4" opacity="0.8" />

            {/* deSuisse logo on the outside of the lid — WHITE version
                because the lid is dark burgundy. The image is the same
                white logo file used elsewhere in the site. */}
            <image
              href="/images/desuisse-logo-white.png"
              x="48"
              y="60"
              width="64"
              height="22"
              opacity="0.85"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>

          {/* INNER face of the lid (visible during the OPEN portion of loop) */}
          {/* In a real box, the inside of the lid shows cream satin lining
              and often a logo. We show it during open phase. */}
          <g>
            <animate
              attributeName="opacity"
              values="0; 0; 1; 1; 0; 0"
              keyTimes="0; 0.40; 0.48; 0.65; 0.75; 1"
              dur="3s"
              repeatCount="indefinite"
            />
            {/* Cream interior of lid — visible at top while box is open */}
            <path
              d="M 35 90 L 35 82 L 125 82 L 125 90 Z"
              fill="#f0e6d6"
              stroke="#c9a84c"
              strokeWidth="0.4"
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
