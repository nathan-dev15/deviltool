import React, { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  className?: string;
}

export const AdSense: React.FC<AdSenseProps> = ({ slot, className }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div
      className={`my-6 p-4 rounded-3xl border border-outline-variant/30 shadow-sm bg-surface-container-lowest ${className ?? ""}`}
    >
      <ins
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
