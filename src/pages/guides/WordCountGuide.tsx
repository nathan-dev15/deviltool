import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const WordCountGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Word Count for SEO and Writing: What the Numbers Mean"
      description="Word count, character limits, reading time — these numbers matter for SEO, social media, and academic writing. Learn what each metric means and how to use it."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Word Count & Writing Metrics' }]}
      accentColor="secondary"
    >
      <SEO
        title="Word Count for SEO and Writing: What the Numbers Mean | KooBrain"
        description="Understand word count, character limits, reading time, and keyword density. Learn optimal lengths for blog posts, social media, essays, and SEO content."
        keywords="word count seo, ideal blog post length, character limit social media, reading time calculator, keyword density, content length guide"
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
                <li>• How word count affects SEO rankings</li>
                <li>• Character limits for Twitter, LinkedIn, meta descriptions</li>
                <li>• How reading time is calculated</li>
                <li>• Optimal word counts for different content types</li>
                <li>• When more words help — and when they hurt</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Word Count Affects SEO</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Word count is not a direct Google ranking signal — Google has stated this explicitly. However, longer content tends to rank better for one indirect reason: a comprehensive piece on a topic naturally covers more related terms, answers more questions, and earns more backlinks than a thin page. This breadth of coverage, not the word count itself, contributes to ranking.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            The practical takeaway: aim for the length that thoroughly covers the topic for the reader. A 300-word page that fully answers a simple question can outrank a 2,000-word page that pads with filler. A 3,000-word guide on a complex topic can dominate the top 10 for years because it becomes the definitive resource.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Optimal Content Lengths by Type</h2>
          <div className="space-y-3">
            {[
              { type: 'Blog post (general)', range: '1,000–1,500 words', note: 'Covers a topic with enough depth to be useful. Below 600 words is often considered thin content.' },
              { type: 'Pillar/guide page (SEO)', range: '2,000–4,000 words', note: 'Comprehensive guides that target competitive keywords and become the definitive resource on a topic.' },
              { type: 'Product description', range: '150–300 words', note: 'Enough to inform the buyer decision. Duplicate product copy across pages hurts rankings.' },
              { type: 'News article', range: '400–800 words', note: 'Covers the essential facts. Breaking news can be shorter; analysis pieces run longer.' },
              { type: 'Academic essay', range: 'As specified', note: 'Always meet the stated requirement. Under-length essays are penalized; over-length should be used for substance, not padding.' },
              { type: 'Email newsletter', range: '200–500 words', note: 'Long enough to deliver value; short enough to respect inbox time.' },
            ].map(c => (
              <div key={c.type} className="flex items-start gap-4 p-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-bold text-on-surface text-sm">{c.type}</p>
                    <code className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">{c.range}</code>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Character Limits for Social Media and SEO</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="text-left py-2 pr-4 font-bold text-on-surface">Platform / Field</th>
                  <th className="text-left py-2 font-bold text-on-surface">Character limit</th>
                </tr>
              </thead>
              <tbody className="text-on-surface-variant">
                {[
                  ['Twitter / X post', '280 characters'],
                  ['LinkedIn post', '3,000 characters (article: 100,000)'],
                  ['Instagram caption', '2,200 characters (first ~125 visible)'],
                  ['Facebook post', '63,206 characters'],
                  ['Meta title (SEO)', '50–60 characters (Google truncates at ~600px)'],
                  ['Meta description (SEO)', '150–160 characters (truncated after ~920px)'],
                  ['YouTube title', '100 characters (60 recommended)'],
                  ['YouTube description', '5,000 characters (first 3 lines visible)'],
                  ['Google Business name', '75 characters'],
                  ['Email subject line', '40–60 characters (mobile clips at ~30)'],
                ].map(([field, limit]) => (
                  <tr key={field} className="border-b border-outline-variant/10">
                    <td className="py-2 pr-4">{field}</td>
                    <td className="py-2 font-mono text-xs">{limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">How Reading Time is Calculated</h2>
          <p className="text-on-surface-variant leading-relaxed">
            Reading time is estimated based on the average adult reading speed. The most commonly used benchmark is <strong className="text-on-surface">200–250 words per minute</strong> for general web content, and <strong className="text-on-surface">180–200 words per minute</strong> for complex technical material. Most word counter tools including KooBrain's use 200 words per minute as the standard:
          </p>
          <div className="bg-surface-container-highest rounded-2xl p-6">
            <p className="font-mono text-on-surface text-center text-sm">Reading time = Word count ÷ 200 (rounded up to nearest minute)</p>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            A 1,000-word article has an estimated reading time of 5 minutes. This metric is used widely on blog posts and articles to set reader expectations — Medium and similar platforms display it prominently because readers use it to decide whether to commit to reading.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Practical Writing Advice Based on Metrics</h2>
          <ul className="space-y-2">
            {[
              'Check word count against your target before submitting any assignment, application, or RFP response',
              'Use character count (with spaces) for tweet drafts — spaces count toward the 280 limit',
              'Keep meta descriptions under 160 characters or Google will rewrite them',
              'Count sentences to check for paragraph length — more than 5 sentences per paragraph often signals content that should be split',
              'Reading time over 7 minutes on a page signals content that needs subheadings, pull quotes, and clear section breaks to aid navigation',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-secondary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Count words, characters, and reading time</h3>
            <p className="text-sm text-on-surface-variant">Paste any text into KooBrain's Word Counter for live word count, character count, sentence count, paragraph count, and estimated reading time.</p>
          </div>
          <Link to="/word-counter" className="inline-flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 font-extrabold text-on-secondary hover:opacity-90 transition-opacity text-sm shrink-0">
            Word Counter <ArrowRight className="size-4" />
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
