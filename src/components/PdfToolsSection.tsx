import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  PenLine, FileText, Layers, Scissors, FileUp,
  FileImage, FileCode, Image as ImageIcon, ArrowRight, Flame
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PDF_TOOLS = [
  {
    id: 'pdf-editor',
    name: 'PDF Editor',
    description: 'Add text, annotations & highlights to any PDF directly in your browser.',
    icon: PenLine,
    path: '/pdf/editor',
    featured: true,
    tag: '🔥 Popular',
    badges: ['⚡ Fast', '🔒 Secure'],
    color: 'from-violet-500 to-purple-700',
    shadow: 'shadow-violet-500/25',
    accent: 'text-violet-500',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    id: 'pdf-merge',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one document instantly.',
    icon: Layers,
    path: '/pdf/merge',
    featured: false,
    tag: '⚡ Fast',
    badges: ['🆓 Free'],
    color: 'from-blue-500 to-indigo-700',
    shadow: 'shadow-blue-500/20',
    accent: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    id: 'pdf-split',
    name: 'Split PDF',
    description: 'Extract pages or split a PDF into separate files.',
    icon: Scissors,
    path: '/pdf/split',
    featured: false,
    tag: '🔒 Secure',
    badges: ['🆓 Free'],
    color: 'from-rose-500 to-pink-700',
    shadow: 'shadow-rose-500/20',
    accent: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    id: 'pdf-compress',
    name: 'Compress PDF',
    description: 'Reduce PDF file size without quality loss.',
    icon: FileImage,
    path: '/pdf/compress',
    featured: false,
    tag: '⚡ Fast',
    badges: ['🆓 Free'],
    color: 'from-amber-500 to-orange-700',
    shadow: 'shadow-amber-500/20',
    accent: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    id: 'pdf-create',
    name: 'Create PDF',
    description: 'Create a new PDF from scratch with custom content.',
    icon: FileText,
    path: '/pdf/create',
    featured: false,
    tag: '🆓 Free',
    badges: ['⚡ Fast'],
    color: 'from-emerald-500 to-teal-700',
    shadow: 'shadow-emerald-500/20',
    accent: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    id: 'pdf-add-files',
    name: 'Add Files to PDF',
    description: 'Append pages from another PDF to an existing document.',
    icon: FileUp,
    path: '/pdf/add-files',
    featured: false,
    tag: '🔒 Secure',
    badges: ['🆓 Free'],
    color: 'from-cyan-500 to-sky-700',
    shadow: 'shadow-cyan-500/20',
    accent: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Convert PDF files to editable Word documents.',
    icon: FileCode,
    path: '/pdf-to-word',
    featured: false,
    tag: '⚡ Fast',
    badges: ['🆓 Free'],
    color: 'from-fuchsia-500 to-pink-700',
    shadow: 'shadow-fuchsia-500/20',
    accent: 'text-fuchsia-500',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/20',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG, PNG, or WebP images into a PDF.',
    icon: ImageIcon,
    path: '/image-to-pdf',
    featured: false,
    tag: '🆓 Free',
    badges: ['⚡ Fast'],
    color: 'from-lime-500 to-green-700',
    shadow: 'shadow-lime-500/20',
    accent: 'text-lime-500',
    bg: 'bg-lime-500/10',
    border: 'border-lime-500/20',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as any } },
};

export const PdfToolsSection: React.FC = () => {
  const featured = PDF_TOOLS.find(t => t.featured)!;
  const rest = PDF_TOOLS.filter(t => !t.featured);

  return (
    <section className="section-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-3xl" />

      <div className="pl-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">PDF Studio</span>
            <h2 className="text-3xl sm:text-4xl font-black text-on-surface mb-2">PDF Tools</h2>
            <p className="text-on-surface-variant leading-relaxed max-w-md">
              Free, fast, and secure PDF tools for students & professionals
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest shrink-0 self-start sm:self-auto">
            100% Free · No Login
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* FEATURED CARD */}
        <motion.div variants={item} className="lg:col-span-2 lg:row-span-1">
          <Link
            to={featured.path}
            className={cn(
              'group relative flex flex-col h-full p-7 rounded-[2rem] bg-gradient-to-br text-white overflow-hidden transition-all duration-300',
              'hover:scale-[1.02] hover:shadow-2xl',
              featured.color,
              featured.shadow,
              'shadow-xl'
            )}
          >
            {/* glow orb */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between mb-6">
              <div className="size-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                <featured.icon className="size-7" />
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider backdrop-blur">
                <Flame className="size-3" /> Popular
              </span>
            </div>

            <h3 className="text-2xl font-black mb-2">{featured.name}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6 flex-1">{featured.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {featured.badges.map(b => (
                  <span key={b} className="px-2.5 py-1 rounded-full bg-white/15 text-[10px] font-bold backdrop-blur">{b}</span>
                ))}
              </div>
              <div className="size-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur group-hover:bg-white/30 transition-colors">
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* REGULAR CARDS */}
        {rest.map((tool) => (
          <motion.div key={tool.id} variants={item}>
            <Link
              to={tool.path}
              className={cn(
                'group flex flex-col h-full p-5 rounded-2xl border transition-all duration-300',
                'bg-surface-container-low hover:bg-surface-container-lowest',
                'hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5',
                tool.border,
                'border-outline-variant/20 hover:border-opacity-60'
              )}
            >
              <div className={cn('size-11 rounded-xl flex items-center justify-center mb-4', tool.bg)}>
                <tool.icon className={cn('size-5', tool.accent)} />
              </div>

              <h3 className="font-black text-sm text-on-surface mb-1.5">{tool.name}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed flex-1 mb-4">{tool.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {tool.badges.map(b => (
                    <span key={b} className={cn('px-2 py-0.5 rounded-full text-[9px] font-bold', tool.bg, tool.accent)}>{b}</span>
                  ))}
                </div>
                <ArrowRight className={cn('size-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all', tool.accent)} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
