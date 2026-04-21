import React from 'react';
import { PDFDocument } from 'pdf-lib';
import { Image as ImageIcon, FileText, Layers, Scissors, FileUp } from 'lucide-react';
import { PdfToolLayout } from './PdfToolLayout';

const imagesToPdf = async (files: File[]): Promise<Blob | null> => {
  if (!files.length) return null;
  const pdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const mime = file.type;

    let img;
    if (mime === 'image/jpeg' || mime === 'image/jpg') {
      img = await pdf.embedJpg(bytes);
    } else if (mime === 'image/png') {
      img = await pdf.embedPng(bytes);
    } else {
      // For WebP and other formats: try PNG first, then JPG
      try { img = await pdf.embedPng(bytes); }
      catch { img = await pdf.embedJpg(bytes); }
    }

    const { width, height } = img;
    const A4_W = 595;
    const A4_H = 842;
    const scale = Math.min(A4_W / width, A4_H / height, 1);
    const scaledW = width * scale;
    const scaledH = height * scale;

    const page = pdf.addPage([A4_W, A4_H]);
    const x = (A4_W - scaledW) / 2;
    const y = (A4_H - scaledH) / 2;
    page.drawImage(img, { x, y, width: scaledW, height: scaledH });
  }

  const out = await pdf.save();
  return new Blob([out], { type: 'application/pdf' });
};

export const ImageToPdf: React.FC = () => (
  <PdfToolLayout
    title="Image to PDF Converter"
    description="Convert JPG, PNG, or WebP images into a PDF document. Combine multiple images into one PDF instantly."
    badgeText="100% Free · No Login"
    accentColor="secondary"
    seoTitle="Image to PDF Converter Online Free | JPG PNG to PDF | KooBrain"
    seoDescription="Convert images to PDF online for free. Turn JPG, PNG, or WebP photos into a PDF document. Combine multiple images into one PDF. No login required."
    seoKeywords="image to pdf converter, jpg to pdf, png to pdf, convert photo to pdf, images to pdf free online"
    breadcrumbs={[{ label: 'PDF Tools', href: '/#pdf' }, { label: 'Image to PDF' }]}
    accept=".jpg,.jpeg,.png,.webp"
    multiple={true}
    maxFiles={20}
    actionLabel="Convert to PDF"
    actionIcon={<ImageIcon className="size-5" />}
    onProcess={imagesToPdf}
    outputFilename="images.pdf"
    steps={[
      { icon: <ImageIcon className="size-6" />, title: 'Upload Images', desc: 'Select JPG, PNG, or WebP images. Upload multiple to combine them.' },
      { icon: <FileText className="size-6" />, title: 'Auto Layout', desc: 'Each image is placed on its own A4 page, centered and scaled to fit.' },
      { icon: <FileText className="size-6" />, title: 'Download PDF', desc: 'Click "Convert to PDF" and download your PDF document.' },
    ]}
    features={[
      { icon: <ImageIcon className="size-5" />, title: 'Multi-Image Support', desc: 'Upload up to 20 images and each gets its own PDF page.' },
      { icon: <FileText className="size-5" />, title: 'A4 Auto-Fit', desc: 'Images are centered and scaled to fit A4 page size without distortion.' },
      { icon: <Layers className="size-5" />, title: '100% Private', desc: 'Images never leave your device — converted entirely in the browser.' },
      { icon: <Scissors className="size-5" />, title: 'JPG, PNG & WebP', desc: 'Supports the most common image formats used in everyday photography.' },
    ]}
    faqs={[
      { q: 'What image formats are supported?', a: 'JPG, JPEG, PNG, and WebP are supported. GIF and SVG are not supported by the current version.' },
      { q: 'Will multiple images go on the same page?', a: 'Each image gets its own A4 page. A 5-image upload produces a 5-page PDF.' },
      { q: 'Is image quality preserved?', a: 'Yes — images are embedded at their original resolution, scaled only to fit within the A4 page boundaries.' },
      { q: 'Is this tool free?', a: 'Yes — completely free with no account or watermarks.' },
      { q: 'Does it work on mobile?', a: 'Yes — you can take photos directly from your phone camera and convert them to PDF.' },
    ]}
    relatedTools={[
      { name: 'Merge PDF', path: '/pdf/merge', icon: <Layers className="size-4" /> },
      { name: 'Compress PDF', path: '/pdf/compress', icon: <FileText className="size-4" /> },
      { name: 'Add Files to PDF', path: '/pdf/add-files', icon: <FileUp className="size-4" /> },
    ]}
  />
);
