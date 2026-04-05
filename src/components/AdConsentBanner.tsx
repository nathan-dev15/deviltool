import React from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck } from 'lucide-react';
import { getStoredAdConsent, setStoredAdConsent } from '@/src/lib/adConsent';

export const AdConsentBanner: React.FC = () => {
  const [consent, setConsent] = React.useState(getStoredAdConsent);

  React.useEffect(() => {
    const handleStorage = () => {
      setConsent(getStoredAdConsent());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (consent !== 'unknown') return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[140] px-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-outline-variant/30 bg-surface/95 backdrop-blur-2xl shadow-2xl shadow-black/10">
        <div className="flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              <Cookie className="size-3.5" />
              Privacy Choices
            </div>
            <h2 className="text-lg font-black tracking-tight text-on-surface sm:text-xl">
              We use cookies and personal data for ads.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
              Koobrain uses cookies and similar technologies to support Google AdSense. You can accept
              personalized ads or decline them. You can read more in our{' '}
              <Link to="/privacy" className="font-bold text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs font-medium text-on-surface-variant/80">
              <ShieldCheck className="size-4 text-success" />
              This choice is remembered for future visits and works across the app.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setStoredAdConsent('declined');
                setConsent('declined');
              }}
              className="cursor-pointer rounded-2xl border border-outline-variant/30 bg-surface-container-low px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-on-surface transition-all hover:bg-surface-container-high"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => {
                setStoredAdConsent('accepted');
                setConsent('accepted');
              }}
              className="cursor-pointer rounded-2xl bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-on-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
