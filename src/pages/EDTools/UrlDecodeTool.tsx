import React, { useState, useEffect } from "react";
import {
  Trash2,
  Copy,
  Upload,
  Download,
  Home
} from "lucide-react";

import { Link } from "react-router-dom";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";

/* ---------- Code Editor (Horizontal Scroll) ---------- */

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

    <div className="flex font-mono text-sm h-64 overflow-hidden">

      {/* Line Numbers */}

      <div className="bg-gray-100 text-gray-400 px-3 py-4 text-right select-none border-r">

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
        font-mono
        text-sm
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

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <SEO
        title="URL Decode Tool – Free Online URL Decoder"
        description="Decode encoded URLs instantly with our free online URL decoder tool."
        keywords="url decode, url decoder online, decode url parameters, developer tools url decode"
      />

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16}/> Home
        </Link>

        <span>/</span>

        <span className="font-medium text-gray-700">
          URL Decode
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        URL Decode Tool
      </h1>

      <p className="text-gray-600">
        Decode URL encoded strings instantly for APIs, query parameters, and web development.
      </p>

      {/* INPUT PANEL */}

      <div className="bg-white border rounded-xl shadow-sm">

        <div className="px-4 py-3 border-b bg-gray-50 font-medium">
          Encoded URL Input
        </div>

        <CodeEditor
          value={inputText}
          onChange={setInputText}
          placeholder="Paste encoded URL here..."
        />

        <div className="text-xs text-gray-500 px-4 pb-3">
          Characters: {inputText.length}
        </div>

      </div>

      {/* OUTPUT PANEL */}

      <div className="bg-white border rounded-xl shadow-sm">

        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">

          <span className="font-medium">
            Decoded URL
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
          placeholder="Decoded URL will appear here..."
        />

      </div>

      {/* ACTION BAR */}

      <div className="flex flex-wrap justify-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl">

        <button
          onClick={clearAll}
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-indigo-600 transition"
        >
          <Trash2 size={16}/> Clear
        </button>

        <button
          disabled={!outputText}
          onClick={() =>
            downloadFile(outputText,"url-decoded.txt","text/plain")
          }
          className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-indigo-600 transition"
        >
          <Download size={16}/> Download
        </button>

        <label className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:text-indigo-600 transition">

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

      {/* SEO CONTENT */}

      <section className="bg-white border rounded-xl shadow-sm p-6 space-y-6">

  <h2 className="text-2xl font-bold">
    What is URL Decoding?
  </h2>

  <p className="text-gray-600 leading-relaxed">
    URL decoding is the process of converting percent-encoded characters
    back into their original readable form. When URLs contain special
    characters like spaces, symbols, or non-ASCII characters, they are
    encoded to ensure safe transmission over the internet.
  </p>

  <p className="text-gray-600">
    For example, a space character cannot appear directly in a URL.
    Instead, it is encoded as <code>%20</code>. URL decoding reverses
    this process and restores the original text.
  </p>

</section>


<section className="bg-white border rounded-xl shadow-sm p-6 space-y-6">

  <h2 className="text-2xl font-bold">
    URL Decode Example
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>

      <h3 className="font-semibold mb-2">
        Encoded URL
      </h3>

      <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world
      </div>

    </div>

    <div>

      <h3 className="font-semibold mb-2">
        Decoded Result
      </h3>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg font-mono text-sm overflow-x-auto">
        https://example.com/search?q=hello world
      </div>

    </div>

  </div>

</section>


<section className="bg-white border rounded-xl shadow-sm p-6 space-y-6">

  <h2 className="text-2xl font-bold">
    Why Use a URL Decoder?
  </h2>

  <ul className="grid md:grid-cols-2 gap-4 text-gray-700">

    <li className="flex gap-2">
      🔍 Debug encoded URLs in web applications
    </li>

    <li className="flex gap-2">
      📊 Read query parameters clearly
    </li>

    <li className="flex gap-2">
      ⚙️ Test API request parameters
    </li>

    <li className="flex gap-2">
      🧑‍💻 Simplify web development debugging
    </li>

    <li className="flex gap-2">
      🌐 Work with encoded links in browsers
    </li>

    <li className="flex gap-2">
      🛠 Understand URL parameters in logs
    </li>

  </ul>

</section>


<section className="bg-white border rounded-xl shadow-sm p-6 space-y-4">

  <h2 className="text-2xl font-bold">
    When Do URLs Get Encoded?
  </h2>

  <p className="text-gray-600">
    URLs are automatically encoded when they contain special characters
    such as spaces, symbols, or Unicode characters. This ensures the
    URL remains valid and can be safely transmitted across the web.
  </p>

  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">

    Space → %20  
    & → %26  
    = → %3D  
    ? → %3F  

  </div>

</section>

    </div>

  );

};