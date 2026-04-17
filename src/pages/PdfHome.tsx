import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Zap, Clock, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { ToolPageWrapper } from '../components/ToolPageWrapper';
import { SEO } from '../components/SEO';

const PLANNED_TOOLS = [
  { name: "Merge PDF", desc: "Combine multiple PDF files into one document in seconds." },
  { name: "Split PDF", desc: "Extract individual pages or page ranges from any PDF." },
  { name: "Compress PDF", desc: "Reduce PDF file size without losing readability." },
  { name: "Rotate PDF Pages", desc: "Fix page orientation for any page in your document." },
  { name: "PDF to Word", desc: "Convert PDF documents to editable Word files." },
  { name: "PDF to JPG", desc: "Export every page as a high-quality image." },
  { name: "Word to PDF", desc: "Instantly convert .docx files to PDF format." },
  { name: "Add Page Numbers", desc: "Insert customizable page numbers across your PDF." },
  { name: "eSign PDF", desc: "Add a legally-binding digital signature to any document." },
  { name: "PDF Annotator", desc: "Highlight, underline, and comment on PDF pages." },
  { name: "Delete PDF Pages", desc: "Remove specific pages from a PDF without re-printing." },
  { name: "Rearrange Pages", desc: "Drag and reorder pages to the exact sequence you need." },
];

export const PdfHome: React.FC = () => {
  return (
    <ToolPageWrapper
      title="PDF Studio"
      description="A free, browser-based PDF toolkit. Every tool runs locally — your files never leave your device."
      breadcrumbs={[{ label: "Tools", href: "/" }, { label: "PDF Studio" }]}
      accentColor="tertiary"
    >
      <SEO
        title="Free Online PDF Tools — Coming Soon | KooBrain PDF Studio"
        description="KooBrain PDF Studio is coming soon. Merge, split, compress, rotate, convert, sign, and annotate PDFs entirely in your browser. No uploads, no registration."
        keywords="pdf tools online free, merge pdf, split pdf, compress pdf, pdf to word, sign pdf online"
      />

      <div className="space-y-16 animate-fade-in mt-8">

        {/* Coming-soon banner */}
        <div className="relative overflow-hidden rounded-3xl border border-tertiary/30 bg-gradient-to-br from-tertiary/10 via-surface-container to-surface-container-high p-8 sm:p-12 text-center">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-tertiary/15 blur-[60px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-tertiary/30 bg-surface-variant/40 px-4 py-1.5 text-xs font-black tracking-widest uppercase text-tertiary mb-6">
              <Sparkles className="size-4" /> Coming Soon
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-on-surface mb-4">
              PDF Studio is under development
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
              We are building a full-featured, browser-based PDF toolkit. All 12 tools listed below will run entirely in your browser — no file uploads, no accounts, no subscription needed. Check back soon, or use our available tools in the meantime.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors"
            >
              Explore available tools <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Why PDF tools matter — editorial content */}
        <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 sm:p-10 space-y-6">
          <h2 className="text-2xl font-black text-on-surface flex items-center gap-3">
            <FileText className="size-6 text-tertiary" />
            Why you need a reliable PDF toolkit
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            PDF (Portable Document Format) is the global standard for sharing documents that must look exactly the same on every device and operating system. Whether you are sending a contract, submitting a school assignment, sharing a product catalogue, or archiving a report, PDFs preserve your formatting, fonts, and images precisely.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            But working with PDFs can be frustrating. You often need to combine pages from multiple files, extract a single chapter from a long report, shrink a huge file for email, or rotate a scan that came out sideways. Most desktop software for these tasks is expensive, complex, or only available on one platform.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            KooBrain PDF Studio is designed to solve all of these problems for free, directly in your browser. Using modern browser APIs like the File API and PDF rendering libraries, every operation runs on your device — nothing is uploaded to a server. That means faster processing, zero privacy risk, and no file size restrictions imposed by server quotas.
          </p>
        </section>

        {/* Planned tools grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-on-surface flex items-center gap-3 px-1">
            <Clock className="size-6 text-tertiary" />
            Planned PDF Tools (12 tools in development)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PLANNED_TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="p-6 rounded-2xl border border-outline-variant/20 bg-surface-container flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center">
                  <FileText className="size-5 text-tertiary" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-on-surface uppercase tracking-tight mb-1">{tool.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{tool.desc}</p>
                </div>
                <span className="mt-auto inline-block text-[9px] font-black uppercase tracking-widest text-tertiary/60 border border-tertiary/20 rounded-full px-3 py-1 w-fit">
                  In Development
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy section */}
        <section className="bg-surface-container-low/30 rounded-3xl p-8 sm:p-12 border border-outline-variant/20 flex flex-col md:flex-row items-start gap-8">
          <div className="size-16 bg-tertiary/10 rounded-2xl flex items-center justify-center shrink-0 border border-tertiary/20">
            <ShieldCheck className="size-8 text-tertiary" />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black text-on-surface">100% Private — Files Never Leave Your Browser</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-2xl">
              Every PDF tool in KooBrain Studio processes files locally using browser APIs. Unlike cloud-based PDF services that upload your documents to third-party servers, we never transmit your files. This is especially important for sensitive documents such as contracts, medical records, financial statements, and identity documents.
            </p>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              {[
                "No file uploads — all processing happens on your device",
                "No account creation or registration required",
                "No size limits imposed by server infrastructure",
                "Works offline once the page is loaded",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-tertiary mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA to existing tools */}
        <section className="rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-surface-container to-surface-container-high p-8 sm:p-10">
          <h3 className="text-2xl font-black text-on-surface mb-2">Try our available tools while PDF Studio launches</h3>
          <p className="text-on-surface-variant mb-6 max-w-2xl">
            While PDF Studio is in development, explore our full suite of free JSON tools, image tools, encoding tools, and calculators — all browser-based and free to use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-extrabold text-on-primary hover:bg-primary-container transition-colors">
              Browse all tools <ArrowRight className="size-4" />
            </Link>
            <Link to="/image-compressor" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-6 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
              <Zap className="size-4" /> Image Compressor
            </Link>
            <Link to="/json-formatter" className="inline-flex items-center gap-2 rounded-2xl border border-outline-variant/35 bg-surface-container-low px-6 py-3 font-bold text-on-surface hover:bg-surface-variant/40 transition-colors">
              <Zap className="size-4" /> JSON Formatter
            </Link>
          </div>
        </section>
      </div>
    </ToolPageWrapper>
  );
};
