import React from 'react';
import { format } from 'sql-formatter';
import { motion } from 'framer-motion';
import { Database, Trash2, Copy, Download, Info, ChevronRight, Settings, Code, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useI18n } from '@/src/i18n/I18nContext';

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'mariadb' | 'tsql';

export const SqlFormatter: React.FC = () => {
  const { t } = useI18n();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [dialect, setDialect] = React.useState<Dialect>('sql');
  const [error, setError] = React.useState<string | null>(null);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md group">
            <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/50">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">{t('label.input_query')}</span>
                <select 
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value as Dialect)}
                  className="text-xs bg-surface-container-high text-on-surface border border-outline-variant/20 rounded-lg px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary font-bold"
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
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-64 p-6 font-mono text-sm bg-transparent border-0 focus:ring-0 resize-none text-on-surface placeholder:text-on-surface-variant/30 leading-relaxed"
              placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC;"
            />
            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex gap-4">
              <button 
                onClick={formatSql}
                className="flex-1 bg-primary text-on-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
              >
                <Code className="size-5" /> {t('label.format_sql')}
              </button>
              <button 
                onClick={() => setInput('')}
                className="px-6 py-4 bg-surface-container-high/60 text-on-surface rounded-2xl font-bold hover:bg-surface-container-high transition-all hover:text-error border border-outline-variant/10"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-error/10 text-error rounded-2xl border border-error/20 text-sm font-bold animate-pop-in">
              {error}
            </div>
          )}

          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 group">
            <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-black/40">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/60">{t('label.formatted_result')}</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={copyToClipboard}
                  className="text-xs font-black uppercase tracking-widest text-primary hover:text-primary-container flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-primary/5 transition-all"
                >
                  <Copy className="size-4" /> {t('action.copy')}
                </button>
              </div>
            </div>
            <div className="p-6 min-h-[250px] font-mono text-sm text-emerald-400 overflow-x-auto selection:bg-emerald-500/30">
              <pre className="leading-relaxed"><code>{output || '-- Your formatted SQL will appear here'}</code></pre>
            </div>
          </div>
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
