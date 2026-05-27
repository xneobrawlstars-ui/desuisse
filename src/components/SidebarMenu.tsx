'use client';
import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useLanguage } from '@/lib/LanguageContext';

interface Props { open: boolean; onClose: () => void; }
type Section = 'rings' | 'jewellery' | 'desuisse' | null;

export default function SidebarMenu({ open, onClose }: Props) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<Section>(null);
  const toggle = (s: Section) => setExpanded(prev => prev === s ? null : s);

  const t = {
    home:          language === 'sq' ? 'Kryefaqja' : 'Home',
    rings:         language === 'sq' ? 'DeSuisse Unaza' : 'DeSuisse Rings',
    engagement:    language === 'sq' ? 'Unaza Fejese' : 'Engagement Rings',
    wedding:       language === 'sq' ? 'Unaza Martese' : 'Wedding Rings',
    engraving:     language === 'sq' ? 'Gravim Falas' : 'Free Engraving',
    sizing:        language === 'sq' ? 'Madhësia dhe Shërbimi' : 'Sizing and Service',
    ringCare:      language === 'sq' ? 'Kujdesi i Unazës' : 'Ring Care',
    jewellery:     language === 'sq' ? 'DeSuisse Bizhuteri' : 'DeSuisse Jewellery',
    allRings:      language === 'sq' ? 'Unaza' : 'Rings',
    earrings:      language === 'sq' ? 'Vathë' : 'Earrings',
    necklaces:     language === 'sq' ? 'Qafore' : 'Necklaces',
    bracelets:     language === 'sq' ? 'Byzylykë' : 'Bracelets',
    vouchers:      language === 'sq' ? 'Kuponë Dhuratë' : 'Gift Vouchers',
    customDesign:  language === 'sq' ? 'Dizajn i Personalizuar' : 'Custom Design',
    ringStory:     language === 'sq' ? 'Historia e Unazës' : 'The Story of the Ring',
    faq:           language === 'sq' ? 'Pyetjet e Shpeshta' : 'FAQ',
    aboutUs:       language === 'sq' ? 'Rreth Nesh' : 'About Us',
    desuisse:      'DeSuisse',
    boutiques:     language === 'sq' ? 'Boutique-t' : 'Boutiques',
    ourHistory:    language === 'sq' ? 'Historia Jonë' : 'Our History',
    bookAppointment: language === 'sq' ? 'Rezervo një Takim' : 'Book Appointment',
  };

  if (!open) return null;

  const SectionHeader = ({ label, section }: { label: string; section: Section }) => (
    <button onClick={() => toggle(section)} style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer',
      fontFamily: 'Montserrat', fontSize: 13, fontWeight: expanded === section ? 700 : 500,
      color: expanded === section ? '#1a0a0a' : '#333', letterSpacing: '0.06em',
      textTransform: 'none',
      borderBottom: expanded === section ? 'none' : '1px solid #f0ebe3',
      transition: 'color 0.2s',
    }}>
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        style={{ transform: expanded === section ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  );

  const TopLink = ({ href, label, isNew }: { href: string; label: string; isNew?: boolean }) => (
    <Link href={href} onClick={onClose} style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '14px 0',
      fontFamily: 'Montserrat', fontSize: 13, fontWeight: 500,
      color: '#333', textDecoration: 'none', letterSpacing: '0.04em',
      borderBottom: '1px solid #f0ebe3', transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'}
      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#333'}
    >
      {label}
      {isNew && <span style={{ background: '#c9a84c', color: '#1a0a0a', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', padding: '2px 6px', textTransform: 'uppercase' }}>NEW</span>}
    </Link>
  );

  const SubItem = ({ href, label, isNew }: { href: string; label: string; isNew?: boolean }) => (
    <Link href={href} onClick={onClose} style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 0 10px 16px', fontFamily: 'Montserrat', fontSize: 12,
      color: '#666', textDecoration: 'none', letterSpacing: '0.03em', transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c9a84c'}
      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#666'}
    >
      {label}
      {isNew && <span style={{ background: '#c9a84c', color: '#1a0a0a', fontFamily: 'Montserrat', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', padding: '2px 5px', textTransform: 'uppercase' }}>NEW</span>}
    </Link>
  );

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,10,10,0.45)', zIndex: 199, backdropFilter: 'blur(2px)' }} />

      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '100%', maxWidth: 360, background: '#fff', zIndex: 200, display: 'flex', flexDirection: 'column', boxShadow: '8px 0 40px rgba(26,10,10,0.12)', animation: 'slideInLeft 0.28s ease', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e0d4', flexShrink: 0 }}>
          <Link href="/" onClick={onClose}>
            <Logo dark={true} size="md" />
          </Link>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 6 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Nav */}
        <div style={{ padding: '4px 24px', flex: 1 }}>

          {/* Home */}
          <TopLink href="/" label={t.home} />

          {/* DeSuisse Rings */}
          <SectionHeader label={t.rings} section="rings" />
          {expanded === 'rings' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3' }}>
              <SubItem href="/shop?category=engagement-rings" label={t.engagement} />
              <SubItem href="/shop?category=wedding-rings" label={t.wedding} />
              <SubItem href="/free-engraving" label={t.engraving} />
              <SubItem href="/sizing-service" label={t.sizing} />
              <SubItem href="/jewelry-care" label={t.ringCare} />
            </div>
          )}

          {/* DeSuisse Jewellery */}
          <SectionHeader label={t.jewellery} section="jewellery" />
          {expanded === 'jewellery' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3' }}>
              <SubItem href="/shop?category=everyday-rings" label={t.allRings} />
              <SubItem href="/shop?category=earrings" label={t.earrings} />
              <SubItem href="/shop?category=necklaces" label={t.necklaces} />
              <SubItem href="/shop?category=bracelets" label={t.bracelets} />
              <SubItem href="/gift-vouchers" label={t.vouchers} isNew />
            </div>
          )}

          {/* Standalone links */}
          <TopLink href="/custom-design" label={t.customDesign} />
          <TopLink href="/ring-story" label={t.ringStory} />
          <TopLink href="/faq" label={t.faq} />

          {/* DeSuisse (About) */}
          <SectionHeader label={t.desuisse} section="desuisse" />
          {expanded === 'desuisse' && (
            <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0ebe3' }}>
              <SubItem href="/boutiques" label={t.boutiques} />
              <SubItem href="/about" label={t.ourHistory} />
            </div>
          )}
        </div>

        {/* Book appointment CTA */}
        <div style={{ padding: '20px 24px', borderTop: '1px solid #e8e0d4', flexShrink: 0 }}>
          <Link href="/contact" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Montserrat', fontSize: 12, fontWeight: 600, color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.06em' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {t.bookAppointment}
          </Link>
        </div>
      </div>

      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%) } to { transform: translateX(0) } }`}</style>
    </>
  );
}
