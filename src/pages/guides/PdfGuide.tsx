import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolPageWrapper } from '../../components/ToolPageWrapper';
import { SEO } from '../../components/SEO';

export const PdfGuide: React.FC = () => {
  return (
    <ToolPageWrapper
      title="Working with PDF Files: Merge, Split, Compress, and Edit"
      description="PDF is the most universal document format, but editing and managing PDF files can be confusing. Learn what you can and can't do with PDFs without expensive software."
      breadcrumbs={[{ label: 'Guides', href: '/guides' }, { label: 'Working with PDF Files' }]}
      accentColor="primary"
    >
      <SEO
        title="Working with PDF Files: Merge, Split, Compress & Edit Guide | KooBrain"
        description="Complete guide to working with PDFs: how the format works, how to merge and split pages, reduce file size, edit content, and convert to Word — without paid software."
        keywords="pdf guide, how to merge pdf, how to compress pdf, pdf to word, edit pdf online, pdf file format explained, pdf tools free"
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
                <li>• How the PDF format works and why it looks the same everywhere</li>
                <li>• How to merge, split, and reorder PDF pages without software</li>
                <li>• Why PDF files get large and how to compress them</li>
                <li>• The difference between text PDFs and scanned PDFs</li>
                <li>• When to convert PDF to Word vs annotate in place</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Why PDF Looks the Same on Every Device</h2>
          <p className="text-on-surface-variant leading-relaxed">
            PDF (Portable Document Format) was created by Adobe in 1993 with one goal: a document should look exactly the same on every computer, printer, and operating system, regardless of what fonts or software are installed. It achieves this by embedding everything — fonts, images, layout geometry, and graphics — inside the file itself. Nothing is left to the viewer's interpretation.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            This is why PDFs are the standard for contracts, official documents, invoices, and publications. It is also why editing PDF content is harder than editing a Word document — the text is stored as positioned character objects on a fixed canvas, not as a flowing paragraph that reflows when you change it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Text PDFs vs Scanned PDFs: A Critical Distinction</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20">
              <p className="font-bold text-secondary text-sm mb-2">Text-based PDF</p>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Created by saving a Word document, exporting from software, or printing to PDF from an application. Contains actual text data that can be selected, copied, and searched. Most browser-based tools work well with these.</p>
              <ul className="text-xs text-on-surface-variant space-y-1">
                <li>✓ Text is selectable and copyable</li>
                <li>✓ File size is relatively small</li>
                <li>✓ Ctrl+F search works</li>
                <li>✓ Converts to Word accurately</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <p className="font-bold text-primary text-sm mb-2">Scanned PDF (image-based)</p>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Created by scanning a paper document. Essentially a set of photos embedded in a PDF container. Contains no actual text — just pixels. Standard tools cannot extract or edit the text without OCR.</p>
              <ul className="text-xs text-on-surface-variant space-y-1">
                <li>✗ Text is not selectable</li>
                <li>✗ File size is large (raw images)</li>
                <li>✗ Cannot search text with Ctrl+F</li>
                <li>✗ Needs OCR to convert to Word</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Common PDF Tasks and How to Do Them</h2>
          <div className="space-y-4">
            {[
              {
                task: 'Merge PDFs',
                when: 'Combining chapters, assembling reports, joining invoices into a monthly file',
                how: 'Upload multiple PDFs and reorder them. The pages from each file are combined in sequence into one output PDF.',
                link: '/pdf/merge',
                label: 'Merge PDF',
              },
              {
                task: 'Split a PDF',
                when: 'Extracting specific pages from a large report, separating combined scans, isolating a single chapter',
                how: 'Specify a page range or individual page numbers to extract into a new, separate PDF file.',
                link: '/pdf/split',
                label: 'Split PDF',
              },
              {
                task: 'Compress a PDF',
                when: 'The file is too large for email (most limits are 10–25 MB), slow to upload to a portal, or takes too long to load',
                how: 'Image optimization and removing redundant PDF objects reduces file size. Image-heavy PDFs compress more; text-only PDFs compress less.',
                link: '/pdf/compress',
                label: 'Compress PDF',
              },
              {
                task: 'Add annotations',
                when: 'Reviewing a contract, marking up a report, adding comments to a shared document without altering the original content',
                how: 'Add text overlays at any position on the page. Annotations are embedded in the output PDF and visible when printed.',
                link: '/pdf/editor',
                label: 'PDF Editor',
              },
              {
                task: 'Convert to Word',
                when: 'You need to edit the actual content of a text-based PDF — updating an old report, fixing a contract, reusing document content',
                how: 'Extract the text and structure from the PDF into a .docx file. Complex layouts may need minor reformatting after conversion.',
                link: '/pdf-to-word',
                label: 'PDF to Word',
              },
            ].map(t => (
              <div key={t.task} className="p-5 rounded-2xl border border-outline-variant/20 bg-surface-container-low">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
                  <p className="font-bold text-on-surface">{t.task}</p>
                  <Link to={t.link} className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                    {t.label} <ArrowRight className="size-3" />
                  </Link>
                </div>
                <p className="text-xs text-on-surface-variant mb-1"><span className="font-bold text-on-surface">When:</span> {t.when}</p>
                <p className="text-xs text-on-surface-variant"><span className="font-bold text-on-surface">How:</span> {t.how}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-on-surface">Why Do PDF Files Get So Large?</h2>
          <p className="text-on-surface-variant leading-relaxed">
            The most common cause of large PDF files is embedded images. Every scanned page, screenshot, or photograph embedded in a PDF can be 200 KB to 5 MB depending on resolution and compression. A 50-page scan at 300 DPI can easily produce a 50 MB PDF. Other contributors to PDF file size:
          </p>
          <ul className="space-y-2">
            {[
              'High-resolution images that were not compressed before insertion',
              'Embedded fonts (particularly large Asian character sets)',
              'Multiple versions of the same image stored at different resolutions',
              'Embedded metadata, thumbnails, and document history from authoring software',
              'PDF layers and transparency effects that inflate the object count',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-on-surface-variant text-sm leading-relaxed">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-black text-on-surface mb-1">All PDF tools in one place</h3>
            <p className="text-sm text-on-surface-variant">Merge, split, compress, annotate, create, and convert PDFs — all in your browser with no upload to external servers and no watermarks.</p>
          </div>
          <Link to="/pdf/merge" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-extrabold text-on-primary hover:opacity-90 transition-opacity text-sm shrink-0">
            PDF Tools <ArrowRight className="size-4" />
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
