import React, { StrictMode } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdSense } from '../components/AdSense';

vi.mock('../lib/adConsent', () => ({
  AD_CONSENT_EVENT: 'koobrain-ad-consent-changed',
  getStoredAdConsent: () => 'accepted',
}));

vi.mock('../lib/adSense', () => ({
  canRenderAdSense: () => true,
}));

describe('AdSense', () => {
  it('pushes each ad element only once in StrictMode', () => {
    const push = vi.fn();
    Object.defineProperty(window, 'adsbygoogle', {
      value: { push },
      configurable: true,
      writable: true,
    });

    render(
      <StrictMode>
        <AdSense slot="8156203131" />
      </StrictMode>
    );

    expect(push).toHaveBeenCalledTimes(1);
  });
});
