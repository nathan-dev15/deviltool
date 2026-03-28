import React, { useState, useEffect } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
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
  Columns,
  Info
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
  title = "Editor"
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
  title: string;
}) => {

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const lines = value.split("\n");

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.max(200, el.scrollHeight) + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/20 group">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className="text-[10px] font-mono text-slate-400">
          Lines: {lines.length}
        </div>
      </div>
      
      <div className="flex font-mono text-xs bg-slate-50 dark:bg-slate-900/30 dark:bg-slate-900/30 min-h-[200px]">
        {/* Line Numbers */}
        <div className="bg-slate-100 dark:bg-slate-800/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 px-2 py-4 text-right select-none border-r border-slate-200 dark:border-slate-700 hidden sm:block min-w-[40px]">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">{i + 1}</div>
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
          rows={8}
          className="flex-1 p-4 outline-none resize-none leading-5 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export const JsonCompareTool = () => {
  const { t } = useI18n();
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [compare, setCompare] = useState(false);
  const [error, setError] = useState("");

  const { copyToClipboard, readFile } = useToolActions();

  useRealTimeConversion([leftText, rightText], () => {
    if (leftText && rightText) {
      setCompare(true);
      setError("");
    } else {
      setCompare(false);
    }
  });

  const formatJson = (text: string) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  };

  const runCompare = () => {
    if (!leftText || !rightText) {
      setError("Please provide both inputs to compare.");
      return;
    }
    setError("");
    setLeftText(formatJson(leftText));
    setRightText(formatJson(rightText));
    setCompare(true);
  };

  const loadSample = () => {
    setLeftText(`{
  "name": "ToolNest",
  "version": "1.0",
  "status": "beta",
  "features": ["json", "encoding"]
}`);
    setRightText(`{
  "name": "ToolNest Premium",
  "version": "1.1.0",
  "status": "live",
  "features": ["json", "encoding", "compare"]
}`);
  };

  const clearAll = () => {
    setLeftText("");
    setRightText("");
    setCompare(false);
    setError("");
  };

  return (
    <ToolPageWrapper
      title="JSON / Text Compare"
      description="Compare two JSON objects or text snippets with side-by-side diff highlighting. Fast, secure, and professional."
      breadcrumbs={[
        { label: "Developer Tools", href: "#" },
        { label: "JSON Compare" }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="JSON Compare Tool (Free JSON Diff Checker)"
        description="Compare two JSON or text files instantly. Highlight differences side-by-side with professional diff viewer."
        keywords="json compare, json diff tool, compare json online"
      />

      <div className="space-y-8 animate-fade-in">
        {/* Workspace Dual Editor */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CodeEditor
              title="Original JSON (Left)"
              value={leftText}
              onChange={setLeftText}
              placeholder="Paste original JSON or text here..."
            />
            <div className="flex gap-2">
               <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                  <Upload size={14} /> Upload Left
                  <input type="file" hidden accept=".json,.txt" onChange={(e) => {
                    const file=e.target.files?.[0];
                    if(file) readFile(file).then(setLeftText);
                  }} />
               </label>
               <button onClick={() => copyToClipboard(leftText)} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                  <Copy size={16} />
               </button>
            </div>
          </div>

          <div className="space-y-4">
            <CodeEditor
              title="Modified JSON (Right)"
              value={rightText}
              onChange={setRightText}
              placeholder="Paste modified JSON or text here..."
            />
            <div className="flex gap-2">
               <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-all">
                  <Upload size={14} /> Upload Right
                  <input type="file" hidden accept=".json,.txt" onChange={(e) => {
                    const file=e.target.files?.[0];
                    if(file) readFile(file).then(setRightText);
                  }} />
               </label>
               <button onClick={() => copyToClipboard(rightText)} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/10 transition-all">
                  <Copy size={16} />
               </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 border-dashed">
            <button
              onClick={runCompare}
              className="px-10 py-4 bg-primary text-on-primary rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Columns className="size-5" /> {t('action.compare')} Side-by-Side
            </button>
            <button
              onClick={loadSample}
              className="px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 transition-all"
            >
              {t('action.load_sample')}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-error hover:bg-error/5 hover:border-error/20 transition-all"
            >
              <Trash2 className="size-5" />
            </button>
        </div>

        {error && <p className="text-center text-error font-bold animate-shake">{error}</p>}

        {/* Diff Viewer */}
        {compare && (
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-[#f8f9fa] dark:bg-[#1a1c1e] animate-pop-in">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
               <h3 className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Sparkles className="size-4 text-warning" /> 
                  Difference Detected
               </h3>
               <div className="flex items-center gap-4 text-[10px] sm:text-xs">
                  <span className="flex items-center gap-1.5"><div className="size-2 bg-red-400 rounded-full" /> Removed</span>
                  <span className="flex items-center gap-1.5"><div className="size-2 bg-green-400 rounded-full" /> Added</span>
               </div>
            </div>
            <ReactDiffViewer
              oldValue={formatJson(leftText)}
              newValue={formatJson(rightText)}
              splitView={true}
              useDarkTheme={true}
              styles={{
                variables: {
                  dark: {
                    diffViewerBackground: '#111827',
                    gutterBackground: '#1f2937',
                    gutterColor: '#9ca3af',
                    codeFoldBackground: '#374151',
                    codeFoldGutterBackground: '#1f2937',
                    codeFoldContentColor: '#e5e7eb',
                  }
                }
              }}
            />
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
           <AdSense slot="1234567890" />
        </div>

        {/* INFO */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <Database size={120} />
            </div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-white">
              <Info className="text-primary size-6" />
              Advanced Diff Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Semantic Compare</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  We automatically beautify and format your JSON before comparing, ensuring that different indentation doesn't cloud real data changes.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Side-by-Side View</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Toggle between split and unified view (coming soon) to analyze changes in the way that makes the most sense for your workflow.
                </p>
              </div>
            </div>
          </section>

      </div>
    </ToolPageWrapper>
  );
};
