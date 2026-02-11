import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Language, LanguageConfig, TranslationStrings } from './types';
import pt from './pt';
import en from './en';
import es from './es';

const languages: Record<Language, LanguageConfig> = { pt, en, es };

const STORAGE_KEY = 'impostor-game-lang';

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored in languages) return stored as Language;
  return 'pt';
}

function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(params[key] ?? ''));
}

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationStrings, params?: Record<string, string | number>) => string;
  themes: string[];
  locale: string;
  availableLanguages: { code: Language; label: string; flag: string }[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const config = languages[language];

  useEffect(() => {
    document.documentElement.lang = config.locale;
    document.title = config.strings['common.appTitle'];
  }, [config]);

  const t = useCallback(
    (key: keyof TranslationStrings, params?: Record<string, string | number>): string => {
      const raw = config.strings[key] ?? key;
      return params ? interpolate(raw, params) : raw;
    },
    [config],
  );

  const availableLanguages = useMemo(
    () => Object.entries(languages).map(([code, cfg]) => ({
      code: code as Language,
      label: cfg.label,
      flag: cfg.flag,
    })),
    [],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      themes: config.themes,
      locale: config.locale,
      availableLanguages,
    }),
    [language, setLanguage, t, config, availableLanguages],
  );

  return React.createElement(I18nContext.Provider, { value }, children);
};

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within a LanguageProvider');
  return ctx;
}
