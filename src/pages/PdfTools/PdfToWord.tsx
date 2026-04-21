import React from 'react';
import * as pdfjs from 'pdfjs-dist';
import { Document, Paragraph, TextRun, HeadingLevel, Packer, PageBreak } from 'docx';
import { FileCode, FileText, Layers, Scissors, FileUp } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

// Configure pdf.js worker via Vite static asset URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href;

// ─── Types ────────────────────────────────────────────────────────────────────

interface LineData {
  text: string;
  y: number;
  fontSize: number;
  x: number;
}

// ─── Text extraction ──────────────────────────────────────────────────────────

const Y_TOLERANCE = 4;

async function extractPages(file: File): Promise<LineData[][]> {
  const bytes = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const result: LineData[][] = [];

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const vp = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();

    const raw: LineData[] = [];
    for (const item of content.items) {
      const it = item as any;
      if (!it.str?.trim()) continue;
      raw.push({
        text: it.str,
        x: it.transform[4],
        y: vp.height - it.transform[5],       // flip: top-down
        fontSize: Math.abs(it.transform[3]) || 12,
      });
    }

    // Sort top → bottom, left → right
    raw.sort((a, b) => (Math.abs(a.y - b.y) < Y_TOLERANCE ? a.x - b.x : a.y - b.y));

    // Merge items on the same visual line
    const lines: LineData[] = [];
    for (const item of raw) {
      const prev = lines[lines.length - 1];
      if (prev && Math.abs(prev.y - item.y) <= Y_TOLERANCE) {
        const sep = prev.text.endsWith(' ') || item.text.startsWith(' ') ? '' : ' ';
        prev.text += sep + item.text;
        prev.fontSize = Math.max(prev.fontSize, item.fontSize);
      } else {
        lines.push({ ...item });
      }
    }

    result.push(lines.filter(l => l.text.trim()));
  }

  return result;
}

// ─── DOCX builder ─────────────────────────────────────────────────────────────

function buildDocx(pages: LineData[][], filename: string): Document {
  const allLines = pages.flat();
  if (!allLines.length) {
    throw new Error(
      'No text found in this PDF. It may be a scanned image — OCR is required for scanned documents.'
    );
  }

  // Derive median font size to classify heading vs body
  const sizes = [...allLines.map(l => l.fontSize)].sort((a, b) => a - b);
  const median = sizes[Math.floor(sizes.length / 2)] || 12;
  const h1Min = median * 1.6;
  const h2Min = median * 1.25;

  const children: Paragraph[] = [];

  // Document title from filename
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: filename.replace(/\.pdf$/i, ''),
          bold: true,
          size: 40,
          color: '1a47c8',
        }),
      ],
      heading: HeadingLevel.TITLE,
      spacing: { after: 480 },
    })
  );

  pages.forEach((lines, pageIdx) => {
    if (pageIdx > 0) {
      children.push(new Paragraph({ children: [new PageBreak()] }));
    }

    let paraLines: string[] = [];
    let paraFontSize = median;
    let prevY = -1;

    const flushPara = () => {
      const text = paraLines.join(' ').trim();
      if (text) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text,
                size: Math.max(20, Math.round(paraFontSize * 1.8)),
              }),
            ],
            spacing: { after: 160 },
          })
        );
      }
      paraLines = [];
    };

    for (const line of lines) {
      const text = line.text.trim();
      if (!text) continue;

      const gapAbove = prevY > 0 && line.y - prevY > line.fontSize * 2.2;
      const isH1 = line.fontSize >= h1Min;
      const isH2 = !isH1 && line.fontSize >= h2Min;

      if (isH1 || isH2 || gapAbove) flushPara();

      if (isH1) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text,
                bold: true,
                size: Math.max(28, Math.round(line.fontSize * 2.2)),
                color: '1a47c8',
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          })
        );
      } else if (isH2) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text,
                bold: true,
                size: Math.max(24, Math.round(line.fontSize * 2)),
                color: '333333',
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 280, after: 160 },
          })
        );
      } else {
        paraLines.push(text);
        paraFontSize = line.fontSize;
        // Flush at sentence boundaries (long lines ending with .)
        if (text.endsWith('.') && text.length > 80) flushPara();
      }

      prevY = line.y;
    }

    flushPara();
  });

  return new Document({
    creator: 'KooBrain PDF Converter',
    title: filename,
    description: 'Converted by KooBrain.com',
    sections: [{ children }],
  });
}

// ─── Main converter function ──────────────────────────────────────────────────

async function convertPdfToWord(files: File[]): Promise<Blob | null> {
  if (!files.length) return null;
  const file = files[0];
  const pages = await extractPages(file);
  const doc = buildDocx(pages, file.name);
  return Packer.toBlob(doc);
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PdfToWord: React.FC = () => (
  <PdfToolLayout
    title="PDF to Word Converter"
    description="Convert any PDF into an editable Word (.docx) document. Extracts text, headings, and paragraphs with structure preserved."
    badgeText="Real .docx Output · No Login"
    accentColor="error"
    seoTitle="PDF to Word Converter Online Free | Convert PDF to DOCX | KooBrain"
    seoDescription="Convert PDF to Word (.docx) online for free. Real text extraction with heading detection and paragraph structure. No upload to server."
    seoKeywords="pdf to word converter free, convert pdf to docx online, pdf to word online, extract text from pdf, pdf to editable word"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'PDF to Word' }]}
    accept=".pdf"
    multiple={false}
    maxFiles={1}
    actionLabel="Convert to Word (.docx)"
    actionIcon={<FileCode className="size-5" />}
    onProcess={convertPdfToWord}
    outputFilename="converted.docx"
    steps={[
      {
        icon: <FileText className="size-6" />,
        title: 'Upload PDF',
        desc: 'Select the PDF you want to convert. Works with multi-page documents.',
      },
      {
        icon: <FileCode className="size-6" />,
        title: 'Extract & Structure',
        desc: 'pdf.js extracts every line of text. Headings are auto-detected by font size.',
      },
      {
        icon: <FileText className="size-6" />,
        title: 'Download .docx',
        desc: 'Download the Word document and open it in Microsoft Word or Google Docs.',
      },
    ]}
    features={[
      {
        icon: <FileCode className="size-5" />,
        title: 'Real .docx Output',
        desc: 'Produces an actual Word file — not a .txt rename. Opens natively in Word, Google Docs, and LibreOffice.',
      },
      {
        icon: <FileText className="size-5" />,
        title: 'Heading Detection',
        desc: 'Font size analysis auto-detects H1 and H2 headings so your document structure is preserved.',
      },
      {
        icon: <Layers className="size-5" />,
        title: 'Multi-Page Support',
        desc: 'All pages are extracted. Each PDF page maps to a page break in the Word document.',
      },
      {
        icon: <Scissors className="size-5" />,
        title: '100% Private',
        desc: 'Extraction runs entirely in your browser using pdf.js. Your file never leaves your device.',
      },
    ]}
    faqs={[
      {
        q: 'What is the output format?',
        a: 'A genuine .docx file (Office Open XML), compatible with Microsoft Word 2007+, Google Docs, and LibreOffice.',
      },
      {
        q: 'How accurate is the conversion?',
        a: 'Text, paragraph structure, and basic heading hierarchy are preserved. Complex layouts like multi-column text, tables, and embedded images are not reproduced — those require server-side processing.',
      },
      {
        q: 'Does it work with scanned PDFs?',
        a: 'No — scanned PDFs are images with no embedded text. Run them through an OCR tool first to make the text extractable.',
      },
      {
        q: 'Is the conversion free?',
        a: 'Yes — completely free, no account required, no watermarks in the output.',
      },
      {
        q: 'Is my PDF safe?',
        a: 'Your file is processed entirely in-browser using the open-source pdf.js library. No data is ever uploaded to a server.',
      },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
      { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
    ]}
  />
);
