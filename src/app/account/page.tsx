'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PasswordInput from '@/components/PasswordInput';
import { useUser } from '@/lib/UserContext';
import { useLanguage } from '@/lib/LanguageContext';

type Tab = 'signin' | 'signup';

export default function AccountPage() {
  const router = useRouter();
  const { signIn, signUp, currentUser, status } = useUser();
  const { language } = useLanguage();
  const sq = language === 'sq';
  const [tab, setTab] = useState<Tab>('signin');

  // If already signed in, redirect to dashboard
  if (status === 'signed-in' && currentUser) {
    if (typeof window !== 'undefined') {
      router.replace('/account/dashboard');
    }
  }

  const t = sq ? {
    eyebrow: '◆ Llogaria',
    title: 'Llogaria juaj',
    signin: 'Hyni',
    signup: 'Krijoni llogari',
    email: 'Adresa e emailit',
    password: 'Fjalëkalimi',
    confirmPassword: 'Konfirmoni fjalëkalimin',
    name: 'Emri i plotë',
    signinBtn: 'Hyni',
    signupBtn: 'Krijoni llogari',
    forgot: 'Keni harruar fjalëkalimin?',
    signupBenefit1: 'Ruani të preferuarat tuaja në çdo pajisje',
    signupBenefit2: 'Eksperiencë e personalizuar',
    signupBenefit3: 'Bashkohuni me komunitetin tonë',
    passwordHelp: 'Të paktën 8 karaktere, përfshirë një shkronjë dhe një numër.',
    checkInbox: 'Llogaria u krijua. Ju lutemi kontrolloni inbox-in tuaj për të verifikuar adresën e emailit.',
    submitting: 'Duke procesuar…',
    mismatch: 'Fjalëkalimet nuk përputhen',
    showPw: 'Shfaq fjalëkalimin',
    hidePw: 'Fshih fjalëkalimin',
  } : {
    eyebrow: '◆ Account',
    title: 'Your Account',
    signin: 'Sign In',
    signup: 'Create Account',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    name: 'Full name',
    signinBtn: 'Sign In',
    signupBtn: 'Create Account',
    forgot: 'Forgot your password?',
    signupBenefit1: 'Save favorites across all your devices',
    signupBenefit2: 'A more personal experience',
    signupBenefit3: 'Join our community',
    passwordHelp: 'At least 8 characters, including a letter and a number.',
    checkInbox: 'Account created. Please check your inbox to verify your email address.',
    submitting: 'Processing…',
    mismatch: 'Passwords do not match',
    showPw: 'Show password',
    hidePw: 'Hide password',
  };

  return (
    <>
      <Header />
      <main style={{
        minHeight: 'calc(100vh - 200px)',
        background: 'linear-gradient(180deg, #faf8f5 0%, #f7f3ee 100%)',
        padding: '60px 24px 80px',
      }}>
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 14 }}>{t.eyebrow}</p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.2 }}>{t.title}</h1>
            <div style={{ width: 36, height: 1, background: '#c9a84c', margin: '18px auto 0' }} />
          </div>

          {/* Tab switcher */}
          <div style={{ display: 'flex', background: '#fff', border: '1px solid #e8e0d4', marginBottom: 0 }}>
            <button
              onClick={() => setTab('signin')}
              style={tabStyle(tab === 'signin')}
            >{t.signin}</button>
            <button
              onClick={() => setTab('signup')}
              style={tabStyle(tab === 'signup')}
            >{t.signup}</button>
          </div>

          {/* Tab content */}
          {tab === 'signin'
            ? <SignInForm onSubmit={signIn} t={t} />
            : <SignUpForm onSubmit={signUp} t={t} language={language as 'en' | 'sq'} />}
        </div>
      </main>
      <Footer />
    </>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: '16px',
    background: active ? '#1a0a0a' : 'transparent',
    color: active ? '#fff' : '#888',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };
}

function inputStyle(): React.CSSProperties {
  return {
    width: '100%',
    padding: '13px 16px',
    border: '1px solid #e8e0d4',
    background: '#fff',
    fontFamily: 'var(--font-sans)',
    fontSize: 14,
    color: '#1a0a0a',
    boxSizing: 'border-box',
  };
}

function labelStyle(): React.CSSProperties {
  return {
    display: 'block',
    fontFamily: 'var(--font-sans)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: 8,
  };
}

function buttonStyle(): React.CSSProperties {
  return {
    width: '100%',
    padding: '15px',
    background: '#1a0a0a',
    color: '#fff',
    border: 'none',
    fontFamily: 'var(--font-sans)',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };
}

interface SignInProps {
  onSubmit: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string; needsVerification?: boolean }>;
  t: any;
}

function SignInForm({ onSubmit, t }: SignInProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setNeedsVerification(false); setSubmitting(true);
    const result = await onSubmit(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      if (result.needsVerification) setNeedsVerification(true);
      return;
    }
    router.push('/account/dashboard');
  };

  return (
    <form onSubmit={handle} style={{ background: '#fff', border: '1px solid #e8e0d4', borderTop: 'none', padding: '32px 28px' }}>
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle()} htmlFor="signin-email">{t.email}</label>
        <input id="signin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle()} autoComplete="email" />
      </div>
      <div style={{ marginBottom: 22 }}>
        <PasswordInput
          id="signin-password"
          label={t.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          showLabel={t.showPw}
          hideLabel={t.hidePw}
        />
      </div>
      {error && (
        <p style={{ color: '#c0392b', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '10px 14px', background: '#fef0ee', border: '1px solid #f5d4d0' }}>
          {error}
        </p>
      )}
      {needsVerification && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', marginBottom: 16 }}>
          (If you didn&apos;t receive the verification email, please contact info@desuisse.com)
        </p>
      )}
      <button type="submit" disabled={submitting} style={{ ...buttonStyle(), opacity: submitting ? 0.6 : 1 }}>
        {submitting ? t.submitting : t.signinBtn}
      </button>
      <p style={{ textAlign: 'center', marginTop: 18 }}>
        <Link href="/account/forgot-password" style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#888', textDecoration: 'underline' }}>
          {t.forgot}
        </Link>
      </p>
    </form>
  );
}

interface SignUpProps {
  onSubmit: (email: string, password: string, name: string, language?: 'en' | 'sq') => Promise<{ ok: true; message: string } | { ok: false; error: string }>;
  t: any;
  language: 'en' | 'sq';
}

function SignUpForm({ onSubmit, t, language }: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    // Check password match BEFORE submitting — avoids a useless network round-trip
    // and a flash of "Processing…" when the customer just mistyped.
    if (password !== confirmPassword) { setError(t.mismatch); return; }
    setSubmitting(true);
    const result = await onSubmit(email, password, name, language);
    setSubmitting(false);
    if (!result.ok) { setError(result.error); return; }
    setSuccess(result.message || t.checkInbox);
    setEmail(''); setPassword(''); setConfirmPassword(''); setName('');
  };

  return (
    <form onSubmit={handle} style={{ background: '#fff', border: '1px solid #e8e0d4', borderTop: 'none', padding: '32px 28px' }}>
      {/* Benefits */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[t.signupBenefit1, t.signupBenefit2, t.signupBenefit3].map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: '#c9a84c', fontSize: 12, marginTop: 2 }}>◆</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#555' }}>{b}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle()} htmlFor="signup-name">{t.name}</label>
        <input id="signup-name" type="text" value={name} onChange={e => setName(e.target.value)} required style={inputStyle()} autoComplete="name" />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle()} htmlFor="signup-email">{t.email}</label>
        <input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle()} autoComplete="email" />
      </div>
      <div style={{ marginBottom: 18 }}>
        <PasswordInput
          id="signup-password"
          label={t.password}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          showLabel={t.showPw}
          hideLabel={t.hidePw}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <PasswordInput
          id="signup-confirm-password"
          label={t.confirmPassword}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
          showLabel={t.showPw}
          hideLabel={t.hidePw}
        />
      </div>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#aaa', marginBottom: 22, lineHeight: 1.6 }}>
        {t.passwordHelp}
      </p>
      {error && (
        <p style={{ color: '#c0392b', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '10px 14px', background: '#fef0ee', border: '1px solid #f5d4d0' }}>
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: '#27ae60', fontFamily: 'var(--font-sans)', fontSize: 12, marginBottom: 16, padding: '12px 14px', background: '#eef9f1', border: '1px solid #c8e6d2', lineHeight: 1.6 }}>
          ✓ {success}
        </p>
      )}
      <button type="submit" disabled={submitting} style={{ ...buttonStyle(), opacity: submitting ? 0.6 : 1 }}>
        {submitting ? t.submitting : t.signupBtn}
      </button>
    </form>
  );
}
