import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";

/* ---------- Code Editor (Vertical Scroll) ---------- */

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

  const lines = value.split("\n");

  return (

    <div className="flex font-mono text-sm h-64 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-b-xl overflow-hidden">

      {/* Line Numbers */}

      <div className="bg-slate-100 dark:bg-slate-800/50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 px-3 py-4 text-right select-none border-r border-slate-200 dark:border-slate-700 hidden sm:block overflow-y-hidden">

        {lines.map((_, i) => (
          <div key={i} className="leading-6">{i + 1}</div>
        ))}

      </div>

      {/* Horizontal Textarea */}

      <textarea
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        className="
        flex-1
        p-4
        outline-none
        resize-none
        leading-6
        overflow-x-auto
        overflow-y-auto
        whitespace-nowrap
        bg-transparent
        text-slate-800
        dark:text-slate-200
        placeholder:text-slate-400
        dark:placeholder:text-slate-500
        "
      />

    </div>

  );

};

/* ---------- Main Tool ---------- */

export const UrlDecodeTool = () => {

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

      const result = decodeURIComponent(inputText);
      setOutputText(result);
      setError("");

    } catch {

      setError("Invalid encoded URL");

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

  return (

    <ToolPageWrapper
      title="URL Decode Tool"
      description="Decode encoded URLs instantly with our free online URL decoder tool. Safe, fast, and secure URL parameter decoding."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "URL Decode" }
      ]}
      accentColor="secondary"
    >
      <SEO
        title="URL Decode Tool – Free Online URL Decoder"
        description="Decode encoded URLs instantly with our free online URL decoder tool. Safe, fast, and secure URL parameter decoding."
        keywords="url decode, url decoder online, decode url parameters, developer tools url decode"
      />

      <div className="space-y-8 animate-fade-in">

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT PANEL */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary" />
                Encoded URL Input
              </span>
              <div className="text-xs font-semibold text-slate-400">
                Chars: {inputText.length}
              </div>
            </div>

            <CodeEditor
              value={inputText}
              onChange={setInputText}
              placeholder="Paste encoded URL here..."
            />

          </div>

          {/* OUTPUT PANEL */}

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-secondary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">

              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                Decoded URL
              </span>

              <button
                disabled={!outputText}
                onClick={() => copyToClipboard(outputText)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-secondary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-secondary/5"
              >
                <Copy size={14}/>
                {copied ? "Copied!" : "Copy URL"}
              </button>

            </div>

            <CodeEditor
              value={outputText}
              readOnly
              placeholder="Decoded URL will appear here..."
            />

          </div>

        </div>

        {/* Action Bar */}

        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-slate-900 dark:bg-slate-950 rounded-2xl shadow-lg border border-white/5 relative overflow-hidden group">
          {/* subtle background glow */}
          <div className="absolute -inset-24 bg-secondary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10"
          >
            <Trash2 size={18}/> Clear All
          </button>

          <button
            disabled={!outputText}
            onClick={() =>
              downloadFile(outputText,"url-decoded.txt","text/plain")
            }
            className="relative z-10 cursor-pointer flex items-center gap-2 bg-secondary hover:bg-secondary-container text-on-secondary hover:text-white px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Download size={18}/> Download Result
          </button>
          
          <label className="relative z-10 cursor-pointer flex items-center gap-2 bg-white/90 text-slate-900 hover:bg-white dark:bg-slate-800/60 dark:text-slate-100 dark:hover:bg-slate-800/80 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 border border-slate-200/60 dark:border-white/10">
            <Upload size={18}/> Upload URL File
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
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">What is URL Decoding?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              URL decoding is the process of converting percent-encoded characters back into their original readable form. When URLs contain special characters like spaces, symbols, or non-ASCII characters, they are encoded to ensure safe transmission over the internet.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">URL Decode Example</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Encoded URL</h3>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-100 dark:border-slate-800">
                  https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-slate-700 dark:text-slate-300">Decoded Result</h3>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg font-mono text-sm overflow-x-auto text-primary dark:text-primary-container">
                  https://example.com/search?q=hello world
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
           <AdSense slot="1234567890"/>
        </div>

      </div>
    </ToolPageWrapper>

  );
};
