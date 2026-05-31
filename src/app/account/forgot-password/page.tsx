'use client';
/**
 * /account/forgot-password
 *
 * Customer enters their email; we send them a reset link. We always show
 * the same success message regardless of whether the email exists
 * (matches the API behaviour — prevents enumeration).
 */
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/lib/UserContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useUser();
  const { language } = useLanguage();
  const sq = language === 'sq';
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const t = sq ? {
    eyebrow: '◆ Rikuperimi',
    title: 'Keni harruar fjalëkalimin?',
    intro: 'Shkruani adresën tuaj të emailit dhe ne do t\u2019ju dërgojmë një lidhje për të vendosur një fjalëkalim të ri.',
    email: 'Adresa e emailit',
    submit: 'Dërgo lidhjen',
    submitting: 'Duke dërguar…',
    back: 'Kthehu te hyrja',
  } : {
    eyebrow: '◆ Recovery',
    title: 'Forgot your password?',
    intro: 'Enter your email address and we will send you a link to set a new password.',
    email: 'Email address',
    submit: 'Send reset link',
    submitting: 'Sending…',
    back: 'Back to sign in',
  };

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); setError(''); setSubmitting(true);
    const result = await forgotPassword(email, language as 'en' | 'sq');
    setSubmitting(false);
    if (result.ok) {
      setMessage(result.message);
      setEmail('');
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: 'calc(100vh - 200px)', padding: '60px 24px 80px', background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)' }}>
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 14 }}>{t.eyebrow}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.2 }}>{t.title}</h1>
            <div style={{ width: 32, height: 1, background: '#c9a84c', margin: '18px auto 0' }} />
          </div>

          <form onSubmit={handle} style={{ background: '#fff', border: '1px solid #e8e0d4', padding: '32px 28px' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#666', lineHeight: 1.8, marginBottom: 24 }}>{t.intro}</p>

            <div style={{ marginBottom: 22 }}>
              <label htmlFor="forgot-email" style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>{t.email}</label>
              <input id="forgot-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '13px 16px', border: '1px solid #e8e0d4', background: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, color: '#1a0a0a', boxSizing: 'border-box' }} autoComplete="email" />
            </div>

            {error && (
              <p style={{ color: '#c0392b', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '10px 14px', background: '#fef0ee', border: '1px solid #f5d4d0' }}>{error}</p>
            )}
            {message && (
              <p style={{ color: '#27ae60', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '12px 14px', background: '#eef9f1', border: '1px solid #c8e6d2', lineHeight: 1.6 }}>✓ {message}</p>
            )}

            <button type="submit" disabled={submitting} style={{ width: '100%', padding: '15px', background: '#1a0a0a', color: '#fff', border: 'none', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', opacity: submitting ? 0.6 : 1 }}>
              {submitting ? t.submitting : t.submit}
            </button>

            <p style={{ textAlign: 'center', marginTop: 18 }}>
              <Link href="/account" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', textDecoration: 'underline' }}>{t.back}</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
