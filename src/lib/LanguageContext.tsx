'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'sq',
  setLanguage: () => {},
  t: translations.sq,
  mounted: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with null — means "not yet read from storage"
  const [language, setLanguageState] = useState<Language | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read saved preference immediately on mount
    const saved = localStorage.getItem('ds-language') as Language;
    if (saved === 'en' || saved === 'sq') {
      setLanguageState(saved);
    } else {
      setLanguageState('sq'); // default
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ds-language', lang);
  };

  // While not mounted, use Albanian as fallback but keep page invisible
  const activeLang = language ?? 'sq';

  return (
    <LanguageContext.Provider value={{
      language: activeLang,
      setLanguage,
      t: translations[activeLang],
      mounted,
    }}>
      {/* Hide all page content until language is resolved — eliminates flash */}
      <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.15s ease' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
