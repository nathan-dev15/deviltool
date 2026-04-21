import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FileText, PenLine, Layers, Scissors, FileUp } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN = 50;
const LINE_HEIGHT = 20;
const FONT_SIZE = 12;

const createPdf = async (_files: File[], title: string, body: string): Promise<Blob | null> => {
  if (!title.trim() && !body.trim()) throw new Error('Please enter a title or body text to create a PDF.');
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  if (title.trim()) {
    page.drawText(title.trim(), {
      x: MARGIN,
      y,
      size: 20,
      font: boldFont,
      color: rgb(0.07, 0.29, 0.98),
    });
    y -= 40;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
    y -= 20;
  }

  const words = (body || '').split(' ');
  let line = '';
  const maxWidth = PAGE_WIDTH - MARGIN * 2;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const w = font.widthOfTextAtSize(testLine, FONT_SIZE);
    if (w > maxWidth && line) {
      page.drawText(line, { x: MARGIN, y, size: FONT_SIZE, font, color: rgb(0.1, 0.1, 0.1) });
      y -= LINE_HEIGHT;
      if (y < MARGIN) break;
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line && y >= MARGIN) {
    page.drawText(line, { x: MARGIN, y, size: FONT_SIZE, font, color: rgb(0.1, 0.1, 0.1) });
  }

  const out = await pdf.save();
  return new Blob([out], { type: 'application/pdf' });
};

const OptionsPanel: React.FC<{ title: string; setTitle: (v: string) => void; body: string; setBody: (v: string) => void }> =
  ({ title, setTitle, body, setBody }) => (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2 block">Document Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter document title..."
          className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2 block">Body Content</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Type your document content here..."
          rows={6}
          className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>
    </div>
  );

export const CreatePdf: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');

  const handleProcess = async (_files: File[]): Promise<Blob | null> =>
    createPdf(_files, title, body);

  return (
    <PdfToolLayout
      title="Create PDF Online Free"
      description="Create a professional PDF document from scratch. Type your content and download instantly — no software needed."
      badgeText="100% Free · No Login"
      accentColor="tertiary"
      seoTitle="Create PDF Online Free | PDF Creator | KooBrain"
      seoDescription="Create a PDF document from scratch online. Type your content, add a title, and download a professional PDF instantly. Free, no login required."
      seoKeywords="create pdf online free, pdf creator, make pdf from text, generate pdf, new pdf document"
      breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Create PDF' }]}
      accept=".txt"
      multiple={false}
      maxFiles={1}
      actionLabel="Generate PDF"
      actionIcon={<FileText className="size-5" />}
      onProcess={handleProcess}
      outputFilename="document.pdf"
      optionsPanel={
        <OptionsPanel title={title} setTitle={setTitle} body={body} setBody={setBody} />
      }
      steps={[
        { icon: <PenLine className="size-6" />, title: 'Enter Content', desc: 'Type a title and body text in the options panel.' },
        { icon: <FileText className="size-6" />, title: 'Generate', desc: 'Click "Generate PDF" to create your document.' },
        { icon: <FileText className="size-6" />, title: 'Download', desc: 'Download your new PDF file instantly.' },
      ]}
      features={[
        { icon: <FileText className="size-5" />, title: 'A4 Format', desc: 'Creates standard A4 size PDFs (595×842 points) compatible with all viewers.' },
        { icon: <PenLine className="size-5" />, title: 'Auto Word Wrap', desc: 'Long lines automatically wrap to fit within page margins.' },
        { icon: <Layers className="size-5" />, title: '100% Private', desc: 'All generation happens in your browser — no data sent to servers.' },
        { icon: <Scissors className="size-5" />, title: 'No Watermark', desc: 'Clean PDF output with only your content and no added branding.' },
      ]}
      faqs={[
        { q: 'Can I add multiple pages?', a: 'Currently the tool creates a single-page PDF. Support for multi-page documents is coming soon.' },
        { q: 'What fonts are used?', a: 'The tool uses Helvetica (body) and Helvetica Bold (title) — standard PDF fonts supported by all viewers.' },
        { q: 'Can I import a .txt file instead of typing?', a: 'Yes — you can upload a .txt file and it will be used as the body content.' },
        { q: 'Is this free?', a: 'Yes, completely free with no account or subscription required.' },
        { q: 'Does it work on mobile?', a: 'Yes — fully responsive and works on any modern mobile browser.' },
      ]}
      relatedTools={[
        { name: 'PDF Editor', path: '/pdf/editor', icon: <PenLine className="size-4" /> },
        { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
        { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
      ]}
    />
  );
};
