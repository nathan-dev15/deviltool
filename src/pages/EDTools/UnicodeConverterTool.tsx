import React, { useState, useEffect } from "react";
import {
  Copy,
  Trash2,
  Upload,
  Download,
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";

/* ---------- Convert Functions ---------- */

const textToUnicode = (str: string) =>
  str.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4,"0")).join("");

const unicodeToText = (str: string) =>
  str.replace(/\\u[\dA-F]{4}/gi, (match) =>
    String.fromCharCode(parseInt(match.replace("\\u",""),16))
  );

const textToHtmlEntity = (str: string) =>
  str.split("").map(c => `&#${c.charCodeAt(0)};`).join("");

const textToDecimal = (str: string) =>
  str.split("").map(c => c.charCodeAt(0)).join(" ");

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

/* ---------- Main Tool ---------- */

export const UnicodeConverterTool = () => {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [format, setFormat] = useState("unicode");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* Auto Convert */

  useEffect(() => {

    if (!input) {
      setOutput("");
      return;
    }

    try {

      let result = "";

      if (mode === "encode") {
        if (format === "unicode") result = textToUnicode(input);
        else if (format === "html") result = textToHtmlEntity(input);
        else result = textToDecimal(input);
      } else {
        result = unicodeToText(input);
      }

      setOutput(result);
      setError("");

    } catch {
      setError("Conversion failed");
    }

  }, [input, mode, format]);

  /* Clear */

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  /* Upload */

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInput(content);
    } catch {
      setError("File read failed");
    }
  };

  return (

    <ToolPageWrapper
      title="Unicode Converter"
      description="Convert text into Unicode (\uXXXX), HTML entities, or decimal formats. Secure and reliable."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "Unicode Converter" }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="Unicode Converter – Text to Unicode & HTML Entities Online"
        description="Convert text to Unicode, HTML entities, or decimal codes instantly. Free Unicode converter tool for developers."
        keywords="unicode converter, text to unicode, unicode to text, html entities converter"
      />

      <div className="space-y-8 animate-fade-in">

        {/* CONTROLS */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setMode("encode")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${
                mode === "encode"
                  ? "bg-secondary text-white shadow-md"
                  : "text-slate-500 hover:text-secondary"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${
                mode === "decode"
                  ? "bg-secondary text-white shadow-md"
                  : "text-slate-500 hover:text-secondary"
              }`}
            >
              Decode
            </button>
          </div>

          {mode === "encode" && (
            <div className="flex bg-slate-100 dark:bg-slate-800/50 dark:bg-slate-800/50 p-1 rounded-xl border border-dashed border-slate-300 dark:border-slate-600">
              {["unicode", "html", "decimal"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                    format === f
                      ? "bg-white dark:bg-slate-700 text-secondary shadow-sm ring-1 ring-slate-200 dark:ring-slate-600"
                      : "text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  {f === "unicode" ? "\\uXXXX" : f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                Input Source
              </span>
              <div className="text-xs font-semibold text-slate-400">
                Chars: {input.length}
              </div>
            </div>

            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder="Enter text or escapes here..."
            />

          </div>

          {/* OUTPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">

              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                Result Output
              </span>

              <button
                disabled={!output}
                onClick={() => copyToClipboard(output)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-tertiary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-tertiary/5"
              >
                <Copy size={14}/>
                {copied ? "Copied!" : "Copy Result"}
              </button>

            </div>

            <CodeEditor
              value={output}
              readOnly
              placeholder="Conversion result will appear here..."
            />

          </div>

        </div>

        {/* Action Bar */}

        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-white/5 relative overflow-hidden group">
          <div className="absolute -inset-24 bg-secondary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <Trash2 size={18}/> Clear All
          </button>

          <button
            disabled={!output}
            onClick={() => downloadFile(output, "unicode-converter.txt", "text/plain")}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-secondary hover:bg-secondary-container text-on-secondary hover:text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Download size={18}/> Download Result
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

        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-center font-bold animate-pop-in">
            {error}
          </div>
        )}

        <div className="mt-12 space-y-8">
           <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">What is Unicode?</h2>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
               Unicode is a universal character encoding standard that assigns a unique number to every character across languages and symbols.
             </p>
             <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-sm">
                Example: A &rarr; \u0041
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
