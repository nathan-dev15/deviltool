export type SupportedLocale =
  | 'en'
  | 'en-US'
  | 'hi'
  | 'id'
  | 'pt-BR'
  | 'ja'
  | 'de'
  | 'ru'
  | 'ta';

export const LOCALE_STORAGE_KEY = 'tn-locale';

export const SUPPORTED_LOCALES: Array<{
  code: SupportedLocale;
  label: string;
}> = [
  { code: 'en',    label: 'English (Global)' },
  { code: 'en-US', label: 'English (USA)' },
  { code: 'hi',    label: 'Hindi (India)' },
  { code: 'id',    label: 'Indonesian (Bahasa)' },
  { code: 'pt-BR', label: 'Portuguese (Brazil)' },
  { code: 'ja',    label: 'Japanese' },
  { code: 'de',    label: 'German' },
  { code: 'ru',    label: 'Russian' },
  { code: 'ta',    label: 'Tamil' },
];

export const isSupportedLocale = (value: string): value is SupportedLocale => {
  return SUPPORTED_LOCALES.some(l => l.code === value);
};

const normalizeToSupported = (raw: string): SupportedLocale => {
  if (!raw) return 'en';

  const trimmed = raw.trim();
  if (isSupportedLocale(trimmed)) return trimmed;

  // Common normalization: "en-US" => "en-US", "pt-BR" => "pt-BR", "hi-IN" => "hi".
  const lower = trimmed.toLowerCase();
  if (lower.startsWith('en-us')) return 'en-US';
  if (lower.startsWith('en')) return 'en';
  if (lower.startsWith('pt-br')) return 'pt-BR';
  if (lower.startsWith('pt')) return 'pt-BR';
  if (lower.startsWith('hi')) return 'hi';
  if (lower.startsWith('id')) return 'id';
  if (lower.startsWith('ja')) return 'ja';
  if (lower.startsWith('de')) return 'de';
  if (lower.startsWith('ru')) return 'ru';
  if (lower.startsWith('ta')) return 'ta';

  return 'en';
};

export const getInitialLocale = (): SupportedLocale => {
  // URL override: allows shareable per-language links via ?lang=xx
  try {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const fromUrl = sp.get('lang');
      if (fromUrl) return normalizeToSupported(fromUrl);
    }
  } catch {
    // ignore
  }

  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved) return normalizeToSupported(saved);
  } catch {
    // ignore
  }

  if (typeof navigator !== 'undefined') {
    const nav = navigator.language || '';
    return normalizeToSupported(nav);
  }

  return 'en';
};
