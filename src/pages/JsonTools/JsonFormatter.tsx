import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  Copy, 
  Wand2, 
  Download, 
  Info, 
  Database, 
  Code, 
  Lock,
  Sparkles, 
  CheckCircle2,
  XCircle,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { useToolActions } from '../useToolActions';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from '@/src/components/AdSense';
import { useI18n } from '@/src/i18n/I18nContext';

/* ---------- Code Editor Component ---------- */

const CodeEditor = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  language = "json",
  error = false
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
  language?: string;
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

export const JsonFormatter: React.FC = () => {
  const { t } = useI18n();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const formatJson = (val: string = input) => {
    try {
      if (!val || !val.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      const parsed = JSON.parse(val);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError('Invalid JSON format. Please check for missing quotes or commas.');
      setOutput('');
    }
  };

  useRealTimeConversion(input, (val) => formatJson(val));

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolPageWrapper
      title={t('label.json_formatter')}
      description={t('label.json_formatter_desc')}
      breadcrumbs={[
        { label: t('label.json_tools'), href: "#" },
        { label: t('label.json_formatter') }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="JSON Formatter & Validator - Beautify JSON Online"
        description="Free online JSON formatter and validator. Clean, beautify, and validate your JSON data instantly. Supports minification and downloading as .json file."
        keywords="json formatter, json validator, beautify json, clean json, json tools"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* INPUT CONTAINER */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2rem] shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-low/50">
              <span className="font-black uppercase tracking-widest text-xs text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                {t('label.input_json')}
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5 border border-transparent hover:border-primary/20">
                  <Upload size={14} /> {t('action.upload_json')}
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
                <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30 border-l pl-3 border-outline-variant/10">
                  Chars: {input.length}
                </div>
              </div>
            </div>
            
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={t('label.json_validator_placeholder')}
              error={!!error}
            />

            <div className="p-4 bg-surface-container-low/30 border-t border-outline-variant/10 flex flex-wrap gap-4">
              <button 
                onClick={() => formatJson(input)}
                className="flex-1 min-w-[160px] bg-primary hover:bg-primary-container text-on-primary px-8 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95"
              >
                <Wand2 className="size-4" />
                <span>{t('action.format_json')}</span>
              </button>
              
              <button 
                onClick={clear}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-error hover:border-error/30 text-on-surface px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5 text-xs uppercase tracking-widest"
              >
                <Trash2 className="size-4" />
                <span>{t('action.clear')}</span>
              </button>

              <button 
                onClick={() => copyToClipboard(input)}
                className="bg-surface-container-high/60 border border-outline-variant/10 hover:text-primary hover:border-primary/30 text-on-surface px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-primary/5 text-xs uppercase tracking-widest"
              >
                <Copy className="size-4" />
                <span>{copied ? t('action.copied') : t('action.copy')}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-6 bg-error/10 border border-error/20 text-error rounded-3xl flex items-start gap-4 animate-pop-in">
              <XCircle className="size-6 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-black uppercase tracking-widest text-xs mb-1">{t('label.invalid_json')}</p>
                <p className="text-sm font-medium opacity-90">{error}</p>
              </div>
            </div>
          )}

          {!error && output && (
            <div className="p-6 bg-success/10 border border-success/20 text-success rounded-3xl flex items-start gap-4 animate-pop-in">
              <CheckCircle2 className="size-6 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-black uppercase tracking-widest text-xs mb-1">{t('label.valid_json')}</p>
                <p className="text-sm font-medium opacity-90">{t('label.json_optimized_desc')}</p>
              </div>
            </div>
          )}

          {/* OUTPUT CONTAINER */}
          <div className="bg-surface-container-lowest-dark dark:bg-slate-950 rounded-[2rem] shadow-xl overflow-hidden border border-outline-variant/30 relative group">
            <div className="absolute -inset-24 bg-primary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-sm relative z-10">
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 border border-red-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 border border-yellow-500/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 border border-green-500/20"></div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">{t('label.beautified_output')}</span>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={() => copyToClipboard(output)} className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-primary flex items-center gap-2 transition-all">
                  <Copy size={14} /> {copied ? t('action.copied') : t('action.copy_result')}
                </button>
                <button 
                  onClick={() => downloadFile(output, 'formatted.json', 'application/json')}
                  className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60 hover:text-success flex items-center gap-2 transition-all"
                >
                  <Download size={14} /> {t('action.download')} .json
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={output}
              readOnly
              placeholder={t('label.json_validator_placeholder')}
            />
          </div>

          <section className="bg-surface-container-lowest border border-outline-variant/30 px-10 py-12 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                <Code size={120} />
            </div>
            <h3 className="text-2xl font-black mb-10 flex items-center gap-4 text-on-surface uppercase tracking-widest">
              <Info className="text-primary size-6" />
              {t('label.json_formatter_how_to_use')}
            </h3>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">1</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.step_1_title')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.step_1_desc')}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">2</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.step_2_title')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.step_2_desc')}</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-lg shadow-primary/10">3</div>
                <h4 className="font-black text-on-surface uppercase tracking-widest text-xs">{t('label.step_3_title')}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium italic opacity-85">{t('label.step_3_desc')}</p>
              </div>
            </div>
          </section>

          <div className="mt-12 rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-sm">
             <AdSense slot="1234567890"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-surface-container-low/30 rounded-[2.5rem] p-8 border border-outline-variant/20 shadow-sm sticky top-24">
            <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-on-surface flex items-center gap-3">
               <Sparkles className="size-5 text-warning" />
               {t('label.related_json_tools')}
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Minifier', path: '/json-minifier', icon: <Database className="size-4" />, desc: 'Compress JSON' },
                { name: 'Validator', path: '/json-validator', icon: <Lock className="size-4" />, desc: 'Check syntax' },
                { name: 'Sort Keys', path: '/json-sort-keys', icon: <Sparkles className="size-4" />, desc: 'Sort alphabetically' },
                { name: 'To YAML', path: '/json-to-yaml', icon: <Code className="size-4" />, desc: 'JSON to YAML format' },
                { name: 'To CSV', path: '/json-to-csv', icon: <Database className="size-4" />, desc: 'Export to Spreadsheet' },
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
                      <p className="font-black text-on-surface text-xs uppercase tracking-widest group-hover:text-primary transition-colors">{tool.name}</p>
                      <p className="text-[10px] font-bold text-on-surface-variant/50 mt-1">{tool.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-outline-variant/10">
               <div className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 text-on-primary shadow-2xl shadow-primary/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                      <Sparkles size={100} />
                  </div>
                  <h4 className="font-black text-xl mb-3 uppercase tracking-tighter">{t('label.json_lab_pro')}</h4>
                  <p className="text-sm opacity-80 mb-8 font-medium italic">{t('label.json_lab_pro_desc')}</p>
                  <button className="w-full bg-on-primary text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all active:scale-95 shadow-lg">
                    {t('label.start_coding_free')}
                  </button>
               </div>
            </div>
            
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
