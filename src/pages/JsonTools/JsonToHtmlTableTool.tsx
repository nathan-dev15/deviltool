import React, { useState, useEffect, useRef } from "react";
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

export const JsonToHtmlTableTool = () => {

  const [jsonInput, setJsonInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState("");
  const [lineNumbers, setLineNumbers] = useState([1]);

  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  useRealTimeConversion(jsonInput, () => convertToHtmlTable());

  /* AUTO RESIZE JSON INPUT */

  const resizeInput = () => {
    const el = inputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  /* AUTO RESIZE HTML OUTPUT */

  const resizeOutput = () => {
    const el = outputRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  /* UPDATE LINE NUMBERS */

  useEffect(() => {

    resizeInput();
    resizeOutput();

    const lines = jsonInput.split("\n").length;

    setLineNumbers(
      Array.from({ length: lines }, (_, i) => i + 1)
    );

  }, [jsonInput, htmlOutput]);

  /* JSON → HTML TABLE */

  const jsonToTable = (json) => {

    if (!Array.isArray(json) || json.length === 0) return "";

    const headers = Object.keys(json[0]);

    const thead = `
      <thead style="background:#6366f1;color:white">
        <tr>
          <th style="padding:8px;border:1px solid #ddd">S.No</th>
          ${headers.map(h =>
            `<th style="padding:8px;border:1px solid #ddd">${h}</th>`
          ).join("")}
        </tr>
      </thead>
    `;

    const tbody = `
      <tbody>
        ${json.map((row, index) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;background:#f1f5f9">
              ${index + 1}
            </td>
            ${headers.map(h =>
              `<td style="padding:8px;border:1px solid #ddd">
                ${row[h] ?? ""}
              </td>`
            ).join("")}
          </tr>
        `).join("")}
      </tbody>
    `;

    return `
      <table style="border-collapse:collapse;width:100%;font-family:Arial">
        ${thead}
        ${tbody}
      </table>
    `;
  };

  /* CONVERT */

  const convertToHtmlTable = () => {

    try {

      const parsed = JSON.parse(jsonInput);

      const html = jsonToTable(parsed);

      setHtmlOutput(html);
      setError("");

    } catch {

      setError("Invalid JSON format");
      setHtmlOutput("");

    }

  };

  /* SAMPLE JSON */

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

  /* CLEAR */

  const clearAll = () => {

    setJsonInput("");
    setHtmlOutput("");
    setError("");

  };

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <SEO
        title="JSON to HTML Table Converter – Free Online Tool"
        description="Convert JSON data to HTML table instantly."
        keywords="json to html table, json converter"
      />

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500">

        <Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
          <Home size={16}/> Home
        </Link>

        <span>/</span>

        <span className="text-gray-700 font-medium">
          JSON to HTML Table
        </span>

      </div>

      <h1 className="text-3xl font-bold">
        JSON to HTML Table Converter
      </h1>

      {/* JSON EDITOR */}

      <div className="flex border rounded-lg overflow-hidden font-mono text-sm">

        {/* Line Numbers */}

        <div className="bg-gray-900 text-gray-400 px-3 py-4 select-none text-right">

          {lineNumbers.map(n => (
            <div key={n}>{n}</div>
          ))}

        </div>

        {/* JSON INPUT */}

        <textarea
          ref={inputRef}
          value={jsonInput}
          onChange={(e)=>setJsonInput(e.target.value)}
          placeholder="Paste JSON array here..."
          rows={1}
          className="flex-1 bg-gray-900 text-green-300 p-4 outline-none resize-none overflow-hidden"
        />

      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {/* TOOLBAR */}

      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

        <button
          onClick={convertToHtmlTable}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <Wand2 size={16}/> Convert
        </button>

        <button
          onClick={loadSample}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-indigo-600 Hover:bg-yellow-50 transition"
        >
          <FileText size={16}/> Sample
        </button>

        <label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-red-600 Hover:bg-yellow-50 transition">
          <Upload size={16}/> Upload
          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e)=>{
              const file = e.target.files?.[0];
              if(file) readFile(file).then(setJsonInput);
            }}
          />
        </label>

        <button
          onClick={clearAll}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-purple-600 Hover:bg-yellow-50 transition"
        >
          <Trash2 size={16}/> Clear
        </button>

        <button
          onClick={()=>copyToClipboard(htmlOutput)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-yellow-600 Hover:bg-yellow-50 transition"
        >
          <Copy size={16}/>
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          onClick={()=>downloadFile(htmlOutput,"table.html","text/html")}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600 Hover:bg-yellow-50 transition"
        >
          <Download size={16}/> Download
        </button>

      </div>

      <AdSense slot="1234567890"/>

      {/* HTML OUTPUT */}

      {htmlOutput && (

        <div className="space-y-4">

          <h2 className="text-xl font-semibold">
            HTML Output
          </h2>

          <textarea
            ref={outputRef}
            value={htmlOutput}
            readOnly
            rows={1}
            className="w-full border rounded-lg p-4 font-mono text-sm bg-gray-100 resize-none overflow-hidden"
          />

          {/* TABLE PREVIEW */}

          <div className="border rounded-lg p-4 bg-white">

            <h3 className="font-semibold mb-3">
              Table Preview
            </h3>

            <div
              dangerouslySetInnerHTML={{__html:htmlOutput}}
            />

          </div>

        </div>

      )}

    </div>

  );

};