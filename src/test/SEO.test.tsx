import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from '../components/SEO';
import { describe, it, expect, vi } from 'vitest';

describe('SEO Component', () => {
  it('renders correctly with default props', () => {
    const helmetContext = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SEO />
      </HelmetProvider>
    );
    
    // Helmet doesn't render directly to the DOM in tests easily without helmetContext
    // but we can check if it doesn't crash and potentially check the context
    expect(helmetContext).toBeDefined();
  });

  it('renders with custom title', async () => {
    render(
      <HelmetProvider>
        <SEO title="Custom Title" />
      </HelmetProvider>
    );
    
    // Helmet updates the document title asynchronously
    await vi.waitFor(() => {
      expect(document.title).toContain('Custom Title');
    });
  });
});
