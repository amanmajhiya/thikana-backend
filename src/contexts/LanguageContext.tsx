// Language context - manages app localization
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { t as translate, type Lang, type TranslationKey } from '@/lib/i18n';

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey | string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key as string,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('thikana-lang') as Lang) || 'en';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('thikana-lang', l);
  }, []);

  const t = useCallback((key: TranslationKey | string) => translate(key as TranslationKey, lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === 'hinglish' ? 'en' : lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
