'use client';
/**
 * /account/reset-password?token=...
 *
 * Customer arrives via the password-reset email link. Enters a new
 * password. We POST it with the token to /api/auth/reset-password.
 *
 * On success: redirect to /account so they can sign in with the new password.
 */
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

function ResetContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const sq = language === 'sq';
  const token = params.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const t = sq ? {
    eyebrow: '◆ Fjalëkalimi i Ri',
    title: 'Vendosni një fjalëkalim të ri',
    intro: 'Zgjidhni një fjalëkalim të fortë që nuk e keni përdorur më parë në llogari të tjera.',
    password: 'Fjalëkalimi i ri',
    confirm: 'Konfirmoni fjalëkalimin',
    submit: 'Rivendos fjalëkalimin',
    submitting: 'Duke procesuar…',
    mismatch: 'Fjalëkalimet nuk përputhen',
    noToken: 'Kjo faqe pret një lidhje për rivendosjen e fjalëkalimit nga emaili juaj.',
    successMsg: 'Fjalëkalimi u rivendos. Po ju ridrejtojmë te hyrja…',
    passwordHelp: 'Të paktën 8 karaktere, përfshirë një shkronjë dhe një numër.',
  } : {
    eyebrow: '◆ New Password',
    title: 'Set a new password',
    intro: 'Choose a strong password you have not used before on other accounts.',
    password: 'New password',
    confirm: 'Confirm password',
    submit: 'Reset password',
    submitting: 'Processing…',
    mismatch: 'Passwords do not match',
    noToken: 'This page expects a password-reset link from your email.',
    successMsg: 'Password reset. Redirecting to sign-in…',
    passwordHelp: 'At least 8 characters, including a letter and a number.',
  };

  if (!token) {
    return (
      <main style={{ minHeight: 'calc(100vh - 200px)', padding: '80px 24px', textAlign: 'center', background: '#f7f3ee' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#666', marginBottom: 22 }}>{t.noToken}</p>
        <Link href="/account/forgot-password" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1a0a0a', textDecoration: 'underline' }}>{sq ? 'Kërkoni një lidhje të re' : 'Request a new link'}</Link>
      </main>
    );
  }

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError(t.mismatch); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json().catch(() => ({}));
      setSubmitting(false);
      if (!res.ok) { setError(data.error || (sq ? 'Gabim' : 'Error')); return; }
      setSuccess(true);
      setTimeout(() => router.push('/account'), 2000);
    } catch {
      setSubmitting(false);
      setError(sq ? 'Gabim rrjeti' : 'Network error');
    }
  };

  return (
    <main style={{ minHeight: 'calc(100vh - 200px)', padding: '60px 24px 80px', background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)' }}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 14 }}>{t.eyebrow}</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.2 }}>{t.title}</h1>
          <div style={{ width: 32, height: 1, background: '#c9a84c', margin: '18px auto 0' }} />
        </div>

        <form onSubmit={handle} style={{ background: '#fff', border: '1px solid #e8e0d4', padding: '32px 28px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666', lineHeight: 1.8, marginBottom: 24 }}>{t.intro}</p>

          <div style={{ marginBottom: 18 }}>
            <label htmlFor="reset-password" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>{t.password}</label>
            <input id="reset-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={{ width: '100%', padding: '13px 16px', border: '1px solid #e8e0d4', background: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a0a0a', boxSizing: 'border-box' }} autoComplete="new-password" />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label htmlFor="reset-confirm" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>{t.confirm}</label>
            <input id="reset-confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} style={{ width: '100%', padding: '13px 16px', border: '1px solid #e8e0d4', background: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a0a0a', boxSizing: 'border-box' }} autoComplete="new-password" />
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#aaa', marginBottom: 22, lineHeight: 1.6 }}>{t.passwordHelp}</p>

          {error && (
            <p style={{ color: '#c0392b', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '10px 14px', background: '#fef0ee', border: '1px solid #f5d4d0' }}>{error}</p>
          )}
          {success && (
            <p style={{ color: '#27ae60', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '12px 14px', background: '#eef9f1', border: '1px solid #c8e6d2', lineHeight: 1.6 }}>✓ {t.successMsg}</p>
          )}

          <button type="submit" disabled={submitting || success} style={{ width: '100%', padding: '15px', background: '#1a0a0a', color: '#fff', border: 'none', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', opacity: (submitting || success) ? 0.6 : 1 }}>
            {submitting ? t.submitting : t.submit}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<main style={{ minHeight: 'calc(100vh - 200px)' }} />}>
        <ResetContent />
      </Suspense>
      <Footer />
    </>
  );
}
