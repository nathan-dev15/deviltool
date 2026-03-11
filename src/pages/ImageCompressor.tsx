import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Download, Trash2, Settings, Info, ChevronRight, Home as HomeIcon, FileImage, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';

export const ImageCompressor: React.FC = () => {
  const [originalImage, setOriginalImage] = React.useState<string | null>(null);
  const [compressedImage, setCompressedImage] = React.useState<string | null>(null);
  const [quality, setQuality] = React.useState(0.8);
  const [originalSize, setOriginalSize] = React.useState(0);
  const [compressedSize, setCompressedSize] = React.useState(0);
  const [fileName, setFileName] = React.useState('');
  const [isCompressing, setIsCompressing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      compressImage(event.target?.result as string, quality);
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

  React.useEffect(() => {
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
    <div className="px-4 py-12">
      <SEO 
        title="Image Compressor - Reduce Image File Size Online"
        description="Compress JPG, PNG, and WebP images online for free. Reduce file size without losing quality. Fast, secure, and private browser-based compression."
        keywords="image compressor, compress image, reduce image size, online image optimizer, photo compressor"
      />
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Image Tools</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Image Compressor</li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Image Compressor</h1>
        <p className="text-slate-600 dark:text-slate-400">Optimize your images with high quality compression. Reduce file size without losing clarity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {!originalImage ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border-4 border-dashed border-slate-200 dark:border-slate-800 p-20 text-center relative group hover:border-primary transition-all">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Upload className="size-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Select Image to Compress</h3>
                <p className="text-slate-500">Drag and drop your image here or click to browse</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs font-bold uppercase text-slate-500">Original</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{formatSize(originalSize)}</span>
                </div>
                <div className="aspect-square flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950">
                  <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs font-bold uppercase text-slate-500">Compressed</span>
                  <span className="text-xs font-bold text-primary">{formatSize(compressedSize)}</span>
                </div>
                <div className="aspect-square flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 relative">
                  {isCompressing && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-10">
                      <Zap className="size-8 text-primary animate-pulse" />
                    </div>
                  )}
                  {compressedImage && <img src={compressedImage} alt="Compressed" className="max-w-full max-h-full object-contain" />}
                </div>
              </div>
            </div>
          )}

          {originalImage && (
            <div className="flex flex-wrap gap-4 items-center justify-between bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                  <Zap className="size-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase">Total Savings</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{savings}% Smaller</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setOriginalImage(null);
                    setCompressedImage(null);
                  }}
                  className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                >
                  <Trash2 className="size-5" /> Reset
                </button>
                <button 
                  onClick={downloadImage}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Download className="size-5" /> Download
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Settings className="text-primary size-5" /> Compression Settings
            </h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase">Quality</label>
                  <span className="text-primary font-black">{Math.round(quality * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Smallest File</span>
                  <span>Best Quality</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Info className="text-primary size-5" /> Privacy First
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Your images are processed entirely in your browser. We never upload your files to our servers, ensuring 100% privacy and security.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
