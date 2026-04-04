import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  Copy, 
  Trash2, 
  Info, 
  ChevronRight, 
  Download, 
  FileCode, 
  Sparkles, 
  Zap,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { useToolActions } from '@/src/pages/useToolActions';
import { AdSense } from '@/src/components/AdSense';

export const ImageToBase64: React.FC = () => {
  const [base64, setBase64] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [fileSize, setFileSize] = React.useState('');
  const [preview, setPreview] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const { copied, copyToClipboard } = useToolActions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return setError("File size exceeds 5MB limit.");

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(2) + ' KB');

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsDataURL(file);
  };

  const clear = () => {
    setBase64('');
    setFileName('');
    setFileSize('');
    setPreview(null);
    setError(null);
  };

  return (
    <ToolPageWrapper
      title="Image to Base64"
      description="Convert images to Base64 strings instantly. Embed PNG, JPG, or SVG directly into your HTML, CSS, or JSON files without external assets."
      breadcrumbs={[
        { label: "Image Tools", href: "#" },
        { label: "Image to Base64" }
      ]}
      accentColor="primary"
    >
      <SEO 
        title="Image to Base64 Converter - Encode Images Online"
        description="Convert images to Base64 strings instantly. Free online tool to encode PNG, JPG, and GIF images for use in HTML, CSS, or JSON."
        keywords="image to base64, base64 encoder, encode image, image tools, developer tools"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Left Column: Upload & Output */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-8">
          
          {/* UPLOAD ZONE */}
          <div className={cn(
            "relative group rounded-3xl border-2 border-dashed transition-all p-12 text-center bg-white dark:bg-slate-900",
            error ? "border-error/50 bg-error/5" : "border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/[0.02]"
          )}>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            <div className="flex flex-col items-center pointer-events-none">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Upload className="size-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Upload Your Image</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Drag and drop or click to select a PNG, JPG, WebP, or SVG (Max 5MB)
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-error/10 border border-error/20 text-error rounded-2xl text-center font-bold animate-shake">
              {error}
            </div>
          )}

          {/* OUTPUT BOX */}
          <AnimatePresence>
            {base64 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl"
              >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Base64 Data URI</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => copyToClipboard(base64)} 
                      className="text-xs font-bold text-primary hover:text-primary-container flex items-center gap-1.5 transition-colors"
                    >
                      <Copy className="size-3.5" /> {copied ? 'Copied URI!' : 'Copy Data URI'}
                    </button>
                    <button onClick={clear} className="text-xs font-bold text-error flex items-center gap-1.5 transition-colors">
                      <Trash2 className="size-3.5" /> Clear
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <textarea 
                    readOnly
                    value={base64}
                    className="w-full h-48 font-mono text-[10px] sm:text-xs bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 focus:ring-0 resize-none break-all text-slate-600 dark:text-slate-400 leading-relaxed"
                  />
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button 
                      onClick={() => copyToClipboard(base64.split(',')[1] || base64)}
                      className="flex-1 min-w-[200px] bg-slate-900 dark:bg-slate-800 text-white px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-slate-700 transition-all shadow-lg active:scale-95"
                    >
                      <Copy size={18} />
                      Copy Raw Base64 (No Prefix)
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
             <AdSense slot="8156203131" />
          </div>
        </div>

        {/* Right Column: Preview & Knowledge */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-8">
          
          {/* PREVIEW CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <Eye className="text-primary size-5" /> Live Preview
            </h3>
            <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800 group relative">
              {preview ? (
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                     <ImageIcon className="size-8 text-slate-300 dark:text-slate-700 dark:text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400 font-medium">No image uploaded</p>
                </div>
              )}
            </div>
            {fileName && (
              <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Name</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">{fileName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Size</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{fileSize}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Status</span>
                   <span className="flex items-center gap-1 text-success font-bold"><CheckCircle2 size={12}/> Encoded</span>
                </div>
              </div>
            )}
          </div>

          {/* HELP CARD */}
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <FileCode size={80} />
            </div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
              <Sparkles className="text-primary size-5" /> Integration
            </h4>
            <div className="space-y-6 relative z-10">
              <div className="group/code">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                  HTML Image
                  <button onClick={() => copyToClipboard('<img src="data:image/png;base64,..." />')} className="opacity-0 group-hover/code:opacity-100 text-primary transition-opacity underline">Copy</button>
                </p>
                <div className="bg-slate-900 p-4 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto border border-white/5 shadow-inner">
                  <code>&lt;img src="data:image/..." /&gt;</code>
                </div>
              </div>
              <div className="group/code">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex justify-between">
                  CSS Background
                  <button onClick={() => copyToClipboard('background-image: url("data:image/png;base64,...");')} className="opacity-0 group-hover/code:opacity-100 text-primary transition-opacity underline">Copy</button>
                </p>
                <div className="bg-slate-900 p-4 rounded-xl text-[10px] font-mono text-emerald-400 overflow-x-auto border border-white/5 shadow-inner">
                  <code>url("data:image/...")</code>
                </div>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-500 leading-relaxed italic border-t border-primary/10 pt-4">
              Tip: Base64 or Data URIs increase binary size by ~33%, but eliminate HTTP requests for small assets.
            </p>
          </div>

        </div>
      </div>
    </ToolPageWrapper>
  );
};
