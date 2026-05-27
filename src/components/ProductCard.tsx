'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWishlist } from '@/lib/WishlistContext';
import { Product, formatPrice } from '@/data/products';
import { useLanguage } from '@/lib/LanguageContext';
import QuickView from './QuickView';

export default function ProductCard({ product }: { product: Product }) {
  const { language } = useLanguage();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const router = useRouter();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const labels = {
    favorite: language === 'sq' ? 'Të preferuarat' : 'Favorite',
    quickView: language === 'sq' ? 'Shiko Shpejt' : 'Quick View',
    checkout: language === 'sq' ? 'Blej Tani' : 'Buy Now',
  };

  return (
    <>
      <div className="product-card">
        {/* Image area — click navigates to product page */}
        <div className="product-img-wrap" onClick={() => router.push(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
          <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} unoptimized />
          {product.image2 && (
            <Image src={product.image2} alt={`${product.name} alternate`} fill className="product-img-2" style={{ objectFit: 'cover' }} unoptimized />
          )}

          {/* 3-button hover overlay — stop propagation so clicks don't go to product page */}
          <div className="card-hover-overlay" onClick={e => e.stopPropagation()}>
            {/* Favorite */}
            <button
              className="card-action-btn"
              onClick={toggleWishlist}
              title={labels.favorite}
              style={{ background: wishlisted ? '#c9a84c' : '#fff', color: wishlisted ? '#1a0a0a' : '#1a0a0a' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Quick View — center */}
            <button
              className="card-action-btn card-action-main"
              onClick={() => setQuickViewOpen(true)}
              title={labels.quickView}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* Buy Now / Checkout */}
            <button
              className="card-action-btn"
              onClick={() => router.push(`/product/${product.id}`)}
              title={labels.checkout}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          </div>
        </div>

        <div style={{ padding: '16px 4px 4px' }}>
          <h3
            onClick={() => router.push(`/product/${product.id}`)}
            style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', fontWeight: 500, color: '#1a0a0a', marginBottom: 6, cursor: 'pointer' }}
          >
            {product.name}
          </h3>
          {product.description && (
            <p style={{ fontFamily: 'Montserrat', fontSize: 12, color: '#999', marginBottom: 8, lineHeight: 1.6 }}>
              {language === 'sq' && product.descriptionSq ? product.descriptionSq : product.description}
            </p>
          )}
          <p style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#666' }}>{formatPrice(product)}</p>
        </div>
      </div>

      {quickViewOpen && <QuickView product={product} onClose={() => setQuickViewOpen(false)} />}

      <style>{`
        .card-hover-overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px;
          background: linear-gradient(to top, rgba(26,10,10,0.7) 0%, transparent 100%);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }
        .product-card:hover .card-hover-overlay {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .card-action-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: none;
          background: #fff;
          color: #1a0a0a;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, color 0.2s;
          box-shadow: 0 2px 12px rgba(26,10,10,0.18);
          flex-shrink: 0;
        }
        .card-action-btn:hover {
          background: #c9a84c;
          color: #1a0a0a;
          transform: scale(1.12);
        }
        .card-action-main {
          width: 44px; height: 44px;
        }
      `}</style>
    </>
  );
}
