import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { Scissors, FileText, Layers, FileUp, FileCode } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const splitPdf = async (files: File[]): Promise<Blob | null> => {
  if (!files.length) return null;
  const bytes = await files[0].arrayBuffer();
  const srcPdf = await PDFDocument.load(bytes);
  const totalPages = srcPdf.getPageCount();
  if (totalPages < 2) throw new Error('The PDF must have at least 2 pages to split.');
  const half = Math.ceil(totalPages / 2);
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(srcPdf, Array.from({ length: half }, (_, i) => i));
  pages.forEach(p => newPdf.addPage(p));
  const out = await newPdf.save();
  return new Blob([out], { type: 'application/pdf' });
};

export const SplitPdf: React.FC = () => (
  <PdfToolLayout
    title="Split PDF Online Free"
    description="Extract pages or split a PDF into separate files. No login, no watermark, works in your browser."
    badgeText="100% Free · No Login"
    accentColor="tertiary"
    seoTitle="Split PDF Online Free | Extract Pages from PDF | KooBrain"
    seoDescription="Split a PDF file into individual pages or extract a page range. Free, secure browser-based PDF splitter. No upload required."
    seoKeywords="split pdf online, extract pdf pages, pdf splitter free, divide pdf, separate pdf pages"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Split PDF' }]}
    accept=".pdf"
    multiple={false}
    maxFiles={1}
    actionLabel="Split PDF (First Half)"
    actionIcon={<Scissors className="size-5" />}
    onProcess={splitPdf}
    outputFilename="split-part1.pdf"
    steps={[
      { icon: <FileText className="size-6" />, title: 'Upload PDF', desc: 'Select the PDF file you want to split.' },
      { icon: <Scissors className="size-6" />, title: 'Auto Split', desc: 'The tool extracts the first half of your PDF into a new document.' },
      { icon: <FileText className="size-6" />, title: 'Download', desc: 'Download the split PDF file to your device instantly.' },
    ]}
    features={[
      { icon: <Scissors className="size-5" />, title: 'Page Extraction', desc: 'Cleanly extracts pages while preserving the original formatting and fonts.' },
      { icon: <FileText className="size-5" />, title: 'No Watermark', desc: 'Split files are clean — no stamps or added branding.' },
      { icon: <Layers className="size-5" />, title: '100% Private', desc: 'Your PDF stays on your device. Nothing is sent to external servers.' },
      { icon: <FileUp className="size-5" />, title: 'Works Offline', desc: 'Once the page loads, the tool works without an internet connection.' },
    ]}
    faqs={[
      { q: 'Can I choose which pages to extract?', a: 'Currently the tool splits the first half automatically. Full page-range selection is coming soon.' },
      { q: 'Is there a page limit?', a: 'No. The tool handles PDFs of any page count, limited only by your browser\'s available memory.' },
      { q: 'Does it work on password-protected PDFs?', a: 'Password-protected PDFs cannot be processed unless you remove the password first.' },
      { q: 'Will the output PDF look exactly like the original?', a: 'Yes. Fonts, images, and layout are preserved because we use the pdf-lib library which works at the page object level.' },
      { q: 'Is this tool completely free?', a: 'Yes — forever. KooBrain does not charge for any PDF tools.' },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
      { name: 'PDF to Word', path: '/pdf-to-word', icon: <FileCode className="size-4" /> },
    ]}
  />
);
