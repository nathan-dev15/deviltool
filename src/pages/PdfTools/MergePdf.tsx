import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { Layers, FileText, ArrowUpDown, Scissors, FileUp, FileCode } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const mergePdfs = async (files: File[]): Promise<Blob | null> => {
  if (files.length < 2) throw new Error('Please upload at least 2 PDF files to merge.');
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => merged.addPage(p));
  }
  const out = await merged.save();
  return new Blob([out], { type: 'application/pdf' });
};

export const MergePdf: React.FC = () => (
  <PdfToolLayout
    title="Merge PDF Online Free"
    description="Combine multiple PDF files into one document. Fast, secure, and no login required."
    badgeText="100% Free · No Watermark"
    accentColor="primary"
    seoTitle="Merge PDF Online Free | Fast & Secure PDF Merger | KooBrain"
    seoDescription="Combine multiple PDF files into one easily. Free, secure, and fast PDF merger online. No login required. No watermark added."
    seoKeywords="merge pdf online, free pdf merger, combine pdf files, pdf joiner, merge pdf without watermark"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Merge PDF' }]}
    accept=".pdf"
    multiple={true}
    maxFiles={20}
    actionLabel="Merge PDFs"
    actionIcon={<Layers className="size-5" />}
    onProcess={mergePdfs}
    outputFilename="merged.pdf"
    steps={[
      { icon: <FileText className="size-6" />, title: 'Upload PDFs', desc: 'Drag and drop or click to select all the PDF files you want to combine.' },
      { icon: <ArrowUpDown className="size-6" />, title: 'Arrange Order', desc: 'Files will be merged in the order they appear in the list. Remove any you don\'t need.' },
      { icon: <Layers className="size-6" />, title: 'Merge & Download', desc: 'Click "Merge PDFs" and download your combined document instantly.' },
    ]}
    features={[
      { icon: <Layers className="size-5" />, title: 'Up to 20 Files', desc: 'Merge up to 20 PDF documents in a single operation.' },
      { icon: <FileText className="size-5" />, title: 'No Watermark', desc: 'Your merged PDF is clean — no stamps, no logos, no watermarks.' },
      { icon: <Scissors className="size-5" />, title: 'Browser-Based', desc: 'All merging happens in your browser. Files never leave your device.' },
      { icon: <FileUp className="size-5" />, title: 'Preserves Quality', desc: 'Original page quality, fonts, and layout are preserved perfectly.' },
    ]}
    faqs={[
      { q: 'Is the PDF merger really free?', a: 'Yes, completely free. No hidden charges, no subscription, no credit card required.' },
      { q: 'Are my files safe when I upload them?', a: 'Your files are 100% safe. Merging happens entirely in your browser using pdf-lib — no data is sent to any server.' },
      { q: 'Does it work on mobile?', a: 'Yes! The tool is fully responsive and works on any device — iPhone, Android, tablet, and desktop.' },
      { q: 'Is there a file size limit?', a: 'There is no hard limit, but very large files (100MB+) may slow down your browser depending on your device memory.' },
      { q: 'Will the merged PDF have a watermark?', a: 'No. KooBrain never adds watermarks or branding to your output files.' },
    ]}
    relatedTools={[
      { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
      { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
      { name: 'Compress PDF', path: '/pdf/compress', icon: <FileText className="size-4" /> },
      { name: 'PDF to Word', path: '/pdf-to-word', icon: <FileCode className="size-4" /> },
    ]}
  />
);
