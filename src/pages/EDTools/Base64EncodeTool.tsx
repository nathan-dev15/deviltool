import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
  Home
} from "lucide-react";

import { Link } from "react-router-dom";
import { encode } from "js-base64";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";

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
      el.style.height = el.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (

    <div className="flex font-mono text-sm">

      {/* Line Numbers */}
      <div className="bg-gray-100 text-gray-400 px-3 py-4 text-right select-none border-r">

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
        className="flex-1 p-4 outline-none resize-none leading-6 overflow-hidden"
      />

    </div>

  );
};

/* ---------- Main Tool ---------- */

export const Base64EncodeTool = () => {

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

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <SEO
        title="Base64 Encode Tool – Free Online Encoder"
        description="Encode text to Base64 instantly."
        keywords="base64 encode, base64 encoder online"
      />

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16}/> Home
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-700">
          Base64 Encode
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        Base64 Encode Tool
      </h1>

      <p className="text-gray-600">
        Encode text into Base64 instantly while typing.
      </p>

      {/* Workspace */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* INPUT PANEL */}

        <div className="bg-white border rounded-xl shadow-sm flex flex-col">

          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
            <span className="font-medium">
              Input Text
            </span>
          </div>

          <CodeEditor
            value={inputText}
            onChange={setInputText}
            placeholder="Type or paste text..."
          />

        </div>

        {/* OUTPUT PANEL */}

        <div className="bg-white border rounded-xl shadow-sm flex flex-col">

          <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">

            <span className="font-medium">
              Base64 Output
            </span>

            <button
              disabled={!outputText}
              onClick={() => copyToClipboard(outputText)}
              className="flex items-center gap-1 text-sm hover:text-indigo-600"
            >
              <Copy size={14}/>
              {copied ? "Copied!" : "Copy"}
            </button>

          </div>

          <CodeEditor
            value={outputText}
            readOnly
            placeholder="Encoded result will appear here..."
          />

        </div>

      </div>

      {/* Action Bar */}

      <div className="flex flex-wrap justify-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl">

        <button
          onClick={clearAll}
          className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg  hover:text-indigo-600 Hover:bg-yellow-50 transition"
        >
          <Trash2 size={16}/> Clear
        </button>

        <button
          disabled={!outputText}
          onClick={() =>
            downloadFile(outputText,"base64.txt","text/plain")
          }
          className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg  hover:text-indigo-600 Hover:bg-yellow-50 transition"
        >
          <Download size={16}/> Download
        </button>

        <label className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer  hover:text-indigo-600 Hover:bg-yellow-50 transition">


          <Upload size={16}/> Upload

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
        <div className="text-red-500 text-center font-medium">
          {error}
        </div>
      )}

      <AdSense slot="1234567890"/>

    </div>

  );

};