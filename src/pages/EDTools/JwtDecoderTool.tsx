import React, { useState, useEffect } from "react";
import {
  Copy,
  Trash2,
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { useToolActions } from "@/src/pages/useToolActions";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";

/* ---------- Helper ---------- */

const decodeBase64 = (str: string) => {
  try {
    return JSON.stringify(
      JSON.parse(atob(str.replace(/-/g, "+").replace(/_/g, "/"))),
      null,
      2
    );
  } catch {
    return "Invalid JSON / Base64";
  }
};

/* ---------- Editor Box ---------- */

const Box = ({
  title,
  value,
  accentColor
}: {
  title: string;
  value: string;
  accentColor: string;
}) => {

  const { copied, copyToClipboard } = useToolActions();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md h-full">

      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-t-2xl">
        <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <div className={`size-2 rounded-full ${accentColor}`} />
          {title}
        </span>

        <button
          onClick={() => copyToClipboard(value)}
          disabled={!value || value.includes("Invalid")}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-slate-500 px-2 py-1 rounded-md hover:bg-primary/5"
        >
          <Copy size={14}/>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="p-5 text-sm overflow-auto font-mono whitespace-pre-wrap leading-6 text-slate-800 dark:text-slate-200 bg-transparent min-h-[150px]">
        {value || <span className="text-slate-400 italic">No data</span>}
      </pre>

    </div>
  );
};

/* ---------- Main Tool ---------- */

export const JwtDecoderTool = () => {

  const [token, setToken] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  /* Auto Decode */

  useEffect(() => {

    if (!token) {
      setHeader("");
      setPayload("");
      setSignature("");
      setError("");
      return;
    }

    try {

      const parts = token.trim().split(".");

      if (parts.length !== 3) {
        throw new Error("Invalid JWT format (expected 3 parts)");
      }

      setHeader(decodeBase64(parts[0]));
      setPayload(decodeBase64(parts[1]));
      setSignature(parts[2]);
      setError("");

    } catch (err: any) {
      setError(err.message || "Invalid JWT Token");
    }

  }, [token]);

  /* Clear */

  const clearAll = () => {
    setToken("");
    setHeader("");
    setPayload("");
    setSignature("");
    setError("");
  };

  return (

    <ToolPageWrapper
      title="JWT Decoder"
      description="Decode JSON Web Tokens (JWT) and inspect header, payload, and signature instantly. Entirely client-side."
      breadcrumbs={[
        { label: "Encoder/Decoder", href: "#" },
        { label: "JWT Decoder" }
      ]}
      accentColor="primary"
    >
      <SEO
        title="JWT Decoder Tool – Decode JSON Web Tokens Online"
        description="Decode JWT tokens instantly. View header, payload, and signature in readable JSON format."
        keywords="jwt decoder, decode jwt token, json web token tool, jwt payload viewer"
      />

      <div className="space-y-8 animate-fade-in">

        {/* INPUT */}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col transition-all hover:shadow-md hover:border-primary/20 group overflow-hidden">
          
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
            <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <div className="size-2 rounded-full bg-primary" />
              Encoded JWT Token
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-semibold text-error hover:opacity-80 transition-opacity px-2 py-1 rounded-md hover:bg-error/5"
            >
              <Trash2 size={14}/>
              Clear All
            </button>
          </div>

          <div className="bg-slate-950 p-4">
             <textarea
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your base64 encoded JWT token here..."
                spellCheck={false}
                className="w-full h-32 p-4 rounded-xl outline-none font-mono text-sm bg-slate-900 text-primary-container placeholder:text-slate-600 dark:text-slate-400 resize-none border border-white/5"
              />
          </div>

        </div>

        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-4 rounded-xl text-center font-bold animate-pop-in">
            {error}
          </div>
        )}

        {/* OUTPUT GRID */}

        <div className="grid lg:grid-cols-3 gap-6">

          <Box
            title="Header"
            value={header}
            accentColor="bg-blue-500"
          />

          <Box
            title="Payload"
            value={payload}
            accentColor="bg-success"
          />

          <Box
            title="Signature"
            value={signature}
            accentColor="bg-warning"
          />

        </div>

        <div className="mt-12 space-y-8">
           <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
             <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">What is a JWT Token?</h2>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
               A JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information between parties. It consists of three parts separated by dots (`.`):
             </p>
             <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
               <li><span className="font-bold text-slate-700 dark:text-slate-300">Header:</span> Typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used.</li>
               <li><span className="font-bold text-slate-700 dark:text-slate-300">Payload:</span> Contains the claims. Claims are statements about an entity (typically, the user) and additional data.</li>
               <li><span className="font-bold text-slate-700 dark:text-slate-300">Signature:</span> Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.</li>
             </ul>
           </section>
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
           <AdSense slot="1234567890"/>
        </div>

      </div>
    </ToolPageWrapper>

  );
};