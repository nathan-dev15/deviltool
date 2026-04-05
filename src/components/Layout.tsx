import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';
import { ToolSeoArticle } from '@/src/components/ToolSeoArticle';
import { ErrorBoundary } from '@/src/components/ErrorBoundary';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const toolSeo = TOOL_SEO_BY_PATH[location.pathname];

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background transition-colors duration-300 relative z-0">
      <Helmet>
        <meta name="google-adsense-account" content="ca-pub-8601698568618117"></meta>
       <script
        async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8601698568618117"
        crossOrigin="anonymous"
      />
      </Helmet>
      
      {/* ── Background Decoration (Light mode only) ────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-[-1] hidden dark:hidden md:block">
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[120px] rounded-full mix-blend-multiply opacity-80" />
        <div className="absolute top-[30%] right-[-10%] w-[800px] h-[800px] bg-tertiary/10 blur-[150px] rounded-full mix-blend-multiply opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[900px] h-[700px] bg-secondary/5 blur-[150px] rounded-full mix-blend-multiply opacity-60" />
      </div>

      <Navbar />

      {/* ── Page content ───────────────────────────────────── */}
      <main className="flex-grow pt-20">
        <ErrorBoundary label="route">
          {children}
          {toolSeo && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-20">
              <ToolSeoArticle config={toolSeo} />
            </div>
          )}
        </ErrorBoundary>
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
};
