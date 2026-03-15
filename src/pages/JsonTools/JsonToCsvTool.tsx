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
export const JsonToCsvTool = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(jsonInput, () => convertToCSV());

const jsonToCSV = (json: any[]) => {
  if (!Array.isArray(json) || json.length === 0) return "";

  const headers = Object.keys(json[0]);

  const rows = json.map(obj =>
    headers
      .map(field => {
        const value = obj[field] ?? "";
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
};
const convertToCSV = () => {
  try {
    if (!jsonInput.trim()) {
      setCsvOutput("");
      setError("");
      return;
    }

    const parsed = JSON.parse(jsonInput);

    const csv = jsonToCSV(parsed);

    setCsvOutput(csv);
    setError("");
  } catch (e: any) {
    setError(e.message || "Invalid JSON format");
    setCsvOutput("");
  }
};

  const loadSample = () => {

    setJsonInput(`[
  {
    "id": 1,
    "name": "John",
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane",
    "email": "jane@example.com"
  }
]`);

  };

  const clearAll = () => {
    setJsonInput("");
    setCsvOutput("");
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
        title="JSON to CSV Converter – Free Online Tool"
        description="Convert JSON data to CSV format instantly. Free online JSON to CSV converter for developers."
        keywords="json to csv, json csv converter, convert json to csv online"
      />

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16} /> Home
        </Link>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          JSON to CSV Converter
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        JSON to CSV Converter
      </h1>

      {/* JSON Input */}

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON array here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      {/* Toolbar */}

      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

        <button
          onClick={convertToCSV}
          className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition"
        >
          <Wand2 size={16} />
          Convert
        </button>

        <button
          onClick={loadSample}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:border-indigo-400 hover:text-indigo-600 transition"
        >
          <FileText size={16} />
          Sample
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:border-indigo-400 hover:text-indigo-600 transition">
          <Upload size={16} />
          Upload
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
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:border-red-400 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={() => copyToClipboard(csvOutput)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:border-green-400 hover:text-green-600 transition"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => downloadFile(csvOutput, "data.csv", "text/csv")}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:border-blue-400 hover:text-blue-600 transition"
        >
          <Download size={16} />
          Download
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* Output */}

      <textarea
        value={csvOutput}
        readOnly
        placeholder="Generated CSV will appear here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm bg-gray-50"
      />

      {/* Centralized AdSense */}
      <AdSense slot="1234567890" />

      {/* SEO Content */}

      <section className="grid md:grid-cols-2 gap-6 pt-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            What is JSON to CSV?
          </h2>

          <p className="text-gray-600">
            JSON to CSV converts structured JSON data into comma-separated
            values format. CSV is widely used for spreadsheets, databases,
            and data analysis.
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            Features
          </h2>

          <ul className="space-y-2 text-gray-600">

            <li>✔ Convert JSON to CSV instantly</li>
            <li>✔ Upload JSON files</li>
            <li>✔ Copy CSV output</li>
            <li>✔ Download CSV file</li>
            <li>✔ Works in all modern browsers</li>

          </ul>

        </div>

      </section>

    </div>
  );
};