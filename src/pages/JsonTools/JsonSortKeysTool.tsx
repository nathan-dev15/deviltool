import React, { useState, useEffect } from "react";
import {
  Wand2,
  FileText,
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
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";

export const JsonSortKeysTool = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(jsonInput, () => convertJson());

  const sortJsonKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortJsonKeys);
    } else if (obj !== null && typeof obj === "object") {
      return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
          acc[key] = sortJsonKeys(obj[key]);
          return acc;
        }, {});
    }
    return obj;
  };

  const convertJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const sorted = sortJsonKeys(parsed);
      setJsonOutput(JSON.stringify(sorted, null, 2));
      setError("");
    } catch {
      setError("Invalid JSON format");
      setJsonOutput("");
    }
  };

  const loadSample = () => {
    setJsonInput(`[
  {"name": "Jane", "id": 2, "email": "jane@example.com"},
  {"email": "john@example.com", "id": 1, "name": "John"}
]`);
  };

  const clearAll = () => {
    setJsonInput("");
    setJsonOutput("");
    setError("");
  };

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setJsonInput(content);
    } catch (err) {
      setError("Failed to read file");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <SEO 
        title="JSON Sort Keys – Free Online Tool"
        description="Sort JSON object keys alphabetically instantly. Free online JSON sort keys tool for developers."
        keywords="json sort keys, sort json object, json key sorter, developer tools online"
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16} /> Home
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">JSON Sort Keys</span>
      </div>

      <h1 className="text-3xl font-bold">JSON Sort Keys Tool</h1>

      {/* JSON Input */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">
        <button
          onClick={convertJson}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:text-purple-600"
        >
          <Wand2 size={16} /> Sort
        </button>

        <button
          onClick={loadSample}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-yellow-600"
        >
          <FileText size={16} /> Sample
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-cyan-600">
          <Upload size={16} /> Upload
          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
        </label>

        <button
          onClick={clearAll}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600"
        >
          <Trash2 size={16} /> Clear
        </button>

        <button
          onClick={() => copyToClipboard(jsonOutput)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-blue-600"
        >
          <Copy size={16} /> {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => downloadFile(jsonOutput, "sorted.json", "application/json")}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600"
        >
          <Download size={16} /> Download
        </button>
      </div>

      {/* Error */}
      {error && <div className="text-red-500 font-medium">{error}</div>}

      {/* Output */}
      <textarea
        value={jsonOutput}
        readOnly
        placeholder="Sorted JSON will appear here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm bg-gray-50"
      />

      {/* Preview */}
      {jsonOutput && (
        <div className="border rounded-lg p-4 bg-white">
          <pre>{jsonOutput}</pre>
        </div>
      )}

      {/* Centralized AdSense */}
      <AdSense slot="1234567890" />

      {/* SEO Content */}
      <section className="grid md:grid-cols-2 gap-6 pt-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">What is JSON Sort Keys?</h2>
          <p className="text-gray-600">
            JSON Sort Keys tool alphabetically sorts all keys in a JSON object. 
            This helps developers maintain consistent key order, improve readability, 
            and simplify comparisons.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✔ Sort JSON object keys alphabetically</li>
            <li>✔ Upload JSON files</li>
            <li>✔ Copy output easily</li>
            <li>✔ Download sorted JSON</li>
            <li>✔ Works in all modern browsers</li>
          </ul>
        </div>
      </section>
    </div>
  );
};