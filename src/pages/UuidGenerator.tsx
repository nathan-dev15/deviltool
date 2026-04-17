import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, RefreshCw, Settings, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';
import { ToolDetailedContent } from '@/src/components/ToolDetailedContent';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';

export const UuidGenerator: React.FC = () => {
  const { locale } = useI18n();
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const seoConfig = TOOL_SEO_BY_PATH['/uuid-generator'];
  const seoPage = seoConfig ? buildToolSeoPage(seoConfig, { locale }) : null;

  const generateUuids = () => {
    const newUuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => {
      return crypto.randomUUID();
    });
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Generate on first load
  React.useEffect(() => {
    if (uuids.length === 0) {
      generateUuids();
    }
  }, []);

  return (
    <ToolPageWrapper
      title="UUID v4 Generator"
      description="Generate cryptographically secure version 4 UUIDs instantly in your browser."
      breadcrumbs={[
        { label: "Developer", href: "#" },
        { label: "UUID Generator" }
      ]}
      accentColor="primary"
    >
      <SEO 
        title={seoPage?.seoTitle ?? 'UUID v4 Generator'}
        description={seoPage?.metaDescription ?? 'Generate cryptographically secure version 4 UUIDs instantly in your browser.'}
        keywords={(seoConfig?.secondaryKeywords ?? []).join(', ')}
      />

      <div className="space-y-12 animate-fade-in">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-xl">
             <div className="space-y-2 flex-grow">
               <label className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/60 ml-1">Number of UUIDs</label>
               <input 
                 type="number" 
                 min="1" 
                 max="100" 
                 value={count}
                 onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                 className="w-full px-6 py-4 bg-surface-container-high/40 dark:bg-slate-900 border border-outline-variant/20 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary/50 outline-none transition-all text-on-surface font-bold text-lg"
               />
             </div>
             <div className="flex items-end">
               <button 
                 onClick={generateUuids}
                 className="h-[60px] px-8 bg-primary text-on-primary rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 w-full"
               >
                 <RefreshCw className="size-5" /> Generate
               </button>
             </div>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar border border-outline-variant/10 p-6 rounded-3xl bg-surface-container-high/20">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center justify-between group/uuid p-4 rounded-xl hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/20">
                <code className="text-lg md:text-xl font-mono text-on-surface select-all">{uuid}</code>
                <button 
                  onClick={() => copyToClipboard(uuid, i)}
                  className="p-3 bg-surface-container-high text-on-surface-variant hover:text-primary rounded-xl transition-colors hover:shadow-md"
                  aria-label="Copy UUID"
                >
                  <Copy className="size-5" />
                  {copiedIndex === i && (
                    <span className="absolute -top-8 right-0 bg-success text-on-success text-xs px-3 py-1 rounded-full font-bold">Copied!</span>
                  )}
                </button>
              </div>
            ))}
          </div>

          {uuids.length > 1 && (
            <div className="mt-8 flex justify-end">
               <button 
                 onClick={copyAll}
                 className="px-8 py-4 bg-surface-container-high border border-outline-variant/20 text-on-surface rounded-2xl font-bold text-sm hover:bg-surface-container-highest transition-colors relative"
               >
                 {copiedIndex === -1 ? 'Copied All!' : 'Copy All UUIDs'}
               </button>
            </div>
          )}
        </div>

        {seoPage && <ToolDetailedContent config={seoPage} />}
      </div>
    </ToolPageWrapper>
  );
};
