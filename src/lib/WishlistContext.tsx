'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [], addToWishlist: () => {}, removeFromWishlist: () => {},
  isWishlisted: () => false, count: 0,
});

function isValidWishlistItem(p: unknown): p is Product {
  if (!p || typeof p !== 'object') return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.id === 'string' && o.id.length <= 64 &&
    typeof o.name === 'string' && o.name.length <= 200 &&
    typeof o.price === 'number' && o.price >= 0 && o.price <= 999999 &&
    typeof o.image === 'string' &&
    typeof o.category === 'string'
  );
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ds-wishlist');
      if (!saved) return;
      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed)) return;
      setWishlist(parsed.filter(isValidWishlistItem));
    } catch { /* ignore */ }
  }, []);

  const save = (items: Product[]) => {
    setWishlist(items);
    try { localStorage.setItem('ds-wishlist', JSON.stringify(items)); } catch { /* storage full */ }
  };

  const addToWishlist    = (p: Product) => { if (!wishlist.find(x => x.id === p.id)) save([...wishlist, p]); };
  const removeFromWishlist = (id: string) => save(wishlist.filter(p => p.id !== id));
  const isWishlisted     = (id: string) => wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() { return useContext(WishlistContext); }
