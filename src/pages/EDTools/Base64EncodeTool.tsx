import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
  LayoutDashboard
} from "lucide-react";
import { Link } from "react-router-dom";
import { encode } from "js-base64";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

/* ---------- Code Editor with Line Numbers ---------- */

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

    <div className="flex font-mono text-sm bg-surface-container-low/50 dark:bg-surface-container-low/20 rounded-b-xl overflow-hidden min-h-[200px]">

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
        rows={8}
        className="flex-1 p-4 outline-none resize-none leading-6 bg-transparent text-on-surface placeholder:text-on-surface-variant/40"
      />

    </div>

  );
};

/* ---------- Main Tool ---------- */

export const Base64EncodeTool = () => {
  const { t } = useI18n();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  /* Auto Encode */

  useEffect(() => {

    if (!inputText) {
      setOutputText("");
      return;
    }

    try {

      const result = encode(inputText);
      setOutputText(result);
      setError("");

    } catch (err: any) {

      setError(err.message || "Encoding failed");

    }

  }, [inputText]);

  const clearAll = () => {

    setInputText("");
    setOutputText("");
    setError("");

  };

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
      title={t('label.base64_encode')}
      description={t('label.base64_encode_desc')}
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: t('label.base64_encode') }
      ]}
      accentColor="primary"
    >
      <SEO
        title="Base64 Encode Tool – Free Online Encoder"
        description="Encode text to Base64 instantly. Secure, browser-based Base64 encoding for developers."
        keywords="base64 encode, base64 encoder online, text to base64"
      />

      <div className="space-y-8 animate-fade-in">

        {/* Workspace */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* INPUT PANEL */}

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low/50 rounded-t-2xl">
              <span className="font-bold text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                {t('label.input_text')}
              </span>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-primary/5 font-bold uppercase tracking-wider">
                  <Upload size={14}/>
                  {t('label.upload_file')}
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
            </div>

            <CodeEditor
              value={inputText}
              onChange={setInputText}
              placeholder={t('label.base64_encode_placeholder')}
            />

          </div>

          {/* OUTPUT PANEL */}

          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group">

            <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/10 bg-surface-container-low/50 rounded-t-2xl">

              <span className="font-bold text-on-surface flex items-center gap-2">
                <div className="size-2 rounded-full bg-tertiary" />
                {t('label.base64_output')}
              </span>

              <button
                disabled={!outputText}
                onClick={() => copyToClipboard(outputText)}
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant hover:text-tertiary transition-colors disabled:opacity-30 disabled:hover:text-on-surface-variant px-2 py-1 rounded-md hover:bg-tertiary/5"
              >
                <Copy size={14}/>
                {copied ? t('action.copied') : t('action.copy_output')}
              </button>

            </div>

            <CodeEditor
              value={outputText}
              readOnly
              placeholder={t('label.base64_output_placeholder')}
            />

          </div>

        </div>

        {/* Action Bar */}

        <div className="flex flex-wrap items-center justify-center gap-6 p-8 bg-surface-container-lowest rounded-3xl shadow-xl shadow-surface-container-low/10 border border-outline-variant/30 relative overflow-hidden group">
          {/* subtle background glow */}
          <div className="absolute -inset-24 bg-primary/20 blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

          <button
            onClick={clearAll}
            className="relative z-10 cursor-pointer flex items-center gap-3 bg-surface-container-high/60 text-on-surface hover:bg-surface-container-high px-8 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 border border-outline-variant/20 uppercase tracking-widest text-xs"
          >
            <Trash2 size={18}/> {t('label.clear_all')}
          </button>

          <button
            disabled={!outputText}
            onClick={() =>
              downloadFile(outputText,"base64.txt","text/plain")
            }
            className="relative z-10 cursor-pointer flex items-center gap-3 bg-primary hover:bg-primary-container text-on-primary px-10 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-widest text-xs"
          >
            <Download size={18}/> {t('label.download_result')}
          </button>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-4 rounded-2xl text-center font-bold animate-pop-in">
            {error}
          </div>
        )}

        <div className="mt-12 rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm">
           <AdSense slot="1234567890"/>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
