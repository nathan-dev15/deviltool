import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Trash2,
  RotateCw,
  FlipHorizontal,
  Zap,
  Eye,
  EyeOff,
  Info,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { AdSense } from "@/src/components/AdSense";
import { ToolPageWrapper } from "@/src/components/ToolPageWrapper";
import { useI18n } from "@/src/i18n/I18nContext";

/* ---------- MAIN TOOL ---------- */

export const ImageSizeConverterTool = () => {
  const { t } = useI18n();

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState("");
  const [originalPreview, setOriginalPreview] = useState("");

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [aspect, setAspect] = useState(true);
  const [quality, setQuality] = useState(0.9);
  const [format, setFormat] = useState("image/png");

  const [rotate, setRotate] = useState(0);
  const [flip, setFlip] = useState(false);
  const [filter, setFilter] = useState("none");

  const [targetKB, setTargetKB] = useState(0);
  const [originalSize, setOriginalSize] = useState(0);

  const [auto, setAuto] = useState(true);
  const [showBefore, setShowBefore] = useState(false);
  const [error, setError] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ---------- LOAD FILE ---------- */

  const loadFile = (file: File) => {

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    setError("");

    const img = new Image();
    const url = URL.createObjectURL(file);

    setOriginalSize(file.size);

    img.onload = () => {
      setImage(img);
      setWidth(img.width);
      setHeight(img.height);
      setPreview(url);
      setOriginalPreview(url);
    };

    img.src = url;
  };

  /* ---------- DRAG DROP ---------- */

  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  /* ---------- PASTE ---------- */

  useEffect(() => {
    const handlePaste = (e: any) => {
      const file = e.clipboardData?.files?.[0];
      if (file) loadFile(file);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  /* ---------- PROCESS IMAGE ---------- */

  const processImage = () => {

    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx?.save();

    ctx?.translate(width / 2, height / 2);
    ctx?.rotate((rotate * Math.PI) / 180);
    ctx?.scale(flip ? -1 : 1, 1);

    ctx!.filter = filter;

    ctx?.drawImage(image, -width / 2, -height / 2, width, height);

    ctx?.restore();

    let dataUrl = canvas.toDataURL(format, quality);

    if (targetKB > 0) {
      let q = quality;
      while (dataUrl.length / 1024 > targetKB && q > 0.1) {
        q -= 0.05;
        dataUrl = canvas.toDataURL(format, q);
      }
    }

    setPreview(dataUrl);
  };

  /* ---------- AUTO PROCESS ---------- */

  useEffect(() => {
    if (auto) processImage();
  }, [width, height, quality, format, rotate, flip, filter]);

  /* ---------- ASPECT ---------- */

  const handleWidth = (w: number) => {
    if (!image) return;
    setWidth(w);
    if (aspect) {
      const ratio = image.height / image.width;
      setHeight(Math.round(w * ratio));
    }
  };

  const handleHeight = (h: number) => {
    if (!image) return;
    setHeight(h);
    if (aspect) {
      const ratio = image.width / image.height;
      setWidth(Math.round(h * ratio));
    }
  };

  /* ---------- DOWNLOAD ---------- */

  const download = () => {
    const a = document.createElement("a");
    a.href = preview;
    a.download = `optimized.${format.split("/")[1]}`;
    a.click();
  };

  /* ---------- CLEAR ---------- */

  const clearAll = () => {
    setImage(null);
    setPreview("");
    setOriginalPreview("");
  };

  const saved =
    originalSize && preview
      ? Math.round((1 - preview.length / originalSize) * 100)
      : 0;

  return (
    <ToolPageWrapper
      title={t('tools.image-size-converter.name')}
      description={t('tools.image-size-converter.description')}
      accentColor="secondary"
    >
      <SEO
        title="Image Resizer & KB Converter | Compress Photo to Size Online"
        description="Resize images, change dimensions, and compress to exact KB size online. Support for PNG, JPG and WebP with real-time preview."
        keywords="image resizer, compress image to kb, photo size converter, image optimizer"
        canonicalUrl="https://koobrain.com/image-size-converter"
      />

      <div className="max-w-6xl mx-auto space-y-12 py-8">
        {/* Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById('image-upload')?.click()}
          className="group relative cursor-pointer"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative border-2 border-dashed border-outline-variant/30 dark:border-outline-variant/20 bg-surface-container-low/40 dark:bg-surface-container-low/20 backdrop-blur-xl p-12 sm:p-20 text-center rounded-[2.5rem] hover:bg-surface-container-low transition-all">
            <div className="size-20 bg-secondary/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <Upload className="size-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-black text-on-surface mb-2 uppercase tracking-tight">Drop your masterpiece</h3>
            <p className="text-on-surface-variant font-medium italic opacity-60">
              Drag & Drop, Paste, or Select an image to begin optimizing.
            </p>
            <input
              id="image-upload"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) loadFile(f);
              }}
            />
          </div>
        </div>

        {error && (
          <div className="bg-error/10 text-error px-6 py-4 rounded-2xl border border-error/20 flex items-center gap-3 animate-shake font-bold text-sm">
            <Zap className="size-4" /> {error}
          </div>
        )}

        {preview && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
            {/* PREVIEW PANEL */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-surface-container-low/30 border border-outline-variant/20 rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                   <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-white border border-white/10">
                      {showBefore ? "Before (Original)" : "After (Optimized)"}
                   </div>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setShowBefore(!showBefore)}
                    className="size-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white transition-all active:scale-95"
                  >
                    {showBefore ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <div className="min-h-[400px] flex items-center justify-center bg-transparent relative">
                  <div className="absolute inset-0 bg-transparent" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <img
                    src={showBefore ? originalPreview : preview}
                    className="max-w-full max-h-[600px] object-contain shadow-2xl z-20"
                    alt="Preview"
                  />
                </div>

                <div className="p-6 bg-surface-container-low/50 backdrop-blur-md border-t border-outline-variant/10 flex flex-wrap items-center justify-between gap-4">
                   <div className="flex gap-4">
                      <div className="space-y-0.5">
                         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 italic">Resolution</p>
                         <p className="font-bold text-on-surface text-sm tabular-nums">{width} × {height} px</p>
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 italic">Savings</p>
                         <p className="font-black text-secondary text-sm tabular-nums">-{saved}%</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <button onClick={clearAll} className="size-11 rounded-xl bg-error/10 hover:bg-error/20 text-error flex items-center justify-center transition-all border border-error/10"><Trash2 size={18} /></button>
                      <button onClick={download} className="px-8 py-3 rounded-xl bg-secondary text-on-secondary font-black uppercase tracking-widest text-xs shadow-lg shadow-secondary/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                        <Download size={14} /> Download
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* CONTROLS PANEL */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl space-y-8">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                    <Trash2 size={14} /> Resize Dimensions
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Width</label>
                      <input type="number" value={width} onChange={(e)=>handleWidth(+e.target.value)} className="w-full px-5 py-3.5 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface outline-none focus:ring-4 ring-secondary/10 transition-all"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Height</label>
                      <input type="number" value={height} onChange={(e)=>handleHeight(+e.target.value)} className="w-full px-5 py-3.5 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface outline-none focus:ring-4 ring-secondary/10 transition-all"/>
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className={`size-5 rounded-md border-2 transition-all flex items-center justify-center ${aspect ? 'bg-secondary border-secondary shadow-lg shadow-secondary/20' : 'border-outline-variant' }`}>
                      {aspect && <div className="size-2 bg-on-secondary rounded-full" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={aspect} onChange={()=>setAspect(!aspect)}/>
                    <span className="text-xs font-bold text-on-surface">Maintain Aspect Ratio</span>
                  </label>
                </div>

                <div className="space-y-6 pt-8 border-t border-outline-variant/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                    <Zap size={14} /> Format & Quality
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Output Format</label>
                      <select value={format} onChange={(e)=>setFormat(e.target.value)} className="w-full px-5 py-3.5 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface outline-none focus:ring-4 ring-secondary/10 transition-all appearance-none cursor-pointer">
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPG</option>
                        <option value="image/webp">WEBP</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 ml-1">Target Size (KB)</label>
                      <input
                        type="number"
                        placeholder="e.g. 100"
                        onChange={(e)=>setTargetKB(+e.target.value)}
                        className="w-full px-5 py-3.5 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-sm font-bold text-on-surface outline-none focus:ring-4 ring-secondary/10 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-on-surface">Compression Quality</label>
                      <span className="text-xs font-black text-secondary">{Math.round(quality * 100)}%</span>
                    </div>
                    <input type="range" min="0.1" max="1" step="0.01" value={quality} onChange={(e)=>setQuality(+e.target.value)} className="w-full accent-secondary h-1.5 bg-outline-variant/20 rounded-full appearance-none cursor-pointer" />
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-outline-variant/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
                    <RotateCw size={14} /> Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={()=>setRotate(rotate+90)} className="flex items-center justify-center gap-3 py-4 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10 hover:text-secondary transition-all active:scale-95"><RotateCw size={14}/> Rotate 90°</button>
                    <button onClick={()=>setFlip(!flip)} className="flex items-center justify-center gap-3 py-4 bg-surface-container-highest border border-outline-variant/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary/10 hover:text-secondary transition-all active:scale-95"><FlipHorizontal size={14}/> Flip Image</button>
                  </div>
                </div>

                <button onClick={processImage} className="w-full py-5 rounded-3xl bg-surface-container-highest border-2 border-secondary/10 text-secondary font-black uppercase tracking-[0.2em] text-xs hover:bg-secondary hover:text-on-secondary hover:scale-[1.02] shadow-xl hover:shadow-secondary/20 transition-all active:scale-95">
                  Process Image Instance
                </button>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden"/>

        {/* SEO CONTENT GRID */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 animate-fade-in px-2">
            {[
                {
                    icon: Info,
                    title: "What is an Image Size Converter?",
                    desc: "An online tool that allows you to change the physical dimensions (width/height) and file size (KB) of an image while preserving maximum possible quality. It's essential for optimizing web performance and meeting upload requirements."
                },
                {
                    icon: TrendingUp,
                    title: "Why Compress to Specific KB?",
                    desc: "Many government and job portals require images to be under a specific size (e.g., 50KB or 100KB). Our smart algorithm iteratively optimizes quality to meet your target threshold perfectly."
                },
                {
                    icon: ShieldCheck,
                    title: "Safe & Local Processing",
                    desc: "Your privacy is our priority. At KooBrain, all image transformations happen in your browser. We never upload your personal photos to a server, ensuring 100% data confidentiality."
                }
            ].map((item, i) => (
                <div key={i} className="space-y-4 p-8 rounded-[2rem] bg-surface-container-low/30 border border-outline-variant/30 hover:bg-surface-container-low transition-all">
                    <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                        <item.icon className="size-6" />
                    </div>
                    <h2 className="text-lg font-black tracking-tight text-on-surface leading-tight">
                        {item.title}
                    </h2>
                    <p className="text-on-surface-variant text-sm font-medium leading-relaxed opacity-75">
                        {item.desc}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </ToolPageWrapper>
  );
};
