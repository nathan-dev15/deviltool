import React, { useState, useEffect } from "react";
import {
  Upload,
  Trash2,
  Copy,
  Download,
  Wand2,
  Info,
  Database,
  Code,
  Lock,
  Sparkles,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { useToolActions } from "../useToolActions";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { AdSense } from "@/src/components/AdSense";
import { useI18n } from "@/src/i18n/I18nContext";
import { safeLucideElement } from "@/src/lib/safeLucide";

/* ---------- Code Editor Component ---------- */

const CodeEditor = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  error = false
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
  error?: boolean;
}) => {

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lines = value.split("\n");

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(250, el.scrollHeight) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (

    <div className={`flex font-mono text-sm bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-b-xl overflow-hidden min-h-[250px] border-t ${error ? 'border-t-error/30' : 'border-t-slate-100 dark:border-t-slate-800'}`}>

      {/* Line Numbers */}

      <div className="bg-slate-100 dark:bg-slate-800/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 px-3 py-4 text-right select-none border-r border-slate-200 dark:border-slate-700 hidden sm:block">

        {lines.map((_, i) => (
          <div key={i} className="leading-6">
            {i + 1}
          </div>
        ))}

      </div>

      {/* Textarea */}

      <textarea
        ref={textareaRef}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        rows={10}
        className="flex-1 p-6 outline-none resize-none leading-6 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />

    </div>

  );

};

export const JsonMinifier: React.FC = () => {
  const { t } = useI18n();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const minifyJson = (val: string = input) => {
    try {
      if (!val || !val.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(val);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  useRealTimeConversion(input, (val) => minifyJson(val));

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const reduction =
    input && output
      ? (((input.length - output.length) / input.length) * 100).toFixed(1)
      : null;

  return (

    <ToolPageWrapper
      title="JSON Minifier"
      description="Compress and minify JSON instantly for production deployments and API efficiency. Fast, lightweight, and secure."
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: "JSON Minifier" }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="JSON Minifier – Compress JSON Data Online"
        description="Free JSON Minifier tool to compress JSON instantly. Remove whitespace and reduce file size for APIs and production deployments."
        keywords="json minifier, compress json, minify json online, reduce json size"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">

          {/* INPUT PANEL */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                {t('label.input_json')}
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-secondary transition-colors px-2 py-1 rounded-md hover:bg-secondary/5">
                  <Upload size={14} /> {t('action.upload')}
                  <input
                    type="file"
                    accept=".json"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const content = await readFile(file);
                          setInput(content);
                        } catch (err) {
                          setError('Failed to read file');
                        }
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder="Paste large JSON blob here..."
              error={!!error}
            />

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
              <button 
                onClick={() => minifyJson(input)}
                className="flex-1 min-w-[140px] bg-secondary hover:bg-secondary-container text-on-secondary hover:text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <Zap className="size-5" />
                <span>{t('action.minify_json')}</span>
              </button>
              
              <button 
                onClick={clearAll}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-error hover:border-error/30 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5"
              >
                <Trash2 className="size-5" />
                <span>{t('action.clear')}</span>
              </button>

              <button 
                onClick={() => copyToClipboard(input)}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-secondary hover:border-secondary/30 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-secondary/5"
              >
                <Copy className="size-5" />
                <span>{copied ? t('action.copied') : t('action.copy')}</span>
              </button>
            </div>
          </div>

          {/* RESULT BOX */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl overflow-hidden border border-white/5 relative group">
            <div className="absolute -inset-24 bg-secondary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-blue-500/50 border border-blue-500/20"></div>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  Compressed Output
                  {reduction && (
                    <span className="bg-success/20 text-success px-2 py-0.5 rounded-full text-[10px] normal-case tracking-normal">
                      -{reduction}% Reduction
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => copyToClipboard(output)} className="text-xs font-bold text-slate-400 hover:text-secondary flex items-center gap-1.5 transition-colors">
                  <Copy className="size-3" /> {copied ? t('action.copied') : t('action.copy_result')}
                </button>
                <button 
                  onClick={() => downloadFile(output, `minified-${Date.now()}.json`, "application/json")}
                  className="text-xs font-bold text-slate-400 hover:text-success flex items-center gap-1.5 transition-colors"
                >
                  <Download className="size-3" /> {t('action.download')} .json
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={output}
              readOnly
              placeholder="Your minified JSON will appear here..."
            />
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-center font-bold animate-pop-in">
              {error}
            </div>
          )}

          {/* INFO SECTION */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
              <Info size={24} className="text-secondary" />
              What is JSON Minification?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              JSON minification removes unnecessary whitespace, indentation, and line breaks from JSON data. This reduces the total file size (often by 30-50%) and improves performance when sending data across the network or storing it in databases.
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-sm dark:text-slate-300">
               <pre>{"{ \"status\": \"success\", \"code\": 200 }"}</pre>
            </div>
          </section>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
             <AdSense slot="1234567890"/>
          </div>

        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
               <Sparkles className="size-5 text-warning" />
               JSON Toolkit
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Formatter', path: '/json-formatter', icon: <Wand2 className="size-4" />, desc: 'Beautify nested JSON data' },
                { name: 'Validator', path: '/json-validator', icon: safeLucideElement(Lock, Sparkles, { className: "size-4" }), desc: 'Check syntax and schema' },
                { name: 'To TS', path: '/json-to-typescript', icon: <Code className="size-4" />, desc: 'Generate TypeScript interfaces' },
                { name: 'Compare', path: '/json-compare', icon: <Database className="size-4" />, desc: 'Diff two JSON objects' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-secondary/30 hover:bg-secondary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-secondary transition-colors">{tool.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>

  );

};
