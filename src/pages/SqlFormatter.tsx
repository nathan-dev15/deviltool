import React from 'react';
import { format } from 'sql-formatter';
import { motion } from 'framer-motion';
import { Database, Trash2, Copy, Download, Info, ChevronRight, Home as HomeIcon, Settings, Code, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { useAuth } from '../context/AuthContext';
import { db, doc, setDoc, serverTimestamp } from '../firebase';

type Dialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'mariadb' | 'tsql';

export const SqlFormatter: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [dialect, setDialect] = React.useState<Dialect>('sql');
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

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

  const saveToVault = async () => {
    if (!user || !output) return;
    setIsSaving(true);
    try {
      const itemId = crypto.randomUUID();
      await setDoc(doc(db, 'vault', itemId), {
        id: itemId,
        title: `SQL Query (${dialect})`,
        content: output,
        type: 'sql',
        createdAt: serverTimestamp(),
        ownerId: user.uid
      });
      alert("Saved to Session Vault!");
    } catch (e) {
      console.error("Error saving to vault:", e);
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="px-4 py-8">
      <SEO 
        title="SQL Formatter - Beautify SQL Queries Online"
        description="Free online SQL formatter. Beautify and format your SQL queries for MySQL, PostgreSQL, SQLite, and more. Improve readability and clean up your database code."
        keywords="sql formatter, beautify sql, format sql, mysql formatter, postgresql formatter, sql tools"
      />
      <nav className="flex mb-6 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Developer Tools</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">SQL Formatter</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">SQL Formatter</h1>
            <p className="text-slate-600 dark:text-slate-400">Beautify and format your SQL queries for better readability.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase text-slate-500">Input Query</span>
                <select 
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value as Dialect)}
                  className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="sql">Standard SQL</option>
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
              className="w-full h-64 p-4 font-mono text-sm bg-transparent border-0 focus:ring-0 resize-none"
              placeholder="SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC;"
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button 
                onClick={formatSql}
                className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Code className="size-5" /> Format SQL
              </button>
              <button 
                onClick={() => setInput('')}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 text-sm">
              {error}
            </div>
          )}

          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Formatted Result</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={saveToVault}
                  disabled={isSaving}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 disabled:opacity-50"
                >
                  <Lock size={12} /> {isSaving ? 'Saving...' : 'Save to Vault'}
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <Copy className="size-3" /> Copy
                </button>
              </div>
            </div>
            <div className="p-4 min-h-[200px] font-mono text-sm text-emerald-400 overflow-x-auto">
              <pre><code>{output || '-- Your formatted SQL will appear here'}</code></pre>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Info className="text-primary size-5" /> About SQL Formatter
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our SQL Formatter supports multiple dialects including MySQL, PostgreSQL, and SQL Server. It automatically uppercases keywords and indents nested queries for maximum readability.
            </p>
          </div>
          
          <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
            <h4 className="font-bold mb-2">Did you know?</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Properly formatted SQL is 40% faster to debug and peer-review. Consistent indentation helps identify missing commas and incorrect join conditions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
