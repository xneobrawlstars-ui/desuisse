import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/LanguageContext';
import { WishlistProvider } from '@/lib/WishlistContext';
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'DeSuisse – Fine Jewelry',
  description: 'Luxury jewelry from DeSuisse. Rings, earrings, bracelets and necklaces crafted with passion.',
  icons: { icon: 'https://desuisse.com/wp-content/uploads/2023/02/desuisselogo-2.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a0a0a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
