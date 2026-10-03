import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import type { Locale, Translations } from './types';
import { fr } from './fr';
import { en } from './en';

const translations: Record<Locale, Translations> = { fr, en };

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem('locale');
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {}
  const lang = navigator.language.split('-')[0];
  return lang === 'fr' ? 'fr' : 'en';
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem('locale', l); } catch {}
    document.documentElement.lang = l;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'fr' ? 'en' : 'fr');
  }, [locale, setLocale]);

  const value = useMemo(() => ({
    locale,
    t: translations[locale],
    setLocale,
    toggleLocale,
  }), [locale, setLocale, toggleLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
