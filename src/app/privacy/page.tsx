'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * Privacy Policy page.
 *
 * IMPORTANT: this is a starting template, not legal advice. Before going
 * live, have a lawyer (or at minimum a GDPR-savvy consultant) review the
 * content. Fields wrapped in [[BRACKETS]] are placeholders to fill in.
 */

export default function PrivacyPage() {
  const { language } = useLanguage();
  const sq = language === 'sq';

  const t = sq ? {
    eyebrow: '◆ Privatësia',
    title: 'Politika e Privatësisë',
    lastUpdated: 'Përditësuar së fundi: 30 Maj 2026',
    intro: 'Ne respektojmë privatësinë tuaj. Ky dokument shpjegon se cilat të dhëna mbledhim, përse i mbledhim, dhe çfarë mund të bëni ju në lidhje me to.',

    sections: [
      {
        title: '1. Kush jemi ne',
        body: '[[VENDOSNI EMRIN E KOMPANISË DHE ADRESËN E REGJISTRUAR]] operon faqen desuisse.com (në vijim "ne", "neve"). Për çdo pyetje në lidhje me të dhënat tuaja, na kontaktoni në info@desuisse.com.',
      },
      {
        title: '2. Çfarë të dhënash mbledhim',
        body: 'Kur ju vizitoni faqen tonë, vendosni një porosi, ose na kontaktoni, mblidhen të dhënat e mëposhtme:\n\n• Të dhëna kontakti që na jepni vetë: emri, adresa e emailit, numri i telefonit, adresa postare.\n• Të dhëna porosie: produktet që porositni, vlera, mënyra e dorëzimit.\n• Të dhëna teknike: adresa IP, lloji i shfletuesit, koha e vizitës — të nevojshme për sigurinë dhe parandalimin e abuzimit.\n• Cookie thelbësorë: të nevojshëm për funksionimin e shportës dhe seancës së admin-it.',
      },
      {
        title: '3. Përse i mbledhim',
        body: '• Për të përmbushur porositë tuaja.\n• Për t\u2019ju kontaktuar në lidhje me porositë ose pyetjet.\n• Për të mbrojtur faqen nga abuzimi (p.sh. detyrim rregullave të mbrojtjes nga sulmet).\n• Për të përmbushur detyrimet ligjore (p.sh. ruajtja e faturave për arsye tatimore).',
      },
      {
        title: '4. Si i ruajmë të dhënat',
        body: 'Të dhënat e produkteve dhe porosive ruhen në një bazë të dhënash të hostuar nga Upstash (BE). Emailet dërgohen përmes Resend. Faqja hostohet nga Vercel. Të gjithë këta ofrues janë në përputhje me GDPR.\n\nNuk i shesim, nuk i ndajmë, dhe nuk i transferojmë të dhënat tuaja te palë të treta për qëllime marketingu.',
      },
      {
        title: '5. Sa kohë i mbajmë',
        body: '• Të dhënat e porosive: 10 vjet (kërkesë ligjore tatimore).\n• Mesazhet e kontaktit: deri në 2 vjet.\n• Të dhënat teknike (logs të sigurisë): 90 ditë.\n• Të dhënat e llogarisë (kur të krijohet kjo veçori): derisa ju të kërkoni fshirjen.',
      },
      {
        title: '6. Të drejtat tuaja sipas GDPR',
        body: 'Ju keni të drejtë të:\n\n• Kërkoni një kopje të të dhënave që mbajmë për ju.\n• Kërkoni korrigjimin e çdo informacioni të pasaktë.\n• Kërkoni fshirjen e të dhënave tuaja ("e drejta për t\u2019u harruar"), me përjashtim të rasteve kur ne jemi të detyruar ligjërisht t\u2019i mbajmë.\n• Tërhiqni pëlqimin tuaj në çdo kohë.\n• Të paraqisni një ankesë te autoriteti i mbrojtjes së të dhënave i vendit tuaj.\n\nPër të ushtruar këto të drejta, na shkruani në info@desuisse.com. Ne përgjigjemi brenda 30 ditëve.',
      },
      {
        title: '7. Cookie',
        body: 'Përdorim vetëm cookie thelbësorë: një cookie që mban shportën tuaj kur shfletoni dhe një cookie që mban seancën e admin-it pas hyrjes. Nuk përdorim cookie për reklama ose ndjekje ndër-faqesh.',
      },
      {
        title: '8. Ndryshime në këtë politikë',
        body: 'Mund të përditësojmë këtë politikë herë pas here. Versioni i fundit gjithmonë do të gjendet në këtë faqe me datën e përditësimit lart.',
      },
      {
        title: '9. Kontakt',
        body: 'Për çdo pyetje në lidhje me të dhënat tuaja ose këtë politikë, na shkruani: info@desuisse.com.\n\nAdresa postare: [[VENDOSNI ADRESËN E REGJISTRUAR]]',
      },
    ],
  } : {
    eyebrow: '◆ Privacy',
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: 30 May 2026',
    intro: 'We respect your privacy. This document explains what data we collect, why we collect it, and what you can do about it.',

    sections: [
      {
        title: '1. Who we are',
        body: '[[INSERT REGISTERED COMPANY NAME AND ADDRESS]] operates the website desuisse.com (referred to as "we", "us" or "our"). For any questions about your data, contact info@desuisse.com.',
      },
      {
        title: '2. What data we collect',
        body: 'When you visit our site, place an order, or contact us, we collect the following data:\n\n• Contact information you provide: name, email address, phone number, postal address.\n• Order data: products you order, value, delivery method.\n• Technical data: IP address, browser type, visit timestamp — necessary for security and abuse prevention.\n• Essential cookies: required for shopping cart and admin session functionality.',
      },
      {
        title: '3. Why we collect it',
        body: '• To fulfil your orders.\n• To contact you about orders or enquiries.\n• To protect the site against abuse (e.g. rate limiting, attack prevention).\n• To comply with legal obligations (e.g. retaining invoices for tax purposes).',
      },
      {
        title: '4. How we store your data',
        body: 'Product and order data is stored in a database hosted by Upstash (EU). Emails are sent through Resend. The site is hosted by Vercel. All these providers are GDPR-compliant.\n\nWe do not sell, share, or transfer your data to third parties for marketing purposes.',
      },
      {
        title: '5. How long we keep it',
        body: '• Order data: 10 years (legal tax requirement).\n• Contact messages: up to 2 years.\n• Technical data (security logs): 90 days.\n• Account data (when this feature launches): until you request deletion.',
      },
      {
        title: '6. Your rights under GDPR',
        body: 'You have the right to:\n\n• Request a copy of the data we hold about you.\n• Request correction of any inaccurate information.\n• Request deletion of your data ("right to be forgotten"), except where we are legally obliged to retain it.\n• Withdraw your consent at any time.\n• Lodge a complaint with your local data protection authority.\n\nTo exercise any of these rights, email info@desuisse.com. We respond within 30 days.',
      },
      {
        title: '7. Cookies',
        body: 'We use only essential cookies: one to keep your shopping cart while you browse, and one to maintain your admin session after login. We do not use advertising cookies or cross-site tracking.',
      },
      {
        title: '8. Changes to this policy',
        body: 'We may update this policy from time to time. The latest version will always be available on this page with the update date at the top.',
      },
      {
        title: '9. Contact',
        body: 'For any questions about your data or this policy, email us: info@desuisse.com.\n\nPostal address: [[INSERT REGISTERED ADDRESS]]',
      },
    ],
  };

  return (
    <>
      <Header />

      {/* Page header */}
      <div style={{ background: '#f7f3ee', padding: '60px 40px', textAlign: 'center', borderBottom: '1px solid #e8e0d4' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14 }}>{t.eyebrow}</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, color: '#1a0a0a', lineHeight: 1.15 }}>{t.title}</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#888', marginTop: 14, letterSpacing: '0.05em' }}>{t.lastUpdated}</p>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '20px auto 0' }} />
      </div>

      {/* Content */}
      <article style={{ maxWidth: 780, margin: '0 auto', padding: '60px 40px 100px' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: '#555', lineHeight: 1.85, marginBottom: 40 }}>
          {t.intro}
        </p>

        {t.sections.map((s, i) => (
          <section key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: '#1a0a0a', marginBottom: 14 }}>
              {s.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#555', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {s.body}
            </p>
          </section>
        ))}
      </article>

      <Footer />
    </>
  );
}
