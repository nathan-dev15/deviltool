import React, { ReactNode } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Download, RotateCw, FlipHorizontal, Check, Link2, Link2Off, Trash2, Plus, Undo2, RefreshCcw, Type, ImagePlus, Palette } from "lucide-react";
import { InspectorGroup } from "./InspectorGroupProps";
import { ComparisonSlider } from "./ComparisonSlider";
import { Dropzone } from "./DropzoneProps";
import { BatchQueue, type QueueItem } from "./BatchQueue";
import { useImageProcessor, formatSize } from "./useImageProcessor";
import { useI18n } from "../../i18n/I18nContext";

const FORMATS = ["PNG", "JPG", "WEBP"] as const;
const PRESETS = [
  { id: "web" as const, label: "Web", desc: "Max 1920px, WebP 75%" },
  { id: "social" as const, label: "Social", desc: "1200px, JPEG 85%" },
  { id: "lossless" as const, label: "Lossless", desc: "Original size, PNG" },
];
const RESOLUTIONS = [
  { label: "HD", width: 1280, height: 720 },
  { label: "FHD", width: 1920, height: 1080 },
  { label: "2K", width: 2560, height: 1440 },
  { label: "4K", width: 3840, height: 2160 },
];

export const ProImageTool = () => {
  const { t } = useI18n();
  const { state, set, loadFile, setWidth, setHeight, download, reset, applyPreset, savings, undo, resetTransformations, hasHistory, saveSnapshot } = useImageProcessor();
  const [downloadState, setDownloadState] = useState<"idle" | "success">("idle");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeQueueId, setActiveQueueId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const file = e.clipboardData?.files?.[0];
      if (file) addToQueue(file);
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const addToQueue = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const id = crypto.randomUUID();
    const thumbnail = URL.createObjectURL(file);
    const item: QueueItem = { id, file, thumbnail, name: file.name };
    setQueue((prev) => [...prev, item]);
    setActiveQueueId(id);
    loadFile(file);
  }, [loadFile]);

  const handleFile = useCallback((file: File) => {
    addToQueue(file);
  }, [addToQueue]);

  const handleQueueSelect = useCallback((id: string) => {
    const item = queue.find((q) => q.id === id);
    if (item) {
      setActiveQueueId(id);
      loadFile(item.file);
    }
  }, [queue, loadFile]);

  const handleQueueRemove = useCallback((id: string) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
    if (activeQueueId === id) {
      reset();
      setActiveQueueId(null);
    }
  }, [activeQueueId, reset]);

  const handleDownload = () => {
    download();
    setDownloadState("success");
    setTimeout(() => setDownloadState("idle"), 1500);
  };

  const handleClearAll = () => {
    reset();
    setQueue([]);
    setActiveQueueId(null);
  };

  const formatKey = state.format.split("/")[1]?.toUpperCase() || "PNG";

  return (
    <div className="flex flex-col lg:flex-row h-[70vh] min-h-[600px] max-h-[750px] text-foreground font-sans antialiased overflow-hidden rounded-[2rem] border-2 border-slate-300 dark:border-slate-800 shadow-2xl bg-surface-container-lowest/50 backdrop-blur-3xl mb-4 mx-2 sm:mx-6 ring-1 ring-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      
      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-500/5">
        <header className="h-16 border-b-2 border-border bg-card/40 backdrop-blur-2xl flex items-center justify-between px-8 flex-shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600 rounded-[0.75rem] flex items-center justify-center shadow-[0_4px_0_0_rgba(249,115,22,0.3)] border border-white/10 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer group">
              <Zap size={18} className="text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-black tracking-[-0.05em] text-lg uppercase text-foreground/90">{t('pro_image.title')}</span>
          </div>
          <div className="flex items-center gap-3">
            {state.image && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 rounded-xl transition-all flex items-center gap-2 cursor-pointer group border border-orange-500/20 active:translate-y-0.5 shadow-sm shadow-orange-500/5"
              >
                <Plus size={14} className="group-hover:scale-110 transition-transform" />
                {t('pro_image.batch_add') || "Add"}
              </button>
            )}
            {state.image && (
              <button
                onClick={handleClearAll}
                className="text-[10px] font-black uppercase tracking-widest px-4 py-2 text-muted-foreground hover:bg-orange-500/5 rounded-xl transition-all border-b-2 border-transparent hover:border-orange-500/30 active:translate-y-0.5 active:border-b-0 cursor-pointer"
              >
                {t('pro_image.clear_all')}
              </button>
            )}
            {state.image && (
              <button
                onClick={handleDownload}
                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-xl transition-all active:scale-95 active:translate-y-0.5 flex items-center gap-2 cursor-pointer border-b-4 ${
                  downloadState === "success"
                    ? "bg-success text-success-foreground border-success/30"
                    : "bg-orange-600 text-white hover:bg-orange-500 border-orange-700/50 shadow-orange-500/20"
                }`}
              >
                {downloadState === "success" ? (
                  <><Check size={14} /> {t('pro_image.saved')}</>
                ) : (
                  <><Download size={14} /> {t('pro_image.export')}</>
                )}
              </button>
            )}
          </div>
        </header>

        {/* Workspace Area */}
        <section className="flex-1 relative overflow-hidden bg-secondary/50">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.15) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          {state.image ? (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full max-w-4xl max-h-full">
                <ComparisonSlider
                  originalSrc={state.originalPreview}
                  compressedSrc={state.preview}
                />
              </div>
            </div>
          ) : (
            <Dropzone onFile={handleFile} />
          )}
        </section>

        {queue.length > 0 && (
          <BatchQueue
            items={queue}
            activeId={activeQueueId}
            onSelect={handleQueueSelect}
            onRemove={handleQueueRemove}
            onAdd={() => fileInputRef.current?.click()}
          />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (files) Array.from(files).forEach(addToQueue);
            e.target.value = "";
          }}
        />
      </main>

      {/* INSPECTOR SIDEBAR */}
      {state.image && (
        <aside className="w-64 border-l-2 border-border bg-card/30 backdrop-blur-xl flex flex-col overflow-hidden flex-shrink-0">
          {/* Savings Card (Top Docked) */}
          <div className="p-4 border-b-2 border-border bg-orange-500/5 backdrop-blur-md">
            <div className="p-4 bg-gradient-to-br from-slate-900 via-black to-slate-900 dark:from-white dark:via-slate-100 dark:to-white rounded-[1.25rem] shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center mb-2.5 relative z-10">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.25em]">{t('pro_image.savings')}</span>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <span className="text-3xl font-black text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse">
                    -{savings}%
                  </span>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 flex justify-between items-center bg-white/5 dark:bg-black/5 p-2 rounded-xl border border-white/5 relative z-10">
                <div className="flex flex-col">
                   <span className="text-[7px] uppercase opacity-40 font-black">{t('pro_image.original')}</span>
                   <span className="font-bold text-slate-300 dark:text-slate-600">{formatSize(state.originalSize)}</span>
                </div>
                <div className="size-5 rounded-full bg-orange-500/20 flex items-center justify-center">
                   <Zap size={8} className="text-orange-500" />
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[7px] uppercase opacity-40 font-black">{t('pro_image.optimized')}</span>
                   <span className="font-bold text-white dark:text-black">{formatSize(state.compressedSize)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-0 custom-scrollbar">
            {/* Presets */}
            <InspectorGroup title={t('pro_image.presets')}>
              <div className="space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-[10px] hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/20"
                  >
                    <span className="font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">{p.label}</span>
                    <span className="block text-[9px] text-muted-foreground mt-0.5 font-medium opacity-60">{p.desc}</span>
                  </button>
                ))}
              </div>
            </InspectorGroup>

            {/* Format */}
            <InspectorGroup title={t('pro_image.format')}>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-black/60 rounded-xl shadow-inner border border-slate-200 dark:border-white/5">
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    onClick={() => set("format", `image/${f.toLowerCase()}`)}
                    className={`text-[9px] font-black uppercase tracking-widest py-2 rounded-lg transition-all cursor-pointer ${
                      formatKey === f
                        ? "bg-orange-600 text-white shadow-lg shadow-orange-500/20 scale-100"
                        : "text-slate-400 dark:text-slate-500 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/5"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </InspectorGroup>

            {/* Compression */}
            <InspectorGroup title={t('pro_image.compression')}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground">{t('pro_image.quality')}</label>
                  <span className="text-[10px] tabular-nums font-mono text-primary font-black">
                    {Math.round(state.quality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full h-1.5 rounded-full cursor-pointer accent-orange-600 dark:accent-orange-500"
                  min="0.05"
                  max="1"
                  step="0.01"
                  value={state.quality}
                  onChange={(e) => set("quality", +e.target.value)}
                />
                <div className="flex items-center justify-between gap-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-foreground whitespace-nowrap">{t('pro_image.target')}</label>
                  <input
                    type="number"
                    className="w-20 text-[11px] font-bold p-2 bg-secondary border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums text-right"
                    placeholder="Auto"
                    value={state.targetKB || ""}
                    onChange={(e) => set("targetKB", +e.target.value)}
                  />
                </div>
              </div>
            </InspectorGroup>

            {/* Dimensions */}
            <InspectorGroup title={t('pro_image.dimensions')}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">{t('pro_image.width')}</span>
                    <input
                      type="number"
                      value={state.width}
                      onChange={(e) => setWidth(+e.target.value)}
                      className="w-full text-[11px] font-bold p-2.5 bg-secondary border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">{t('pro_image.height')}</span>
                    <input
                      type="number"
                      value={state.height}
                      onChange={(e) => setHeight(+e.target.value)}
                      className="w-full text-[11px] font-bold p-2.5 bg-secondary border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums"
                    />
                  </div>
                </div>
                <button
                  onClick={() => set("aspectLocked", !state.aspectLocked)}
                  className={`flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all px-3 py-2 rounded-xl border border-transparent ${
                    state.aspectLocked ? "text-orange-600 bg-orange-500/10 border-orange-500/20" : "text-muted-foreground bg-secondary"
                  }`}
                >
                  {state.aspectLocked ? <Link2 size={12} /> : <Link2Off size={12} />}
                  {state.aspectLocked ? t('pro_image.linked') : t('pro_image.unlinked')}
                </button>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5">
                  <label className="text-[9px] text-muted-foreground font-black uppercase tracking-widest px-1">Quick Standard Res</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {RESOLUTIONS.map((res) => {
                      const isPortrait = state.originalHeight > state.originalWidth;
                      const targetW = isPortrait ? res.height : res.width;
                      const targetH = isPortrait ? res.width : res.height;
                      return (
                      <button
                        key={res.label}
                        onClick={() => {
                          saveSnapshot();
                          set("aspectLocked", false);
                          setTimeout(() => {
                             set("width", targetW);
                             set("height", targetH);
                          }, 0);
                        }}
                        className="text-[9px] font-black uppercase tracking-widest py-2 rounded-lg bg-secondary/50 text-foreground hover:bg-orange-600 hover:text-white transition-all cursor-pointer border border-border shadow-sm active:translate-y-0.5"
                        title={`${targetW}×${targetH}`}
                      >
                        {res.label}
                      </button>
                    )})}
                  </div>
                </div>
              </div>
            </InspectorGroup>

            {/* Adjustments */}
            <InspectorGroup title={t('pro_image.transformation')}>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={undo}
                    disabled={!hasHistory}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border-b-2 transition-all ${
                      hasHistory ? "bg-slate-200 dark:bg-slate-800 text-foreground border-slate-300 dark:border-slate-900 hover:bg-orange-500/10 hover:text-orange-500 active:translate-y-0.5 cursor-pointer" : "bg-slate-100 dark:bg-black/20 text-muted-foreground opacity-50 border-transparent cursor-not-allowed"
                    }`}
                  >
                    <Undo2 size={12} /> Undo
                  </button>
                  <button
                    onClick={resetTransformations}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-foreground hover:bg-orange-500/10 hover:text-orange-500 transition-all border-b-2 border-slate-300 dark:border-slate-900 active:translate-y-0.5 active:border-b-0 cursor-pointer"
                  >
                    <RefreshCcw size={12} /> Reset
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => set("rotate", (state.rotate + 90) % 360)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-200 dark:bg-black/60 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-orange-600 hover:text-white hover:shadow-lg transition-all border-b-4 border-slate-300 dark:border-black active:translate-y-0.5 active:border-b-0 cursor-pointer group"
                  >
                    <RotateCw size={14} className="group-hover:rotate-45 transition-transform" /> {t('pro_image.rotate')}
                  </button>
                  <button
                    onClick={() => set("flipH", !state.flipH)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-b-4 active:translate-y-0.5 active:border-b-0 cursor-pointer ${
                      state.flipH
                        ? "bg-orange-600 text-white border-orange-800 shadow-lg shadow-orange-600/30"
                        : "bg-slate-200 dark:bg-black/60 text-slate-500 dark:text-slate-400 hover:bg-orange-600 hover:text-white"
                    }`}
                  >
                    <FlipHorizontal size={14} /> {t('pro_image.flip')}
                  </button>
                </div>
                
                <label className="flex items-center justify-between cursor-pointer group px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">{t('pro_image.sharpen')}</span>
                  <div
                    className={`w-10 h-5 rounded-full transition-all relative border-b-2 ${
                      state.sharpen ? "bg-orange-500 border-orange-600 shadow-inner" : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-900"
                    }`}
                    onClick={() => set("sharpen", !state.sharpen)}
                  >
                    <div
                      className={`absolute top-0.5 w-[14px] h-[14px] rounded-full bg-white shadow-md transition-all duration-300 ${
                        state.sharpen ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                </label>
              </div>
            </InspectorGroup>

            {/* Watermark / Brand Protection */}
            <InspectorGroup title={t('pro_image.brand_protection') || "Brand Protection"}>
               <div className="space-y-4">
                  {/* Background Color */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest px-1">
                      <Palette size={12} /> Background Fill
                    </label>
                    <div className="flex gap-2 items-center">
                       <input
                         type="color"
                         value={state.backgroundColor === 'transparent' ? '#ffffff' : state.backgroundColor}
                         onChange={(e) => set("backgroundColor", e.target.value)}
                         className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                       />
                       <button
                         onClick={() => set("backgroundColor", "transparent")}
                         className={`text-[9px] font-bold px-3 py-1.5 rounded-lg border flex-1 transition-all ${state.backgroundColor === 'transparent' ? 'bg-orange-600 text-white border-orange-700' : 'bg-secondary text-muted-foreground border-border hover:bg-white/10 cursor-pointer'}`}
                       >
                         Transparent
                       </button>
                    </div>
                  </div>

                  {/* Text Overlay */}
                  <div className="space-y-2 pt-3 border-t border-slate-300 dark:border-slate-800">
                    <label className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest px-1">
                      <Type size={12} /> Typography Overlay
                    </label>
                    <input
                      type="text"
                      value={state.overlayText}
                      onChange={(e) => set("overlayText", e.target.value)}
                      placeholder="Enter text to overlay..."
                      className="w-full text-[11px] font-bold p-3 bg-secondary/50 border-2 border-slate-300 dark:border-slate-800 rounded-xl focus:ring-2 ring-orange-500/20 outline-none text-foreground shadow-inner cursor-pointer"
                    />
                    {state.overlayText && (
                      <div className="flex gap-3 items-center mt-2 px-1">
                        <input
                           type="color"
                           value={state.overlayColor}
                           onChange={(e) => set("overlayColor", e.target.value)}
                           className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                        <input
                           type="range"
                           min="5" max="50"
                           value={state.overlaySize}
                           onChange={(e) => set("overlaySize", +e.target.value)}
                           className="flex-1 accent-orange-600 dark:accent-orange-500 h-1.5 rounded-full cursor-pointer"
                        />
                        <span className="text-[10px] tabular-nums font-mono text-orange-500 font-black">{state.overlaySize}</span>
                      </div>
                    )}
                  </div>

                  {/* Logo Watermark */}
                  <div className="space-y-2 pt-3 border-t border-slate-300 dark:border-slate-800">
                    <label className="flex items-center gap-2 text-[9px] text-muted-foreground font-black uppercase tracking-widest px-1">
                      <ImagePlus size={12} /> Logo Watermark
                    </label>
                    {state.watermarkLogo ? (
                      <div className="flex items-center justify-between p-2 bg-secondary/50 rounded-xl border-2 border-slate-300 dark:border-slate-800">
                        <img src={state.watermarkLogo} className="h-8 object-contain rounded drop-shadow-md" alt="Logo Watermark" />
                        <button onClick={() => set("watermarkLogo", null)} className="text-error p-2 hover:bg-error/10 rounded-lg transition-colors cursor-pointer"><Trash2 size={12} /></button>
                      </div>
                    ) : (
                      <label className="w-full text-[10px] font-black uppercase tracking-widest p-4 bg-secondary/30 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-orange-500/5 cursor-pointer hover:border-orange-500/50 hover:text-orange-500 transition-all">
                        Upload Logo (PNG)
                        <input 
                          type="file" 
                          accept="image/png,image/svg+xml" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                               const reader = new FileReader();
                               reader.onload = (ev) => set("watermarkLogo", ev.target?.result as string);
                               reader.readAsDataURL(file);
                            }
                            e.target.value = "";
                          }}
                        />
                      </label>
                    )}
                  </div>

               </div>
            </InspectorGroup>

            {/* Effects */}
            <InspectorGroup title={t('pro_image.effects')}>
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest px-1 text-muted-foreground">{t('pro_image.saturation')}</label>
                      <span className="text-[10px] tabular-nums font-mono text-primary font-black">{Math.round(state.saturation * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.01"
                      value={state.saturation}
                      onChange={(e) => set("saturation", +e.target.value)}
                      className="w-full accent-orange-600 dark:accent-orange-500 h-1.5 rounded-full cursor-pointer hover:accent-orange-500 transition-all"
                    />
                  </div>
                  
                  <select 
                    value={state.filter}
                    onChange={(e) => set("filter", e.target.value)}
                    className="w-full text-[11px] font-bold p-3 bg-secondary/50 border-2 border-slate-300 dark:border-slate-800 rounded-xl focus:ring-2 ring-primary/20 outline-none text-foreground appearance-none cursor-pointer hover:bg-secondary/80 transition-all shadow-inner"
                  >
                    <option value="none">No Filter</option>
                    <option value="grayscale(100%)">Grayscale</option>
                    <option value="sepia(100%)">Sepia</option>
                    <option value="contrast(150%)">High Contrast</option>
                    <option value="brightness(1.5)">Brighten</option>
                    <option value="blur(4px)">Soft Blur</option>
                    <option value="invert(100%)">Invert</option>
                    <option value="hue-rotate(90deg)">Color Shift</option>
                  </select>
                  <p className="text-[9px] text-muted-foreground italic px-1 opacity-60">
                    {t('pro_image.effects_help')}
                  </p>
               </div>
            </InspectorGroup>

            {/* Export Settings */}
            <InspectorGroup title="Export Settings">
               <div className="space-y-2">
                  <label className="text-[9px] text-muted-foreground font-black uppercase tracking-widest px-1">{t('pro_image.filename')}</label>
                  <input
                    type="text"
                    value={state.nameTemplate}
                    onChange={(e) => set("nameTemplate", e.target.value)}
                    placeholder={t('pro_image.filename_placeholder')}
                    className="w-full text-[11px] font-bold p-3 bg-secondary/50 border-2 border-slate-300 dark:border-slate-800 rounded-xl focus:ring-2 ring-primary/20 outline-none text-foreground shadow-inner cursor-text"
                  />
               </div>
            </InspectorGroup>

            {/* Metadata */}
            <InspectorGroup title={t('pro_image.security')}>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-[11px] font-bold text-foreground group-hover:text-primary transition-colors">{t('pro_image.strip_metadata')}</span>
                <div
                  className={`w-11 h-6 rounded-full transition-all relative border-b-4 ${
                    state.stripMetadata ? "bg-orange-600 border-orange-700 shadow-lg shadow-orange-500/30" : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-900"
                  }`}
                  onClick={() => set("stripMetadata", !state.stripMetadata)}
                >
                  <div
                    className={`absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow-xl transition-all duration-500 ease-out ${
                      state.stripMetadata ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            </InspectorGroup>
          </div>

        </aside>
      )}
    </div>
  );
};
