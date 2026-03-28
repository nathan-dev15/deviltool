import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
  RefreshCcw
} from "lucide-react";

import { decode } from "js-base64";

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

export const Base64DecodeTool = () => {

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* Auto Decode */

  useEffect(() => {

    if (!inputText) {
      setOutputText("");
      return;
    }

    try {

      const result = decode(inputText);
      setOutputText(result);
      setError("");

    } catch (err: any) {

      setError("Invalid Base64 string");

    }

  }, [inputText]);

  /* Clear */

  const clearAll = () => {

    setInputText("");
    setOutputText("");
    setError("");

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

  /* Swap */

  const swapText = () => {

    setInputText(outputText);

  };

  return (

    <ToolPageWrapper
      title="Base64 Decode Tool"
      description="Decode Base64 strings back to plain text instantly. Fast, private, and entire browser-side."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "Base64 Decode" }
      ]}
      accentColor="tertiary"
    >
      <SEO
        title="Base64 Decode Tool – Free Online Decoder"
        description="Decode Base64 strings to text instantly. Secure, browser-based Base64 decoding."
        keywords="base64 decode, base64 decoder online, decode base64"
      />

      <div className="space-y-8 animate-fade-in">

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-tertiary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                Base64 Input
              </span>
              <div className="text-xs font-semibold text-slate-400">
                Chars: {inputText.length}
              </div>
            </div>

            <CodeEditor
              value={inputText}
              onChange={setInputText}
              placeholder="Paste Base64 string here..."
            />

          </div>

          {/* OUTPUT */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-tertiary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">

              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                Decoded Output
              </span>

              <button
                disabled={!outputText}
                onClick={() => copyToClipboard(outputText)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-tertiary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-tertiary/5"
              >
                <Copy size={14}/>
                {copied ? "Copied!" : "Copy Output"}
              </button>

            </div>

            <CodeEditor
              value={outputText}
              readOnly
              placeholder="Decoded text will appear here..."
            />

          </div>

        </div>

        {/* Action Bar */}

        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-white/5 relative overflow-hidden group">
          {/* subtle background glow */}
          <div className="absolute -inset-24 bg-tertiary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <Trash2 size={18}/> Clear All
          </button>

          <button
            disabled={!outputText}
            onClick={swapText}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <RefreshCcw size={18}/> Swap
          </button>

          <button
            disabled={!outputText}
            onClick={() =>
              downloadFile(outputText,"decoded.txt","text/plain")
            }
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-tertiary hover:bg-tertiary-container text-on-tertiary px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-tertiary/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Download size={18}/> Download Result
          </button>
          
          <label className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10">
            <Upload size={18}/> Upload Base64 File
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

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
           <AdSense slot="1234567890"/>
        </div>

      </div>
    </ToolPageWrapper>

  );
};
