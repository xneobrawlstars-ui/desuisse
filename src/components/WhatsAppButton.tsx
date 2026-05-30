'use client';
/**
 * Floating WhatsApp button.
 *
 * Renders a small fixed-position button at the bottom-right corner that
 * opens a WhatsApp conversation to the boutique's number.
 *
 * - Hidden on admin and checkout pages to avoid distracting from those
 *   workflows.
 * - Uses wa.me (the official short link). On mobile this opens the
 *   WhatsApp app, on desktop it opens WhatsApp Web.
 * - No third-party scripts, no tracking, no cookies. Just a link.
 */
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

const WHATSAPP_NUMBER = '38348233400'; // DeSuisse Pejë, no + sign for wa.me
const HIDDEN_ON_PATHS = ['/admin', '/checkout'];

export default function WhatsAppButton() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  if (HIDDEN_ON_PATHS.some(p => pathname?.startsWith(p))) return null;

  const greeting = language === 'sq'
    ? 'Përshëndetje! Doja të pyesja për produktet tuaja.'
    : 'Hello! I would like to ask about your products.';
  const tooltip = language === 'sq' ? 'Na shkruani në WhatsApp' : 'Chat with us on WhatsApp';
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tooltip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25d366', // WhatsApp brand green
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: hovered
          ? '0 6px 20px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0,0,0,0.12)'
          : '0 4px 12px rgba(0,0,0,0.15)',
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        zIndex: 9990,
        cursor: 'pointer',
      }}
    >
      {/* WhatsApp glyph (white) — public domain SVG */}
      <svg width="28" height="28" viewBox="0 0 32 32" fill="#fff" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.001 0C7.165 0 .003 7.162.003 15.997c0 2.819.736 5.575 2.135 8.005L0 32l8.236-2.159a15.953 15.953 0 0 0 7.765 1.978h.005c8.832 0 15.998-7.162 15.999-15.997 0-4.273-1.663-8.288-4.683-11.31C24.288 1.665 20.272 0 16.001 0Zm-.001 29.183h-.004a13.234 13.234 0 0 1-6.74-1.846l-.484-.287-5.014 1.315 1.338-4.887-.315-.501a13.21 13.21 0 0 1-2.025-7.041C2.756 8.6 8.696 2.662 16 2.662c3.547 0 6.882 1.382 9.39 3.892 2.508 2.51 3.888 5.847 3.887 9.394-.003 7.342-5.94 13.279-13.277 13.279ZM23.27 19.298c-.397-.198-2.348-1.158-2.712-1.291-.364-.132-.629-.198-.893.198-.265.396-1.026 1.291-1.258 1.555-.232.264-.463.297-.86.099-.398-.198-1.679-.619-3.198-1.974-1.183-1.055-1.98-2.358-2.212-2.755-.232-.397-.025-.611.174-.808.179-.178.397-.463.595-.694.198-.232.265-.397.397-.66.132-.265.066-.496-.033-.695-.099-.198-.892-2.15-1.223-2.943-.322-.773-.65-.668-.893-.681l-.76-.014c-.265 0-.694.099-1.058.496s-1.388 1.354-1.388 3.305c0 1.95 1.422 3.834 1.62 4.098.198.265 2.797 4.272 6.778 5.991.948.41 1.687.654 2.265.838.952.302 1.819.26 2.504.158.764-.114 2.348-.96 2.681-1.886.331-.926.331-1.722.231-1.886-.099-.165-.363-.265-.76-.463Z"/>
      </svg>

      {/* Tooltip — only on hover, desktop */}
      {hovered && (
        <span style={{
          position: 'absolute',
          right: 68,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#1a0a0a',
          color: '#fff',
          padding: '8px 14px',
          fontSize: 12,
          fontFamily: 'var(--font-sans)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.03em',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          pointerEvents: 'none',
        }}>
          {tooltip}
        </span>
      )}
    </a>
  );
}
