'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
export type { Language };
import { translations, getTranslation } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.fr;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readLangFromUrl(): Language | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && ['fr', 'en', 'ar'].includes(urlLang)) {
    return urlLang as Language;
  }
  return null;
}

function syncLangToUrl(lang: Language) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url.toString());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    // Priority: URL > localStorage > default
    const fromUrl = readLangFromUrl();
    if (fromUrl) {
      setLanguageState(fromUrl);
      localStorage.setItem('tamma_lang', fromUrl);
      return;
    }
    const saved = localStorage.getItem('tamma_lang') as Language;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLanguageState(saved);
      // Sync the URL to the localStorage value
      syncLangToUrl(saved);
    } else {
      // First visit — write default to URL
      syncLangToUrl('fr');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tamma_lang', lang);
    syncLangToUrl(lang);
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // Listen for back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      const fromUrl = readLangFromUrl();
      if (fromUrl && fromUrl !== language) {
        setLanguageState(fromUrl);
        localStorage.setItem('tamma_lang', fromUrl);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [language]);

  const t = getTranslation(language);
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
