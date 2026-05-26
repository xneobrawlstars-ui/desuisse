'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/lib/WishlistContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function FavoritesPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { language } = useLanguage();

  const title = language === 'sq' ? 'Të preferuarat' : 'Favorites';
  const empty = language === 'sq'
    ? 'Nuk keni asnjë produkt të preferuar ende.'
    : "You haven't added any favorites yet.";
  const browseCta = language === 'sq' ? 'Shfleto dyqanin' : 'Browse the shop';

  return (
    <>
      <Header />

      <div style={{ background: '#f7f3ee', padding: '48px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <h1 className="section-title">{title}</h1>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '16px auto 0' }} />
      </div>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 40px 80px' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            {/* Empty heart illustration */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e8d9c4" strokeWidth="1" style={{ marginBottom: 24 }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', fontWeight: 400, color: '#888', marginBottom: 24 }}>
              {empty}
            </p>
            <Link href="/shop" className="btn-dark">{browseCta}</Link>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: 'Montserrat', fontSize: 12, color: '#999', marginBottom: 36, letterSpacing: '0.05em' }}>
              {wishlist.length} {language === 'sq' ? 'produkte' : 'items'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 28 }}>
              {wishlist.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
