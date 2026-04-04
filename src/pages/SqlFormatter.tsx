import React, { useRef } from 'react';
import { format } from 'sql-formatter';
import { motion } from 'framer-motion';
import { Database, Trash2, Copy, Download, Info, ChevronRight, Settings, Code, LayoutDashboard, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';
import { AdSense } from "@/src/components/AdSense";
type Dialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'mariadb' | 'tsql';

export const SqlFormatter: React.FC = () => {
  const { t } = useI18n();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [dialect, setDialect] = React.useState<Dialect>('sql');
  const [error, setError] = React.useState<string | null>(null);
  const [cursorPos, setCursorPos] = React.useState({ line: 1, col: 1 });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const updateCursor = () => {
    const el = textAreaRef.current;
    if (!el) return;
    const textBeforeCursor = el.value.substring(0, el.selectionStart);
    const lines = textBeforeCursor.split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    updateCursor();
  };

  const formatSql = () => {
    try {
      if (!input.trim()) return;
      const formatted = format(input, {
        language: dialect,
        keywordCase: 'upper',
      });
      setOutput(formatted);
      setError(null);
    } catch (e) {
      setError('Error formatting SQL. Please check your syntax.');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <ToolPageWrapper
      title={t('label.sql_formatter')}
      description={t('label.format_sql_desc')}
      breadcrumbs={[
        { label: "Developer", href: "#" },
        { label: t('label.sql_formatter') }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="SQL Formatter - Beautify SQL Queries Online"
        description="Free online SQL formatter. Beautify and format your SQL queries for MySQL, PostgreSQL, SQLite, and more. Improve readability and clean up your database code."
        keywords="sql formatter, beautify sql, format sql, mysql formatter, postgresql formatter, sql tools"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main 3D Container for Input */}
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-slate-300 dark:border-slate-800 shadow-2xl bg-surface-container-lowest/50 backdrop-blur-3xl ring-1 ring-white/10 p-4 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Database className="text-primary size-5" /> 
                  <span className="hidden sm:inline">{t('label.input_query') || "Input Query"}</span>
                  <span className="sm:hidden inline">Input</span>
                </span>
                <div className="p-1 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center shadow-inner">
                  <select 
                    value={dialect}
                    onChange={(e) => setDialect(e.target.value as Dialect)}
                    className="text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-none rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary font-bold shadow-sm cursor-pointer"
                >
                  <option value="sql">{t('label.standard_sql')}</option>
                  <option value="mysql">MySQL</option>
                  <option value="postgresql">PostgreSQL</option>
                  <option value="tsql">T-SQL (SQL Server)</option>
                  <option value="mariadb">MariaDB</option>
                  <option value="sqlite">SQLite</option>
                </select>
                </div>
              </div>

              {/* 3D Glassmorphic Editor Area */}
              <div className="relative group rounded-2xl md:rounded-3xl p-1 bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-slate-900 shadow-inner">
                <textarea 
                  ref={textAreaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyUp={updateCursor}
                  onClick={updateCursor}
                  className="w-full p-4 pt-8 md:p-8 md:pt-10 rounded-xl md:rounded-[1.4rem] bg-white/80 dark:bg-black/40 backdrop-blur-md outline-none transition-all text-sm md:text-base font-mono resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600 min-h-[250px] shadow-inner leading-relaxed text-slate-800 dark:text-slate-200 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-black/60 custom-scrollbar"
                  placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC;"
                />
                
                {/* Cursor Indicator */}
                <div className="absolute top-4 right-6 flex items-center gap-2 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 dark:border-white/5 pointer-events-none">
                   <MousePointer2 className="size-3 text-primary animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 tabular-nums">Ln {cursorPos.line}, Col {cursorPos.col}</span>
                </div>
              </div>

              {/* 3D Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                <button 
                  onClick={formatSql}
                  className="w-full sm:w-auto flex-1 px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-[0_6px_0_0_rgba(var(--primary-rgb),0.3)] active:border-b-0 active:translate-y-1.5 active:shadow-none border border-white/10 group border-b-4"
                >
                  <Code className="size-5 group-hover:rotate-12 transition-transform" /> {t('label.format_sql') || "Format SQL"}
                </button>
                <div className="p-1 w-full sm:w-auto bg-slate-200 dark:bg-slate-800 rounded-2xl flex shadow-inner">
                  <button 
                    onClick={() => { setInput(''); setCursorPos({line:1,col:1}); }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 border-b-4 border-slate-300 dark:border-black text-slate-600 dark:text-slate-300 rounded-xl font-black uppercase tracking-widest hover:text-error active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="size-5" /> <span className="sm:hidden">{t('action.clear') || "Clear"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {error && (
            <div className="p-4 bg-error/10 text-error rounded-2xl border border-error/20 text-sm font-bold animate-pop-in">
              {error}
            </div>
          )}

          {/* Output 3D Container */}
          <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border-2 border-slate-300 dark:border-slate-800 shadow-xl bg-slate-950 p-4 sm:p-8 group shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none opacity-50" />
            
            <div className="relative z-10 flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('label.formatted_result') || "Formatted Result"}</span>
                <button 
                  onClick={copyToClipboard}
                  className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-primary hover:text-white flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary transition-all border border-primary/20"
                >
                  <Copy className="size-4" /> {t('action.copy')}
                </button>
              </div>
              <div className="p-4 sm:p-6 min-h-[200px] font-mono text-sm text-emerald-400 overflow-x-auto selection:bg-emerald-500/30 custom-scrollbar rounded-xl bg-black/40 shadow-inner">
                <pre className="leading-loose"><code>{output || '-- Your beautifully formatted SQL will appear here...'}</code></pre>
              </div>
            </div>
          </div>
        </div>
   <div className="rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
             <AdSense slot="8156203131"/>
          </div>
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low/30 p-8 rounded-3xl border border-outline-variant/20 shadow-sm transition-all hover:shadow-md">
            <h3 className="font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-3 text-on-surface">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              {t('label.about_sql_formatter')}
            </h3>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
              {t('label.sql_formatter_desc_p')}
            </p>
          </div>
          
          <div className="bg-surface-container-high/50 p-8 rounded-3xl border border-outline-variant/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors" />
            <h4 className="font-bold mb-3 text-on-surface flex items-center gap-2">
              <Sparkles className="size-4 text-warning" />
              {t('label.sql_did_you_know')}
            </h4>
            <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic opacity-80">
              {t('label.sql_did_you_know_desc')}
            </p>
          </div>

          <Link to="/tools" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:translate-x-1 transition-transform pl-4">
            {t('label.view_all_tools')} <LayoutDashboard className="size-4" />
          </Link>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};

// Internal icon for consistency
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);
