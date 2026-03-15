import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Copy,
  Download,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  Home as HomeIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";

export const JsonValidator: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [valid, setValid] = React.useState(false);
  const [fileName, setFileName] = React.useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(input, () => validateJson());

  const validateJson = () => {

    try {

      if (!input.trim()) return;

      JSON.parse(input);

      setValid(true);
      setError(null);

    } catch (e: any) {

      setError(e.message);
      setValid(false);

    }

  };

  const clearAll = () => {

    setInput("");
    setError(null);
    setValid(false);
    setFileName("");

  };

  const loadSample = () => {

    setInput(`{
  "user": {
    "id": 101,
    "name": "Alice",
    "email": "alice@example.com",
    "roles": ["admin", "editor"],
    "active": true
  },
  "company": {
    "name": "TechCorp",
    "location": "Chennai",
    "employees": 150
  }
}`);

  };

  const onUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInput(content);
      setFileName(file.name);
    } catch (err) {
      setError("Failed to read file");
    }
  };

  return (

    <div className="w-full px-4 md:py-10 py-4">

      <SEO
        title="JSON Validator – Validate JSON Data Online"
        description="Free JSON validator tool to check JSON syntax instantly. Validate API responses and detect JSON errors easily."
        keywords="json validator, validate json online, json syntax checker"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "JSON Validator",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            url: window.location.href,
            offers: { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </SEO>

      {/* Breadcrumb */}

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">

        <Link to="/" className="flex items-center gap-1 hover:text-primary">

          <HomeIcon className="size-3" /> Home

        </Link>

        <ChevronRight className="size-3" />

        <span>Developer Tools</span>

        <ChevronRight className="size-3" />

        <span className="text-primary font-medium">

          JSON Validator

        </span>

      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* MAIN TOOL */}

        <div className="lg:col-span-8 space-y-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">

              JSON Validator

            </h1>

            <p className="text-slate-600 dark:text-slate-400">

              Validate JSON data instantly and detect syntax errors before using it in APIs or applications.

            </p>

          </div>

          {/* INPUT PANEL */}

          <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">

            <div className="p-4 border-b flex justify-between bg-slate-50 dark:bg-slate-700">

              <span className="text-xs font-bold uppercase text-slate-500">

                JSON Input

              </span>

              <label className="cursor-pointer flex items-center gap-1 hover:text-primary text-xs">

                <Upload size={14} /> Upload

                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {

                    const file = e.target.files?.[0];

                    if (file) onUpload(file);

                  }}
                />

              </label>

            </div>

            {fileName && (
              <p className="text-xs px-4 pt-2 text-slate-500">
                Uploaded: {fileName}
              </p>
            )}

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste JSON here..."
              className="w-full min-h-[240px] p-4 font-mono text-sm resize-y bg-transparent focus:ring-2 focus:ring-primary/20"
            />

            {/* ACTION BUTTONS */}

            <div className="p-4 bg-slate-50 dark:bg-slate-700 border-t flex flex-wrap gap-3">

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={validateJson}
                className="cursor-pointer flex-1 bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold"
              >
                Validate JSON
              </motion.button>

              <button
                onClick={loadSample}
                className="cursor-pointer px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                Sample
              </button>

              <button
                onClick={clearAll}
                className="cursor-pointer px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center gap-2"
              >
                <Trash2 size={18} />
                Clear
              </button>

              <button
                onClick={() => copyToClipboard(input)}
                className="cursor-pointer px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center gap-2"
              >
                <Copy size={18} />
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={() => downloadFile(input, `json-${Date.now()}.json`, "application/json")}
                className="cursor-pointer px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 flex items-center gap-2"
              >
                <Download size={18} />
                Download
              </button>

            </div>

          </div>

          {/* RESULT PANEL */}

          <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm">

            {valid && (
              <div className="text-green-400 flex items-center gap-2">

                <CheckCircle size={18} />

                Valid JSON

              </div>
            )}

            {error && (
              <div className="text-red-400 flex items-center gap-2">

                <XCircle size={18} />

                {error}

              </div>
            )}

            {!valid && !error && (
              <span className="text-slate-400">
                Validation result will appear here
              </span>
            )}

          </div>

          {/* AdSense */}
          <AdSense slot="1234567890" />

          {/* INFO SECTION */}

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border">

            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">

              <Info size={18} className="text-primary" />

              What is a JSON Validator?

            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">

              A JSON validator checks whether JSON data follows the correct syntax rules. Developers use JSON validation tools to debug APIs, configuration files, and application data structures.

            </p>

          </section>

        </div>

        {/* SIDEBAR */}

        <aside className="lg:col-span-4 space-y-6">

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">

            Related Tools

          </h3>

          <Link
            to="/json-formatter"
            className="block p-4 bg-white dark:bg-slate-800 border rounded-xl hover:border-primary cursor-pointer"
          >
            JSON Formatter
          </Link>

          <Link
            to="/json-minifier"
            className="block p-4 bg-white dark:bg-slate-800 border rounded-xl hover:border-primary cursor-pointer"
          >
            JSON Minifier
          </Link>

          <Link
            to="/base64-encode"
            className="block p-4 bg-white dark:bg-slate-800 border rounded-xl hover:border-primary cursor-pointer"
          >
            Base64 Encoder
          </Link>

        </aside>

      </div>

    </div>

  );

};