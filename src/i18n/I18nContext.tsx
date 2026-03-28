import React from 'react';
import { getInitialLocale, LOCALE_STORAGE_KEY, type SupportedLocale, SUPPORTED_LOCALES } from './locales';
import { MESSAGES_BY_LOCALE } from './messages';

type Vars = Record<string, string | number>;

interface I18nValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, vars?: Vars) => string;
  supportedLocales: typeof SUPPORTED_LOCALES;
}

const I18nContext = React.createContext<I18nValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
  supportedLocales: SUPPORTED_LOCALES,
});

const interpolate = (template: string, vars?: Vars) => {
  if (!vars) return template;
  return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, name) => {
    const v = vars[name];
    return v === undefined || v === null ? '' : String(v);
  });
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = React.useState<SupportedLocale>(() => getInitialLocale());

  const setLocale = React.useCallback((next: SupportedLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    // Improves accessibility/SEO for screen readers and crawlers.
    document.documentElement.lang = locale;
  }, [locale]);

  const t = React.useCallback((key: string, vars?: Vars) => {
    const messages = MESSAGES_BY_LOCALE[locale] ?? MESSAGES_BY_LOCALE['en'];
    const fallback = MESSAGES_BY_LOCALE['en'];
    const template = messages[key] ?? fallback[key] ?? key;
    return interpolate(template, vars);
  }, [locale]);

  const value = React.useMemo<I18nValue>(() => ({ 
    locale, 
    setLocale, 
    t, 
    supportedLocales: SUPPORTED_LOCALES 
  }), [locale, setLocale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => React.useContext(I18nContext);
