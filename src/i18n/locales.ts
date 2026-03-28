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
    { code: 'en', label: 'English (Global)' },
    { code: 'ru', label: 'Russian' },
    { code: 'ja', label: 'Japanese' },
    { code: 'de', label: 'German' },
    { code: 'ta', label: 'Tamil' },
    { code: 'hi', label: 'Hindi (India)' },
    { code: 'id', label: 'Indonesian (Bahasa)' },
    { code: 'pt-BR', label: 'Portuguese (Brazil)' },
    { code: 'en-US', label: 'English (USA)' },

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
  // 1. URL override: prioritizes shareable links with ?lang=xx
  try {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const fromUrl = sp.get('lang');
      if (fromUrl) return normalizeToSupported(fromUrl);
    }
  } catch {
    // ignore
  }

  // 2. User preference: persist the choice from previous sessions
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved) return normalizeToSupported(saved);
  } catch {
    // ignore
  }

  // 3. Absolute Default: Always start with English (Global)
  return 'en';
};
