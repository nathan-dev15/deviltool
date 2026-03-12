import React, { useState, useEffect } from "react";
import { quicktype, InputData, jsonInputForTargetLanguage } from "quicktype-core";
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
import { Helmet } from "react-helmet-async";

export const JsonToTypescriptGenerator = () => {

  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Google Ads refresh
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  const generateTypes = async () => {

    try {

      const jsonInputForTs = jsonInputForTargetLanguage("typescript");

      await jsonInputForTs.addSource({
        name: "Root",
        samples: [jsonInput]
      });

      const inputData = new InputData();
      inputData.addInput(jsonInputForTs);

      const result = await quicktype({
        inputData,
        lang: "typescript"
      });

      setTsOutput(result.lines.join("\n"));
      setError("");

    } catch {
      setError("Invalid JSON input");
      setTsOutput("");
    }

  };

  const copyOutput = () => {

    if (!tsOutput) return;

    navigator.clipboard.writeText(tsOutput);

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);

  };

  const clearAll = () => {

    setJsonInput("");
    setTsOutput("");
    setError("");

  };

  const loadSample = () => {

    setJsonInput(`{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin","editor"]
}`);

  };

  const uploadFile = (file: File) => {

    const reader = new FileReader();

    reader.onload = (e) => {

      if (typeof e.target?.result === "string") {
        setJsonInput(e.target.result);
      }

    };

    reader.readAsText(file);

  };

  const downloadOutput = () => {

    if (!tsOutput) return;

    const blob = new Blob([tsOutput], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "types.ts";

    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* SEO */}

      <Helmet>

        <title>JSON to TypeScript Generator – Free Developer Tool</title>

        <meta
          name="description"
          content="Convert JSON to TypeScript interfaces instantly. Free online JSON to TypeScript generator for developers."
        />

        <meta
          name="keywords"
          content="json to typescript, json to ts interface, convert json to typescript, typescript generator"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com/json-to-typescript"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON to TypeScript Generator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "All",
            url: "https://yourdomain.com/json-to-typescript",
            description:
              "Convert JSON data into TypeScript interfaces instantly with this free online tool."
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
          JSON to TypeScript Generator
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        JSON to TypeScript Generator
      </h1>

      {/* JSON Input */}

      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste JSON here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
      />

      {/* Toolbar */}

      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

        <button
          onClick={generateTypes}
          className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <Wand2 size={16} />
          Generate
        </button>

        <button
          onClick={loadSample}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-indigo-600"
        >
          <FileText size={16} />
          Sample
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-indigo-600">
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
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-red-500"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={copyOutput}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={downloadOutput}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-blue-600"
        >
          <Download size={16} />
          Download
        </button>

      </div>

      {/* Google Ads */}

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

      {/* Error */}

      {error && (
        <div className="text-red-500 font-medium">
          {error}
        </div>
      )}

      {/* Output */}

      <textarea
        value={tsOutput}
        readOnly
        placeholder="Generated TypeScript will appear here..."
        className="w-full h-44 border rounded-lg p-4 font-mono text-sm bg-gray-50"
      />

      {/* SEO Content */}

    <section className="grid md:grid-cols-2 gap-6 pt-8">

  {/* What is JSON to TypeScript */}

  <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

    <h2 className="text-xl font-semibold mb-3 text-indigo-600">
      What is JSON to TypeScript?
    </h2>

    <p className="text-gray-600 leading-relaxed">
      A JSON to TypeScript generator converts JSON data into TypeScript
      interfaces automatically. This helps developers create strongly typed
      applications, reduce runtime errors, and improve code readability.
    </p>

  </div>


  {/* Why Use This Tool */}

  <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

    <h2 className="text-xl font-semibold mb-4 text-indigo-600">
      Why Use This Tool?
    </h2>

    <ul className="space-y-3 text-gray-600">

      <li className="flex items-start gap-2">
        <span className="text-green-500 font-bold">✓</span>
        Instant JSON to TypeScript conversion
      </li>

      <li className="flex items-start gap-2">
        <span className="text-green-500 font-bold">✓</span>
        No installation required
      </li>

      <li className="flex items-start gap-2">
        <span className="text-green-500 font-bold">✓</span>
        Free developer tool
      </li>

      <li className="flex items-start gap-2">
        <span className="text-green-500 font-bold">✓</span>
        Works directly in your browser
      </li>

    </ul>

  </div>

</section>

    </div>
  );
};