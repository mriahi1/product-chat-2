import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations from '@/translations';

interface Translations {
  [key: string]: string;
}

interface TranslationsContextProps {
  t: (key: string) => string;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const TranslationsContext = createContext<TranslationsContextProps | null>(null);

export const useTranslations = () => useContext(TranslationsContext);

export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const t = (key: string) => translations[language as keyof Translations][key] || '';

  return (
    <TranslationsContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationsContext.Provider>
  );
};



