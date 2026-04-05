export type AdConsentStatus = 'accepted' | 'declined' | 'unknown';

export const AD_CONSENT_STORAGE_KEY = 'koobrain-ad-consent';
export const AD_CONSENT_EVENT = 'koobrain-ad-consent-changed';

export const getStoredAdConsent = (): AdConsentStatus => {
  if (typeof window === 'undefined') return 'unknown';

  const rawValue = window.localStorage.getItem(AD_CONSENT_STORAGE_KEY);
  if (rawValue === 'accepted' || rawValue === 'declined') {
    return rawValue;
  }

  return 'unknown';
};

export const setStoredAdConsent = (status: Exclude<AdConsentStatus, 'unknown'>) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(AD_CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(new CustomEvent(AD_CONSENT_EVENT, { detail: status }));
};

