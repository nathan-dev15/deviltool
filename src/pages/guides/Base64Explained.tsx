import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2, ShieldAlert, AlertCircle } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const Base64Explained: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Base64 Encoding Explained: What It Is and When to Use It"
      description="Base64 turns binary data into safe text. Understand how it works, where it is used, and when you should (and shouldn't) use it."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Base64 Encoding' }]}
      accentColor="secondary"
    >
      <SEO
        title="Base64 Encoding Explained: What It Is and When to Use It | KooBrain"
        description="A clear guide to Base64 encoding: how the algorithm works, why it exists, real-world use cases in email, images, and APIs, and when NOT to use it."
        keywords="base64 encoding, base64 explained, what is base64, base64 tutorial, base64 use cases, base64 vs encryption"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        {/* Intro callout */}
        <section className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-secondary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• Why Base64 was invented and what problem it solves</li>
                <li>• How the encoding algorithm works step by step</li>
                <li>• Real-world places you encounter Base64 every day</li>
                <li>• The difference between encoding and encryption</li>
                <li>• When Base64 is the right tool — and when it is not</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is Base64?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Base64 is an encoding scheme that converts binary data — bytes that can include any value from 0 to 255 — into a string of 64 printable ASCII characters. The 64 characters are: <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">A–Z</code>, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">a–z</code>, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">0–9</code>, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">+</code>, and <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">/</code>, with <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-xs">=</code> used as padding.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            The core problem it solves: many systems — email protocols, HTML attributes, JSON strings — were designed to handle only text. They can break or corrupt data when they encounter raw binary bytes (null bytes, control characters, bytes above 127). Base64 guarantees the output contains only "safe" characters that survive transport through any text-based system.
          </p>
        </section>

        {/* Section 2 — How it works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Base64 Encoding Works</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The algorithm takes binary data 3 bytes (24 bits) at a time and splits those 24 bits into four 6-bit groups. Each 6-bit group (values 0–63) maps to one character in the 64-character alphabet. The result: every 3 bytes of input become exactly 4 characters of output.
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50 mb-4">Example: encoding "Hi"</p>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex gap-3 items-start">
                <span className="text-secondary font-black min-w-[80px]">Input:</span>
                <span className="text-on-surface">H (72) = 01001000 &nbsp; i (105) = 01101001</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-secondary font-black min-w-[80px]">Bits:</span>
                <span className="text-on-surface">010010 000110 1001xx (padded)</span>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-secondary font-black min-w-[80px]">Output:</span>
                <span className="text-on-surface">S G k = &nbsp;→ "SGk="</span>
              </div>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Because 3 bytes become 4 characters, Base64-encoded data is roughly <strong className="text-on-surface">33% larger</strong> than the original. That overhead is the trade-off for universal text compatibility.
          </p>
        </section>

        {/* Section 3 — Real-world uses */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-on-surface">Where You Encounter Base64 Every Day</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Email attachments (MIME)',
                desc: 'The SMTP protocol was built for 7-bit ASCII text. Email clients use Base64 to encode file attachments so they can travel safely through email servers.',
                color: 'bg-secondary/10 border-secondary/20 text-secondary',
              },
              {
                title: 'Data URIs in HTML/CSS',
                desc: 'Small images can be embedded directly in HTML or CSS as <code>data:image/png;base64,...</code>. This eliminates an extra HTTP request for icons and small assets.',
                color: 'bg-primary/10 border-primary/20 text-primary',
              },
              {
                title: 'JSON Web Tokens (JWT)',
                desc: 'The header and payload of a JWT are Base64URL-encoded (a variant that replaces + and / with - and _ to be URL-safe), making them easy to pass in HTTP headers.',
                color: 'bg-tertiary/10 border-tertiary/20 text-tertiary',
              },
              {
                title: 'HTTP Basic Authentication',
                desc: 'The Authorization header encodes <code>username:password</code> in Base64 before sending. This is transport, not security — always use HTTPS on top.',
                color: 'bg-error/10 border-error/20 text-error',
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-5 ${item.color.split(' ').slice(1).join(' ')} bg-surface-container`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className={`size-4 shrink-0 ${item.color.split(' ')[0]}`} />
                  <span className="font-black text-on-surface text-sm">{item.title}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 — NOT encryption */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Base64 is NOT Encryption</h2>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 flex gap-4">
            <ShieldAlert className="size-6 text-error shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-on-surface font-bold">Critical misconception</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Base64 provides <strong>zero security</strong>. It is trivially reversible — anyone can decode a Base64 string in seconds using any online tool or one line of code. Never use Base64 to "hide" passwords, API keys, or sensitive data.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                If you need to protect data, use proper encryption (AES-256, RSA) or hashing (bcrypt, Argon2 for passwords). Base64 is purely a data-transport encoding.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 — Variants */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Base64 Variants</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Standard Base64 uses <code className="bg-surface-container-highest px-1 rounded text-xs">+</code> and <code className="bg-surface-container-highest px-1 rounded text-xs">/</code>, which are special characters in URLs. Two alternative alphabets exist:
          </p>
          <div className="space-y-3">
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
              <p className="font-black text-on-surface text-sm mb-1">Base64URL</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Replaces <code>+</code> with <code>-</code> and <code>/</code> with <code>_</code>. Used in JWTs, OAuth tokens, and anywhere the encoded string appears in a URL query parameter or path.</p>
            </div>
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
              <p className="font-black text-on-surface text-sm mb-1">Base64 without padding</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">Some systems strip the trailing <code>=</code> padding characters. This is valid as long as both sides agree — the decoder can infer the correct length from the string.</p>
            </div>
          </div>
        </section>

        {/* Section 6 — When to use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">When Should You Use Base64?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Good reasons to use Base64</p>
              <ul className="text-sm text-on-surface-variant space-y-2">
                <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Embedding small images in CSS/HTML</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Encoding binary data for JSON payloads</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Email attachments (MIME encoding)</li>
                <li className="flex gap-2"><CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" /> Storing binary blobs in text databases</li>
              </ul>
            </div>
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-error mb-3">Do NOT use Base64 for</p>
              <ul className="text-sm text-on-surface-variant space-y-2">
                <li className="flex gap-2"><AlertCircle className="size-4 text-error shrink-0 mt-0.5" /> Securing passwords or secrets</li>
                <li className="flex gap-2"><AlertCircle className="size-4 text-error shrink-0 mt-0.5" /> Large files (33% size overhead)</li>
                <li className="flex gap-2"><AlertCircle className="size-4 text-error shrink-0 mt-0.5" /> "Hiding" API keys from end users</li>
                <li className="flex gap-2"><AlertCircle className="size-4 text-error shrink-0 mt-0.5" /> As a substitute for compression</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Try Base64 encoding and decoding</h3>
            <p className="text-sm text-on-surface-variant">Convert text and files to Base64 — or decode Base64 back to its original form — instantly with KooBrain's free tools.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/base64-encode" className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 font-extrabold text-on-secondary hover:bg-secondary-container transition-colors text-sm">
              Base64 Encode <ArrowRight className="size-4" />
            </Link>
            <Link to="/base64-decode" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container px-5 py-3 font-extrabold text-on-surface hover:border-secondary/30 transition-colors text-sm">
              Base64 Decode
            </Link>
          </div>
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
