import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUp, FileText, Layers, Scissors, FileCode } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const addFilesToPdf = async (files: File[]): Promise<Blob | null> => {
  if (files.length < 2) throw new Error('Please upload at least 2 PDF files. The first file is the base; additional files are appended to it.');
  const base = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const src = await PDFDocument.load(bytes);
    const pages = await base.copyPages(src, src.getPageIndices());
    pages.forEach(p => base.addPage(p));
  }
  const out = await base.save();
  return new Blob([out], { type: 'application/pdf' });
};

export const AddFilesToPdf: React.FC = () => (
  <PdfToolLayout
    title="Add Files to PDF"
    description="Append pages from additional PDFs to your base document. Combine and reorder PDF content easily."
    badgeText="100% Free · No Login"
    accentColor="secondary"
    seoTitle="Add Files to PDF Online Free | Append PDF Pages | KooBrain"
    seoDescription="Append pages from other PDFs to an existing document. Free online tool to add files to PDF — no watermark, no login, works in browser."
    seoKeywords="add files to pdf, append pdf pages, add pages to pdf, insert pdf pages, combine pdf documents"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Add Files to PDF' }]}
    accept=".pdf"
    multiple={true}
    maxFiles={10}
    actionLabel="Append Files"
    actionIcon={<FileUp className="size-5" />}
    onProcess={addFilesToPdf}
    outputFilename="combined.pdf"
    steps={[
      { icon: <FileText className="size-6" />, title: 'Upload Base PDF', desc: 'Upload your main PDF first — this becomes the base document.' },
      { icon: <FileUp className="size-6" />, title: 'Add More Files', desc: 'Upload additional PDFs whose pages will be appended to the base.' },
      { icon: <FileText className="size-6" />, title: 'Download', desc: 'Click "Append Files" and download the combined PDF.' },
    ]}
    features={[
      { icon: <FileUp className="size-5" />, title: 'Ordered Appending', desc: 'Pages are appended in the order files appear in the upload list.' },
      { icon: <FileText className="size-5" />, title: 'Up to 10 Files', desc: 'Add up to 10 PDFs in a single operation.' },
      { icon: <Layers className="size-5" />, title: '100% Private', desc: 'All processing stays in your browser — no server upload.' },
      { icon: <Scissors className="size-5" />, title: 'No Watermark', desc: 'Output PDF is clean with no added branding or logos.' },
    ]}
    faqs={[
      { q: 'What is the difference between Add Files and Merge PDF?', a: '"Add Files" is conceptually the same as merge — it appends pages from multiple PDFs in order. The difference is intent: Add Files implies building on a base document, while Merge combines equals.' },
      { q: 'Can I reorder the files before combining?', a: 'Remove and re-upload files in the order you want. Files are processed top-to-bottom in the list.' },
      { q: 'Is there a page limit?', a: 'No hard page limit. Very large documents (500+ pages) may slow down your browser depending on device memory.' },
      { q: 'Is this free?', a: 'Yes — completely free, no account required.' },
      { q: 'Does it work on mobile?', a: 'Yes — fully responsive and tested on iOS and Android browsers.' },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
      { name: 'PDF to Word', path: '/pdf-to-word', icon: <FileCode className="size-4" /> },
    ]}
  />
);
