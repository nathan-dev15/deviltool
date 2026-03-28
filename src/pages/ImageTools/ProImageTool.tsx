
import React, { ReactNode } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Download, RotateCw, FlipHorizontal, Check, Link2, Link2Off, Trash2, Plus } from "lucide-react";
import { InspectorGroup } from "./InspectorGroupProps";
import { ComparisonSlider } from "./ComparisonSlider";
import { Dropzone } from "./DropzoneProps";
import { BatchQueue, type QueueItem } from "./BatchQueue";
import { useImageProcessor, formatSize } from "./useImageProcessor";

const FORMATS = ["PNG", "JPG", "WEBP"] as const;
const PRESETS = [
  { id: "web" as const, label: "Web", desc: "Max 1920px, WebP 75%" },
  { id: "social" as const, label: "Social", desc: "1200px, JPEG 85%" },
  { id: "lossless" as const, label: "Lossless", desc: "Original size, PNG" },
];

export const ProImageTool = () => {
  const { state, set, loadFile, setWidth, setHeight, download, reset, applyPreset, savings } = useImageProcessor();
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
    <div className="flex h-screen bg-background text-foreground font-sans antialiased">
      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-low">
              <Zap size={14} className="text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-sm">OpticPress Pro</span>
          </div>
          <div className="flex items-center gap-2">
            {state.image && (
              <button
                onClick={handleClearAll}
                className="text-xs px-3 py-1.5 text-muted-foreground hover:bg-secondary rounded-md transition-colors"
              >
                Clear All
              </button>
            )}
            {state.image && (
              <button
                onClick={handleDownload}
                className={`text-xs px-4 py-1.5 font-medium rounded-md shadow-low transition-all active:scale-95 flex items-center gap-1.5 ${
                  downloadState === "success"
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {downloadState === "success" ? (
                  <><Check size={12} /> Saved</>
                ) : (
                  <><Download size={12} /> Export</>
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

        {/* Batch Queue */}
        <BatchQueue
          items={queue}
          activeId={activeQueueId}
          onSelect={handleQueueSelect}
          onRemove={handleQueueRemove}
          onAdd={() => fileInputRef.current?.click()}
        />
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
        <aside className="w-72 border-l border-border bg-card flex flex-col overflow-hidden flex-shrink-0">
          <div className="flex-1 overflow-y-auto p-5 space-y-0">
            {/* Presets */}
            <InspectorGroup title="Smart Presets">
              <div className="space-y-1.5">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-secondary transition-colors group"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">{p.label}</span>
                    <span className="block text-[10px] text-muted-foreground mt-0.5">{p.desc}</span>
                  </button>
                ))}
              </div>
            </InspectorGroup>

            {/* Format */}
            <InspectorGroup title="Format">
              <div className="grid grid-cols-3 gap-1 p-1 bg-secondary rounded-lg">
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    onClick={() => set("format", `image/${f.toLowerCase()}`)}
                    className={`text-[11px] font-bold py-1.5 rounded-md transition-all ${
                      formatKey === f
                        ? "bg-card shadow-low text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </InspectorGroup>

            {/* Compression */}
            <InspectorGroup title="Compression">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-foreground">Quality</label>
                  <span className="text-xs tabular-nums font-mono text-primary font-semibold">
                    {Math.round(state.quality * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  className="w-full accent-primary h-1.5 rounded-full"
                  min="0.05"
                  max="1"
                  step="0.01"
                  value={state.quality}
                  onChange={(e) => set("quality", +e.target.value)}
                />
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-medium text-foreground">Target (KB)</label>
                  <input
                    type="number"
                    className="w-20 text-xs p-1.5 bg-secondary border border-border rounded-md focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums"
                    placeholder="Auto"
                    value={state.targetKB || ""}
                    onChange={(e) => set("targetKB", +e.target.value)}
                  />
                </div>
              </div>
            </InspectorGroup>

            {/* Dimensions */}
            <InspectorGroup title="Dimensions">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase">Width</span>
                    <input
                      type="number"
                      value={state.width}
                      onChange={(e) => setWidth(+e.target.value)}
                      className="w-full text-xs p-2 bg-secondary border border-border rounded-md focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase">Height</span>
                    <input
                      type="number"
                      value={state.height}
                      onChange={(e) => setHeight(+e.target.value)}
                      className="w-full text-xs p-2 bg-secondary border border-border rounded-md focus:ring-2 ring-primary/20 outline-none text-foreground tabular-nums"
                    />
                  </div>
                </div>
                <button
                  onClick={() => set("aspectLocked", !state.aspectLocked)}
                  className={`flex items-center gap-2 text-xs transition-colors ${
                    state.aspectLocked ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {state.aspectLocked ? <Link2 size={12} /> : <Link2Off size={12} />}
                  {state.aspectLocked ? "Linked" : "Unlinked"}
                </button>
              </div>
            </InspectorGroup>

            {/* Adjustments */}
            <InspectorGroup title="Adjustments">
              <div className="flex gap-2">
                <button
                  onClick={() => set("rotate", (state.rotate + 90) % 360)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <RotateCw size={12} /> Rotate
                </button>
                <button
                  onClick={() => set("flipH", !state.flipH)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    state.flipH
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  <FlipHorizontal size={12} /> Flip
                </button>
              </div>
            </InspectorGroup>

            {/* Metadata */}
            <InspectorGroup title="Metadata">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-medium text-foreground">Strip EXIF data</span>
                <div
                  className={`w-8 h-[18px] rounded-full transition-colors relative cursor-pointer ${
                    state.stripMetadata ? "bg-primary" : "bg-border"
                  }`}
                  onClick={() => set("stripMetadata", !state.stripMetadata)}
                >
                  <div
                    className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-card shadow-sm transition-transform ${
                      state.stripMetadata ? "translate-x-[14px]" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </label>
            </InspectorGroup>
          </div>

          {/* Savings Card */}
          <div className="p-5 border-t border-border">
            <div className="p-4 bg-foreground rounded-xl text-card">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Savings</span>
                <span className="text-2xl font-bold text-success">
                  -{savings}%
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground flex justify-between items-center">
                <span>{formatSize(state.originalSize)}</span>
                <span className="text-muted-foreground/50">→</span>
                <span className="text-card font-medium">{formatSize(state.compressedSize)}</span>
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
