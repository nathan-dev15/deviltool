import React from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Trash2,
  Copy,
  Download,
  Wand2,
  Info,
  ChevronRight,
  Home as HomeIcon,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { useToolActions } from "../useToolActions";

export const JsonMinifier: React.FC = () => {

  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(input, () => minifyJson());

  const minifyJson = () => {

    try {

      if (!input.trim()) return;

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);

      setOutput(minified);
      setError(null);

    } catch (e: any) {

      setError(e.message);
      setOutput("");

    }

  };

  const clearAll = () => {

    setInput("");
    setOutput("");
    setError(null);

  };

  const reduction =
    input && output
      ? (((input.length - output.length) / input.length) * 100).toFixed(1)
      : null;

  return (

    <div className="w-full px-4 md:py-10 py-4">

      <SEO
        title="JSON Minifier – Compress JSON Data Online"
        description="Free JSON Minifier tool to compress JSON instantly. Remove whitespace and reduce file size for APIs and production deployments."
        keywords="json minifier, compress json, minify json online, reduce json size"
      />

      {/* Breadcrumb */}

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">

        <Link to="/" className="flex items-center gap-1 hover:text-primary">

          <HomeIcon className="size-3" /> Home

        </Link>

        <ChevronRight className="size-3" />

        <span>Developer Tools</span>

        <ChevronRight className="size-3" />

        <span className="text-primary font-medium">
          JSON Minifier
        </span>

      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* MAIN TOOL */}

        <div className="lg:col-span-8 space-y-6">

          <div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">

              JSON Minifier

            </h1>

            <p className="text-slate-600 dark:text-slate-400">

              Compress and minify JSON instantly by removing whitespace, spaces,
              and line breaks. Perfect for APIs and production deployments.

            </p>

          </div>

          {/* INPUT PANEL */}

          <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden">

            <div className="p-4 border-b flex justify-between bg-slate-50 dark:bg-slate-700">

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">

                JSON Input

              </span>

              <label className="text-xs flex items-center gap-1 cursor-pointer hover:text-primary">

                <Upload size={14} /> Upload

                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const content = await readFile(file);
                      setInput(content);
                    }
                  }}
                />

              </label>

            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full min-h-[240px] p-4 font-mono text-sm resize-y bg-transparent focus:ring-2 focus:ring-primary/20"
            />

            {/* TOOLBAR */}

            <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700 border-t">

              {/* Minify Button */}

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={minifyJson}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition"
              >

                <Wand2 size={16} />
                Minify

              </motion.button>

              {/* Clear */}

              <button
                onClick={clearAll}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border hover:border-red-400 hover:text-red-500 transition"
              >

                <Trash2 size={16} />
                Clear

              </button>

              {/* Copy */}

              <button
                onClick={() => copyToClipboard(output)}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border hover:border-green-400 hover:text-green-600 transition"
              >

                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}

              </button>

              {/* Download */}

              <button
                onClick={() => downloadFile(output, `minified-${Date.now()}.json`, "application/json")}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border hover:border-blue-400 hover:text-blue-600 transition"
              >

                <Download size={16} />
                Download

              </button>

            </div>

          </div>

          {/* RESULT */}

          <div className="bg-slate-900 rounded-xl shadow-lg p-6 font-mono text-sm text-green-300 overflow-x-auto">

            {output && (

              <div className="mb-3 text-xs text-emerald-400">

                Size reduced: {reduction}% ({input.length} → {output.length})

              </div>

            )}

            <pre>

              {output || "Your minified JSON will appear here"}

            </pre>

            {error && (

              <div className="text-red-400 mt-3">

                Error: {error}

              </div>

            )}

          </div>

          {/* INFO SECTION */}

          <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border">

            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">

              <Info size={18} className="text-primary" />
              What is JSON Minification?

            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">

              JSON minification removes unnecessary whitespace, indentation,
              and line breaks from JSON data. This reduces file size and
              improves performance when sending data through APIs.

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
            to="/json-validator"
            className="block p-4 bg-white dark:bg-slate-800 border rounded-xl hover:border-primary cursor-pointer"
          >

            JSON Validator

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