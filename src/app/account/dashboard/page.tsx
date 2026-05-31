'use client';
/**
 * /account/dashboard
 *
 * Customer's signed-in home page. Shows:
 *   - Welcome with their name
 *   - Quick stats (wishlist count)
 *   - Links to view favorites, browse shop
 *   - Sign out button
 *
 * Redirects to /account if not signed in.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/UserContext';
import { useWishlist } from '@/lib/WishlistContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, status, signOut } = useUser();
  const { count } = useWishlist();
  const { language } = useLanguage();
  const sq = language === 'sq';

  useEffect(() => {
    if (status === 'signed-out') router.replace('/account');
  }, [status, router]);

  if (status === 'loading' || !currentUser) {
    return (
      <>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 200px)', padding: '60px 24px' }} />
        <Footer />
      </>
    );
  }

  const t = sq ? {
    eyebrow: '◆ Llogaria',
    welcome: 'Mirë se vini',
    yourAccount: 'Llogaria juaj',
    email: 'Email',
    wishlistCount: 'produkte në të preferuarat',
    viewWishlist: 'Shih të preferuarat',
    browseShop: 'Shfleto dyqanin',
    signOut: 'Dilni',
  } : {
    eyebrow: '◆ Account',
    welcome: 'Welcome back',
    yourAccount: 'Your account',
    email: 'Email',
    wishlistCount: 'items in favorites',
    viewWishlist: 'View favorites',
    browseShop: 'Browse the shop',
    signOut: 'Sign out',
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 200px)', background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 14 }}>{t.eyebrow}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.6rem)', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.2 }}>
              {t.welcome}, {currentUser.name.split(' ')[0]}
            </h1>
            <div style={{ width: 36, height: 1, background: '#c9a84c', margin: '20px auto 0' }} />
          </div>

          {/* Account info card */}
          <div style={{ background: '#fff', border: '1px solid #e8e0d4', padding: '28px 32px', marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: 18 }}>
              {t.yourAccount}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', minWidth: 60 }}>{t.email}:</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: 17, color: '#1a0a0a' }}>{currentUser.email}</span>
            </div>
          </div>

          {/* Quick links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
            <Link href="/favorites" style={{ background: '#fff', border: '1px solid #e8e0d4', padding: '28px', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, color: '#c9a84c', marginBottom: 4 }}>{count}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', letterSpacing: '0.08em', marginBottom: 16 }}>{t.wishlistCount}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a0a0a' }}>{t.viewWishlist} →</p>
            </Link>
            <Link href="/shop" style={{ background: '#fff', border: '1px solid #e8e0d4', padding: '28px', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.2" style={{ marginBottom: 8 }}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', letterSpacing: '0.08em', marginBottom: 16 }}>&nbsp;</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a0a0a' }}>{t.browseShop} →</p>
            </Link>
          </div>

          {/* Sign out */}
          <div style={{ textAlign: 'center' }}>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid #d0c8b8', padding: '13px 32px', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', cursor: 'pointer', transition: 'all 0.2s' }}>
              {t.signOut}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
