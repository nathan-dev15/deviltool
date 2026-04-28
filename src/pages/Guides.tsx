import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';

export const GUIDE_LIST = [
  {
    slug: '/guides/what-is-json',
    title: "What is JSON? A Complete Beginner's Guide",
    summary: 'JSON is the universal language of APIs and web data. Learn what it is, how it works, and why every developer needs to understand it.',
    readTime: '6 min read',
    tag: 'JSON',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    slug: '/guides/base64-encoding-explained',
    title: 'Base64 Encoding Explained: What It Is and When to Use It',
    summary: "Base64 turns binary data into safe text. Understand how it works, where it is used, and when you should (and shouldn't) use it.",
    readTime: '5 min read',
    tag: 'Encoding',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    slug: '/guides/image-compression-guide',
    title: 'Image Compression for the Web: The Complete Guide',
    summary: 'Large images are the single biggest cause of slow websites. Learn how compression works, which formats to use, and how to cut image size without losing quality.',
    readTime: '7 min read',
    tag: 'Images',
    tagColor: 'text-tertiary bg-tertiary/10',
  },
  {
    slug: '/guides/strong-password-guide',
    title: 'How to Create Strong Passwords (And Actually Remember Them)',
    summary: 'Weak passwords are the leading cause of account breaches. Learn what makes a password strong, how generators work, and the right way to manage credentials.',
    readTime: '5 min read',
    tag: 'Security',
    tagColor: 'text-error bg-error/10',
  },
];

export const Guides: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Developer Guides"
      description="Clear, practical guides on the tools and concepts developers use every day."
      breadcrumbs={[{ label: 'Resources', href: '#' }, { label: 'Guides' }]}
      accentColor="secondary"
    >
      <SEO
        title="Developer Guides — JSON, Base64, Images & Security | KooBrain"
        description="Free practical guides for developers: JSON explained, Base64 encoding, image compression, and password security. Written clearly for all skill levels."
        keywords="json guide, base64 explained, image compression guide, strong password guide, developer tutorials"
      />

      <div className="space-y-12 mt-8">
        {/* Intro */}
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
              <BookOpen className="size-6 text-secondary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black text-on-surface">Practical knowledge, not just tools</h2>
              <p className="text-on-surface-variant leading-relaxed max-w-2xl">
                Tools solve immediate problems. Guides explain the <em>why</em> behind them. Understanding concepts
                like JSON structure, encoding schemes, or password entropy makes you faster and more confident when
                working with any tool — including the ones built right here on KooBrain.
              </p>
            </div>
          </div>
        </section>

        {/* Guide cards */}
        <section className="space-y-5">
          <h2 className="text-lg font-black uppercase tracking-widest text-on-surface-variant/50 px-1">
            All Guides ({GUIDE_LIST.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {GUIDE_LIST.map((guide) => (
              <Link
                key={guide.slug}
                to={guide.slug}
                className="group flex flex-col p-8 rounded-3xl border border-outline-variant/20 bg-surface-container hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-current/20 ${guide.tagColor}`}>
                    {guide.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-on-surface-variant/40 font-medium">
                    <Clock className="size-3.5" /> {guide.readTime}
                  </span>
                </div>
                <h3 className="text-base font-black text-on-surface leading-snug mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed flex-1">
                  {guide.summary}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Guide <ArrowRight className="size-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA to tools */}
        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Tag className="size-7 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">Ready to use the tools?</h3>
            <p className="text-sm text-on-surface-variant">
              Every guide links directly to the relevant KooBrain tool so you can apply what you learn immediately.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors shrink-0"
          >
            Browse all tools <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </ToolPageWrapper>
  );
};
