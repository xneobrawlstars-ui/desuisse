'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, DEFAULT_PRODUCTS } from '@/data/products';
import { useUser } from './UserContext';

/**
 * Wishlist context.
 *
 * Three modes:
 *   1. Signed-out: wishlist lives only in localStorage (browser-local).
 *   2. Signed-in: wishlist is server-side (in the user's account). Local
 *      changes are pushed to server. localStorage acts as a cache only.
 *   3. Transition (sign-in / sign-up): the local wishlist is MERGED into
 *      the server-side wishlist so customers don't lose what they saved
 *      before signing in.
 *
 * The server stores wishlist as an array of product IDs (not full
 * objects) — IDs are small and stable. When loading, we hydrate the IDs
 * back to Product objects from the live products list.
 */

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

const LOCAL_KEY = 'ds-wishlist';

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

/** Load wishlist from localStorage (returns empty array on any error). */
function loadLocal(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidWishlistItem);
  } catch {
    return [];
  }
}

function saveLocal(items: Product[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(items)); }
  catch { /* storage full */ }
}

/**
 * Given a list of product IDs and a list of full Product objects we know
 * about (from the latest fetch + DEFAULT_PRODUCTS as fallback), return the
 * hydrated array. Missing IDs are silently dropped (the product may have
 * been removed from the catalogue).
 */
function hydrate(ids: string[], catalogue: Product[]): Product[] {
  const byId = new Map<string, Product>();
  for (const p of catalogue) byId.set(p.id, p);
  const out: Product[] = [];
  for (const id of ids) {
    const p = byId.get(id);
    if (p) out.push(p);
  }
  return out;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, status } = useUser();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  // Catalogue used to hydrate IDs from the server. Starts with defaults,
  // and gets enriched on first product fetch.
  const [catalogue, setCatalogue] = useState<Product[]>(DEFAULT_PRODUCTS);
  // Tracks whether we've already done the "merge local into server" step
  // for the current session (so we don't keep re-merging).
  const mergedRef = useRef(false);

  // ── On mount, load from localStorage ──
  useEffect(() => {
    const local = loadLocal();
    setWishlist(local);
  }, []);

  // ── Fetch live catalogue once (helps hydrate server-stored IDs) ──
  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (Array.isArray(data)) setCatalogue(data); })
      .catch(() => { /* fall back to DEFAULT_PRODUCTS */ });
  }, []);

  // ── React to sign-in / sign-out ──
  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'signed-out') {
      // Reset merge flag — next sign-in will merge again
      mergedRef.current = false;
      return;
    }

    if (status === 'signed-in' && currentUser && !mergedRef.current) {
      // First time we know they're signed in this session.
      // Push our local wishlist to the server with merge=1 to union with what's there.
      mergedRef.current = true;
      const localIds = wishlist.map(p => p.id);
      fetch('/api/auth/wishlist?merge=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ wishlist: localIds }),
      })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data && Array.isArray(data.wishlist)) {
            const hydrated = hydrate(data.wishlist, catalogue);
            setWishlist(hydrated);
            saveLocal(hydrated);
          }
        })
        .catch(err => console.error('[wishlist] merge failed:', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, currentUser]);

  /** Save wishlist locally, and also to server if signed in. */
  const save = (items: Product[]) => {
    setWishlist(items);
    saveLocal(items);

    if (status === 'signed-in' && currentUser) {
      const ids = items.map(p => p.id);
      // Fire-and-forget — UX shouldn't block on network
      fetch('/api/auth/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ wishlist: ids }),
      }).catch(err => console.error('[wishlist] save failed:', err));
    }
  };

  const addToWishlist = (p: Product) => {
    if (!wishlist.find(x => x.id === p.id)) save([...wishlist, p]);
  };
  const removeFromWishlist = (id: string) => save(wishlist.filter(p => p.id !== id));
  const isWishlisted = (id: string) => wishlist.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{
      wishlist, addToWishlist, removeFromWishlist, isWishlisted,
      count: wishlist.length,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() { return useContext(WishlistContext); }
