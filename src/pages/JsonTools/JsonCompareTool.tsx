import React, { useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import {
  Wand2,
  FileText,
  Trash2,
  Copy,
  Upload,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

/* ---------- Code Editor with Line Numbers ---------- */

const CodeEditor = ({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => {

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const lines = value.split("\n");

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  React.useEffect(() => {
    autoResize();
  }, [value]);

  return (

    <div className="flex border rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition">

      {/* Line Numbers */}

      <div className="bg-slate-100 text-gray-400 text-xs font-mono px-3 py-4 select-none text-right border-r">

        {lines.map((_, i) => (
          <div key={i} className="leading-6">
            {i + 1}
          </div>
        ))}

      </div>

      {/* Textarea */}

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        rows={10}
        className="flex-1 p-4 font-mono text-sm outline-none resize-none leading-6 bg-transparent min-h-[250px] overflow-hidden"
      />

    </div>

  );
};
/* ---------- Main Tool ---------- */

export const JsonCompareTool = () => {

  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [compare, setCompare] = useState(false);
  const [error, setError] = useState("");

  const { copyToClipboard, readFile } = useToolActions();

  useRealTimeConversion([leftText, rightText], () => {
    if (leftText && rightText) {
      setCompare(true);
      setError("");
    } else {
      setCompare(false);
    }
  });

  const formatJson = (text: string) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  };

  const runCompare = () => {

    if (!leftText || !rightText) {
      setError("Please provide both inputs to compare.");
      return;
    }

    setError("");

    const formattedLeft = formatJson(leftText);
    const formattedRight = formatJson(rightText);

    setLeftText(formattedLeft);
    setRightText(formattedRight);

    setCompare(true);
  };

  const loadSample = () => {

    setLeftText(`{
  "name": "John",
  "age": 25,
  "city": "New York"
}`);

    setRightText(`{
  "name": "John",
  "age": 26,
  "city": "Los Angeles"
}`);
  };

  const clearAll = () => {

    setLeftText("");
    setRightText("");
    setCompare(false);
    setError("");
  };

  const handleUpload = async (file: File, side: "left" | "right") => {

    try {

      const content = await readFile(file);

      if (side === "left") setLeftText(content);
      else setRightText(content);

    } catch {

      setError("Failed to read file");

    }
  };

  return (

<div className="max-w-6xl mx-auto p-6 space-y-6">

{/* SEO */}

<SEO 
title="JSON Compare Tool (Free JSON Diff Checker)"
description="Compare two JSON or text files instantly. Highlight differences side-by-side."
keywords="json compare, json diff tool, compare json online"
/>

{/* Breadcrumb */}

<div className="flex items-center gap-2 text-sm text-gray-500">

<Link to="/" className="flex items-center gap-1 hover:text-indigo-600">
<Home size={16}/> Home
</Link>

<span>/</span>

<span className="text-gray-700 font-medium">
JSON Compare Tool
</span>

</div>

<h1 className="text-3xl font-bold">
JSON / Text Compare Tool
</h1>

{/* Editors */}

<div className="grid md:grid-cols-2 gap-6">

<CodeEditor
value={leftText}
onChange={setLeftText}
placeholder="Paste original JSON or text..."
/>

<CodeEditor
value={rightText}
onChange={setRightText}
placeholder="Paste modified JSON or text..."
/>

</div>

{/* Toolbar */}

<div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

<button
onClick={runCompare}
className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
>
<Wand2 size={16}/> Compare
</button>

<button
onClick={loadSample}
className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white  hover:border-red-400  hover:bg-purple-100 transition-colors duration-200 "
>
<FileText size={16}/> Sample
</button>

<label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer  hover:border-red-400  hover:bg-green-100 transition-colors duration-200">
<Upload size={16}/> Upload Left
<input
type="file"
hidden
accept=".json,.txt"
onChange={(e)=>{
const file=e.target.files?.[0];
if(file) handleUpload(file,"left");
}}
/>
</label>

<label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer  hover:border-red-400  hover:bg-yellow-100 transition-colors duration-200 ">
<Upload size={16}/> Upload Right
<input
type="file"
hidden
accept=".json,.txt"
onChange={(e)=>{
const file=e.target.files?.[0];
if(file) handleUpload(file,"right");
}}
/>
</label>

<button
onClick={clearAll}
className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white  hover:border-red-400  hover:bg-blue-50 transition-colors duration-200"
>
<Trash2 size={16}/> Clear
</button>

<button
onClick={()=>copyToClipboard(leftText)}
className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white  hover:border-red-400  hover:bg-green-50 transition-colors duration-200"
>
<Copy size={16}/> Copy Left
</button>

<button
onClick={()=>copyToClipboard(rightText)}
className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white  hover:border-red-400  hover:bg-yellow-50 transition-colors duration-200"
>
<Copy size={16}/> Copy Right
</button>

</div>

{error && (
<p className="text-red-500 text-sm">{error}</p>
)}

{/* Diff */}

{compare && (

<div className="border rounded-lg overflow-auto">

<ReactDiffViewer
oldValue={formatJson(leftText)}
newValue={formatJson(rightText)}
splitView={true}
/>

</div>

)}

{/* AdSense */}
{/* SEO Content Section */}

<section className="mt-10 space-y-8">

{/* Tool Explanation */}

<div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">

<h2 className="text-2xl font-semibold mb-3">
What is a JSON Compare Tool?
</h2>

<p className="text-gray-600 leading-relaxed">
A JSON Compare Tool allows developers to compare two JSON objects or text
files and instantly identify differences between them. It highlights added,
removed, or modified values so you can quickly debug API responses,
configuration files, or application data.
</p>

<p className="text-gray-600 mt-3">
This online tool works directly in your browser and does not require any
installation. Simply paste your JSON data, click compare, and view the
differences highlighted side-by-side.
</p>

</div>


{/* How To Use */}

<div className="bg-gradient-to-r from-indigo-50 to-blue-50 border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-4">
How to Use This JSON Compare Tool
</h2>

<div className="grid md:grid-cols-3 gap-4">

<div className="bg-white p-4 rounded-xl border">

<div className="text-indigo-600 font-bold text-lg mb-1">
Step 1
</div>

<p className="text-gray-600 text-sm">
Paste or upload the original JSON data in the left editor.
</p>

</div>

<div className="bg-white p-4 rounded-xl border">

<div className="text-indigo-600 font-bold text-lg mb-1">
Step 2
</div>

<p className="text-gray-600 text-sm">
Paste the modified JSON data in the right editor.
</p>

</div>

<div className="bg-white p-4 rounded-xl border">

<div className="text-indigo-600 font-bold text-lg mb-1">
Step 3
</div>

<p className="text-gray-600 text-sm">
Click the Compare button to highlight differences instantly.
</p>

</div>

</div>

</div>


{/* Features */}

<div className="bg-white border rounded-2xl p-6 shadow-sm">

<h2 className="text-2xl font-semibold mb-4">
Key Features
</h2>

<div className="grid md:grid-cols-2 gap-4">

<div className="flex gap-3">

<div className="text-green-500 font-bold">✓</div>

<p className="text-gray-600">
Side-by-side JSON difference viewer
</p>

</div>

<div className="flex gap-3">

<div className="text-green-500 font-bold">✓</div>

<p className="text-gray-600">
Automatic JSON formatting before comparison
</p>

</div>

<div className="flex gap-3">

<div className="text-green-500 font-bold">✓</div>

<p className="text-gray-600">
Upload JSON files directly from your computer
</p>

</div>

<div className="flex gap-3">

<div className="text-green-500 font-bold">✓</div>

<p className="text-gray-600">
Copy JSON results instantly
</p>

</div>

</div>

</div>


{/* Related Tools */}

<div className="bg-white border rounded-2xl p-6 shadow-sm">

<h2 className="text-2xl font-semibold mb-4">
Related Developer Tools
</h2>

<div className="grid md:grid-cols-3 gap-4">

<Link
to="/json-formatter"
className="p-4 border rounded-xl hover:bg-slate-50 transition"
>

<h3 className="font-medium mb-1">
JSON Formatter
</h3>

<p className="text-sm text-gray-500">
Format and beautify JSON instantly.
</p>

</Link>

<Link
to="/json-minifier"
className="p-4 border rounded-xl hover:bg-slate-50 transition"
>

<h3 className="font-medium mb-1">
JSON Minifier
</h3>

<p className="text-sm text-gray-500">
Remove spaces and compress JSON.
</p>

</Link>

<Link
to="/json-to-csv"
className="p-4 border rounded-xl hover:bg-slate-50 transition"
>

<h3 className="font-medium mb-1">
JSON to CSV Converter
</h3>

<p className="text-sm text-gray-500">
Convert JSON data into CSV format.
</p>

</Link>

</div>

</div>

</section>
<AdSense slot="1234567890" />

</div>
  );
};