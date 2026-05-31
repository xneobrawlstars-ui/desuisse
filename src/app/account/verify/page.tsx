'use client';
/**
 * /account/verify?status=success|invalid|missing
 *
 * Landing page after clicking the verification link in the email.
 * The /api/auth/verify endpoint redirects here with a status parameter.
 *
 * On success the API has already created a session, so the customer is
 * already signed in by the time they land here.
 */
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/UserContext';
import { useLanguage } from '@/lib/LanguageContext';

function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { refresh } = useUser();
  const { language } = useLanguage();
  const sq = language === 'sq';
  const [status, setStatus] = useState<string>(params.get('status') ?? 'missing');

  // After landing here with status=success, refresh the user state so
  // header & wishlist sync pick up the new session
  useEffect(() => {
    if (status === 'success') {
      refresh();
    }
  }, [status, refresh]);

  const t = sq ? {
    successTitle: 'Emaili u verifikua',
    successBody: 'Faleminderit! Llogaria juaj është aktive. Jeni hyrë automatikisht.',
    successBtn: 'Shko te llogaria',
    invalidTitle: 'Lidhja nuk është e vlefshme',
    invalidBody: 'Kjo lidhje ka skaduar ose është përdorur tashmë. Provoni të hyni ose krijoni një llogari të re.',
    invalidBtn: 'Hyni',
    missingTitle: 'Pa token verifikimi',
    missingBody: 'Kjo faqe pret një lidhje verifikimi nga emaili juaj.',
    missingBtn: 'Krijoni llogari',
  } : {
    successTitle: 'Email verified',
    successBody: 'Thank you! Your account is active. You have been signed in automatically.',
    successBtn: 'Go to my account',
    invalidTitle: 'Invalid or expired link',
    invalidBody: 'This link has expired or has already been used. Try signing in or creating a new account.',
    invalidBtn: 'Sign in',
    missingTitle: 'No verification token',
    missingBody: 'This page expects a verification link from your email.',
    missingBtn: 'Create account',
  };

  const config = {
    success: { title: t.successTitle, body: t.successBody, btn: t.successBtn, href: '/account/dashboard', color: '#27ae60' },
    invalid: { title: t.invalidTitle, body: t.invalidBody, btn: t.invalidBtn, href: '/account', color: '#c0392b' },
    missing: { title: t.missingTitle, body: t.missingBody, btn: t.missingBtn, href: '/account', color: '#888' },
  }[status] || { title: t.missingTitle, body: t.missingBody, btn: t.missingBtn, href: '/account', color: '#888' };

  return (
    <main style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)' }}>
      <div style={{ maxWidth: 480, textAlign: 'center', background: '#fff', border: '1px solid #e8e0d4', padding: '48px 36px' }}>
        <div style={{ marginBottom: 18 }}>
          {status === 'success' ? (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={config.color} strokeWidth="1.5" style={{ margin: '0 auto' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          ) : (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.4em', color: '#c9a84c' }}>◆</p>
          )}
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 14, lineHeight: 1.25 }}>
          {config.title}
        </h1>
        <div style={{ width: 32, height: 1, background: '#c9a84c', margin: '0 auto 18px' }} />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#666', lineHeight: 1.8, marginBottom: 28 }}>
          {config.body}
        </p>
        <Link href={config.href} style={{ display: 'inline-block', padding: '13px 30px', background: '#1a0a0a', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}>
          {config.btn}
        </Link>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<main style={{ minHeight: 'calc(100vh - 200px)' }} />}>
        <VerifyContent />
      </Suspense>
      <Footer />
    </>
  );
}
