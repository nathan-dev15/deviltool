import React, { useState, useEffect } from "react";
import {
  Wand2,
  Copy,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const JsonPrettyTool = () => {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      // AdSense refresh
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus("");
    } catch {
      setStatus("Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setStatus("");
    } catch {
      setStatus("Invalid JSON");
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setStatus("valid");
    } catch {
      setStatus("invalid");
    }
  };

  const copyOutput = () => {
    if (!output) return;

    navigator.clipboard.writeText(output);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStatus("");
  };

  const uploadFile = (file: File) => {

    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setInput(e.target.result);
      }
    };

    reader.readAsText(file);
  };

  const downloadJson = () => {

    if (!output) return;

    const blob = new Blob([output], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "formatted.json";

    a.click();

    URL.revokeObjectURL(url);
  };

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* SEO */}

      <Helmet>

        <title>JSON Pretty Print Online – Free JSON Formatter</title>

        <meta
          name="description"
          content="Free JSON Pretty Print tool. Format, validate, and minify JSON instantly. Works in all browsers and runs completely in your browser."
        />

        <meta
          name="keywords"
          content="json pretty print, json formatter, json validator, json minify tool"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com/json-pretty-print"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Pretty Print Tool",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "All",
            url: "https://yourdomain.com/json-pretty-print",
            description:
              "Format and validate JSON instantly using this free JSON pretty print tool."
          })}
        </script>

      </Helmet>

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link
          to="/"
          className="flex items-center gap-1 hover:text-indigo-600"
        >
          <Home size={16} />
          Home
        </Link>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          JSON Pretty Print
        </span>

      </div>

      {/* Heading */}

      <h1 className="text-3xl font-bold">
        JSON Pretty Print Tool
      </h1>

      <p className="text-gray-600 max-w-3xl">
        Format messy JSON into readable structure with indentation.
        Validate and minify JSON instantly using this free developer tool.
      </p>

      {/* Input */}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      {/* Toolbar */}

      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

        <button
          onClick={formatJson}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Wand2 size={16} />
          Pretty
        </button>

        <button
          onClick={minifyJson}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-red-600"
        >
          Minify
        </button>

        <button
          onClick={validateJson}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border  hover:text-green-600"
        >
          Validate
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600">

          <Upload size={16} />

          Upload

          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
          />

        </label>

        <button
          onClick={clearAll}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-red-500"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={copyOutput}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={downloadJson}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-blue-600"
        >
          <Download size={16} />
          Download
        </button>

      </div>

      {/* Status */}

      {status === "valid" && (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle size={18} />
          Valid JSON
        </div>
      )}

      {status === "invalid" && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle size={18} />
          Invalid JSON
        </div>
      )}

      {status === "Invalid JSON" && (
        <div className="text-red-500 font-medium">
          Invalid JSON format
        </div>
      )}

      {/* Output */}

      <textarea
        value={output}
        readOnly
        placeholder="Formatted JSON will appear here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm bg-gray-50"
      />

      {/* Google AdSense */}

      <div className="text-center my-6">

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

      </div>

      {/* SEO Content */}

      <section className="grid md:grid-cols-2 gap-6 pt-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            What is JSON Pretty Print?
          </h2>

          <p className="text-gray-600">
            JSON Pretty Print converts minified or compressed JSON into a
            readable format with indentation and spacing. It helps developers
            debug APIs and inspect data easily.
          </p>

        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-3">
            Features
          </h2>

          <ul className="space-y-2 text-gray-600">

            <li>✔ Format JSON instantly</li>
            <li>✔ Minify JSON</li>
            <li>✔ Validate JSON syntax</li>
            <li>✔ Upload and download JSON files</li>
            <li>✔ Works in all modern browsers</li>

          </ul>

        </div>

      </section>

    </div>
  );
};