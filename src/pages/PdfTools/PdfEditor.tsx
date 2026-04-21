import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PenLine, FileText, Layers, Scissors, FileUp } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const annotateColor = rgb(0.07, 0.29, 0.98);

const editPdf = async (files: File[], note: string, pageNum: number): Promise<Blob | null> => {
  if (!files.length) return null;
  const text = note.trim() || 'Annotated by KooBrain';
  const bytes = await files[0].arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();
  const idx = Math.max(0, Math.min(pageNum - 1, pages.length - 1));
  const page = pages[idx];
  const { height } = page.getSize();
  page.drawText(text, {
    x: 30,
    y: height - 40,
    size: 12,
    font,
    color: annotateColor,
    opacity: 0.85,
  });
  const out = await pdf.save();
  return new Blob([out], { type: 'application/pdf' });
};

const OptionsPanel: React.FC<{ note: string; setNote: (v: string) => void; page: string; setPage: (v: string) => void; total: number }> =
  ({ note, setNote, page, setPage, total }) => (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2 block">
          Annotation Text
        </label>
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Enter text to add to the PDF..."
          className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2 block">
          Add to Page Number {total > 0 ? `(1–${total})` : ''}
        </label>
        <input
          type="number"
          value={page}
          min={1}
          max={total || 999}
          onChange={e => setPage(e.target.value)}
          className="w-32 px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );

export const PdfEditor: React.FC = () => {
  const [note, setNote] = React.useState('');
  const [page, setPage] = React.useState('1');

  const handleProcess = async (files: File[]): Promise<Blob | null> =>
    editPdf(files, note, parseInt(page, 10) || 1);

  return (
    <PdfToolLayout
      title="PDF Editor Online Free"
      description="Add text annotations to any PDF. No software install needed — works 100% in your browser."
      badgeText="🔥 Popular · No Login"
      accentColor="primary"
      seoTitle="PDF Editor Online Free | Add Text to PDF | KooBrain"
      seoDescription="Edit PDF files online for free. Add text annotations to any PDF page. Secure, browser-based PDF editor — no software install required."
      seoKeywords="pdf editor online free, add text to pdf, annotate pdf, edit pdf browser, pdf annotation tool"
      breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'PDF Editor' }]}
      accept=".pdf"
      multiple={false}
      maxFiles={1}
      actionLabel="Add Annotation"
      actionIcon={<PenLine className="size-5" />}
      onProcess={handleProcess}
      outputFilename="edited.pdf"
      optionsPanel={
        <OptionsPanel
          note={note}
          setNote={setNote}
          page={page}
          setPage={setPage}
          total={0}
        />
      }
      steps={[
        { icon: <FileText className="size-6" />, title: 'Upload PDF', desc: 'Select the PDF you want to annotate.' },
        { icon: <PenLine className="size-6" />, title: 'Enter Your Text', desc: 'Type the annotation text and choose which page number to add it to.' },
        { icon: <FileText className="size-6" />, title: 'Download', desc: 'Click "Add Annotation" and download the edited PDF.' },
      ]}
      features={[
        { icon: <PenLine className="size-5" />, title: 'Text Annotations', desc: 'Add custom text to any page of your PDF using standard fonts.' },
        { icon: <FileText className="size-5" />, title: 'Page Targeting', desc: 'Specify exactly which page receives the annotation.' },
        { icon: <Layers className="size-5" />, title: '100% Private', desc: 'No file is ever uploaded. All editing happens locally in your browser.' },
        { icon: <Scissors className="size-5" />, title: 'No Watermark', desc: 'Output PDFs are clean with only your annotation added.' },
      ]}
      faqs={[
        { q: 'Can I add text to a specific page?', a: 'Yes — enter the page number in the options panel before processing.' },
        { q: 'What font is used for annotations?', a: 'Annotations use Helvetica Bold (a standard PDF font) at 12pt, positioned at the top-left of the chosen page.' },
        { q: 'Can I add multiple annotations?', a: 'Currently one annotation per operation. For multiple annotations, process the file sequentially.' },
        { q: 'Does it work with scanned PDFs?', a: 'Yes — the text is added as a new layer on top of the page content.' },
        { q: 'Is this tool free?', a: 'Yes, completely free — no account or subscription required.' },
      ]}
      relatedTools={[
        { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
        { name: 'Split PDF', path: '/pdf/split', icon: <Scissors className="size-4" /> },
        { name: 'Add Files', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
      ]}
    />
  );
};
