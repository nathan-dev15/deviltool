import { describe, expect, it, vi } from 'vitest';

const setLocation = (hostname: string) => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { hostname },
  });
};

describe('adSense runtime gating', () => {
  it('disables ads outside allowed production hosts', async () => {
    vi.doMock('../lib/adConsent', () => ({
      getStoredAdConsent: () => 'accepted',
    }));

    setLocation('localhost');

    const mod = await import('../lib/adSense');
    expect(mod.canRenderAdSense()).toBe(false);
  });
});
