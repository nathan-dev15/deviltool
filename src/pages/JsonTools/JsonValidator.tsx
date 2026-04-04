import React, { useState, useEffect } from "react";
import {
  Upload,
  Trash2,
  CheckCircle2,
  XCircle,
  Info,
  Database,
  Lock,
  Sparkles,
  Code,
  Zap,
  LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

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
      el.style.height = Math.max(300, el.scrollHeight) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (

    <div className={`flex font-mono text-sm bg-surface-container-low/50 dark:bg-surface-container-low/30 rounded-b-xl overflow-hidden min-h-[300px] border-t ${error ? 'border-t-error/30' : 'border-t-outline-variant/20'}`}>

      {/* Line Numbers */}

      <div className="bg-surface-container-high/40 text-on-surface-variant/50 px-3 py-4 text-right select-none border-r border-outline-variant/20 hidden sm:block">

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
        rows={12}
        className="flex-1 p-6 outline-none resize-none leading-6 bg-transparent text-on-surface placeholder:text-on-surface-variant/40"
      />

    </div>

  );

};

export const JsonValidator: React.FC = () => {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [valid, setValid] = useState(false);
  const [fileName, setFileName] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const validateJson = (val: string = input) => {
    try {
      if (!val || !val.trim()) {
        setValid(false);
        setError(null);
        return;
      }
      JSON.parse(val);
      setValid(true);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setValid(false);
    }
  };

  useRealTimeConversion(input, (val) => validateJson(val));

  const clearAll = () => {
    setInput("");
    setError(null);
    setValid(false);
    setFileName("");
  };

  const loadSample = () => {
    setInput(`{
  "user": {
    "id": 101,
    "name": "Alice",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
    "active": true
  },
  "company": {
    "name": "TechCorp",
    "location": "Chennai",
    "employees": 150
  }
}`);
  };

  return (
    <ToolPageWrapper
      title={t('label.json_validator')}
      description={t('label.json_validator_desc')}
      breadcrumbs={[
        { label: t('label.json_tools'), href: "#" },
        { label: t('label.json_validator') }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="JSON Validator – Validate JSON Data Online"
        description="Free JSON validator tool to check JSON syntax instantly. Validate API responses and detect JSON errors easily."
        keywords="json validator, validate json online, json syntax checker"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* INPUT PANEL */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low/50">
              <span className="font-bold text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                {t('label.input_json')}
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant hover:text-secondary transition-colors px-2 py-1 rounded-md hover:bg-secondary/5">
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
                          setFileName(file.name);
                        } catch (err) {
                          setError('Failed to read file');
                        }
                      }
                    }}
                  />
                </label>
                {fileName && <span className="text-[10px] bg-secondary/10 px-2 py-0.5 rounded text-secondary font-bold">{fileName}</span>}
              </div>
            </div>
            
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={t('label.json_validator_placeholder')}
              error={!!error}
            />

            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex flex-wrap gap-3">
              <button 
                onClick={() => validateJson(input)}
                className="flex-1 min-w-[140px] bg-secondary hover:bg-secondary-container text-on-secondary px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <CheckCircle2 className="size-5" />
                <span>{t('action.format')}</span>
              </button>
              
              <button 
                onClick={loadSample}
                className="bg-surface-container-high/60 border border-outline-variant/20 hover:text-primary hover:border-primary/30 text-on-surface px-6 py-3 rounded-xl font-bold transition-all hover:bg-primary/5"
              >
                Sample Data
              </button>

              <button 
                onClick={clearAll}
                className="bg-surface-container-high/60 border border-outline-variant/20 hover:text-error hover:border-error/30 text-on-surface px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5"
              >
                <Trash2 className="size-5" />
                <span>{t('action.clear')}</span>
              </button>
            </div>
          </div>

          {/* STATUS PANEL */}
          <div className="space-y-4">
            {valid && (
              <div className="p-6 bg-success/10 border border-success/20 text-success rounded-3xl flex items-center gap-4 animate-pop-in">
                <CheckCircle2 className="size-8 flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold">{t('label.json_valid')}</p>
                  <p className="opacity-90">{t('label.json_valid_desc')}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-6 bg-error/10 border border-error/20 text-error rounded-3xl flex items-start gap-4 animate-pop-in">
                <XCircle className="size-8 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xl font-bold">{t('label.json_invalid')}</p>
                  <p className="opacity-90 font-mono text-sm mt-2 p-3 bg-error/5 rounded-lg border border-error/10">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {!valid && !error && (
              <div className="p-6 bg-surface-container-high/30 border border-outline-variant/20 text-on-surface-variant rounded-3xl flex items-center gap-4 italic font-medium">
                <Info className="size-6 text-primary" />
                {t('label.json_invalid_start')}
              </div>
            )}
          </div>

          <section className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/30 shadow-sm transition-all hover:shadow-md">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-on-surface">
              <Info className="text-secondary size-6" />
              {t('label.why_validate_json')}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2 text-on-surface">
                   <Lock className="size-4 text-primary" />
                   {t('label.security_stability')}
                </h4>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{t('label.security_stability_desc')}</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold flex items-center gap-2 text-on-surface">
                   <Database className="size-4 text-success" />
                   {t('label.data_integrity')}
                </h4>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{t('label.data_integrity_desc')}</p>
              </div>
            </div>
          </section>

          <div className="rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
             <AdSense slot="8156203131"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-surface-container-low/40 rounded-3xl p-6 border border-outline-variant/30 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-on-surface flex items-center gap-2">
               <Sparkles className="size-5 text-warning" />
               {t('label.json_tools')}
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Formatter', path: '/json-formatter', icon: <Code className="size-4" />, desc: 'Beautify JSON data' },
                { name: 'Minifier', path: '/json-minifier', icon: <Zap size={14} />, desc: 'Compress for production' },
                { name: 'Sort Keys', path: '/json-sort-keys', icon: <Sparkles className="size-4" />, desc: 'Sort alphabetically' },
                { name: 'Compare', path: '/json-compare', icon: <Database className="size-4" />, desc: 'Diff two objects' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-2xl border border-outline-variant/10 hover:border-secondary/30 hover:bg-secondary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-surface-container-high text-on-surface-variant group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{tool.name}</p>
                    <p className="text-xs text-on-surface-variant">{tool.desc}</p>
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
