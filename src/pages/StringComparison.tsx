import React from "react";
import { diffWords, diffChars } from "diff";
import { Copy, Trash2, GitCompare, Download, Info, ChevronRight, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";

export const StringComparison: React.FC = () => {

  const [textA, setTextA] = React.useState("");
  const [textB, setTextB] = React.useState("");

  const [resultA, setResultA] = React.useState("");
  const [resultB, setResultB] = React.useState("");

  const [mode, setMode] = React.useState<"word" | "char">("word");

  const [ignoreCase, setIgnoreCase] = React.useState(false);
  const [ignoreSpace, setIgnoreSpace] = React.useState(false);

  const processText = (text: string) => {
    let value = text;

    if (ignoreCase) value = value.toLowerCase();
    if (ignoreSpace) value = value.replace(/\s+/g, "");

    return value;
  };

  const compareStrings = () => {

    const a = processText(textA);
    const b = processText(textB);

    const diff =
      mode === "word"
        ? diffWords(a, b)
        : diffChars(a, b);

    let htmlA = "";
    let htmlB = "";

    diff.forEach(part => {

      const value = part.value
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      if (part.added) {

        htmlB += `<span class="bg-green-500/20 text-green-400">${value}</span>`;

      } else if (part.removed) {

        htmlA += `<span class="bg-red-500/20 text-red-400">${value}</span>`;

      } else {

        htmlA += value;
        htmlB += value;

      }

    });

    setResultA(htmlA);
    setResultB(htmlB);

  };

  const clear = () => {
    setTextA("");
    setTextB("");
    setResultA("");
    setResultB("");
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const download = () => {

    const content =
      `Text A:\n${textA}\n\nText B:\n${textB}`;

    const blob = new Blob([content], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "string-comparison.txt";

    a.click();

    URL.revokeObjectURL(url);

  };

  return (

    <div className="w-full px-4 md:py-10 py-4">

      <SEO
        title="String Comparison Tool – Highlight Text Differences Online"
        description="Advanced string comparison tool for developers. Detect differences between two text blocks with word and character level highlighting."
        keywords="string comparison tool, text diff viewer, developer text compare, word diff tool, character diff tool"
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
          String Comparison
        </span>

      </nav>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl md:text-4xl font-extrabold">
            String Comparison Tool
          </h1>

          <p className="text-slate-600 dark:text-slate-400">
            Compare two text strings and instantly highlight the differences.
          </p>

        </div>

        {/* OPTIONS */}

        <div className="flex flex-wrap gap-4">

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="word">Word Compare</option>
            <option value="char">Character Compare</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={() => setIgnoreCase(!ignoreCase)}
            />
            Ignore Case
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={ignoreSpace}
              onChange={() => setIgnoreSpace(!ignoreSpace)}
            />
            Ignore Spaces
          </label>

        </div>

        {/* INPUT AREA */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-slate-800 border rounded-xl">

            <div className="p-3 border-b text-sm font-bold">
              Text A
            </div>

            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full min-h-[200px] p-4 font-mono text-sm"
              placeholder="Paste first string here..."
            />

          </div>

          <div className="bg-white dark:bg-slate-800 border rounded-xl">

            <div className="p-3 border-b text-sm font-bold">
              Text B
            </div>

            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full min-h-[200px] p-4 font-mono text-sm"
              placeholder="Paste second string here..."
            />

          </div>

        </div>

        {/* BUTTONS */}

       <div className="flex flex-wrap gap-3">

  <button
    onClick={compareStrings}
    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition duration-200 shadow-sm hover:shadow-md"
  >
    <GitCompare size={18} />
    Compare
  </button>

  <button
    onClick={clear}
    className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition duration-200 shadow-sm hover:shadow-md"
  >
    <Trash2 size={18} />
    Clear
  </button>

  <button
    onClick={download}
    className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition duration-200 shadow-sm hover:shadow-md"
  >
    <Download size={18} />
    Download
  </button>

</div>

        {/* RESULT */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="bg-slate-900 text-white rounded-xl">

            <div className="p-3 border-b border-white/10 text-xs uppercase text-slate-400">
              Result A
            </div>

            <div
              className="p-4 font-mono text-sm"
              dangerouslySetInnerHTML={{
                __html: resultA || "Output will appear here"
              }}
            />

          </div>

          <div className="bg-slate-900 text-white rounded-xl">

            <div className="p-3 border-b border-white/10 text-xs uppercase text-slate-400">
              Result B
            </div>

            <div
              className="p-4 font-mono text-sm"
              dangerouslySetInnerHTML={{
                __html: resultB || "Output will appear here"
              }}
            />

          </div>

        </div>

        {/* HOW TO USE */}

        <section className="bg-white dark:bg-slate-800 p-6 rounded-xl border">

          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info size={18} />
            How to Compare Strings
          </h3>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">

            <p>1. Paste the first text in the Text A field.</p>

            <p>2. Paste the second text in the Text B field.</p>

            <p>3. Click Compare to highlight differences.</p>

          </div>

        </section>

      </div>

    </div>

  );

};