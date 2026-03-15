import React, { useState } from "react";
import {
  Wand2,
  Copy,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Home,
  Wrench
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";
import { jsonrepair } from "jsonrepair";

const fixCommonJsonIssues = (json: string) => {

  let fixed = json;

  // Remove trailing commas
  fixed = fixed.replace(/,\s*}/g, "}");
  fixed = fixed.replace(/,\s*]/g, "]");

  // Add quotes to keys
  fixed = fixed.replace(/([{,]\s*)([A-Za-z0-9_]+)\s*:/g, '$1"$2":');

  // Remove double commas
  fixed = fixed.replace(/,,+/g, ",");

  return fixed;

};

export const JsonPrettyTool = () => {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [errorPos, setErrorPos] = useState<{ line: number; column: number } | null>(null);
  const [changedLines, setChangedLines] = useState<number[]>([]);

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(input, () => formatJson());

  const getErrorPosition = (json: string, message: string) => {

    const match = message.match(/position (\d+)/);

    if (!match) return null;

    const pos = Number(match[1]);

    const lines = json.substring(0, pos).split("\n");

    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    return { line, column };
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus("");
      setErrorPos(null);
      setChangedLines([]);
    } catch (e: any) {

      const pos = getErrorPosition(input, e.message);

      if (pos) {
        setStatus(`JSON Error at line ${pos.line}, column ${pos.column}`);
        setErrorPos(pos);
      } else {
        setStatus(e.message);
      }

      setOutput("");
    }
  };

  const minifyJson = () => {
    try {

      const parsed = JSON.parse(input);

      setOutput(JSON.stringify(parsed));
      setStatus("");
      setErrorPos(null);
      setChangedLines([]);

    } catch (e: any) {

      const pos = getErrorPosition(input, e.message);

      if (pos) {
        setStatus(`JSON Error at line ${pos.line}, column ${pos.column}`);
      } else {
        setStatus(e.message);
      }

      setOutput("");
    }
  };

const validateJson = () => {

  try {

    JSON.parse(input);

    setStatus("Valid JSON ✔️");

    setErrorPos(null);
  } catch (e: any) {
    const pos = getErrorPosition(input, e.message);
    if (pos) {
      setStatus(`Invalid JSON ❌ — ${e.message} (Line ${pos.line}, Column ${pos.column})`);
      setErrorPos(pos);
    } else {
      setStatus(`Invalid JSON ❌ — ${e.message}`);
      setErrorPos(null);
    }
  }
};

const fixJson = () => {

  try {

    const repaired = jsonrepair(input);

    const parsed = JSON.parse(repaired);

    const pretty = JSON.stringify(parsed, null, 2);

    const originalLines = input.split("\n");
    const fixedLines = pretty.split("\n");

    const changed: number[] = [];

    fixedLines.forEach((line, i) => {

      if (originalLines[i] !== line) {

        changed.push(i + 1);

      }

    });

    setChangedLines(changed);

    setOutput(pretty);

    setStatus("JSON repaired automatically 🔧");

    setErrorPos(null);
  } catch (e: any) {
    setStatus("Unable to repair JSON ⚠️");
  }
};

  const clearAll = () => {
    setInput("");
    setOutput("");
    setStatus("");
    setChangedLines([]);
    setErrorPos(null);
  };

  const handleUpload = async (file: File) => {
    try {
      const content = await readFile(file);
      setInput(content);
    } catch {
      setStatus("Failed to read file");
    }
  };

  return (

    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <SEO
        title="JSON Pretty Print Online – Free JSON Formatter"
        description="Free JSON Pretty Print tool. Format, validate, and fix JSON instantly."
        keywords="json pretty print, json formatter, json validator"
      />

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16} />
          Home
        </Link>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          JSON Pretty Print
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        JSON Pretty Print Tool
      </h1>

      {/* INPUT WITH LINE NUMBERS */}

      <div className="grid grid-cols-[50px_1fr] border rounded-lg overflow-hidden">

        <div className="bg-gray-100 text-right pr-2 text-xs font-mono select-none">

          {input.split("\n").map((_, i) => (

            <div
              key={i}
              className={`px-2 ${
                errorPos?.line === i + 1 ? "bg-red-200 text-red-700" : ""
              }`}
            >
              {i + 1}
            </div>

          ))}

        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here..."
          className="w-full h-56 p-4 font-mono text-sm outline-none resize-none"
        />

      </div>

      {/* TOOLBAR */}

      <div className="flex flex-wrap gap-3">

        <button
          onClick={formatJson}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          <Wand2 size={16} />
          Pretty
        </button>

        <button
          onClick={minifyJson}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          Minify
        </button>

        <button
          onClick={validateJson}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          Validate
        </button>

        <button
          onClick={fixJson}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          <Wrench size={16} />
          Fix JSON
        </button>

        <button
          onClick={clearAll}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          onClick={() => copyToClipboard(output)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={() => downloadFile(output, "formatted.json", "application/json")}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <Download size={16} />
          Download
        </button>

        <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer">

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

      </div>

      {/* STATUS */}

    {status && (

  <div
    className={`flex items-center gap-2 p-3 rounded-lg border
      ${status.includes("Valid") ? "bg-green-50 border-green-300 text-green-700" : ""}
      ${status.includes("Invalid") ? "bg-red-50 border-red-300 text-red-700" : ""}
      ${status.includes("repaired") ? "bg-blue-50 border-blue-300 text-blue-700" : ""}
      ${status.includes("Unable") ? "bg-yellow-50 border-yellow-300 text-yellow-700" : ""}
    `}
  >

    {status.includes("Valid") && (
      <CheckCircle size={18} />
    )}

    {status.includes("Invalid") && (
      <AlertCircle size={18} />
    )}

    {status.includes("repaired") && (
      <Wrench size={18} />
    )}

    <span className="text-sm font-medium">
      {status}
    </span>

  </div>

)}

      {/* OUTPUT WITH LINE NUMBERS */}

      <div className="grid grid-cols-[50px_1fr] border rounded-lg overflow-hidden">

        <div className="bg-gray-100 text-right pr-2 text-xs font-mono select-none">

          {output.split("\n").map((_, i) => (

            <div
              key={i}
              className={`px-2 ${
                changedLines.includes(i + 1)
                  ? "bg-green-200 text-green-800"
                  : ""
              }`}
            >
              {i + 1}
            </div>

          ))}

        </div>

        <textarea
          value={output}
          readOnly
          className="w-full h-56 p-4 font-mono text-sm bg-gray-50 resize-none"
        />

      </div>

      <AdSense slot="1234567890" />

    </div>
  );

};