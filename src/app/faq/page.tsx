'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

export default function FAQPage() {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const faqs = language === 'sq' ? [
    { q: 'Si mund të bëj një porosi?', a: 'Zgjidhni produktin, materialin dhe madhësinë e dëshiruar, pastaj shtoni në shportë dhe vazhdoni me arkëtimin.' },
    { q: 'Sa kohë duhet për dorëzim?', a: 'Porositë tona prodhohen me porosi brenda 2–4 javësh. Dorëzimi ndërkombëtar bëhet brenda 5–10 ditëve pune.' },
    { q: 'A mund të bëj ndryshime pas porosisë?', a: 'Ndryshimet mund të bëhen brenda 24 orëve nga momenti i porosisë. Kontaktoni shërbimin tonë të klientit.' },
    { q: 'A ofrojnë garanci produktet tuaja?', a: 'Po, të gjitha produktet tona vijnë me garanci 2-vjeçare ndaj defekteve të prodhimit.' },
  ] : [
    { q: 'How do I place an order?', a: 'Choose your product, select the material and size, then add to cart and proceed to checkout.' },
    { q: 'How long does delivery take?', a: 'Our pieces are made to order within 2–4 weeks. International shipping takes 5–10 business days.' },
    { q: 'Can I make changes after ordering?', a: 'Changes can be made within 24 hours of placing your order. Please contact our customer service.' },
    { q: 'Do your products come with a warranty?', a: 'Yes, all our products come with a 2-year warranty against manufacturing defects.' },
  ];
  return (
    <>
      <Header />
      <div style={{ background: '#f7f3ee', padding: '48px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <h1 className="section-title">{language === 'sq' ? 'Pyetjet e Shpeshta' : 'FAQ'}</h1>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '16px auto 0' }} />
      </div>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 40px' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #e8e0d4' }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: 13, fontWeight: 600, color: '#1a0a0a' }}>{faq.q}</span>
              <span style={{ color: '#c9a84c', fontSize: 20, lineHeight: 1 }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p style={{ fontFamily: 'Montserrat', fontSize: 13, color: '#666', lineHeight: 1.8, paddingBottom: 20 }}>{faq.a}</p>}
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
