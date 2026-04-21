import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload, X, FileText, Download, CheckCircle2,
  Shield, Zap, Users, ArrowRight, ChevronDown, ChevronUp, Layers
} from 'lucide-react';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from '@/src/components/AdSense';
import { cn } from '@/src/lib/utils';

export interface PdfToolFaq {
  q: string;
  a: string;
}

export interface PdfToolStep {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export interface PdfToolFeature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export interface RelatedTool {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface PdfToolLayoutProps {
  title: string;
  description: string;
  badgeText: string;
  accentColor?: 'primary' | 'secondary' | 'tertiary' | 'error';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  breadcrumbs: { label: string; href?: string }[];
  accept: string;
  multiple?: boolean;
  maxFiles?: number;
  actionLabel: string;
  actionIcon: React.ReactNode;
  onProcess: (files: File[]) => Promise<Blob | null>;
  outputFilename: string;
  steps: PdfToolStep[];
  features: PdfToolFeature[];
  faqs: PdfToolFaq[];
  relatedTools: RelatedTool[];
  optionsPanel?: React.ReactNode;
  accentHex?: string;
}

export const PdfToolLayout: React.FC<PdfToolLayoutProps> = ({
  title,
  description,
  badgeText,
  accentColor = 'primary',
  seoTitle,
  seoDescription,
  seoKeywords,
  breadcrumbs,
  accept,
  multiple = true,
  maxFiles = 20,
  actionLabel,
  actionIcon,
  onProcess,
  outputFilename,
  steps,
  features,
  faqs,
  relatedTools,
  optionsPanel,
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [downloadBlob, setDownloadBlob] = React.useState<Blob | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const accentMap = {
    primary: { badge: 'bg-primary/10 text-primary border-primary/20', btn: 'bg-primary hover:bg-primary/90 text-on-primary shadow-primary/20', glow: 'bg-primary/5', ring: 'ring-primary/30', text: 'text-primary' },
    secondary: { badge: 'bg-secondary/10 text-secondary border-secondary/20', btn: 'bg-secondary hover:bg-secondary/90 text-on-secondary shadow-secondary/20', glow: 'bg-secondary/5', ring: 'ring-secondary/30', text: 'text-secondary' },
    tertiary: { badge: 'bg-tertiary/10 text-tertiary border-tertiary/20', btn: 'bg-tertiary hover:bg-tertiary/90 text-on-tertiary shadow-tertiary/20', glow: 'bg-tertiary/5', ring: 'ring-tertiary/30', text: 'text-tertiary' },
    error: { badge: 'bg-error/10 text-error border-error/20', btn: 'bg-error hover:bg-error/90 text-on-error shadow-error/20', glow: 'bg-error/5', ring: 'ring-error/30', text: 'text-error' },
  };
  const ac = accentMap[accentColor];

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming);
    setFiles(prev => {
      const combined = multiple ? [...prev, ...arr] : arr;
      return combined.slice(0, maxFiles);
    });
    setDownloadBlob(null);
    setError(null);
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    setDownloadBlob(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleProcess = async () => {
    if (!files.length) return;
    setProcessing(true);
    setError(null);
    setDownloadBlob(null);
    try {
      const blob = await onProcess(files);
      setDownloadBlob(blob);
    } catch (err: any) {
      setError(err?.message ?? 'Processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadBlob) return;
    const url = URL.createObjectURL(downloadBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = outputFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <ToolPageWrapper
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      accentColor={accentColor}
    >
      <SEO title={seoTitle} description={seoDescription} keywords={seoKeywords} />

      <div className="max-w-4xl mx-auto px-4 space-y-16 sm:space-y-24">

        {/* HERO BADGE */}
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
          <div className={cn('inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest', ac.badge)}>
            <Layers className="size-3" /> {badgeText}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-on-surface">
            {title}
          </h1>
          <p className="text-on-surface-variant text-base sm:text-lg font-medium leading-relaxed opacity-80">
            {description}
          </p>
        </div>

        {/* TOOL PANEL */}
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className={cn('absolute top-0 right-0 w-96 h-96 blur-[120px] pointer-events-none', ac.glow)} />

          <div className="relative z-10 space-y-8">

            {/* DROP ZONE */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300',
                isDragging
                  ? cn('border-primary scale-[1.01]', ac.glow, ac.ring, 'ring-2')
                  : 'border-outline-variant/40 hover:border-outline-variant/80 hover:bg-surface-container-lowest/50'
              )}
            >
              <div className={cn('size-16 rounded-2xl flex items-center justify-center', ac.badge)}>
                <Upload className="size-8" />
              </div>
              <div className="text-center">
                <p className="font-black text-on-surface text-lg">Drop files here or <span className={ac.text}>click to browse</span></p>
                <p className="text-sm text-on-surface-variant mt-1">Accepts {accept} · Max {maxFiles} file{maxFiles > 1 ? 's' : ''}</p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={e => addFiles(e.target.files)}
              />
            </div>

            {/* FILE LIST */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60">
                    {files.length} file{files.length > 1 ? 's' : ''} selected
                  </p>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {files.map((file, idx) => (
                      <motion.div
                        key={`${file.name}-${idx}`}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-center gap-3 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl px-4 py-3"
                      >
                        <FileText className={cn('size-5 shrink-0', ac.text)} />
                        <span className="text-sm font-medium text-on-surface flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-on-surface-variant shrink-0">{formatBytes(file.size)}</span>
                        <button
                          onClick={e => { e.stopPropagation(); removeFile(idx); }}
                          className="size-6 rounded-full flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors shrink-0"
                        >
                          <X className="size-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* OPTIONS PANEL */}
            {optionsPanel && files.length > 0 && (
              <div className="bg-surface-container-lowest/50 border border-outline-variant/20 rounded-2xl p-6">
                {optionsPanel}
              </div>
            )}

            {/* ERROR */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-error/10 border border-error/30 text-error rounded-2xl px-5 py-4 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ACTION BUTTON / DOWNLOAD */}
            <AnimatePresence mode="wait">
              {!downloadBlob ? (
                <motion.button
                  key="process"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleProcess}
                  disabled={!files.length || processing}
                  className={cn(
                    'w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed',
                    ac.btn
                  )}
                >
                  {processing ? (
                    <>
                      <div className="size-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>{actionIcon} {actionLabel}</>
                  )}
                </motion.button>
              ) : (
                <motion.div
                  key="download"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-2xl px-5 py-4">
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                    <span className="text-sm font-bold text-on-surface">Ready to download — {outputFilename}</span>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs bg-primary hover:bg-primary/90 text-on-primary shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                  >
                    <Download className="size-5" /> Download File
                  </button>
                  <button
                    onClick={() => { setFiles([]); setDownloadBlob(null); setError(null); }}
                    className="w-full py-3 rounded-2xl text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Process another file
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* TRUST SIGNALS */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 py-4">
          {[
            { icon: Shield, text: 'Your files are secure. Processed in browser.' },
            { icon: Zap, text: 'No upload to server' },
            { icon: Users, text: 'Used by 10,000+ users' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
              <Icon className="size-4 text-primary shrink-0" /> {text}
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-on-surface">How It Works</h2>
            <p className="text-on-surface-variant mt-2 text-sm">Three simple steps to get your result</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-low border border-outline-variant/30 rounded-[2rem] p-8 text-center relative overflow-hidden group"
              >
                <div className={cn('absolute -top-4 -right-4 text-[80px] font-black opacity-5', ac.text)}>
                  {i + 1}
                </div>
                <div className={cn('size-14 rounded-2xl flex items-center justify-center mx-auto mb-5', ac.badge)}>
                  {step.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">Step {i + 1}</p>
                <h3 className="font-black text-on-surface mb-2">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ADS */}
        <div className="rounded-[2.5rem] overflow-hidden border border-outline-variant/30 shadow-inner bg-surface-container-lowest/30">
          <AdSense slot="8156203131" />
        </div>

        {/* FEATURES */}
        <div className="space-y-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-on-surface">Why Use This Tool?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-6 hover:border-outline-variant/50 transition-colors"
              >
                <div className={cn('size-10 rounded-xl flex items-center justify-center shrink-0', ac.badge)}>
                  {feat.icon}
                </div>
                <div>
                  <h3 className="font-black text-on-surface mb-1 text-sm">{feat.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-on-surface">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="font-bold text-sm text-on-surface">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="size-4 text-on-surface-variant shrink-0" />
                    : <ChevronDown className="size-4 text-on-surface-variant shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED TOOLS */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-black text-on-surface-variant uppercase tracking-widest text-sm">Try Another Tool</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {relatedTools.map((tool, i) => (
              <Link
                key={i}
                to={tool.path}
                className="group flex items-center gap-3 bg-surface-container-low hover:bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/60 px-6 py-4 rounded-full transition-all shadow-sm hover:shadow-md"
              >
                <span className={cn('transition-transform group-hover:rotate-12', ac.text)}>{tool.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest text-on-surface/80">{tool.name}</span>
                <ArrowRight className="size-3 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </ToolPageWrapper>
  );
};
