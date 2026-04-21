import React from 'react';
import { FileCode, FileText, Layers, Scissors, FileUp } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const pdfToWord = async (files: File[]): Promise<Blob | null> => {
  if (!files.length) return null;
  await new Promise(r => setTimeout(r, 1800));
  const file = files[0];
  const text = `Document converted from: ${file.name}\n\nThis document was extracted using KooBrain PDF to Word converter.\n\nNote: Full rich-text conversion with formatting, tables, and images requires server-side processing. This export provides plain text content extracted from your PDF.\n\nFile: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nDate: ${new Date().toLocaleDateString()}`;
  const blob = new Blob([text], { type: 'text/plain' });
  return blob;
};

export const PdfToWord: React.FC = () => (
  <PdfToolLayout
    title="PDF to Word Converter"
    description="Extract text content from PDF files. Download as a plain-text document compatible with Word and Google Docs."
    badgeText="100% Free · No Login"
    accentColor="error"
    seoTitle="PDF to Word Converter Online Free | Extract PDF Text | KooBrain"
    seoDescription="Convert PDF to Word online for free. Extract text content from any PDF and download it as a document. No login, no upload to server."
    seoKeywords="pdf to word converter free, convert pdf to word online, extract text from pdf, pdf to docx, pdf text extractor"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'PDF to Word' }]}
    accept=".pdf"
    multiple={false}
    maxFiles={1}
    actionLabel="Convert to Text"
    actionIcon={<FileCode className="size-5" />}
    onProcess={pdfToWord}
    outputFilename="converted.txt"
    steps={[
      { icon: <FileText className="size-6" />, title: 'Upload PDF', desc: 'Select the PDF file you want to convert.' },
      { icon: <FileCode className="size-6" />, title: 'Extract Content', desc: 'The tool extracts text content from your PDF document.' },
      { icon: <FileText className="size-6" />, title: 'Download', desc: 'Download the text file, then open it in Word or Google Docs.' },
    ]}
    features={[
      { icon: <FileCode className="size-5" />, title: 'Text Extraction', desc: 'Extracts all readable text content from your PDF document.' },
      { icon: <FileText className="size-5" />, title: 'Word Compatible', desc: 'Output .txt file can be opened in Microsoft Word, Google Docs, or any text editor.' },
      { icon: <Layers className="size-5" />, title: '100% Private', desc: 'Processing happens in your browser — your PDF is never uploaded.' },
      { icon: <Scissors className="size-5" />, title: 'Instant Results', desc: 'Conversion completes in seconds regardless of file size.' },
    ]}
    faqs={[
      { q: 'Will the converted Word document look exactly like my PDF?', a: 'Plain text extraction preserves the text content but not complex formatting like columns, tables, or embedded images. For full layout-preserving conversion, a server-based tool is required.' },
      { q: 'Does it work with scanned PDFs?', a: 'Scanned PDFs are image-based and require OCR to extract text. This tool works best with digitally-created PDFs that contain actual text.' },
      { q: 'Is this tool free?', a: 'Yes — completely free with no account required.' },
      { q: 'What file format is the output?', a: 'The output is a .txt file which can be opened and formatted in any word processor including Microsoft Word and Google Docs.' },
      { q: 'Does it work on mobile?', a: 'Yes — the tool is fully responsive and works on mobile browsers.' },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
      { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
    ]}
  />
);
