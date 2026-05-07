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
  {
    slug: '/guides/url-encoding-explained',
    title: 'URL Encoding Explained: Why % Signs Appear in URLs',
    summary: 'Every %20 and %3A you see in a URL has a reason. Learn what percent-encoding is, which characters must be escaped, and the %20 vs + space debate.',
    readTime: '5 min read',
    tag: 'Encoding',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    slug: '/guides/how-jwt-works',
    title: 'How JWT Tokens Work: A Developer\'s Visual Guide',
    summary: 'JWT tokens are everywhere in modern authentication. Learn the three-part structure, how signatures prevent tampering, and critical security mistakes to avoid.',
    readTime: '6 min read',
    tag: 'Security',
    tagColor: 'text-error bg-error/10',
  },
  {
    slug: '/guides/what-is-uuid',
    title: 'What is a UUID? A Complete Guide to Unique Identifiers',
    summary: 'UUIDs are 128-bit unique identifiers used in databases, APIs, and distributed systems. Learn v4 vs v7, GUID vs UUID, and how to use them in database design.',
    readTime: '5 min read',
    tag: 'Developer',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    slug: '/guides/yaml-vs-json',
    title: 'YAML vs JSON: When to Use Each Format',
    summary: 'YAML and JSON represent the same data structures but serve different purposes. Learn when to choose each, YAML features JSON lacks, and the gotchas to watch for.',
    readTime: '5 min read',
    tag: 'Developer',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    slug: '/guides/sql-formatting-guide',
    title: 'SQL Formatting Best Practices: Write Readable Queries',
    summary: 'Unformatted SQL causes bugs and confusion. Learn keyword casing, indentation conventions, CTEs, and how to write queries your team can actually understand.',
    readTime: '6 min read',
    tag: 'Developer',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    slug: '/guides/html-encoding-xss',
    title: 'HTML Encoding and XSS: Why Escaping Input Saves Your Users',
    summary: 'Failing to escape user input is the root cause of XSS attacks. Learn which five characters must always be escaped and where in your code to apply encoding.',
    readTime: '5 min read',
    tag: 'Security',
    tagColor: 'text-error bg-error/10',
  },
  {
    slug: '/guides/how-emi-works',
    title: 'How EMI Works: Understanding Loan Installments Before You Borrow',
    summary: 'Before you sign a loan agreement, understand the EMI formula, how reducing balance differs from flat rate, and how tenure affects your total interest cost.',
    readTime: '5 min read',
    tag: 'Finance',
    tagColor: 'text-tertiary bg-tertiary/10',
  },
  {
    slug: '/guides/gst-india-explained',
    title: 'GST in India: How It Works and How to Calculate It',
    summary: 'GST replaced 17 taxes with one. Learn the four rate slabs, the difference between CGST/SGST/IGST, how to add and remove GST from a price, and how ITC works.',
    readTime: '6 min read',
    tag: 'Finance',
    tagColor: 'text-tertiary bg-tertiary/10',
  },
  {
    slug: '/guides/word-count-writing-guide',
    title: 'Word Count for SEO and Writing: What the Numbers Mean',
    summary: 'Word count, character limits, and reading time matter for SEO, social media, and academic writing. Learn optimal lengths for every content type.',
    readTime: '4 min read',
    tag: 'Writing',
    tagColor: 'text-secondary bg-secondary/10',
  },
  {
    slug: '/guides/working-with-pdf-files',
    title: 'Working with PDF Files: Merge, Split, Compress, and Edit',
    summary: 'Learn how the PDF format works, how to merge and split pages, reduce file size, add annotations, and convert PDFs to Word — all without expensive software.',
    readTime: '6 min read',
    tag: 'PDF',
    tagColor: 'text-primary bg-primary/10',
  },
  {
    slug: '/guides/typing-json-in-typescript',
    title: 'Typing API Responses in TypeScript: From JSON to Interfaces',
    summary: 'Writing TypeScript types for API responses unlocks compile-time safety across your whole codebase. Learn interfaces, optional fields, null handling, and type guards.',
    readTime: '6 min read',
    tag: 'TypeScript',
    tagColor: 'text-primary bg-primary/10',
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
