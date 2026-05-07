import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const JsonToTypescriptGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Typing API Responses in TypeScript: From JSON to Interfaces"
      description="Writing TypeScript interfaces for every API response by hand is tedious and error-prone. Learn the right approach to type JSON data in TypeScript applications."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Typing JSON in TypeScript' }]}
      accentColor="primary"
    >
      <SEO
        title="Typing API Responses in TypeScript: From JSON to Interfaces | KooBrain"
        description="Learn how to convert JSON API responses to TypeScript interfaces, handle optional fields and nested types, use type guards, and generate types automatically."
        keywords="typescript interface from json, json to typescript, type api response typescript, typescript types guide, generate typescript types"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• Why you should type API responses in TypeScript</li>
                <li>• How to read a JSON response and write an interface</li>
                <li>• Handling optional fields, null, and nested objects</li>
                <li>• The difference between interface and type</li>
                <li>• How to use type guards for runtime safety</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Why Type Your API Responses?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Without typed API responses, every field access in TypeScript is either a guess or requires a cast to <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">any</code>. TypeScript can catch dozens of bugs at compile time — accessing a property that doesn't exist, passing the wrong shape to a function, forgetting to handle a null value — but only if it knows the structure of your data. Typed API responses are the most impactful place to invest in TypeScript because they propagate type safety through every function that touches the data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">From JSON Response to TypeScript Interface</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Start with a real API response and map each field to a TypeScript type:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3">JSON Response</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`{
  "id": 42,
  "username": "alice",
  "email": "alice@example.com",
  "avatar_url": null,
  "is_verified": true,
  "score": 98.5,
  "tags": ["admin", "beta"],
  "address": {
    "city": "London",
    "country": "GB"
  }
}`}</pre>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">TypeScript Interface</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed">{`interface Address {
  city: string;
  country: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  avatar_url: string | null;
  is_verified: boolean;
  score: number;
  tags: string[];
  address: Address;
}`}</pre>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            A few rules to follow: use <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">number</code> for all numeric fields (integers and floats are both <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">number</code> in TypeScript), use <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">T | null</code> for fields that can be null in the API, and create nested interfaces for nested objects rather than inlining the type.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Optional Fields: ? vs | undefined vs | null</h2>
          <p className="text-on-surface-variant leading-relaxed">
            This is one of the most common sources of TypeScript confusion when working with APIs:
          </p>
          <div className="space-y-3">
            {[
              { syntax: 'field?: string', meaning: 'Optional property — the field may be absent from the object entirely. Accessing it gives string | undefined.' },
              { syntax: 'field: string | undefined', meaning: 'The field is always present in the object but may have the value undefined. Rarely needed for JSON APIs since undefined is not a valid JSON value.' },
              { syntax: 'field: string | null', meaning: 'The field is always present but the API may return null for it. Use this when the JSON explicitly contains "field": null.' },
              { syntax: 'field?: string | null', meaning: 'The field may be absent OR present with a null value. Common for optional API fields that can also be explicitly cleared.' },
            ].map(f => (
              <div key={f.syntax} className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <code className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg font-mono">{f.syntax}</code>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{f.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">interface vs type: When to Use Each</h2>
          <p className="text-on-surface-variant leading-relaxed">
            For typing API responses, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">interface</code> and <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">type</code> are largely interchangeable. The practical rule most TypeScript teams follow:
          </p>
          <ul className="space-y-2">
            {[
              'Use interface for object shapes (API response types, component props, domain models) — they are extendable and declaration-mergeable',
              'Use type for unions (string | null), intersections, utility types, and aliases for primitives',
              'Either works for simple object types — consistency within a codebase matters more than the choice itself',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Type Guards for Runtime Safety</h2>
          <p className="text-on-surface-variant leading-relaxed">
            TypeScript types only exist at compile time. At runtime, a fetch call returns <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">unknown</code> — you have no runtime guarantee the API response matches your interface. For critical code paths, use a type guard:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'username' in data
  );
}

const response = await fetch('/api/user');
const data: unknown = await response.json();

if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.username);
}`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            For more thorough runtime validation, libraries like <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">zod</code> or <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">valibot</code> parse and validate JSON against a schema at runtime while automatically inferring TypeScript types — the gold standard for production API clients.
          </p>
        </section>

        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Generate TypeScript interfaces from JSON</h3>
            <p className="text-sm text-on-surface-variant">Paste any JSON response into KooBrain's generator to automatically produce accurate TypeScript interfaces with correct types for every field.</p>
          </div>
          <Link to="/json-to-typescript" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:opacity-90 transition-opacity text-sm shrink-0">
            JSON to TypeScript <ArrowRight className="size-4" />
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
