'use client';
/**
 * Reusable empty-state component.
 *
 * Used in: cart drawer, favorites page, shop (no results), and anywhere
 * else the customer is looking at a screen with no content. The job of
 * an empty state is NOT to apologize — it's to acknowledge the moment
 * and gently point the customer toward something useful.
 *
 * Layout: centered icon + heading + subtle subtitle + primary CTA +
 * optional secondary CTA. Decorative gold ornament above the icon for
 * brand consistency.
 */
import { ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  /** SVG icon to display (any 24×24 svg, rendered ~64×64) */
  icon: ReactNode;
  /** Main heading (large, serif) */
  heading: string;
  /** Optional secondary line (smaller, sans-serif) */
  subtitle?: string;
  /** Primary call-to-action — either a link or a button */
  primaryAction?: {
    label: string;
    href?: string;          // if href is set, renders as a Link
    onClick?: () => void;   // otherwise as a button
  };
  /** Optional secondary CTA, rendered as a quieter text link */
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Padding around the empty state, override the default */
  padding?: string;
  /** Optional decorative ornament — defaults to a diamond glyph */
  ornament?: 'diamond' | 'none';
}

export default function EmptyState({
  icon, heading, subtitle, primaryAction, secondaryAction,
  padding = '60px 24px',
  ornament = 'diamond',
}: Props) {
  return (
    <div style={{
      textAlign: 'center',
      padding,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
    }}>
      {/* Decorative gold ornament */}
      {ornament === 'diamond' && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          letterSpacing: '0.4em',
          color: '#c9a84c',
          marginBottom: 16,
        }}>◆</p>
      )}

      {/* Icon */}
      <div style={{
        marginBottom: 22,
        color: '#d4c3a3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
        fontWeight: 400,
        color: '#1a0a0a',
        lineHeight: 1.3,
        maxWidth: 460,
        marginBottom: subtitle ? 10 : 24,
      }}>
        {heading}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: '#888',
          lineHeight: 1.75,
          maxWidth: 420,
          marginBottom: 24,
        }}>
          {subtitle}
        </p>
      )}

      {/* Gold separator line */}
      <div style={{ width: 32, height: 1, background: '#c9a84c', marginBottom: 28, opacity: 0.7 }} />

      {/* Primary CTA */}
      {primaryAction && (
        primaryAction.href ? (
          <Link
            href={primaryAction.href}
            onClick={primaryAction.onClick}
            style={{
              display: 'inline-block',
              padding: '13px 32px',
              background: '#1a0a0a',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            {primaryAction.label}
          </Link>
        ) : (
          <button
            onClick={primaryAction.onClick}
            style={{
              padding: '13px 32px',
              background: '#1a0a0a',
              color: '#fff',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {primaryAction.label}
          </button>
        )
      )}

      {/* Secondary CTA — quieter text link */}
      {secondaryAction && (
        secondaryAction.href ? (
          <Link
            href={secondaryAction.href}
            onClick={secondaryAction.onClick}
            style={{
              marginTop: 18,
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#999',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'underline',
            }}
          >
            {secondaryAction.label}
          </Link>
        ) : (
          <button
            onClick={secondaryAction.onClick}
            style={{
              marginTop: 18,
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#999',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {secondaryAction.label}
          </button>
        )
      )}
    </div>
  );
}
