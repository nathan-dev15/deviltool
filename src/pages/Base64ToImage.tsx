import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Trash2, Wand2, ChevronRight, Home as HomeIcon, FileImage, Info, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/SEO';
import { AdSense } from '@/src/components/AdSense';
import { useToolActions } from '@/src/pages/useToolActions';

export const Base64ToImage: React.FC = () => {
  const [base64Input, setBase64Input] = useState('');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { downloadFile } = useToolActions();

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
    <div className="px-4 py-12">
      <SEO 
        title="Base64 to Image Converter - Decode Base64 Strings"
        description="Convert Base64 strings back into images instantly. Free online tool to decode Base64 into PNG, JPG, or GIF formats. Fast, secure, and browser-based."
        keywords="base64 to image, decode base64, base64 decoder, image tools, developer tools"
      />
      
      <nav className="flex mb-8 text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li><Link to="/" className="hover:text-primary flex items-center gap-1"><HomeIcon className="size-3" /> Home</Link></li>
          <li><ChevronRight className="size-3" /></li>
          <li>Image Tools</li>
          <li><ChevronRight className="size-3" /></li>
          <li className="text-primary font-medium">Base64 to Image</li>
        </ol>
      </nav>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4">Base64 to Image</h1>
        <p className="text-slate-600 dark:text-slate-400">Decode your Base64 strings back into visual image files instantly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <span className="text-xs font-bold uppercase text-slate-500">Paste Base64 String</span>
              <button onClick={clear} className="text-xs font-bold text-red-500 hover:underline flex items-center gap-1">
                <Trash2 className="size-3" /> Clear
              </button>
            </div>
            <textarea 
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAA..."
              className="w-full h-80 font-mono text-xs bg-transparent p-4 border-0 focus:ring-0 resize-none break-all"
            />
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={handleConvert}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Wand2 className="size-5" /> Decode to Image
              </button>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/30 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="size-4" /> {error}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="text-primary size-5" /> Image Result
            </h3>
            <div className="aspect-square bg-slate-50 dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-800 relative">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt="Decoded result" 
                  className="max-w-full max-h-full object-contain"
                  onError={() => setError("Invalid Base64 image data.")}
                />
              ) : (
                <div className="text-center p-8">
                  <FileImage className="size-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
                  <p className="text-xs text-slate-400">Image will appear here after decoding</p>
                </div>
              )}
            </div>
            
            {imageSrc && !error && (
              <button 
                onClick={handleDownload}
                className="w-full mt-6 bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Download className="size-5" /> Download Image
              </button>
            )}
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h4 className="font-bold mb-4 flex items-center gap-2 text-primary">
              <Info size={18} /> Did you know?
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Base64 strings often start with a "Data URI" prefix like <code>data:image/png;base64,</code>. 
              This tool automatically detects that prefix. If it's missing, we assume it's a PNG for the best compatibility.
            </p>
          </div>
        </div>
      </div>

      <AdSense slot="1234567890" />

      <section className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4">What is Base64 to Image?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Base64 is a binary-to-text encoding scheme. Converting Base64 back to an image allows you to view the 
            original file from code snippets found in HTML, CSS, or JSON files. This is extremely useful for 
            developers debugging embedded assets.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Privacy & Security</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Like all tools on ToolNest, conversion happens <strong>entirely in your browser</strong>. 
            Your Base64 strings are never sent to our servers, ensuring your sensitive data and images remain private.
          </p>
        </div>
      </section>
    </div>
  );
};