import React, { useEffect, useState } from "react";
import { Copy, Trash2, Upload, Download, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { decode, encode, isValid } from "js-base64";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";

const Tooltip = ({ text }: { text: string }) => (
  <span className="group relative cursor-pointer">
    ?
    <span className="absolute hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
      {text}
    </span>
  </span>
);

export const TextBase64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      const normalizedInput = input.replace(/\s+/g, "");

      if (mode === "decode" && !isValid(normalizedInput)) {
        throw new Error("Invalid Base64");
      }

      const result = mode === "encode" ? encode(input) : decode(normalizedInput);
      setOutput(result);
      setError("");
    } catch {
      setOutput("");
      setError(`Invalid input for ${mode}`);
    }
  }, [input, mode]);

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInput(content);
    } catch {
      setError("File read failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <SEO
        title="Text to Base64 Converter - Encode & Decode Online"
        description="Convert text to Base64 and decode Base64 instantly with this free online tool. Fast, secure, and developer-friendly."
        keywords="text to base64, base64 encode, base64 decode, base64 converter online"
      />

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16} /> Home
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-700">Text to Base64</span>
      </div>

      <h1 className="text-3xl font-bold">Text ↔ Base64 Converter</h1>

      <p className="text-gray-600 flex items-center gap-2">
        Encode text into Base64 or decode Base64 back to readable text.
        <Tooltip text="Base64 is used to encode binary data into ASCII format." />
      </p>

      <div className="flex justify-center">
        <div className="flex bg-gray-200 rounded-full p-1">
          <button
            onClick={() => setMode("encode")}
            className={`cursor-pointer px-4 py-1 rounded-full text-sm ${
              mode === "encode" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            Encode Text
          </button>

          <button
            onClick={() => setMode("decode")}
            className={`cursor-pointer px-4 py-1 rounded-full text-sm ${
              mode === "decode" ? "bg-indigo-600 text-white" : ""
            }`}
          >
            Decode Base64
          </button>
        </div>
      </div>

      <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-1 rounded-xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encode" ? "Paste text here..." : "Paste Base64 string here..."}
          className="w-full h-40 p-4 rounded-xl outline-none font-mono text-sm"
        />
      </div>

      <div className="bg-white border rounded-xl shadow-sm">
        <div className="flex justify-between px-4 py-3 border-b bg-gray-50">
          <span className="font-medium">Output</span>

          <button
            onClick={() => copyToClipboard(output)}
            className="cursor-pointer flex items-center gap-1 text-sm hover:text-indigo-600 transition"
          >
            <Copy size={14} />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <textarea value={output} readOnly className="w-full h-40 p-4 outline-none font-mono text-sm" />
      </div>

      <div className="flex flex-wrap justify-center gap-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl">
        <button
          onClick={clearAll}
          className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-indigo-600 transition"
        >
          <Trash2 size={16} /> Clear
        </button>

        <button
          onClick={() => downloadFile(output, "base64.txt", "text/plain")}
          className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-indigo-600 transition"
        >
          <Download size={16} /> Download
        </button>

        <label className="cursor-pointer flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg hover:text-indigo-600 transition">
          <Upload size={16} /> Upload

          <input
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </label>
      </div>

      {error && <div className="text-red-500 text-center font-medium">{error}</div>}

      <AdSense slot="8156203131" />

      <section className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-2xl font-bold">What is Base64 Encoding?</h2>
        <p className="text-gray-600">
          Base64 encoding converts binary data into ASCII text format. It is commonly used in web development, APIs, and data transfer.
        </p>
        <p className="text-gray-600">
          For example, text like <code>Hello</code> becomes <code>SGVsbG8=</code> in Base64.
        </p>
      </section>

      <section className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-2xl font-bold">Why Use Base64?</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Encode binary data safely</li>
          <li>Embed images in HTML/CSS</li>
          <li>Secure data transfer</li>
          <li>Used in JWT and APIs</li>
        </ul>
      </section>
    </div>
  );
};
