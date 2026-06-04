import React from 'react';
import { AD_CONSENT_EVENT, getStoredAdConsent, type AdConsentStatus } from '@/src/lib/adConsent';
import { canRenderAdSense } from '@/src/lib/adSense';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  slot: string;
  className?: string;
}

const initializedAdSlots = new WeakSet<HTMLElement>();
const AD_SENSE_SCRIPT_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8601698568618117';

const loadAdSenseScript = (): Promise<void> => {
  if (typeof document === 'undefined') return Promise.resolve();

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${AD_SENSE_SCRIPT_SRC}"]`);
  if (existingScript) {
    return existingScript.getAttribute('data-loaded') === 'true'
      ? Promise.resolve()
      : new Promise((resolve, reject) => {
          existingScript.addEventListener('load', () => resolve());
          existingScript.addEventListener('error', () => reject(new Error('AdSense script failed to load')));
        });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = AD_SENSE_SCRIPT_SRC;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      script.setAttribute('data-loaded', 'true');
      resolve();
    };
    script.onerror = () => reject(new Error('AdSense script failed to load'));
    document.head.appendChild(script);
  });
};

export const AdSense: React.FC<AdSenseProps> = ({ slot, className }) => {
  const [consent, setConsent] = React.useState<AdConsentStatus>(getStoredAdConsent);
  const insRef = React.useRef<HTMLModElement | null>(null);
  const canShowAds = canRenderAdSense();

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
    if (!canShowAds || consent !== 'accepted' || !insRef.current) return;

    const ins = insRef.current;
    if (initializedAdSlots.has(ins)) return;
    if (ins.getAttribute('data-adsbygoogle-status')) {
      initializedAdSlots.add(ins);
      return;
    }

    let cancelled = false;

    loadAdSenseScript()
      .then(() => {
        if (cancelled || !insRef.current) return;

        try {
          initializedAdSlots.add(ins);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          initializedAdSlots.delete(ins);
          console.error('AdSense error', error);
        }
      })
      .catch((error) => {
        console.error('AdSense script load error', error);
      });

    return () => {
      cancelled = true;
    };
  }, [canShowAds, consent, slot]);

  if (!canShowAds || consent !== 'accepted') {
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
