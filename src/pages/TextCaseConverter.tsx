import React, { useState } from 'react';
import { Copy, Type, Link as LinkIcon, RefreshCcw } from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';
import { ToolDetailedContent } from '@/src/components/ToolDetailedContent';
import { buildToolSeoPage } from '@/src/seo/generateToolSeo';
import { TOOL_SEO_BY_PATH } from '@/src/seo/toolSeo';

export const TextCaseConverter: React.FC = () => {
  const { locale } = useI18n();
  const [input, setInput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  const seoConfig = TOOL_SEO_BY_PATH['/text-case-converter'];
  const seoPage = seoConfig ? buildToolSeoPage(seoConfig, { locale }) : null;

  const convertCase = (type: 'upper' | 'lower' | 'title' | 'camel' | 'snake' | 'kebab') => {
    let result = input;
    
    switch (type) {
      case 'upper':
        result = input.toUpperCase();
        break;
      case 'lower':
        result = input.toLowerCase();
        break;
      case 'title':
        result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'camel':
        result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case 'snake':
        result = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('_') || input.replace(/\s+/g, '_').toLowerCase();
        break;
      case 'kebab':
        result = input.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
          ?.map(x => x.toLowerCase())
          .join('-') || input.replace(/\s+/g, '-').toLowerCase();
        break;
    }
    
    setInput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageWrapper
      title="Text Case Converter"
      description="Convert your text to Uppercase, Lowercase, Title Case, camelCase, snake_case, and more."
      breadcrumbs={[
        { label: "Text Utilities", href: "#" },
        { label: "Case Converter" }
      ]}
      accentColor="secondary"
    >
      <SEO 
        title={seoPage?.seoTitle ?? 'Text Case Converter'}
        description={seoPage?.metaDescription ?? 'Convert text to uppercase, lowercase, title case, camelCase, snake_case, and kebab-case.'}
        keywords={(seoConfig?.secondaryKeywords ?? []).join(', ')}
      />

      <div className="space-y-12 animate-fade-in">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] shadow-xl p-8 md:p-12 relative overflow-hidden">
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button onClick={() => convertCase('upper')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">UPPERCASE</button>
            <button onClick={() => convertCase('lower')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">lowercase</button>
            <button onClick={() => convertCase('title')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">Title Case</button>
            <button onClick={() => convertCase('camel')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">camelCase</button>
            <button onClick={() => convertCase('snake')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">snake_case</button>
            <button onClick={() => convertCase('kebab')} className="px-5 py-3 bg-surface-container-high hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-outline-variant/20 rounded-xl font-bold text-sm transition-colors text-on-surface">kebab-case</button>
          </div>

          <div className="relative group">
            <textarea
              className="w-full h-[400px] p-8 bg-surface-container-high/40 dark:bg-slate-900 border border-outline-variant/20 rounded-3xl focus:ring-4 focus:ring-secondary/10 focus:border-secondary/50 outline-none transition-all text-on-surface text-lg resize-y custom-scrollbar"
              placeholder="Paste or type your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center gap-2 text-on-surface-variant font-medium text-sm">
              <Type className="size-4" /> 
              {input.length} characters
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setInput('')}
                className="px-6 py-4 bg-surface-container-high border border-outline-variant/20 text-on-surface rounded-2xl font-bold text-sm hover:text-error hover:border-error/30 transition-colors flex items-center justify-center gap-2"
              >
                Clear
              </button>
              <button 
                onClick={copyToClipboard}
                className="px-8 py-4 bg-secondary text-surface dark:text-black rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-secondary/20 flex items-center justify-center gap-3"
              >
                <Copy className="size-4" /> {copied ? 'Copied!' : 'Copy Result'}
              </button>
            </div>
          </div>
        </div>

        {seoPage && <ToolDetailedContent config={seoPage} />}
      </div>
    </ToolPageWrapper>
  );
};
