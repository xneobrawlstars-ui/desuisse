'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { CATEGORIES } from '@/data/products';

interface Props { open: boolean; onClose: () => void; }
type Section = 'jewellery' | 'resources' | 'help' | 'desuisse' | null;

export default function SidebarMenu({ open, onClose }: Props) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<Section>(null);
  const toggle = (s: Section) => setExpanded(prev => prev === s ? null : s);

  const t = {
    shop: language === 'sq' ? 'Dyqani' : 'Shop',
    about: language === 'sq' ? 'Rreth Nesh' : 'About Us',
    contact: language === 'sq' ? 'Kontakt' : 'Contact',
    jewellery: language === 'sq' ? 'Bizhuteri' : 'Jewellery',
    allJewellery: language === 'sq' ? 'Të gjitha Bizhuteritë' : 'All Jewellery',
    resources: language === 'sq' ? 'Burime' : 'Resources',
    help: language === 'sq' ? 'Ndihmë' : 'Help',
    desuisse: 'DeSuisse',
    boutiques: language === 'sq' ? 'Boutique-t' : 'Boutiques',
    jewelryCare: language === 'sq' ? 'Kujdesi i Bizhuterive' : 'Jewelry Care',
    ringSizer: language === 'sq' ? 'Matësi i Unazës' : 'Ring Sizer',
    diamondGuide: language === 'sq' ? 'Udhëzuesi i Diamantit' : 'Diamond Guide',
    shipping: language === 'sq' ? 'Dërgesa' : 'Shipping',
    warranty: language === 'sq' ? 'Garancia' : 'Warranty',
    faq: language === 'sq' ? 'Pyetjet e Shpeshta' : 'FAQ',
    bookAppointment: language === 'sq' ? 'Rezervo një Takim' : 'Book Appointment',
  };

  if (!open) return null;

  const SectionHeader = ({ label, section }: { label: string; section: Section }) => (
    <button onClick={() => toggle(section)} style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: 'Montserrat', fontSize: 14, fontWeight: expanded === section ? 600 : 400,
      color: expanded === section ? '#1a0a0a' : '#333', letterSpacing: '0.04em',
      borderBottom: expanded === section ? 'none' : '1px solid #f0ebe3',
      transition: 'color 0.2s',
    }}>
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        style={{ transform: expanded === section ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  );

  const TopLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} onClick={onClose} style={{
      display: 'block', padding: '18px 0',
      fontFamily: 'Montserrat', fontSize: 14, fontWeight: 400,
      color: '#333', textDecoration: 'none', letterSpacing: '0.04em',
      borderBottom: '1px solid #f0ebe3', transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'}
      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#333'}
    >{label}</Link>
  );

  const SubItem = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} onClick={onClose} style={{
      display: 'block', padding: '10px 0 10px 16px',
      fontFamily: 'Montserrat', fontSize: 13, color: '#666',
      textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'}
      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#666'}
    >{label}</Link>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,10,10,0.45)', zIndex: 199, backdropFilter: 'blur(2px)' }} />

      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '100%', maxWidth: 380,
        background: '#fff', zIndex: 200,
        display: 'flex', flexDirection: 'column',
        boxShadow: '8px 0 40px rgba(26,10,10,0.12)',
        animation: 'slideInLeft 0.28s ease',
        overflowY: 'auto',
      }}>
        {/* Sidebar header with logo + close */}
        <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e0d4', flexShrink: 0 }}>
          <Link href="/" onClick={onClose}>
            <Image src="https://desuisse.com/wp-content/uploads/2023/02/desuisselogo-2.png" alt="DeSuisse"
              width={130} height={40} style={{ objectFit: 'contain', height: 40, width: 'auto' }} unoptimized />
          </Link>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 6, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = '#1a0a0a'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = '#888'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <div style={{ padding: '8px 28px', flex: 1 }}>

          {/* About — only top-level link kept here */}
          <TopLink href="/about" label={t.about} />

          <div style={{ height: 8 }} />

          {/* Jewellery expandable */}
          <SectionHeader label={t.jewellery} section="jewellery" />
          {expanded === 'jewellery' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3', marginBottom: 4 }}>
              <SubItem href="/shop" label={t.allJewellery} />
              {CATEGORIES.map(cat => (
                <SubItem key={cat.key} href={`/shop?category=${cat.key}`} label={language === 'sq' ? cat.sq : cat.en} />
              ))}
            </div>
          )}

          {/* Resources expandable */}
          <SectionHeader label={t.resources} section="resources" />
          {expanded === 'resources' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3', marginBottom: 4 }}>
              <SubItem href="/jewelry-care" label={t.jewelryCare} />
              <SubItem href="/ring-sizer" label={t.ringSizer} />
              <SubItem href="/diamond-guide" label={t.diamondGuide} />
            </div>
          )}

          {/* Help expandable — NO Contact here (already at top), NO Returns */}
          <SectionHeader label={t.help} section="help" />
          {expanded === 'help' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3', marginBottom: 4 }}>
              <SubItem href="/shipping" label={t.shipping} />
              <SubItem href="/warranty" label={t.warranty} />
              <SubItem href="/faq" label={t.faq} />
            </div>
          )}

          {/* DeSuisse expandable — About already at top so not duplicated here */}
          <SectionHeader label={t.desuisse} section="desuisse" />
          {expanded === 'desuisse' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3', marginBottom: 4 }}>
              <SubItem href="/about" label={t.about} />
              <SubItem href="/boutiques" label={t.boutiques} />
            </div>
          )}
        </div>

        {/* Book appointment bottom CTA */}
        <div style={{ padding: '24px 28px', borderTop: '1px solid #e8e0d4', flexShrink: 0 }}>
          <Link href="/contact" onClick={onClose} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600,
            color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.06em',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {t.bookAppointment}
          </Link>
        </div>
      </div>

      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%) } to { transform: translateX(0) } }`}</style>
    </>
  );
}
