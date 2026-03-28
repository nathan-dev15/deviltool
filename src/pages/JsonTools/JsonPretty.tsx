import React, { useState, useEffect } from "react";
import {
  Wand2,
  Copy,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Zap,
  Sparkles,
  Info,
  Database,
  Code,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { jsonrepair } from "jsonrepair";
import { useI18n } from "@/src/i18n/I18nContext";
import { safeLucideElement } from "@/src/lib/safeLucide";

/* ---------- Code Editor Component ---------- */

const CodeEditor = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  errorLine = null,
  highlightLines = []
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
  errorLine?: number | null;
  highlightLines?: number[];
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

    <div className={`flex font-mono text-sm bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-b-xl overflow-hidden min-h-[250px] border-t ${errorLine ? 'border-t-error/30' : 'border-t-slate-100 dark:border-t-slate-800'}`}>

      {/* Line Numbers */}

      <div className="bg-slate-100 dark:bg-slate-800/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 px-3 py-4 text-right select-none border-r border-slate-200 dark:border-slate-700 hidden sm:block">

        {lines.map((_, i) => (
          <div key={i} className={`leading-6 px-1 ${
            errorLine === i + 1 ? "bg-error/20 text-error font-bold rounded" : 
            highlightLines.includes(i + 1) ? "bg-success/20 text-success font-bold rounded" : ""
          }`}>
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

export const JsonPrettyTool = () => {
  const { t } = useI18n();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [errorPos, setErrorPos] = useState<{ line: number; column: number } | null>(null);
  const [changedLines, setChangedLines] = useState<number[]>([]);

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(input, (val) => formatJson(val));

  const getErrorPosition = (json: string, message: string) => {
    const match = message.match(/position (\d+)/);
    if (!match) return null;
    const pos = Number(match[1]);
    const lines = json.substring(0, pos).split("\n");
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    return { line, column };
  };

  const formatJson = (val: string = input) => {
    try {
      if (!val || !val.trim()) {
        setOutput("");
        setStatus("");
        setErrorPos(null);
        setChangedLines([]);
        return;
      }
      const parsed = JSON.parse(val);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus("Formatted successfully");
      setErrorPos(null);
      setChangedLines([]);
    } catch (e: any) {
      const pos = getErrorPosition(val, e.message);
      if (pos) {
        setStatus(`JSON Error at line ${pos.line}, column ${pos.column}`);
        setErrorPos(pos);
      } else {
        setStatus(e.message);
      }
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setStatus("Minified successfully");
      setErrorPos(null);
      setChangedLines([]);
    } catch (e: any) {
      const pos = getErrorPosition(input, e.message);
      if (pos) {
        setStatus(`JSON Error at line ${pos.line}, column ${pos.column}`);
      } else {
        setStatus(e.message);
      }
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      if (!input.trim()) return;
      JSON.parse(input);
      setStatus("Valid JSON ✔️");
      setErrorPos(null);
    } catch (e: any) {
      const pos = getErrorPosition(input, e.message);
      if (pos) {
        setStatus(`Invalid JSON ❌ — ${e.message} (Line ${pos.line}, Column ${pos.column})`);
        setErrorPos(pos);
      } else {
        setStatus(`Invalid JSON ❌ — ${e.message}`);
        setErrorPos(null);
      }
    }
  };

  const fixJson = () => {
    try {
      const repaired = jsonrepair(input);
      const parsed = JSON.parse(repaired);
      const pretty = JSON.stringify(parsed, null, 2);

      const originalLines = input.split("\n");
      const fixedLines = pretty.split("\n");
      const changed: number[] = [];

      fixedLines.forEach((line, i) => {
        if (originalLines[i] !== line) {
          changed.push(i + 1);
        }
      });

      setChangedLines(changed);
      setOutput(pretty);
      setStatus("JSON repaired & beautified 🔧");
      setErrorPos(null);
    } catch (e: any) {
      setStatus("Unable to repair JSON ⚠️");
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStatus("");
    setChangedLines([]);
    setErrorPos(null);
  };

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInput(content);
    } catch {
      setStatus("Failed to read file");
    }
  };

  return (

    <ToolPageWrapper
      title="JSON Pretty Print"
      description="Format and beautify your JSON data with error detection and automatic repair capabilities."
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: "JSON Pretty Print" }
      ]}
      accentColor="primary"
    >
      <SEO
        title="JSON Pretty Print Online – Free JSON Formatter"
        description="Free JSON Pretty Print tool. Format, validate, and fix JSON instantly."
        keywords="json pretty print, json formatter, json validator"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* INPUT */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                Raw JSON Input
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                  <Upload size={14} /> Upload
                  <input
                    type="file"
                    accept=".json"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file);
                    }}
                  />
                </label>
              </div>
            </div>
            
            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder="Paste messy JSON here..."
              errorLine={errorPos?.line}
            />

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
              <button 
                onClick={() => formatJson(input)}
                className="flex-1 min-w-[120px] bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20"
              >
                <Wand2 className="size-4" />
                <span>Pretty</span>
              </button>
              
              <button 
                onClick={fixJson}
                className="flex-1 min-w-[120px] bg-success hover:bg-success/90 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-success/20"
              >
                <Wrench className="size-4" />
                <span>Auto Fix</span>
              </button>

              <button 
                onClick={minifyJson}
                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold transition-all flex items-center gap-2"
              >
                <Zap size={16} /> {t('action.minify')}
              </button>

              <button 
                onClick={clearAll}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-error/5 hover:text-error font-bold transition-all flex items-center gap-2"
              >
                <Trash2 size={16} /> {t('action.clear')}
              </button>
            </div>
          </div>

          {/* STATUS */}
          {status && (
            <div className={`p-4 rounded-xl border flex items-center gap-3 animate-pop-in ${
              status.includes("Valid") || status.includes("success") ? "bg-success/10 border-success/20 text-success" :
              status.includes("Error") || status.includes("Invalid") ? "bg-error/10 border-error/20 text-error" :
              "bg-primary/10 border-primary/20 text-primary"
            }`}>
              {status.includes("Valid") || status.includes("success") ? <CheckCircle2 size={18} /> : 
               status.includes("Error") || status.includes("Invalid") ? <AlertCircle size={18} /> : 
               <Info size={18} />}
              <span className="font-bold text-sm tracking-tight">{status}</span>
            </div>
          )}

          {/* OUTPUT */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl overflow-hidden border border-white/5 group">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('label.beautified_result')}</span>
              <div className="flex items-center gap-4">
                <button onClick={() => copyToClipboard(output)} className="text-xs font-bold text-slate-400 hover:text-primary flex items-center gap-1.5 transition-colors">
                  <Copy className="size-3" /> {copied ? t('action.copied') : t('action.copy_result')}
                </button>
                <button 
                  onClick={() => downloadFile(output, "pretty.json", "application/json")}
                  className="text-xs font-bold text-slate-400 hover:text-success flex items-center gap-1.5 transition-colors"
                >
                  <Download className="size-3" /> {t('action.download')} .json
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={output}
              readOnly
              placeholder="Your beautified JSON will appear here..."
              highlightLines={changedLines}
            />
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
             <AdSense slot="1234567890"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
               <Sparkles className="size-5 text-warning" />
               JSON Toolkit
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Minifier', path: '/json-minifier', icon: <Zap className="size-4" />, desc: 'Compress for production' },
                { name: 'Validator', path: '/json-validator', icon: safeLucideElement(Lock, Sparkles, { className: "size-4" }), desc: 'Check syntax and schema' },
                { name: 'To CSV', path: '/json-to-csv', icon: <Database className="size-4" />, desc: 'JSON to Spreadsheet' },
                { name: 'To XML', path: '/json-to-xml', icon: <Code className="size-4" />, desc: 'Convert JSON to XML' },
              ].map((tool) => (
                <Link 
                  key={tool.path}
                  to={tool.path} 
                  className="group block p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:bg-primary/5 transition-all transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">{tool.name}</p>
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
