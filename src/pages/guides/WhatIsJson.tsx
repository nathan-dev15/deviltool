import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, Code2, Layers, AlertCircle } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const WhatIsJson: React.FC = () => {
  return (
    <ToolPageWrapper
      title="What is JSON? A Complete Beginner's Guide"
      description="JSON is the universal language of APIs and web data. Learn what it is, how it works, and why every developer needs to understand it."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'What is JSON?' }]}
      accentColor="primary"
    >
      <SEO
        title="What is JSON? A Complete Beginner's Guide | KooBrain"
        description="Learn what JSON is, how it works, and why developers use it everywhere. Covers syntax, data types, real-world examples, and common mistakes."
        keywords="what is json, json tutorial, json syntax, json data types, json guide for beginners, json examples"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        {/* Intro callout */}
        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• What JSON is and where it came from</li>
                <li>• The six data types JSON supports</li>
                <li>• How to read and write valid JSON</li>
                <li>• Real-world use cases in APIs and config files</li>
                <li>• Common mistakes and how to fix them</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is JSON?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            JSON stands for <strong className="text-on-surface">JavaScript Object Notation</strong>. Despite the name, it has nothing to do with JavaScript — it is a plain-text format for representing structured data that any programming language can read and write.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            JSON was invented by Douglas Crockford in the early 2000s as a lighter alternative to XML. Today it is the default data format for virtually every web API, mobile app, and configuration file on the internet. If you have ever used a weather app, logged into a website, or saved settings in a modern application, JSON was almost certainly involved.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            The key reason JSON became universal is its simplicity. A human can read it at a glance, a machine can parse it in microseconds, and it maps directly to the data structures (objects and arrays) that exist in almost every programming language.
          </p>
        </section>

        {/* Section 2 — Syntax */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">JSON Syntax at a Glance</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A JSON document is built from two structural elements: <strong className="text-on-surface">objects</strong> (key-value pairs wrapped in curly braces) and <strong className="text-on-surface">arrays</strong> (ordered lists wrapped in square brackets). Here is a complete example:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`{
  "name": "Alice",
  "age": 30,
  "isVerified": true,
  "scores": [98, 87, 95],
  "address": {
    "city": "London",
    "postcode": "EC1A 1BB"
  },
  "nickname": null
}`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Every key must be a string wrapped in double quotes. Values can be any of six types (covered below). Commas separate items within an object or array, but there must be <em>no trailing comma</em> after the last item — this is the single most common source of JSON errors.
          </p>
        </section>

        {/* Section 3 — Data types */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">The Six JSON Data Types</h2>
          <p className="text-on-surface-variant leading-relaxed">
            JSON supports exactly six data types. Understanding them is fundamental to reading and writing valid JSON.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { type: 'String', example: '"Hello, World!"', desc: 'Text wrapped in double quotes. Single quotes are not valid JSON.' },
              { type: 'Number', example: '42 or 3.14', desc: 'Integer or floating-point. No distinction between them in JSON.' },
              { type: 'Boolean', example: 'true or false', desc: 'Lowercase only. TRUE and True are syntax errors.' },
              { type: 'Null', example: 'null', desc: 'Represents an empty or absent value. Lowercase only.' },
              { type: 'Object', example: '{ "key": "value" }', desc: 'An unordered collection of key-value pairs.' },
              { type: 'Array', example: '[1, 2, 3]', desc: 'An ordered list of values of any type.' },
            ].map((item) => (
              <div key={item.type} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span className="font-black text-on-surface text-sm">{item.type}</span>
                  <code className="ml-auto text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.example}</code>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — Real-world uses */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Where JSON is Used in the Real World</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="size-4 text-primary" />
              </div>
              <div>
                <h3 className="font-black text-on-surface mb-1">REST APIs</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  When a mobile app fetches your social media feed, your bank balance, or today's weather, the server responds with JSON. Every major API — Google Maps, Stripe, Twilio, GitHub — speaks JSON.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-8 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Code2 className="size-4 text-secondary" />
              </div>
              <div>
                <h3 className="font-black text-on-surface mb-1">Configuration Files</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Tools like VS Code (<code className="bg-surface-container-highest px-1 rounded">settings.json</code>), npm (<code className="bg-surface-container-highest px-1 rounded">package.json</code>), and ESLint store all their configuration in JSON. The format's readability makes it ideal for settings that developers need to edit by hand.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-8 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="size-4 text-tertiary" />
              </div>
              <div>
                <h3 className="font-black text-on-surface mb-1">Databases</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  NoSQL databases like MongoDB and Firebase store documents directly in a JSON-like format. Even PostgreSQL supports a native JSON column type, letting you store flexible semi-structured data alongside traditional relational data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Common mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Common JSON Mistakes</h2>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-on-surface">Trailing commas</p>
                <p className="text-xs text-on-surface-variant mt-0.5"><code>{`{ "name": "Alice", }`}</code> — the comma after <code>"Alice"</code> is invalid JSON.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-on-surface">Single-quoted strings</p>
                <p className="text-xs text-on-surface-variant mt-0.5"><code>{`{ 'name': 'Alice' }`}</code> — JSON requires double quotes everywhere.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-on-surface">Comments</p>
                <p className="text-xs text-on-surface-variant mt-0.5">JSON does not support <code>// comments</code> or <code>/* block comments */</code>. Use a tool like JSON5 or JSONC if you need comments.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-on-surface">Undefined values</p>
                <p className="text-xs text-on-surface-variant mt-0.5"><code>undefined</code> is a JavaScript concept — it does not exist in JSON. Use <code>null</code> instead.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — JSON vs XML */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">JSON vs. XML: Why JSON Won</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Before JSON, XML was the dominant data exchange format. Compare the two representations of the same data:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-error mb-3">XML (verbose)</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`<person>
  <name>Alice</name>
  <age>30</age>
</person>`}</pre>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">JSON (concise)</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`{
  "name": "Alice",
  "age": 30
}`}</pre>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            JSON is typically 30–40% smaller than equivalent XML. It also maps directly to native objects in JavaScript, Python, Ruby, and most other languages, eliminating the need for a separate XML parser library in many cases.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Ready to work with JSON?</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's JSON tools to format, validate, minify, and convert JSON instantly — no sign-up required.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/json-formatter" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors text-sm">
              JSON Formatter <ArrowRight className="size-4" />
            </Link>
            <Link to="/json-validator" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container px-5 py-3 font-extrabold text-on-surface hover:border-primary/30 transition-colors text-sm">
              JSON Validator
            </Link>
          </div>
        </section>

        {/* Back to guides */}
        <div className="pt-2">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-black text-on-surface-variant hover:text-primary transition-colors">
            ← Back to all guides
          </Link>
        </div>

      </article>
    </ToolPageWrapper>
  );
};
