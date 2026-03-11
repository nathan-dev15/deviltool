import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'software';
  structuredData?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'ToolNest - Free Online Developer Tools & Utilities',
  description = 'The ultimate suite of free online tools for developers and everyone. JSON Formatter, Password Generator, Image Compressor, and more. Fast, secure, and private.',
  keywords = 'online tools, developer tools, json formatter, password generator, image compressor, word counter, age calculator, free utilities',
  canonical = 'https://ais-pre-io3olme4jam5lozwvnzoy5-160572249869.asia-east1.run.app/',
  ogImage = 'https://picsum.photos/seed/toolnest-og/1200/630',
  ogType = 'website',
  structuredData,
}) => {
  const siteName = 'ToolNest';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  // Default Structured Data for the website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteName,
    'url': canonical,
    'description': description,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${canonical}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};
