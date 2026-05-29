import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { WishlistProvider } from '@/lib/WishlistContext';
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';

// next/font self-hosts the fonts at build time — they ship with your deployment,
// so they ALWAYS load (no third-party DNS, no FOIT, works on every device).
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://desuisse.com'),
  title: { default: 'DeSuisse — Luxury Jewellery', template: '%s — DeSuisse' },
  description: 'Luxury jewellery from DeSuisse. Rings, earrings, bracelets and necklaces crafted with passion.',
  openGraph: {
    title: 'DeSuisse — Luxury Jewellery',
    description: 'Luxury jewellery from DeSuisse.',
    type: 'website',
    url: 'https://desuisse.com',
    images: ['/images/desuisse-logo.svg'],
  },
  icons: {
    icon: [
      { url: '/images/desuisse-logo.svg', type: 'image/svg+xml' },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a0a0a',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        <LanguageProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <CartDrawer />
            </CartProvider>
          </WishlistProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
