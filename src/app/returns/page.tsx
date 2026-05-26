'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function ReturnsPage() {
  const { language } = useLanguage();
  return (
    <>
      <Header />
      <div style={{ background: '#f7f3ee', padding: '48px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <h1 className="section-title">{language === 'sq' ? 'Kthimet & Shkëmbimet' : 'Returns & Exchanges'}</h1>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '16px auto 0' }} />
      </div>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px' }}>
        <p style={{ fontFamily: 'Montserrat', fontSize: 14, color: '#555', lineHeight: 1.9 }}>
          {language === 'sq' ? 'Shtoni politikën tuaj të kthimeve këtu...' : 'Add your returns policy here...'}
        </p>
      </section>
      <Footer />
    </>
  );
}
