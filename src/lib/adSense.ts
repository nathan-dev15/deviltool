import { getStoredAdConsent } from './adConsent';

const ALLOWED_ADSENSE_HOSTS = new Set([
  'koobrain.com',
  'www.koobrain.com',
]);

export const isAdSenseHostAllowed = () => {
  if (typeof window === 'undefined') return false;
  return ALLOWED_ADSENSE_HOSTS.has(window.location.hostname);
};

export const canRenderAdSense = () => {
  if (!isAdSenseHostAllowed()) return false;
  return getStoredAdConsent() === 'accepted';
};
