import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const UrlEncodingGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="URL Encoding Explained: Why % Signs Appear in URLs"
      description="Every %20, %3A, and %2F you see in a URL has a reason. Learn what URL encoding is, how percent-encoding works, and when you need it."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'URL Encoding' }]}
      accentColor="secondary"
    >
      <SEO
        title="URL Encoding Explained: Percent-Encoding Guide | KooBrain"
        description="Learn what URL encoding is, how percent-encoding works, which characters must be encoded, and when to encode or decode URLs. Practical guide with examples."
        keywords="url encoding, percent encoding, url encode decode, %20 meaning, url safe characters, query string encoding"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-secondary/5 border border-secondary/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-secondary" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• Why URLs can only contain certain characters</li>
                <li>• How percent-encoding converts unsafe characters</li>
                <li>• Which characters are safe, reserved, and unsafe</li>
                <li>• The difference between %20 and + for spaces</li>
                <li>• When to encode and when not to</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is URL Encoding?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            A URL (Uniform Resource Locator) can only contain a specific set of characters defined by the internet standard RFC 3986. Many characters that appear in everyday text — spaces, &amp; symbols, equals signs, hash marks, non-Latin letters — are either reserved for special purposes in URL syntax or simply not permitted. URL encoding, also called <strong className="text-on-surface">percent-encoding</strong>, converts these characters into a safe format by replacing them with a <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%</code> sign followed by two hexadecimal digits representing the character's ASCII or UTF-8 byte value.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            For example, a space (ASCII 32, or 0x20 in hex) becomes <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%20</code>. The ampersand character &amp; (ASCII 38, or 0x26) becomes <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%26</code>. This encoding allows you to pass any text through a URL without breaking its syntax.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Safe, Reserved, and Unsafe Characters</h2>
          <p className="text-on-surface-variant leading-relaxed">
            RFC 3986 divides URL characters into three groups:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Safe (unreserved)', chars: 'A–Z a–z 0–9 - _ . ~', desc: 'Never need encoding. They carry no special meaning in URL syntax.', color: 'text-secondary bg-secondary/10 border-secondary/20' },
              { label: 'Reserved', chars: ': / ? # [ ] @ ! $ & \' ( ) * + , ; =', desc: 'Have specific roles in URL structure. Must be encoded when used as data, not as syntax.', color: 'text-primary bg-primary/10 border-primary/20' },
              { label: 'Unsafe', chars: 'Space < > { } | \\ ^ ` and non-ASCII', desc: 'Must always be encoded. Not allowed raw in any URL component.', color: 'text-error bg-error/10 border-error/20' },
            ].map(g => (
              <div key={g.label} className={`rounded-2xl border p-4 ${g.color}`}>
                <p className="font-black text-sm mb-1">{g.label}</p>
                <p className="font-mono text-xs mb-2 opacity-80">{g.chars}</p>
                <p className="text-xs leading-relaxed opacity-70">{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Percent-Encoding Works</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Percent-encoding takes the UTF-8 byte representation of a character and writes each byte as <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%XX</code> where XX is the hexadecimal value. For ASCII characters, this is straightforward: space is byte 0x20, so it encodes as <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%20</code>. For non-ASCII characters like accented letters or emoji, which require multiple bytes in UTF-8, each byte gets its own percent-encoded sequence:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`# The € (euro sign) is 3 bytes in UTF-8: E2 82 AC
€  →  %E2%82%AC

# The word "café" encoded:
café  →  caf%C3%A9

# A full query string with special characters:
name=John Smith&city=São Paulo
→  name=John%20Smith&city=S%C3%A3o%20Paulo`}</pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">%20 vs + for Spaces</h2>
          <p className="text-on-surface-variant leading-relaxed">
            There are two conventions for encoding spaces in URLs, and they apply in different contexts:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <CheckCircle2 className="size-5 text-secondary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-on-surface text-sm"><code>%20</code> — standard percent-encoding</p>
                <p className="text-sm text-on-surface-variant mt-1">Used in URL paths and anywhere in a URL according to RFC 3986. This is the universal correct encoding for spaces in any URL component.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
              <CheckCircle2 className="size-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-on-surface text-sm"><code>+</code> — application/x-www-form-urlencoded</p>
                <p className="text-sm text-on-surface-variant mt-1">Used only in HTML form submissions and query strings produced by HTML forms. A <code>+</code> in a query string is decoded as a space by web servers. This is a legacy convention from HTML forms, not standard URL encoding.</p>
              </div>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            When in doubt, use <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">%20</code>. It is unambiguous in all contexts. The <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">+</code> convention only works reliably when the server explicitly expects form-encoded input.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Common Encoding Mistakes</h2>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 space-y-3">
            {[
              { title: 'Double-encoding', desc: 'Encoding an already-encoded URL encodes the % sign itself, turning %20 into %2520. Always check whether your string is already encoded before encoding it again.' },
              { title: 'Not encoding query parameter values', desc: 'If a query parameter value contains &, =, or #, it must be encoded. Otherwise the server misparses the query string. For example, passing a URL as a query value must have its : and / encoded.' },
              { title: 'Encoding the entire URL instead of just values', desc: 'The structural characters of a URL (://?#) should not be encoded. Only encode the data values — paths, query parameter keys and values, and fragment identifiers.' },
              { title: 'Forgetting non-ASCII input', desc: 'User-supplied names, addresses, and text in non-Latin scripts must be UTF-8 encoded before percent-encoding. Modern browsers handle this for address bar input, but API clients must do it explicitly.' },
            ].map(m => (
              <div key={m.title} className="flex items-start gap-3">
                <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-on-surface">{m.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">When Do You Need URL Encoding?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            You need URL encoding whenever you are programmatically constructing URLs with dynamic data. This includes:
          </p>
          <ul className="space-y-2">
            {[
              'Building search query URLs where the search term contains spaces or special characters',
              'Passing user-supplied values as query parameters in REST API calls',
              'Constructing redirect URLs where the destination URL is itself a parameter value',
              'Encoding file paths and names that contain spaces or non-ASCII characters',
              'Setting OAuth redirect URIs and callback URLs',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <span className="text-secondary font-bold mt-0.5">→</span> {item}
              </li>
            ))}
          </ul>
          <p className="text-on-surface-variant leading-relaxed">
            Most modern programming languages and HTTP libraries handle URL encoding automatically when you use their URL-building APIs. Problems arise when you concatenate strings manually to build URLs — in that case, always encode each component individually before combining them.
          </p>
        </section>

        <section className="rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Need to encode or decode a URL right now?</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's URL tools to percent-encode any text string or decode any URL-encoded value instantly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/url-encode" className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 font-extrabold text-on-secondary hover:opacity-90 transition-opacity text-sm">
              URL Encode <ArrowRight className="size-4" />
            </Link>
            <Link to="/url-decode" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/30 bg-surface-container px-5 py-3 font-extrabold text-on-surface hover:border-secondary/30 transition-colors text-sm">
              URL Decode
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
