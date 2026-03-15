import React, { useState, useEffect, useRef } from "react";
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
import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { useRealTimeConversion } from "@/src/hooks/useRealTimeConversion";

export const JsonToTypescriptGenerator: React.FC = () => {

  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [error, setError] = useState("");

  const { copied, copyToClipboard, downloadFile, readFile } = useToolActions();

  const outputRef = useRef<HTMLTextAreaElement | null>(null);

  /* Auto resize output textarea */
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.style.height = "auto";
      outputRef.current.style.height = outputRef.current.scrollHeight + "px";
    }
  }, [tsOutput]);

  /* JSON → TypeScript conversion */
  const generateTypes = async () => {

    if (!jsonInput.trim()) {
      setTsOutput("");
      setError("");
      return;
    }

    try {

      const jsonInputData = jsonInputForTargetLanguage("typescript");

      await jsonInputData.addSource({
        name: "Root",
        samples: [jsonInput]
      });

      const inputData = new InputData();
      inputData.addInput(jsonInputData);

      const result = await quicktype({
        inputData,
        lang: "typescript",
        rendererOptions: {
          "just-types": "true"
        }
      });

      setTsOutput(result.lines.join("\n"));
      setError("");

    } catch (err: any) {

      setError("Invalid JSON format ❌");
      setTsOutput("");

    }

  };

  /* Real-time conversion */
  useRealTimeConversion(jsonInput, generateTypes);

  const loadSample = () => {

    setJsonInput(`{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "editor"]
}`);

  };

  return (

<div className="max-w-5xl mx-auto p-6 space-y-6">

<SEO
title="JSON to TypeScript Generator – Free Developer Tool"
description="Convert JSON to TypeScript interfaces instantly."
keywords="json to typescript, json to ts interface"
/>

{/* Breadcrumb */}

<div className="flex items-center gap-2 text-sm text-gray-500">

<Link
to="/"
className="flex items-center gap-1 hover:text-indigo-600"
>
<Home size={16}/>
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
onChange={(e)=>setJsonInput(e.target.value)}
placeholder="Paste JSON here..."
className="w-full h-44 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
/>

{/* Toolbar */}

<div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 border rounded-lg">

<button
onClick={generateTypes}
className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
>
<Wand2 size={16}/>
Generate
</button>

<button
onClick={loadSample}
className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-indigo-600"
>
<FileText size={16}/>
Sample
</button>

<label className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-indigo-600">

<Upload size={16}/>
Upload

<input
type="file"
accept=".json"
hidden
onChange={(e)=>{
const file=e.target.files?.[0];
if(file) readFile(file).then(setJsonInput);
}}
/>

</label>

<button
onClick={()=>{setJsonInput("");setTsOutput("");setError("");}}
className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-red-500"
>
<Trash2 size={16}/>
Clear
</button>

<button
onClick={()=>copyToClipboard(tsOutput)}
className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-green-600"
>
<Copy size={16}/>
{copied ? "Copied!" : "Copy"}
</button>

<button
onClick={()=>downloadFile(tsOutput,"types.ts","text/plain")}
className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white border hover:text-blue-600"
>
<Download size={16}/>
Download
</button>

</div>

{/* Ad */}

<AdSense slot="1234567890"/>

{/* Error */}

{error && (

<div className="text-red-500 font-medium">
{error}
</div>

)}

{/* Output */}

<textarea
ref={outputRef}
value={tsOutput}
readOnly
placeholder="Generated TypeScript will appear here..."
className="w-full border rounded-lg p-4 font-mono text-sm bg-gray-50"
/>

</div>

  );

};