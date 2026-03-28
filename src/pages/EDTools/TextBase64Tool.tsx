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

export const TextBase64Tool = () => {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* Auto Process */

  useEffect(() => {

    if (!input) {
      setOutput("");
      return;
    }

    try {

      const result =
        mode === "encode"
          ? btoa(unescape(encodeURIComponent(input))) // Support Unicode
          : decodeURIComponent(escape(atob(input)));

      setOutput(result);
      setError("");

    } catch {
      setError("Invalid input for " + mode);
    }

  }, [input, mode]);

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
      title="Text ↔ Base64 Converter"
      description="Bi-directional converter for text and Base64. Support for Unicode and larger data strings."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "Text to Base64" }
      ]}
      accentColor="primary"
    >
      <SEO
        title="Text to Base64 Converter – Encode & Decode Online"
        description="Convert text to Base64 and decode Base64 instantly with this free online tool. Fast, secure, and developer-friendly."
        keywords="text to base64, base64 encode, base64 decode, base64 converter online"
      />

      <div className="space-y-8 animate-fade-in">

        {/* TOGGLE */}

        <div className="flex justify-center">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setMode("encode")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${
                mode === "encode"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-slate-500 hover:text-primary dark:hover:text-primary-container"
              }`}
            >
              Encode Text
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-8 py-2 rounded-xl text-sm font-bold transition-all ${
                mode === "decode"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-slate-500 hover:text-primary dark:hover:text-primary-container"
              }`}
            >
              Decode Base64
            </button>
          </div>
        </div>

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                {mode === "encode" ? "Input Text" : "Base64 Input"}
              </span>
              <div className="text-xs font-semibold text-slate-400">
                Chars: {input.length}
              </div>
            </div>

            <CodeEditor
              value={input}
              onChange={setInput}
              placeholder={mode === "encode" ? "Paste text here..." : "Paste Base64 string here..."}
            />

          </div>

          {/* OUTPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">

              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                {mode === "encode" ? "Base64 Result" : "Text Result"}
              </span>

              <button
                disabled={!output}
                onClick={() => copyToClipboard(output)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-tertiary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-tertiary/5"
              >
                <Copy size={14}/>
                {copied ? "Copied!" : "Copy Output"}
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
          {/* subtle background glow */}
          <div className="absolute -inset-24 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <Trash2 size={18}/> Clear All
          </button>

          <button
            disabled={!output}
            onClick={() =>
              downloadFile(output, "base64-converter.txt", "text/plain")
            }
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
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
             <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">What is Base64 Encoding?</h2>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
               Base64 encoding converts binary data into ASCII text format. It is commonly used in web development, APIs, and data transfer to ensure that data remains intact during transmission.
             </p>
             <h3 className="text-xl font-bold mb-2 text-slate-700 dark:text-slate-300">Why Use Base64?</h3>
             <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
               <li>Encode binary data safely for transport over text-based protocols.</li>
               <li>Embed small images or assets directly in CSS or HTML as data URIs.</li>
               <li>Simple obfuscation for data (note: Base64 is NOT encryption).</li>
               <li>Standard format for authentication headers and JWT tokens.</li>
             </ul>
           </section>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
           <AdSense slot="1234567890"/>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
