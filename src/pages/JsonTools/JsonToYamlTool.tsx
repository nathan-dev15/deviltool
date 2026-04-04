import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Download,
  Sparkles,
  Code,
  Zap,
  Info,
  Database,
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
      el.style.height = Math.max(250, el.scrollHeight) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (

    <div className={`flex font-mono text-sm bg-surface-container-low/50 dark:bg-surface-container-low/20 rounded-b-xl overflow-hidden min-h-[250px] border-t ${error ? 'border-t-error/30' : 'border-t-outline-variant/10'}`}>

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
        rows={10}
        className="flex-1 p-6 outline-none resize-none leading-6 bg-transparent text-on-surface placeholder:text-on-surface-variant/30"
      />

    </div>

  );

};

export const JsonToYamlTool = () => {
  const { t } = useI18n();
  const [jsonInput, setJsonInput] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const convertToYaml = (val: string = jsonInput) => {
    if (!val || !val.trim()) {
      setYamlOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(val);
      const yamlData = yaml.dump(parsed);
      setYamlOutput(yamlData);
      setError("");
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
      setYamlOutput("");
    }
  };

  useRealTimeConversion(jsonInput, (val) => convertToYaml(val));

  const loadSample = () => {
    setJsonInput(`{
  "project": "Koobrain",
  "version": "1.0.0",
  "features": [
    "Premium Design",
    "Dark Mode",
    "Real-time Conversion"
  ],
  "author": {
    "name": "Shan",
    "id": 101
  }
}`);
  };

  const clearAll = () => {
    setJsonInput("");
    setYamlOutput("");
    setError("");
  };

  return (
    <ToolPageWrapper
      title={t('label.json_to_yaml')}
      description={t('label.json_to_yaml_desc')}
      breadcrumbs={[
        { label: t('label.json_tools'), href: "#" },
        { label: t('label.json_to_yaml') }
      ]}
      accentColor="secondary"
    >
      <SEO 
        title="JSON to YAML Converter – Free Online Tool"
        description="Convert JSON data to YAML format instantly. Free online JSON to YAML converter for developers."
        keywords="json to yaml, convert json to yaml online, json yaml converter"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* INPUT PANEL */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low/50">
              <span className="font-black uppercase tracking-widest text-xs text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                {t('label.raw_json_input')}
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-secondary transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary/5 border border-transparent hover:border-secondary/20">
                  <Upload size={14} /> {t('action.upload')}
                  <input
                    type="file"
                    accept=".json"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
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
              placeholder={t('label.json_validator_placeholder')}
              error={!!error}
            />

            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex flex-wrap gap-4">
              <button 
                onClick={() => convertToYaml(jsonInput)}
                className="flex-1 min-w-[160px] bg-secondary hover:bg-secondary-container text-on-secondary px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <Zap className="size-4" />
                <span>{t('label.convert_to_yaml')}</span>
              </button>
              
              <button 
                onClick={loadSample}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-secondary hover:border-secondary/30 text-on-surface px-6 py-4 rounded-2xl font-bold transition-all hover:bg-secondary/5 text-xs uppercase tracking-widest"
              >
                {t('label.sample_data')}
              </button>

              <button 
                onClick={clearAll}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-error hover:border-error/30 text-on-surface px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5 text-xs uppercase tracking-widest"
              >
                <Trash2 className="size-4" />
                <span>{t('action.clear_all')}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-5 rounded-2xl text-center font-bold text-sm animate-pop-in">
              {error}
            </div>
          )}

          {/* OUTPUT CONTAINER */}
          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-[2rem] shadow-xl overflow-hidden border border-outline-variant/30 relative group">
            <div className="absolute -inset-24 bg-secondary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-sm relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{t('label.generated_yaml')}</span>
              <div className="flex items-center gap-6">
                <button onClick={() => copyToClipboard(yamlOutput)} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-secondary flex items-center gap-2 transition-all">
                  <Copy size={14} /> {copied ? t('action.copied') : t('label.copy_yaml')}
                </button>
                <button 
                  onClick={()=>downloadFile(yamlOutput,"data.yaml","text/yaml")}
                  className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-success flex items-center gap-2 transition-all"
                >
                  <Download size={14} /> {t('label.download_yaml')}
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={yamlOutput}
              readOnly
              placeholder={t('label.yaml_placeholder')}
              language="yaml"
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
               {t('label.json_tools')}
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'To TS Interface', path: '/json-to-typescript', icon: <Code className="size-4" />, desc: 'JSON to TypeScript' },
                { name: 'To CSV', path: '/json-to-csv', icon: <Database className="size-4" />, desc: 'JSON to Spreadsheet' },
                { name: 'Formatter', path: '/json-formatter', icon: <Wand2 className="size-4" />, desc: 'Beautify nested data' },
                { name: 'Validator', path: '/json-validator', icon: <Lock size={16} />, desc: 'Check syntax integrity' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-2xl border border-outline-variant/10 hover:border-secondary/30 hover:bg-secondary/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-container-high text-on-surface-variant/60 group-hover:text-secondary group-hover:bg-secondary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="font-black text-on-surface text-xs uppercase tracking-widest group-hover:text-primary transition-colors">{tool.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/50 mt-1">{tool.desc}</p>
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
