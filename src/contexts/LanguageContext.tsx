import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ru' | 'zh' | 'ja' | 'ko' | 'hi' | 'es' | 'de' | 'fr' | 'tr' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
};

const defaultLanguage: Language = 'en';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the saved language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || defaultLanguage;
  });
  
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load translations for the selected language
    const loadTranslations = async () => {
      const translationsModule = await import(`../translations/${language}.json`);
      setTranslations(translationsModule.default);
    };

    loadTranslations();
    
    // Save the selected language to localStorage
    localStorage.setItem('language', language);
    
    // Update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { translations } = useLanguage();
  
  const t = (key: string): string => {
    return translations[key] || key;
  };
  
  return { t };
};
