import React from 'react';
import { AD_CONSENT_EVENT, getStoredAdConsent, type AdConsentStatus } from '@/src/lib/adConsent';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  slot: string;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({ slot, className }) => {
  const [consent, setConsent] = React.useState<AdConsentStatus>(getStoredAdConsent);
  const insRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleConsentChange = () => {
      setConsent(getStoredAdConsent());
    };

    window.addEventListener(AD_CONSENT_EVENT, handleConsentChange);
    window.addEventListener('storage', handleConsentChange);

    return () => {
      window.removeEventListener(AD_CONSENT_EVENT, handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, []);

  React.useEffect(() => {
    if (consent !== 'accepted' || !insRef.current) return;
    if (insRef.current.getAttribute('data-adsbygoogle-status')) return;

    try {
      // Google uses this queue to render the ad unit once the script is ready.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error', error);
    }
  }, [consent, slot]);

  if (consent !== 'accepted') {
    return null;
  }

  return (
    <div
      className={`my-6 p-4 rounded-3xl border border-outline-variant/30 shadow-sm bg-surface-container-lowest ${className ?? ""}`}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8601698568618117" // Centralized ID
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
