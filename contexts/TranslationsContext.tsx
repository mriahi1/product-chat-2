import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
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

export const TranslationProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const [language, setLanguage] = useState<string>('fr');
  const t = (key: string) => {
    const langDictionary = translationsDict[language] || {};
    return langDictionary[key] || '';
  };

  if (!language) return (<>Loading...</>);

  return (
    <TranslationsContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationsContext) as TranslationsContextProps
