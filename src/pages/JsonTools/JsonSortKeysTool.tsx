import React, { useState, useEffect } from "react";
import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Download,
  Sparkles,
  Lock,
  Zap,
  Info,
  Code,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
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

export const JsonSortKeysTool = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const sortJsonKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortJsonKeys);
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = sortJsonKeys(obj[key]);
          return acc;
        }, {});
    }
    return obj;
  };

  const convertJson = (val: string = jsonInput) => {
    if (!val || !val.trim()) {
      setJsonOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(val);
      const sorted = sortJsonKeys(parsed);
      setJsonOutput(JSON.stringify(sorted, null, 2));
      setError("");
    } catch {
      setError("Invalid JSON format");
      setJsonOutput("");
    }
  };

  useRealTimeConversion(jsonInput, (val) => convertJson(val));

  const loadSample = () => {
    setJsonInput(`{
  "z-index": 1,
  "alpha": "value",
  "beta": 2,
  "nested": {
    "zebra": true,
    "apple": "fruit"
  },
  "array": [
    {"c": 3, "a": 1, "b": 2}
  ]
}`);
  };

  const clearAll = () => {
    setJsonInput("");
    setJsonOutput("");
    setError("");
  };

  return (
    <ToolPageWrapper
      title="JSON Key Sorter"
      description="Alphabetically sort keys in your JSON objects. Perfect for version control diffs and consistent data formatting."
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: "JSON Key Sorter" }
      ]}
      accentColor="secondary"
    >
      <SEO 
        title="JSON Sort Keys – Free Online Tool"
        description="Sort JSON object keys alphabetically instantly. Free online JSON sort keys tool for developers."
        keywords="json sort keys, sort json object, json key sorter, developer tools online"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* INPUT PANEL */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                Raw JSON
              </span>
              <div className="flex items-center gap-3">
                 <label className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-secondary transition-colors px-2 py-1 rounded-md hover:bg-secondary/5">
                  <Upload size={14} /> Upload
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
              placeholder="Paste unsorted JSON here..."
              error={!!error}
            />

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
              <button 
                onClick={() => convertJson(jsonInput)}
                className="flex-1 min-w-[140px] bg-secondary hover:bg-secondary-container text-on-secondary hover:text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <Zap className="size-5" />
                <span>Sort Keys</span>
              </button>
              
              <button 
                onClick={loadSample}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-secondary hover:border-secondary/30 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-secondary/5"
              >
                Sample Data
              </button>

              <button 
                onClick={clearAll}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-error hover:border-error/30 text-slate-700 dark:text-slate-200 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:bg-error/5"
              >
                <Trash2 className="size-5" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-center font-bold animate-pop-in">
              {error}
            </div>
          )}

          {/* OUTPUT CONTAINER */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl overflow-hidden border border-white/5 relative group">
            <div className="absolute -inset-24 bg-secondary/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Alphabetical Output</span>
              <div className="flex items-center gap-4">
                <button onClick={() => copyToClipboard(jsonOutput)} className="text-xs font-bold text-slate-400 hover:text-secondary flex items-center gap-1.5 transition-colors">
                  <Copy size={3} /> {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button 
                  onClick={()=>downloadFile(jsonOutput, "sorted.json", "application/json")}
                  className="text-xs font-bold text-slate-400 hover:text-success flex items-center gap-1.5 transition-colors"
                >
                  <Download size={3} /> Download .json
                </button>
              </div>
            </div>
            
            <CodeEditor
              value={jsonOutput}
              readOnly
              placeholder="Sorted JSON will appear here..."
            />
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
             <AdSense slot="1234567890"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
               <Sparkles className="size-5 text-warning" />
               JSON Tools
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Comparator', path: '/json-compare', icon: <Database className="size-4" />, desc: 'Diff two objects' },
                { name: 'To TS Interface', path: '/json-to-typescript', icon: <Code className="size-4" />, desc: 'JSON to TypeScript' },
                { name: 'Formatter', path: '/json-formatter', icon: <Wand2 className="size-4" />, desc: 'Beautify nested data' },
                { name: 'Validator', path: '/json-validator', icon: safeLucideElement(Lock, Sparkles, { className: "size-4" }), desc: 'Check syntax integrity' },
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
