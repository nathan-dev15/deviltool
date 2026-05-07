import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const YamlVsJsonGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="YAML vs JSON: When to Use Each Format"
      description="YAML and JSON are the two dominant data formats for configuration and APIs. Learn how they differ, where each shines, and how to convert between them."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'YAML vs JSON' }]}
      accentColor="tertiary"
    >
      <SEO
        title="YAML vs JSON: When to Use Each and How to Convert | KooBrain"
        description="Compare YAML and JSON: syntax differences, use cases, when to choose each format, common gotchas, and how to convert between them with practical examples."
        keywords="yaml vs json, yaml explained, yaml syntax guide, yaml json comparison, when to use yaml, yaml for kubernetes docker"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-tertiary/5 border border-tertiary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-tertiary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• How YAML and JSON syntax differ</li>
                <li>• Why YAML is a superset of JSON</li>
                <li>• When to choose YAML over JSON (and vice versa)</li>
                <li>• YAML features JSON doesn't have: comments, anchors, multiline strings</li>
                <li>• Common YAML mistakes and how to avoid them</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Short Answer</h2>
          <p className="text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface">JSON</strong> is for data exchange between machines — APIs, databases, HTTP request bodies. <strong className="text-on-surface">YAML</strong> is for configuration files that humans read and edit — Kubernetes manifests, Docker Compose files, CI/CD pipelines. YAML is a superset of JSON (all valid JSON is valid YAML), so they represent the same data structures. The difference is entirely in readability and features.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Side-by-Side Syntax Comparison</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The same data represented in both formats:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">JSON</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`{
  "name": "my-app",
  "version": "1.0.0",
  "port": 8080,
  "debug": false,
  "tags": [
    "web",
    "api"
  ],
  "database": {
    "host": "localhost",
    "port": 5432
  }
}`}</pre>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-tertiary mb-3">YAML</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`name: my-app
version: "1.0.0"
port: 8080
debug: false
tags:
  - web
  - api
database:
  host: localhost
  port: 5432`}</pre>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            YAML is notably shorter and requires no curly braces, square brackets, or quotes for simple string values. Indentation defines the structure instead of brackets — which means indentation errors are syntax errors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">YAML Features That JSON Doesn't Have</h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
              <p className="font-black text-on-surface text-sm mb-2">Comments</p>
              <p className="text-xs text-on-surface-variant mb-3">YAML supports inline comments with <code>#</code>. JSON has no comment syntax. This alone makes YAML the preferred format for configuration files that developers need to annotate and explain.</p>
              <pre className="text-xs text-on-surface font-mono bg-surface-container-highest rounded-xl p-3">{`port: 8080  # Must match the firewall rule
debug: false  # Set to true only in development`}</pre>
            </div>
            <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
              <p className="font-black text-on-surface text-sm mb-2">Anchors and Aliases (DRY configuration)</p>
              <p className="text-xs text-on-surface-variant mb-3">YAML anchors (<code>&amp;name</code>) define a block once and aliases (<code>*name</code>) reuse it — like variables in configuration. JSON has no equivalent.</p>
              <pre className="text-xs text-on-surface font-mono bg-surface-container-highest rounded-xl p-3">{`defaults: &defaults
  retries: 3
  timeout: 30s

production:
  <<: *defaults
  host: prod.example.com

staging:
  <<: *defaults
  host: staging.example.com`}</pre>
            </div>
            <div className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
              <p className="font-black text-on-surface text-sm mb-2">Multiline strings</p>
              <p className="text-xs text-on-surface-variant mb-3">YAML supports multiline string literals with <code>|</code> (preserves newlines) and <code>&gt;</code> (folds newlines into spaces). These are ideal for embedding scripts, SQL queries, or certificates in config files.</p>
              <pre className="text-xs text-on-surface font-mono bg-surface-container-highest rounded-xl p-3">{`startup_script: |
  #!/bin/bash
  apt-get update
  apt-get install -y nginx`}</pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">When JSON Wins</h2>
          <ul className="space-y-2">
            {[
              'API request and response bodies — JSON is the universal language of REST APIs',
              'Data stored in databases — JSON columns in PostgreSQL, MongoDB documents',
              'JavaScript application code — JSON.parse/stringify is built into every JS runtime',
              'Automated machine-to-machine data exchange — no human ever reads it',
              'Anywhere strict parsing is required — YAML\'s flexibility can cause unexpected type coercions',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">When YAML Wins</h2>
          <ul className="space-y-2">
            {[
              'Kubernetes manifests and Helm charts — YAML is the native format',
              'Docker Compose files (docker-compose.yml)',
              'GitHub Actions workflows (.github/workflows/*.yml)',
              'GitLab CI/CD pipelines (.gitlab-ci.yml)',
              'Ansible playbooks and infrastructure-as-code tools',
              'Application configuration files that developers edit by hand',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-tertiary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Common YAML Gotchas</h2>
          <div className="space-y-3">
            {[
              { title: 'The Norway problem', desc: 'YAML 1.1 parses "NO", "OFF", "FALSE", and "N" as boolean false. So a country code like NO or a key with value "off" becomes false without quotes. Always quote ambiguous values: \'NO\' or "NO".' },
              { title: 'Indentation must be consistent', desc: 'Tabs are not allowed as indentation in YAML — only spaces. Mixing tabs and spaces causes parse errors. Configure your editor to expand tabs to spaces in YAML files.' },
              { title: 'Numbers with leading zeros become octal', desc: 'In YAML 1.1, 0777 is parsed as the octal number 511, not the string "0777". This trips up permission values. Quote anything that starts with 0 unless you intend it as an octal literal.' },
              { title: 'Duplicate keys silently override', desc: 'Most YAML parsers accept duplicate keys and use the last value, silently discarding the earlier ones. JSON is also ambiguous here, but YAML files tend to be larger and harder to scan for duplicates.' },
            ].map(g => (
              <div key={g.title} className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <p className="font-bold text-on-surface text-sm mb-1">{g.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-tertiary/20 bg-gradient-to-br from-tertiary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Convert between JSON and YAML</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's converter to transform any JSON into clean YAML output instantly — ready for Kubernetes, Docker Compose, or any config tool.</p>
          </div>
          <Link to="/json-to-yaml" className="inline-flex items-center gap-2 rounded-2xl bg-tertiary px-5 py-3 font-extrabold text-on-tertiary hover:opacity-90 transition-opacity text-sm shrink-0">
            JSON to YAML <ArrowRight className="size-4" />
          </Link>
        </section>

        <div className="pt-2">
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-black text-on-surface-variant hover:text-primary transition-colors">
            ← Back to all guides
          </Link>
        </div>

      </article>
    </ToolPageWrapper>
  );
};
