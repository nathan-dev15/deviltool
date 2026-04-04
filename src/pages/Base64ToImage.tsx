import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Download, 
  Trash2, 
  Wand2, 
  ChevronRight, 
  FileImage, 
  Info, 
  AlertCircle,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from '@/src/components/AdSense';
import { useToolActions } from '@/src/pages/useToolActions';
import { cn } from '@/src/lib/utils';

export const Base64ToImage: React.FC = () => {
  const [base64Input, setBase64Input] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { copied, copyToClipboard } = useToolActions();

  const handleConvert = () => {
    setError(null);
    const trimmedInput = base64Input.trim();

    if (!trimmedInput) {
      setError("Please paste a Base64 string.");
      return;
    }

    // Check if it's already a Data URL, otherwise prepend common prefix
    let source = trimmedInput;
    if (!source.startsWith('data:image/')) {
      // Defaulting to PNG if prefix is missing
      source = `data:image/png;base64,${source}`;
    }

    setImageSrc(source);
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    
    // Extract mime type and base64 data
    const matches = imageSrc.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches) return;
    
    const contentType = matches[1];
    const extension = contentType.split('/')[1];
    
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `decoded-image.${extension}`;
    link.click();
  };

  const clear = () => {
    setBase64Input('');
    setImageSrc(null);
    setError(null);
  };

  return (
    <ToolPageWrapper
      title="Base64 to Image"
      description="Reverse Base64 strings back into original image files. Supports PNG, JPG, WebP, and SVG formats with instant preview."
      breadcrumbs={[
        { label: "Image Tools", href: "#" },
        { label: "Base64 to Image" }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="Base64 to Image Converter - Decode Base64 Strings"
        description="Convert Base64 strings back into images instantly. Free online tool to decode Base64 into PNG, JPG, or SVG."
        keywords="base64 to image, decode base64, base64 decoder, image tools"
      />

      <div className="grid lg:grid-cols-12 gap-6 animate-fade-in">
        {/* Input Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col group transition-all hover:border-primary/20 hover:shadow-lg">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Encoded Base64 Input</span>
              <button 
                onClick={clear} 
                className="text-xs font-bold text-error hover:text-error/80 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="size-3.5" /> Clear All
              </button>
            </div>
            
            <textarea 
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Paste data:image/png;base64,... string or raw Base64 here"
              className="w-full h-80 font-mono text-xs bg-transparent p-6 border-0 focus:ring-0 resize-none break-all text-slate-600 dark:text-slate-400 leading-relaxed outline-none"
            />
            
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={handleConvert}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
              >
                <Zap className="size-5" /> Generate Image File
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-error/10 border border-error/20 text-error rounded-2xl text-sm font-bold flex items-center gap-3 animate-shake">
              <AlertCircle className="size-5 shrink-0" /> {error}
            </div>
          )}
        </div>

        {/* Output/Preview Area */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <Eye className="text-primary size-6" /> Image Reconstruction
            </h3>
            
            <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800 relative group">
              {imageSrc && !error ? (
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={imageSrc} 
                  alt="Decoded result" 
                  className="max-w-full max-h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  onError={() => setError("Invalid Base64 image data format.")}
                />
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                     <FileImage className="size-8 text-slate-300 dark:text-slate-700 dark:text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Rendered image will appear here</p>
                </div>
              )}
            </div>
            
            <AnimatePresence>
              {imageSrc && !error && (
                <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800"
                >
                  <button 
                    onClick={handleDownload}
                    className="w-full bg-slate-900 dark:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-slate-700 transition-all shadow-lg active:scale-95"
                  >
                    <Download className="size-5" /> Download Decoded File
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-success">
                     <CheckCircle2 size={14} />
                     <span className="text-[10px] uppercase font-black tracking-widest">Valid Resource Detected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Section */}
          <div className="bg-primary/5 dark:bg-primary/[0.02] rounded-[2rem] p-8 border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <Sparkles size={80} />
            </div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
              <Info size={20} className="text-primary" /> Technical Tip
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">
              Base64 strings often include a metadata prefix (e.g., <code>data:image/png;base64,</code>). 
              Our smart decoder detects this automatically, extracts the pure data, and reconstructs the image with its correct file extension.
            </p>
          </div>
        </div>

        <div className="lg:col-span-12">
            <AdSense slot="1234567890" className="!mt-4 !mb-0" />
        </div>
      </div>
    </ToolPageWrapper>
  );
};
