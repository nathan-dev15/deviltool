import React, { useState, useEffect, useRef } from "react";
import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Download,
  Sparkles,
  Table,
  Code,
  Zap,
  Info,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";

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

export const JsonToHtmlTableTool = () => {

  const [jsonInput, setJsonInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(jsonInput, (val) => convertToHtmlTable(val));

  /* JSON → HTML TABLE */
  const jsonToTable = (json: any[]) => {
    if (!Array.isArray(json) || json.length === 0) return "";
    const headers = Object.keys(json[0]);

    const thead = `
      <thead style="background:#6366f1;color:white">
        <tr>
          <th style="padding:12px 16px;border:1px solid #e2e8f0;text-align:left">#</th>
          ${headers.map(h =>
            `<th style="padding:12px 16px;border:1px solid #e2e8f0;text-align:left">${h}</th>`
          ).join("")}
        </tr>
      </thead>
    `;

    const tbody = `
      <tbody>
        ${json.map((row, index) => `
          <tr style="${index % 2 === 0 ? 'background:#f8fafc' : 'background:white'}">
            <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#64748b;font-weight:bold">
              ${index + 1}
            </td>
            ${headers.map(h =>
              `<td style="padding:10px 16px;border:1px solid #e2e8f0">
                ${row[h] ?? ""}
              </td>`
            ).join("")}
          </tr>
        `).join("")}
      </tbody>
    `;

    return `
      <table style="border-collapse:collapse;width:100%;font-family:Inter,system-ui,sans-serif;font-size:14px;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
        ${thead}
        ${tbody}
      </table>
    `;
  };

  const convertToHtmlTable = (val: string = jsonInput) => {
    if (!val || !val.trim()) {
      setHtmlOutput("");
      setError("");
      return;
    }
    try {
      const parsed = JSON.parse(val);
      const html = jsonToTable(parsed);
      setHtmlOutput(html);
      setError("");
    } catch {
      setError("Invalid JSON format (Must be an array of objects)");
      setHtmlOutput("");
    }
  };

  const loadSample = () => {
    setJsonInput(`[
  {
    "id": 1,
    "product": "AirPods Pro",
    "price": "$249",
    "stock": "In Stock"
  },
  {
    "id": 2,
    "product": "iPhone 15",
    "price": "$799",
    "stock": "Limited"
  },
  {
    "id": 3,
    "product": "MacBook Air",
    "price": "$999",
    "stock": "Out of Stock"
  }
]`);
  };

  const clearAll = () => {
    setJsonInput("");
    setHtmlOutput("");
    setError("");
  };

  return (
    <ToolPageWrapper
      title="JSON to HTML Table"
      description="Convert JSON arrays into clean, styled HTML tables instantly. Ideal for documentation, emails, and web reports."
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: "JSON to HTML Table" }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="JSON to HTML Table Converter – Free Online Tool"
        description="Convert JSON data to HTML table instantly. Clean, responsive table generation for developers."
        keywords="json to html table, json table converter, online json tools"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* INPUT AREA */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                Input JSON Array
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
              placeholder="Paste JSON array of objects here..."
              error={!!error}
            />

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
              <button 
                onClick={() => convertToHtmlTable(jsonInput)}
                className="flex-1 min-w-[140px] bg-secondary hover:bg-secondary-container text-on-secondary hover:text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95"
              >
                <Table className="size-5" />
                <span>Generate Table</span>
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

          {/* PREVIEW & OUTPUT */}
          {htmlOutput && (
            <div className="space-y-8 animate-pop-in">
              
              {/* TABLE PREVIEW */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      <Zap className="size-5 text-warning" /> Visual Preview
                   </h3>
                </div>
                <div 
                  className="rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
                  dangerouslySetInnerHTML={{__html: htmlOutput}} 
                />
              </div>

              {/* HTML CODE OUTPUT */}
              <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-xl overflow-hidden border border-white/5 relative group">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">HTML Code Result</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => copyToClipboard(htmlOutput)} className="text-xs font-bold text-slate-400 hover:text-secondary flex items-center gap-1.5 transition-colors">
                      <Copy size={3} /> {copied ? 'Copied!' : 'Copy Snippet'}
                    </button>
                    <button 
                      onClick={()=>downloadFile(htmlOutput, "table.html", "text/html")}
                      className="text-xs font-bold text-slate-400 hover:text-success flex items-center gap-1.5 transition-colors"
                    >
                      <Download size={3} /> Download .html
                    </button>
                  </div>
                </div>
                
                <CodeEditor
                  value={htmlOutput}
                  readOnly
                  placeholder="Generated HTML code will appear here..."
                />
              </div>

            </div>
          )}

          <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
             <AdSense slot="8156203131"/>
          </div>

        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white flex items-center gap-2">
               <Sparkles className="size-5 text-warning" />
               JSON Export Toolkit
            </h3>
            <div className="grid gap-4">
              {[
                { name: 'Comparator', path: '/json-compare', icon: <Code className="size-4" />, desc: 'Diff two objects' },
                { name: 'To CSV', path: '/json-to-csv', icon: <Database className="size-4" />, desc: 'JSON to Spreadsheet' },
                { name: 'To XML', path: '/json-to-xml', icon: <Zap size={14} />, desc: 'JSON to XML format' },
                { name: 'To YAML', path: '/json-to-yaml', icon: <Table className="size-4" />, desc: 'JSON to YAML format' },
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
