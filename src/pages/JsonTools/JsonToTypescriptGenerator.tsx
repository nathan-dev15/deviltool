import React, { useState, useEffect, useRef } from "react";
import { quicktype, InputData, jsonInputForTargetLanguage } from "quicktype-core";
import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Download,
  Sparkles,
  Database,
  Code,
  Zap,
  Info,
  Lock,
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
  error = false,
  language = "json"
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
  error?: boolean;
  language?: string;
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

    <div className={`flex font-mono text-sm bg-surface-container-low/50 dark:bg-surface-container-low/20 rounded-b-xl overflow-hidden min-h-[300px] border-t ${error ? 'border-t-error/30' : 'border-t-outline-variant/10'}`}>

      {/* Line Numbers */}

      <div className="bg-surface-container-high/40 text-on-surface-variant/40 px-3 py-4 text-right select-none border-r border-outline-variant/10 hidden sm:block">

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
        className="flex-1 p-6 outline-none resize-none leading-6 bg-transparent text-on-surface placeholder:text-on-surface-variant/30"
      />

    </div>

  );

};

export const JsonToTypescriptGenerator: React.FC = () => {
  const { t } = useI18n();
  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* JSON → TypeScript conversion */
  const generateTypes = async (val: string = jsonInput) => {
    if (!val || !val.trim()) {
      setTsOutput("");
      setError("");
      return;
    }

    try {
      const jsonInputData = jsonInputForTargetLanguage("typescript");
      await jsonInputData.addSource({
        name: "Root",
        samples: [val]
      });

      const inputData = new InputData();
      inputData.addInput(jsonInputData);

      const result = await quicktype({
        inputData,
        lang: "typescript",
        rendererOptions: {
          "just-types": "true"
        }
      });

      setTsOutput(result.lines.join("\n"));
      setError("");
    } catch (err: any) {
      setError(t('label.invalid_json_format'));
      setTsOutput("");
    }
  };

  /* Real-time conversion */
  useRealTimeConversion(jsonInput, (val) => generateTypes(val));

  const loadSample = () => {
    setJsonInput(`{
  "id": 1,
  "name": "Kinetic User",
  "email": "kinetic@toolnest.dev",
  "isActive": true,
  "roles": ["admin", "creator"],
  "stats": {
    "projects": 12,
    "lastActive": "2024-03-20T10:00:00Z"
  }
}`);
  };

  return (
    <ToolPageWrapper
      title={t('label.json_to_typescript')}
      description={t('label.json_to_typescript_desc')}
      breadcrumbs={[
        { label: t('label.developer_tools'), href: "#" },
        { label: t('label.json_to_typescript') }
      ]}
      accentColor="primary"
    >
      <SEO
        title="JSON to TypeScript Generator – Free Developer Tool"
        description="Convert JSON to TypeScript interfaces instantly. Professional tool for building strongly typed front-end applications."
        keywords="json to typescript, json to ts interface, generate typescript from json"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in shadow-2xl p-4 sm:p-8 rounded-[3rem] bg-surface-container-lowest/50 border border-outline-variant/10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* INPUT PANEL */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low/50">
              <span className="font-black uppercase tracking-widest text-[10px] text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                {t('label.raw_json_input')}
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20">
                  <Upload size={14} /> {t('action.upload')}
                  <input
                    type="file"
                    accept=".json"
                    hidden
                    onChange={async (e)=>{
                      const file=e.target.files?.[0];
                      if(file) {
                        const content = await readFile(file);
                        setJsonInput(content);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            
            <CodeEditor
              value={jsonInput}
              onChange={setJsonInput}
              placeholder={t('label.json_to_ts_placeholder')}
              error={!!error}
            />

            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex flex-wrap gap-4">
              <button 
                onClick={() => generateTypes(jsonInput)}
                className="flex-1 min-w-[180px] bg-primary hover:bg-primary-container text-on-primary px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
              >
                <Zap className="size-4" />
                <span>{t('label.generate_interfaces')}</span>
              </button>
              
              <button 
                onClick={loadSample}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-primary hover:border-primary/30 text-on-surface px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/5 text-[10px] uppercase tracking-widest"
              >
                {t('label.sample_data')}
              </button>

              <button 
                onClick={()=>{setJsonInput("");setTsOutput("");setError("");}}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-error hover:border-error/30 text-on-surface px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5 text-[10px] uppercase tracking-widest"
              >
                <Trash2 className="size-4" />
                <span>{t('action.clear')}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-6 rounded-3xl text-center font-black uppercase tracking-widest text-xs animate-pop-in">
              {error}
            </div>
          )}

          {/* OUTPUT CONTAINER */}
          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-[2rem] shadow-xl overflow-hidden border border-outline-variant/30 relative group">
            <div className="absolute -inset-24 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-sm relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{t('label.typescript_interfaces')}</span>
              <div className="flex items-center gap-6">
                <button onClick={() => copyToClipboard(tsOutput)} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-primary flex items-center gap-2 transition-all">
                  <Copy size={14} /> {copied ? t('action.copied') : t('label.copy_ts_code')}
                </button>
                <button 
                  onClick={()=>downloadFile(tsOutput,"types.ts","text/plain")}
                  className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-success flex items-center gap-2 transition-all"
                >
                  <Download size={14} /> {t('action.download')} .ts
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={tsOutput}
              readOnly
              placeholder={t('label.ts_output_placeholder')}
              language="typescript"
            />
          </div>

          <div className="mt-12 rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-sm">
             <AdSense slot="1234567890"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-surface-container-low/30 rounded-[2.5rem] p-8 border border-outline-variant/20 shadow-sm sticky top-24">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-on-surface flex items-center gap-3">
               <Sparkles className="size-5 text-warning" />
               {t('label.advanced_tools')}
            </h3>
            <div className="grid gap-4">
              {[
                { name: t('label.json_to_yaml'), path: '/json-to-yaml', icon: <Code className="size-4" />, desc: 'Convert to YAML' },
                { name: t('label.json_to_csv'), path: '/json-to-csv', icon: <Database className="size-4" />, desc: 'Export to Spreadsheet' },
                { name: t('label.json_formatter'), path: '/json-formatter', icon: <Wand2 className="size-4" />, desc: t('label.beautified_output') },
                { name: t('label.json_validator'), path: '/json-validator', icon: <Lock className="size-4" />, desc: 'Check syntax integrity' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-2xl border border-outline-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-container-high text-on-surface-variant/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="font-black text-on-surface text-[10px] uppercase tracking-widest group-hover:text-primary transition-colors">{tool.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/40 mt-1">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
                        
            <div className="mt-12 pt-8 border-t border-outline-variant/10 text-center">
                <Link to="/tools" className="text-primary text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:translate-x-1 transition-transform">
                    {t('label.view_all_tools')}
                    <LayoutDashboard className="size-4" />
                </Link>
            </div>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
