import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
  RefreshCw
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";

/* ---------- Code Editor ---------- */

const CodeEditor = ({
  value,
  onChange,
  placeholder,
  readOnly = false
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder: string;
  readOnly?: boolean;
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

    <div className="flex font-mono text-sm bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-b-xl overflow-hidden min-h-[200px]">

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
        rows={8}
        className="flex-1 p-4 outline-none resize-none leading-6 bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
      />

    </div>

  );

};

/* ---------- Helpers ---------- */

const encodeHTML = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const decodeHTML = (str: string) => {
  if (typeof document === 'undefined') return str;
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};

const isEncoded = (str: string) =>
  /&lt;|&gt;|&amp;|&quot;|&#39;/.test(str);

const sanitizeHTML = (html: string) =>
  html.replace(/<script.*?>.*?<\/script>/gi, "");

/* ---------- Main Tool ---------- */

export const HtmlEncodeDecodeTool = () => {

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [safeMode, setSafeMode] = useState(true);
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* Auto Detect Encode/Decode */

  useEffect(() => {

    if (!inputText) {
      setOutputText("");
      return;
    }

    try {

      const result = isEncoded(inputText)
        ? decodeHTML(inputText)
        : encodeHTML(inputText);

      setOutputText(result);
      setError("");

    } catch {
      setError("Conversion failed");
    }

  }, [inputText]);

  /* Clear */

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setError("");
  };

  /* Swap */

  const swap = () => {
    setInputText(outputText);
    setOutputText("");
  };

  /* Upload */

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInputText(content);
    } catch {
      setError("Failed to read file");
    }
  };

  const previewHTML = safeMode ? sanitizeHTML(outputText) : outputText;

  return (

    <ToolPageWrapper
      title="HTML Encode & Decode"
      description="Automatically encode or decode HTML entities with live preview. Secure and fast browser-based utility."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "HTML Encode Decode" }
      ]}
      accentColor="primary"
    >
      <SEO
        title="HTML Encode Decode Tool – Free Online HTML Encoder & Decoder"
        description="Encode or decode HTML entities instantly. Convert special characters like <, >, & into safe HTML or decode them back."
        keywords="html encode, html decode, html entities converter, escape html online, unescape html"
      />

      <div className="space-y-8 animate-fade-in">

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                Input Source
              </span>
              <div className="text-xs font-semibold text-slate-400">
                Chars: {inputText.length}
              </div>
            </div>

            <CodeEditor
              value={inputText}
              onChange={setInputText}
              placeholder="Paste HTML or encoded text here..."
            />

          </div>

          {/* OUTPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">

              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                Result Output
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={swap}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5"
                >
                  <RefreshCw size={14}/> Swap
                </button>

                <button
                  disabled={!outputText}
                  onClick={() => copyToClipboard(outputText)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-tertiary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-tertiary/5"
                >
                  <Copy size={14}/>
                  {copied ? "Copied!" : "Copy Result"}
                </button>
              </div>

            </div>

            <CodeEditor
              value={outputText}
              readOnly
              placeholder="Conversion result will appear here..."
            />

          </div>

        </div>

        {/* Action Bar */}

        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-white/5 relative overflow-hidden group">
          {/* subtle background glow */}
          <div className="absolute -inset-24 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <Trash2 size={18}/> Clear All
          </button>

          <button
            disabled={!outputText}
            onClick={() => downloadFile(outputText, "result.html", "text/html")}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Download size={18}/> Download HTML
          </button>
          
          <label className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10">
            <Upload size={18}/> Upload File
            <input
              type="file"
              hidden
              onChange={(e)=>{
                const file = e.target.files?.[0];
                if(file) handleUpload(file);
              }}
            />
          </label>
        </div>

        {/* PREVIEW */}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md">

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <div className="size-2 rounded-full bg-success" />
              Live Render Preview
            </h3>

            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={safeMode}
                onChange={() => setSafeMode(!safeMode)}
                className="size-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
                Enhanced Security (Strip Scripts)
              </span>
            </label>
          </div>

          <div
            className="min-h-[100px] border border-slate-100 dark:border-slate-800 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200"
            dangerouslySetInnerHTML={{ __html: previewHTML || '<p class="text-slate-400 italic">No preview available</p>' }}
          />

        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-center font-bold animate-pop-in">
            {error}
          </div>
        )}

        <div className="mt-12 space-y-8">
           <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">What is HTML Encoding?</h2>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
               HTML encoding converts special characters like &lt;, &gt;, and &amp; into safe HTML entities. This prevents browsers from interpreting them as actual HTML code, which is essential for security (preventing XSS) and correct rendering of code snippets.
             </p>
             <div className="grid md:grid-cols-2 gap-6 mt-8">
               <div className="space-y-2">
                 <h4 className="font-bold text-slate-700 dark:text-slate-300">Original HTML</h4>
                 <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-100 dark:border-slate-800">
                   &lt;h1&gt;Hello World&lt;/h1&gt;
                 </div>
               </div>
               <div className="space-y-2">
                 <h4 className="font-bold text-slate-700 dark:text-slate-300">Encoded Output</h4>
                 <div className="bg-primary/5 p-4 rounded-lg font-mono text-sm border border-primary/20 text-primary dark:text-primary-container">
                   &amp;lt;h1&amp;gt;Hello World&amp;lt;/h1&amp;gt;
                 </div>
               </div>
             </div>
           </section>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
           <AdSense slot="8156203131"/>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
