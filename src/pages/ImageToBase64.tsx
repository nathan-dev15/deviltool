import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Upload, Copy, Trash2, Info, ChevronRight, Home as HomeIcon, Download, FileCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { SEO } from '@/src/components/SEO';

export const ImageToBase64: React.FC = () => {
  const [base64, setBase64] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [fileSize, setFileSize] = React.useState('');
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(2) + ' KB');

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setBase64(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
  };

  const clear = () => {
    setBase64('');
    setFileName('');
    setFileSize('');
    setPreview(null);
  };

  return (
    <div className="px-4 py-12">
      <SEO 
        title="Image to Base64 Converter - Encode Images Online"
        description="Convert images to Base64 strings instantly. Free online tool to encode PNG, JPG, and GIF images for use in HTML, CSS, or JSON. Fast and secure conversion."
        keywords="image to base64, base64 encoder, encode image, image tools, developer tools"
      />
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Image Tools</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Image to Base64</li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Image to Base64</h1>
        <p className="text-slate-600 dark:text-slate-400">Convert your images into Base64 strings instantly for embedding in HTML, CSS, or JSON.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* Upload Area */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center relative group hover:border-primary transition-colors">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
            />
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <Upload className="size-10" />
              </div>
              <h3 className="text-xl font-bold mb-2">Click or Drag Image Here</h3>
              <p className="text-slate-500 text-sm">Supports PNG, JPG, WebP, and SVG up to 5MB.</p>
            </div>
          </div>

          {base64 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                <span className="text-xs font-bold uppercase text-slate-500">Base64 String</span>
                <div className="flex gap-2">
                  <button onClick={copyToClipboard} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                    <Copy className="size-3" /> Copy String
                  </button>
                  <button onClick={clear} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1">
                    <Trash2 className="size-3" /> Clear
                  </button>
                </div>
              </div>
              <div className="p-4">
                <textarea 
                  readOnly
                  value={base64}
                  className="w-full h-48 font-mono text-xs bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border-0 focus:ring-0 resize-none break-all"
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          {/* Preview Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="text-primary size-5" /> Image Preview
            </h3>
            <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800">
              {preview ? (
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-center p-8">
                  <ImageIcon className="size-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                  <p className="text-xs text-slate-400">No image selected</p>
                </div>
              )}
            </div>
            {fileName && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">File Name:</span>
                  <span className="font-bold truncate max-w-[150px]">{fileName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">File Size:</span>
                  <span className="font-bold">{fileSize}</span>
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <FileCode className="text-primary size-5" /> Usage Examples
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">HTML Image</p>
                <div className="bg-slate-900 p-3 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto">
                  <code>&lt;img src="data:image/png;base64,..." /&gt;</code>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">CSS Background</p>
                <div className="bg-slate-900 p-3 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto">
                  <code>background-image: url("data:image/png;base64,...");</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
