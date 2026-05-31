'use client';
/**
 * UserContext: tracks the currently signed-in customer client-side.
 *
 * On mount, hits /api/auth/me to determine if there's a valid session
 * cookie. After login/logout the state updates.
 *
 * What lives here:
 *   - currentUser: User object or null
 *   - status: 'loading' | 'signed-in' | 'signed-out'
 *   - signIn(email, password): performs login
 *   - signOut(): logs out
 *   - signUp(email, password, name): creates account
 *   - refresh(): re-fetches user from server
 *
 * Wishlist sync happens in WishlistContext, which subscribes to user state.
 */
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  wishlist: string[];
}

type Status = 'loading' | 'signed-in' | 'signed-out';

interface UserContextValue {
  currentUser: PublicUser | null;
  status: Status;
  signIn: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string; needsVerification?: boolean }>;
  signUp: (email: string, password: string, name: string, language?: 'en' | 'sq') => Promise<{ ok: true; message: string } | { ok: false; error: string }>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string, language?: 'en' | 'sq') => Promise<{ ok: true; message: string } | { ok: false; error: string }>;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<PublicUser | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        cache: 'no-store',
      });
      if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        setStatus('signed-in');
      } else {
        setCurrentUser(null);
        setStatus('signed-out');
      }
    } catch {
      setCurrentUser(null);
      setStatus('signed-out');
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false as const, error: data.error || 'Sign-in failed', needsVerification: !!data.needsVerification };
      }
      await refresh();
      return { ok: true as const };
    } catch {
      return { ok: false as const, error: 'Network error. Please try again.' };
    }
  }, [refresh]);

  const signUp = useCallback(async (email: string, password: string, name: string, language: 'en' | 'sq' = 'en') => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password, name, language }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { ok: false as const, error: data.error || 'Sign-up failed' };
      }
      return { ok: true as const, message: data.message || 'Account created.' };
    } catch {
      return { ok: false as const, error: 'Network error. Please try again.' };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
    } catch { /* swallow — even if request fails, we want to update client state */ }
    setCurrentUser(null);
    setStatus('signed-out');
  }, []);

  const forgotPassword = useCallback(async (email: string, language: 'en' | 'sq' = 'en') => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, language }),
      });
      const data = await res.json().catch(() => ({}));
      // forgot-password ALWAYS returns 200, so just bubble the message up
      return { ok: true as const, message: data.message || 'If an account exists, a reset link has been sent.' };
    } catch {
      return { ok: false as const, error: 'Network error. Please try again.' };
    }
  }, []);

  return (
    <UserContext.Provider value={{
      currentUser, status, signIn, signUp, signOut, forgotPassword, refresh,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
