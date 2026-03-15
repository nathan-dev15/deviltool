import React, { useState, useEffect } from "react";
import { XMLBuilder } from "fast-xml-parser";

import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Download,
  Home
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";

export const JsonToXmlTool = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(jsonInput, () => convertToXML());

  const convertToXML = () => {

    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);

      const builder = new XMLBuilder({
        format: true,
        ignoreAttributes: false
      });

      const xml = builder.build(parsed);

      setXmlOutput(xml);
      setError("");

    } catch (e: any) {

      setError(e.message || "Invalid JSON format");
      setXmlOutput("");

    }

  };

  const loadSample = () => {

    setJsonInput(`{
  "users": {
    "user": [
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
    ]
  }
}`);

  };

  const clearAll = () => {

    setJsonInput("");
    setXmlOutput("");
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
    <div className="max-w-6xl mx-auto p-4 md:p-10 space-y-6">
      <SEO 
        title="JSON to XML Converter - Free Online Developer Tool"
        description="Convert JSON data to XML format instantly. Secure, browser-based JSON to XML converter for developers."
        keywords="json to xml, json xml converter, online converter, developer tools"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "JSON to XML Converter",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: window.location.href,
            offers: { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </SEO>

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home size={14} /> Home
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-primary font-medium">JSON to XML</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">JSON to XML Converter</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Transform your JSON objects into well-formatted XML strings instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Input JSON</label>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-64 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none bg-white dark:bg-slate-900"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">XML Output</label>
          </div>
          <textarea
            value={xmlOutput}
            readOnly
            placeholder="Generated XML will appear here..."
            className="w-full h-64 border border-slate-200 dark:border-slate-800 rounded-xl p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <button
          onClick={convertToXML}
          className="flex-1 md:flex-none cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition"
        >
          <Wand2 size={16} />
          Convert
        </button>

        <button
          onClick={loadSample}
          className="cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <FileText size={16} />
          Sample
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
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
          className="cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold hover:text-red-500 transition"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={() => copyToClipboard(xmlOutput)}
          className={cn("cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold transition", copied ? "text-green-500" : "hover:text-primary")}
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => downloadFile(xmlOutput, "data.xml", "application/xml")}
          className="cursor-pointer flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold hover:text-blue-500 transition"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 text-sm font-medium">
          {error}
        </div>
      )}

      {/* AdSense */}
      <AdSense slot="1234567890" />

      {/* SEO Content */}

      <section className="grid md:grid-cols-2 gap-6 pt-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            What is JSON to XML?
          </h2>

          <p className="text-gray-600">
            JSON to XML conversion transforms structured JSON data into XML format.
            XML is widely used for APIs, configuration files, and enterprise systems.
            This tool helps developers quickly convert JSON objects into XML format.
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            Features
          </h2>

          <ul className="space-y-2 text-gray-600">

            <li>✔ Convert JSON to XML instantly</li>
            <li>✔ Upload JSON files</li>
            <li>✔ Copy XML output</li>
            <li>✔ Download XML file</li>
            <li>✔ Works in all modern browsers</li>

          </ul>

        </div>

      </section>

    </div>
  );
};
