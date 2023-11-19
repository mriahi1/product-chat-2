import React, { createContext, useContext, useState, ReactNode } from 'react';
import translations from '@/translations';

// Define your translations with an index signature
interface LanguageDictionary {
  [key: string]: string;
}

interface Translations {
  [language: string]: LanguageDictionary;
}

// Assuming your translations object has a similar shape to this
const translationsDict: Translations = {
  en: translations.en,
  fr: translations.fr,
  // other languages...
};

interface TranslationsContextProps {
  t: (key: string) => string;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const TranslationsContext = createContext<TranslationsContextProps | null>(null);

export const useTranslations = () => useContext(TranslationsContext);

export const TranslationsProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en');
  const t = (key: string) => {
    const langDictionary = translationsDict[language] || {};
    return langDictionary[key] || '';
  };

  return (
    <TranslationsContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationsContext.Provider>
  );
};
