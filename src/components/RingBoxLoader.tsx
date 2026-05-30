'use client';
/**
 * Branded loading animation: a small ring box that opens to reveal a
 * sparkling diamond, then closes, in a continuous loop.
 *
 * Pure SVG + CSS animation — no GIFs, no Lottie. Lightweight,
 * resolution-independent, theme-aware.
 *
 * Two ways to use:
 *  <RingBoxLoader />                  → centered in available space
 *  <RingBoxLoader fullscreen />       → full-screen overlay
 *  <RingBoxLoader size={48} inline /> → small inline spinner
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
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        {/* Soft shadow under the box */}
        <ellipse cx="60" cy="105" rx="32" ry="3" fill="rgba(26,10,10,0.18)">
          <animate
            attributeName="rx"
            values="32;28;32"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </ellipse>

        {/* Box base */}
        <g>
          <rect
            x="30" y="62"
            width="60" height="36"
            rx="3"
            fill="#1a0a0a"
            stroke="#c9a84c"
            strokeWidth="0.7"
          />
          {/* Cream interior strip showing along the top */}
          <rect x="32" y="64" width="56" height="3" fill="#f7f3ee" />
        </g>

        {/* Diamond inside the box — fades in/out as box opens/closes */}
        <g opacity="0">
          <animate
            attributeName="opacity"
            values="0; 0; 1; 1; 0; 0"
            keyTimes="0; 0.25; 0.45; 0.55; 0.75; 1"
            dur="3s"
            repeatCount="indefinite"
          />
          {/* Diamond facets */}
          <polygon
            points="60,52 53,58 60,72 67,58"
            fill="#fff"
            stroke="#c9a84c"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          <polygon points="60,52 53,58 67,58" fill="#fafafa" />
          <polygon points="53,58 60,72 56,60" fill="#e8e0d4" opacity="0.5" />
          {/* Sparkle: a tiny moving glint */}
          <circle cx="58" cy="56" r="1.2" fill="#fff">
            <animate
              attributeName="cx"
              values="57; 62; 57"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 1; 0"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Lid — rotates around its hinge (the back-bottom edge) */}
        <g style={{ transformOrigin: '60px 62px' }}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 60 62; -110 60 62; -110 60 62; 0 60 62; 0 60 62"
            keyTimes="0; 0.3; 0.6; 0.85; 1"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0 0 1 1; 0.4 0 0.2 1; 0 0 1 1"
          />
          <rect
            x="30" y="48"
            width="60" height="16"
            rx="3"
            fill="#1a0a0a"
            stroke="#c9a84c"
            strokeWidth="0.7"
          />
          {/* Gold trim along bottom of lid */}
          <rect x="30" y="62" width="60" height="2" fill="#c9a84c" opacity="0.8" />
        </g>

        {/* Gold accent on box base */}
        <rect x="30" y="95" width="60" height="3" fill="#c9a84c" opacity="0.8" rx="0.5" />
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
