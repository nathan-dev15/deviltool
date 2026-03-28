import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Upload, 
  Download, 
  Trash2, 
  Settings, 
  Info, 
  ChevronRight, 
  FileImage, 
  Zap,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';
import { ToolPageWrapper } from '@/src/components/ToolPageWrapper';
import { AdSense } from '@/src/components/AdSense';
import { useI18n } from '@/src/i18n/I18nContext';

export const ImageCompressor: React.FC = () => {
  const { t } = useI18n();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setOriginalImage(result);
      compressImage(result, quality);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (base64: string, q: number) => {
    setIsCompressing(true);
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', q);
      setCompressedImage(compressedDataUrl);

      // Calculate size from base64
      const stringLength = compressedDataUrl.split(',')[1].length;
      const sizeInBytes = Math.floor(stringLength * 0.75);
      setCompressedSize(sizeInBytes);
      setIsCompressing(false);
    };
  };

  useEffect(() => {
    if (originalImage) {
      compressImage(originalImage, quality);
    }
  }, [quality]);

  const downloadImage = () => {
    if (!compressedImage) return;
    const a = document.createElement('a');
    a.href = compressedImage;
    a.download = `compressed_${fileName.split('.')[0]}.jpg`;
    a.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const savings = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0;

  return (
    <ToolPageWrapper
      title="Smart Image Compressor"
      description="Reduce image file size up to 90% without visible quality loss. High-speed, browser-based optimization for JPG, PNG, and WebP."
      breadcrumbs={[
        { label: "Image Tools", href: "#" },
        { label: "Image Compressor" }
      ]}
      accentColor="secondary"
    >
      <SEO 
        title="Image Compressor - Reduce Image File Size Online"
        description="Compress JPG, PNG, and WebP images online for free. Reduce file size without losing quality. Secure and private browser-based compression."
        keywords="image compressor, compress image, reduce image size, online image optimizer"
      />

      <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-8">
          
          <AnimatePresence mode="wait">
            {!originalImage ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center relative group hover:border-secondary transition-all hover:bg-secondary/[0.02]"
              >
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="size-12" />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-slate-800 dark:text-white">Optimize Your Image</h3>
                  <p className="text-slate-500 dark:text-slate-400">Drag & drop or Click to browse files</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="workspace"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Visual Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Original */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Original</span>
                      <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400">
                        {formatSize(originalSize)}
                      </span>
                    </div>
                    <div className="aspect-square flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/30 dark:bg-slate-950/30 relative overflow-hidden">
                       <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* Compressed */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-900/50">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Optimized</span>
                      <span className="px-2 py-0.5 bg-secondary/10 rounded text-[10px] font-bold text-secondary">
                        {formatSize(compressedSize)}
                      </span>
                    </div>
                    <div className="aspect-square flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-800/30 dark:bg-slate-950/30 relative overflow-hidden">
                      {isCompressing && (
                        <div className="absolute inset-0 bg-white dark:bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
                          <Zap className="size-8 text-secondary animate-pulse" />
                        </div>
                      )}
                      {compressedImage && (
                        <img 
                          src={compressedImage} 
                          alt="Compressed" 
                          className="max-w-full max-h-full object-contain shadow-2xl rounded-lg group-hover:scale-105 transition-transform duration-500" 
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Status & Actions Hero */}
                <div className="bg-secondary/5 dark:bg-secondary/[0.06] p-8 rounded-[2rem] border border-secondary/10 dark:border-secondary/20 flex flex-wrap gap-6 items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="size-16 bg-success/10 rounded-2xl flex items-center justify-center text-success border border-success/20">
                      <CheckCircle2 className="size-8" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-1">{t('label.total_compression')}</p>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                        {savings}% <span className="text-sm font-medium text-slate-500 dark:text-slate-300">{t('label.savings')}</span>
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setOriginalImage(null)}
                      className="px-6 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-2xl font-bold flex items-center gap-2 hover:bg-error/5 hover:text-error hover:border-error/20 transition-all active:scale-95"
                    >
                      <Trash2 size={20} /> {t('action.reset')}
                    </button>
                    <button 
                      onClick={downloadImage}
                      className="px-8 py-4 bg-secondary text-white rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <Download size={20} /> {t('action.download_optimized')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
             <AdSense slot="1234567890" />
          </div>
        </div>

        {/* Sidebar Settings */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-slate-800 dark:text-white">
              <Settings className="text-secondary size-6" /> {t('label.optimization')}
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('label.target_quality')}</label>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-lg font-black text-sm">{Math.round(quality * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>{t('label.maximum_savings')}</span>
                  <span>{t('label.perfect_quality')}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <Info className="size-5 text-secondary shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Compressed images are generated as <strong className="text-slate-700 dark:text-slate-200">JPEG</strong> to ensure the best possible file size reduction across all platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary p-8 rounded-3xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={80} />
            </div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
               <Zap className="size-5" /> {t('label.ultra_private')}
            </h4>
            <p className="text-sm text-white/80 leading-relaxed">
              Your images never leave your computer. All processing happens 100% locally in your browser memory.
            </p>
          </div>
        </aside>
      </div>
    </ToolPageWrapper>
  );
};
