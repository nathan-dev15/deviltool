import { useState, useRef, useCallback, useEffect } from "react";

export interface ImageState {
  image: HTMLImageElement | null;
  originalPreview: string;
  preview: string;
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  compressedSize: number;
  quality: number;
  format: string;
  rotate: number;
  flipH: boolean;
  stripMetadata: boolean;
  targetKB: number;
  aspectLocked: boolean;
  filter: string;
  watermark: string;
  sharpen: boolean;
  saturation: number;
  nameTemplate: string;
  backgroundColor: string;
  overlayText: string;
  overlayColor: string;
  overlaySize: number;
  watermarkLogo: string | null;
}

const initialState: ImageState = {
  image: null,
  originalPreview: "",
  preview: "",
  width: 0,
  height: 0,
  originalWidth: 0,
  originalHeight: 0,
  originalSize: 0,
  compressedSize: 0,
  quality: 0.85,
  format: "image/webp",
  rotate: 0,
  flipH: false,
  stripMetadata: true,
  targetKB: 0,
  aspectLocked: true,
  filter: "none",
  watermark: "",
  sharpen: false,
  saturation: 1,
  nameTemplate: "koobrain-[name]",
  backgroundColor: "transparent",
  overlayText: "",
  overlayColor: "#ffffff",
  overlaySize: 20,
  watermarkLogo: null,
};

export function useImageProcessor() {
  const [state, setState] = useState<ImageState>(initialState);
  const [history, setHistory] = useState<ImageState[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const debounceRef = useRef<number>(0);

  const set = useCallback(<K extends keyof ImageState>(key: K, value: ImageState[K]) => {
    setState((prev) => {
      // Push to history for significant changes, but avoid too many snapshots
      if (['rotate', 'flipH', 'filter', 'sharpen', 'saturation', 'backgroundColor', 'overlayText'].includes(key)) {
        setHistory(h => [...h, prev].slice(-20)); // Keep last 20 steps
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const saveSnapshot = useCallback(() => {
    setState((prev) => {
      setHistory(h => [...h, prev].slice(-20));
      return prev;
    });
  }, []);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      setState((prev) => ({
        ...prev,
        image: img,
        originalPreview: url,
        preview: url,
        width: img.width,
        height: img.height,
        originalWidth: img.width,
        originalHeight: img.height,
        originalSize: file.size,
        compressedSize: file.size,
        format: ["image/jpeg", "image/png", "image/webp"].includes(file.type) ? file.type : "image/webp",
        quality: 0.92,
        // Reset name template to original file name part
        nameTemplate: `koobrain-${file.name.split('.')[0]}`
      }));
    };
    img.src = url;
  }, []);

  const process = useCallback(() => {
    const { image, width, height, format, quality, rotate, flipH, targetKB, filter, watermark, sharpen, saturation, backgroundColor, overlayText, overlayColor, overlaySize, watermarkLogo } = state;
    if (!image) return;

    const canvas = canvasRef.current || document.createElement("canvas");
    canvasRef.current = canvas;
    
    // Handle rotation swapping dimensions
    const isRotated = rotate === 90 || rotate === 270;
    canvas.width = isRotated ? height : width;
    canvas.height = isRotated ? width : height;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background Color
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // Apply filters and saturation
    const filterString = `${filter === 'none' ? '' : filter} ${saturation !== 1 ? `saturate(${saturation})` : ''}`.trim();
    if (filterString) {
      ctx.filter = filterString;
    } else {
      ctx.filter = "none";
    }

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, 1);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();

    // Reset filter for watermark and sharpening
    ctx.filter = "none";

    // Sharpen (Simple approximation using context filter)
    if (sharpen) {
      ctx.filter = "contrast(1.1) brightness(1.02) saturate(1.05)";
    }

    // Text Overlay
    if (overlayText) {
      const fontSize = (width / 100) * overlaySize;
      ctx.font = `black ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = overlayColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 10;
      ctx.fillText(overlayText, canvas.width / 2, canvas.height / 2);
      ctx.shadowBlur = 0;
    }

    // Logo Watermark
    if (watermarkLogo) {
       const logo = new Image();
       logo.onload = () => {
         const logoW = canvas.width / 5;
         const logoH = (logo.height / logo.width) * logoW;
         ctx.globalAlpha = 0.6;
         ctx.drawImage(logo, 20, 20, logoW, logoH);
         ctx.globalAlpha = 1.0;
       };
       logo.src = watermarkLogo;
    }

    // Watermark Text (Legacy)
    if (watermark) {
      ctx.font = `bold ${Math.max(12, width / 25)}px Inter, sans-serif`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
      ctx.lineWidth = 2;
      ctx.textAlign = "right";
      const padding = width / 40;
      ctx.strokeText(watermark, canvas.width - padding, canvas.height - padding);
      ctx.fillText(watermark, canvas.width - padding, canvas.height - padding);
    }

    let dataUrl = canvas.toDataURL(format, quality);

    // Target size compression
    if (targetKB > 0) {
      let q = quality;
      while (dataUrl.length * 0.75 / 1024 > targetKB && q > 0.05) {
        q -= 0.03;
        dataUrl = canvas.toDataURL(format, q);
      }
    }

    const compressedSize = Math.round(dataUrl.length * 0.75); // base64 overhead
    setState((prev) => ({ ...prev, preview: dataUrl, compressedSize }));
  }, [state]);

  // Auto-process on changes with debounce
  useEffect(() => {
    if (!state.image) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(process, 80);
    return () => clearTimeout(debounceRef.current);
  }, [state.width, state.height, state.quality, state.format, state.rotate, state.flipH, state.targetKB, state.filter, state.watermark, state.sharpen, state.saturation, state.backgroundColor, state.overlayText, state.overlayColor, state.overlaySize, state.watermarkLogo]);

  const setWidth = useCallback((w: number) => {
    setState((prev) => {
      if (!prev.image) return prev;
      const h = prev.aspectLocked ? Math.round(w * (prev.originalHeight / prev.originalWidth)) : prev.height;
      return { ...prev, width: w, height: h };
    });
  }, []);

  const setHeight = useCallback((h: number) => {
    setState((prev) => {
      if (!prev.image) return prev;
      const w = prev.aspectLocked ? Math.round(h * (prev.originalWidth / prev.originalHeight)) : prev.width;
      return { ...prev, width: w, height: h };
    });
  }, []);

  const download = useCallback(() => {
    const a = document.createElement("a");
    a.href = state.preview;
    const ext = state.format.split("/")[1];
    a.download = `${state.nameTemplate}.${ext}`;
    a.click();
  }, [state.preview, state.format, state.nameTemplate]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setState(last);
  }, [history]);

  const reset = useCallback(() => setState(initialState), []);
  
  const resetTransformations = useCallback(() => {
    setState(prev => ({
      ...prev,
      rotate: 0,
      flipH: false,
      filter: "none",
      saturation: 1,
      sharpen: false,
      backgroundColor: "transparent",
      overlayText: "",
      watermark: ""
    }));
  }, []);

  const applyPreset = useCallback((preset: "web" | "social" | "lossless") => {
    setState((prev) => {
      switch (preset) {
        case "web":
          return { ...prev, quality: 0.75, format: "image/webp", width: Math.min(prev.originalWidth, 1920), height: Math.round(Math.min(prev.originalWidth, 1920) * (prev.originalHeight / prev.originalWidth)), filter: "none", watermark: "", sharpen: false, saturation: 1 };
        case "social":
          return { ...prev, quality: 0.85, format: "image/jpeg", width: Math.min(prev.originalWidth, 1200), height: Math.round(Math.min(prev.originalWidth, 1200) * (prev.originalHeight / prev.originalWidth)), filter: "none", watermark: "", sharpen: true, saturation: 1.1 };
        case "lossless":
          return { ...prev, quality: 1, format: "image/png", width: prev.originalWidth, height: prev.originalHeight, filter: "none", watermark: "", sharpen: false, saturation: 1 };
        default:
          return prev;
      }
    });
  }, []);

  const savings = state.originalSize > 0 && state.compressedSize > 0
    ? Math.max(0, Math.round((1 - state.compressedSize / state.originalSize) * 100))
    : 0;

  return { state, set, loadFile, setWidth, setHeight, download, reset, resetTransformations, undo, applyPreset, savings, hasHistory: history.length > 0, saveSnapshot };
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
