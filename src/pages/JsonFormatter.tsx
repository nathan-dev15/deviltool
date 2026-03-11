import React from 'react';
import { motion } from 'framer-motion';
import { CodeXml, Upload, Trash2, Copy, Wand2, Download, Info, ChevronRight, Home as HomeIcon, Database, Fingerprint, Code, Sparkles, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { useAuth } from '../context/AuthContext';
import { db, doc, setDoc, serverTimestamp } from '../firebase';

export const JsonFormatter: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError('Invalid JSON format');
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
        title: `JSON Data (${output.length} chars)`,
        content: output,
        type: 'json',
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

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadJson = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full px-4 md:py-10 py-4">
      <SEO 
        title="JSON Formatter & Validator - Beautify JSON Online"
        description="Free online JSON formatter and validator. Clean, beautify, and validate your JSON data instantly. Supports minification and downloading as .json file."
        keywords="json formatter, json validator, beautify json, clean json, json tools"
      />
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <HomeIcon className="size-3" /> Home
        </Link>
        <ChevronRight className="size-3" />
        <span className="hover:text-primary transition-colors">Developer Tools</span>
        <ChevronRight className="size-3" />
        <span className="text-primary font-medium">JSON Formatter</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Main Tool Area */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">JSON Formatter</h1>
            <p className="text-slate-600 dark:text-slate-400">Clean, format, and validate your JSON data instantly.</p>
          </div>

          {/* Input Container */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-primary/10 overflow-hidden">
            <div className="p-4 border-b border-primary/5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Input JSON</span>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-1 rounded border border-slate-200 dark:border-slate-600">
                  <Upload className="size-3" /> Upload
                </button>
              </div>
            </div>
            <div className="p-0">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full min-h-[250px] p-4 font-mono text-sm bg-transparent border-0 focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-slate-200 resize-y whitespace-pre" 
                placeholder="Paste your raw JSON code here..."
                spellCheck="false"
              />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-primary/5 flex flex-wrap gap-3">
              <button 
                onClick={formatJson}
                className="flex-1 min-w-[140px] bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
              >
                <Wand2 className="size-5" />
                <span>Format</span>
              </button>
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={clear}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="size-5" />
                  <span>Clear</span>
                </button>
                <button 
                  onClick={() => copyToClipboard(input)}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy className="size-5" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Result Area */}
          <div className="bg-slate-900 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 text-xs font-bold uppercase tracking-wider text-slate-400">Formatted Output</span>
              </div>
              <button 
                onClick={downloadJson}
                className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Download className="size-3" /> Download .json
              </button>
            </div>
            <div className="p-4 min-h-[200px] font-mono text-sm text-blue-300 bg-slate-900/50 overflow-x-auto relative group">
              {output && (
                <button 
                  onClick={saveToVault}
                  disabled={isSaving}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-primary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-xs font-bold disabled:opacity-50"
                >
                  <Lock size={14} />
                  {isSaving ? 'Saving...' : 'Save to Vault'}
                </button>
              )}
              <pre className="inline-block min-w-full">
                <code>{output || 'Your formatted JSON will appear here'}</code>
              </pre>
            </div>
          </div>

          {/* Instructions Section */}
          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/5">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="text-primary size-5" />
              How to use JSON Formatter
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Paste your unformatted or minified JSON text into the input area above.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Click the <span className="font-bold text-slate-900 dark:text-slate-100">Format</span> button to instantly beautify the code.</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Review the result in the output window and copy it back to your project.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Related Tools Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-slate-100">Related Tools</h3>
            <div className="space-y-3">
              <Link to="/base64-encoder" className="group block p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 hover:border-primary/30 transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Database className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">Base64 Encoder</p>
                    <p className="text-xs text-slate-500">Encode or decode strings easily</p>
                  </div>
                </div>
              </Link>
              <Link to="/uuid-generator" className="group block p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 hover:border-primary/30 transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    <Fingerprint className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">UUID Generator</p>
                    <p className="text-xs text-slate-500">Generate v4 unique identifiers</p>
                  </div>
                </div>
              </Link>
              <Link to="/sql-formatter" className="group block p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 hover:border-primary/30 transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Code className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">SQL Formatter</p>
                    <p className="text-xs text-slate-500">Beautify complex SQL queries</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Feature Card */}
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <Sparkles className="text-primary size-8 mb-2" />
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Pro Features coming soon!</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Get access to API endpoints, batch processing, and custom formatting rules.</p>
            <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-bold">Join Waitlist</button>
          </div>
        </aside>
      </div>
    </div>
  );
};
