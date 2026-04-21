import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileImage, FileText, Layers, Scissors, FileCode } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const compressPdf = async (files: File[]): Promise<Blob | null> => {
  if (!files.length) return null;
  const bytes = await files[0].arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const out = await pdf.save({ useObjectStreams: true });
  return new Blob([out], { type: 'application/pdf' });
};

export const CompressPdf: React.FC = () => (
  <PdfToolLayout
    title="Compress PDF Online Free"
    description="Reduce your PDF file size. Optimizes the PDF structure for smaller output — free and completely private."
    badgeText="100% Free · No Login"
    accentColor="secondary"
    seoTitle="Compress PDF Online Free | Reduce PDF File Size | KooBrain"
    seoDescription="Reduce PDF file size online for free. Optimize PDF structure without losing quality. No upload to server — 100% private."
    seoKeywords="compress pdf online free, reduce pdf size, pdf compressor, shrink pdf file, optimize pdf"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Compress PDF' }]}
    accept=".pdf"
    multiple={false}
    maxFiles={1}
    actionLabel="Compress PDF"
    actionIcon={<FileImage className="size-5" />}
    onProcess={compressPdf}
    outputFilename="compressed.pdf"
    steps={[
      { icon: <FileText className="size-6" />, title: 'Upload PDF', desc: 'Select the PDF file you want to compress.' },
      { icon: <FileImage className="size-6" />, title: 'Optimize Structure', desc: 'The tool rewrites the PDF using object streams to reduce redundant data.' },
      { icon: <FileText className="size-6" />, title: 'Download', desc: 'Download the optimized PDF file instantly.' },
    ]}
    features={[
      { icon: <FileImage className="size-5" />, title: 'Object Stream Compression', desc: 'Uses PDF object streams to reduce file size by removing redundant internal data.' },
      { icon: <FileText className="size-5" />, title: 'No Quality Loss', desc: 'Compression targets metadata and structure, not visual content.' },
      { icon: <Layers className="size-5" />, title: '100% Private', desc: 'Compression runs in your browser — no server upload ever.' },
      { icon: <Scissors className="size-5" />, title: 'Instant Results', desc: 'See file size reduction immediately after processing.' },
    ]}
    faqs={[
      { q: 'How much will it reduce my PDF size?', a: 'Results vary. PDFs with lots of redundant metadata or unoptimized structure can see 10–30% reduction. Already-optimized PDFs may see minimal change.' },
      { q: 'Will compression damage my PDF content?', a: 'No. This tool only optimizes the internal PDF structure — your text, images, and layout remain untouched.' },
      { q: 'Is this tool free?', a: 'Yes, completely free with no account required.' },
      { q: 'Does it work on mobile?', a: 'Yes — the tool works on any device with a modern browser.' },
      { q: 'What if I need stronger compression?', a: 'For aggressive image-level compression (removing embedded images or downscaling), a server-side approach is required. This tool focuses on structure-level optimization only.' },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
      { name: 'PDF to Word', path: '/pdf-to-word', icon: <FileCode className="size-4" /> },
    ]}
  />
);
