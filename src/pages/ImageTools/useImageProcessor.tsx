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
};

export function useImageProcessor() {
  const [state, setState] = useState<ImageState>(initialState);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const debounceRef = useRef<number>(0);

  const set = useCallback(<K extends keyof ImageState>(key: K, value: ImageState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
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
      }));
    };
    img.src = url;
  }, []);

  const process = useCallback(() => {
    const { image, width, height, format, quality, rotate, flipH, targetKB } = state;
    if (!image) return;

    const canvas = canvasRef.current || document.createElement("canvas");
    canvasRef.current = canvas;
    
    // Handle rotation swapping dimensions
    const isRotated = rotate === 90 || rotate === 270;
    canvas.width = isRotated ? height : width;
    canvas.height = isRotated ? width : height;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, 1);
    ctx.drawImage(image, -width / 2, -height / 2, width, height);
    ctx.restore();

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
  }, [state.width, state.height, state.quality, state.format, state.rotate, state.flipH, state.targetKB]);

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
    a.download = `optimized.${state.format.split("/")[1]}`;
    a.click();
  }, [state.preview, state.format]);

  const reset = useCallback(() => setState(initialState), []);

  const applyPreset = useCallback((preset: "web" | "social" | "lossless") => {
    setState((prev) => {
      switch (preset) {
        case "web":
          return { ...prev, quality: 0.75, format: "image/webp", width: Math.min(prev.originalWidth, 1920), height: Math.round(Math.min(prev.originalWidth, 1920) * (prev.originalHeight / prev.originalWidth)) };
        case "social":
          return { ...prev, quality: 0.85, format: "image/jpeg", width: Math.min(prev.originalWidth, 1200), height: Math.round(Math.min(prev.originalWidth, 1200) * (prev.originalHeight / prev.originalWidth)) };
        case "lossless":
          return { ...prev, quality: 1, format: "image/png", width: prev.originalWidth, height: prev.originalHeight };
        default:
          return prev;
      }
    });
  }, []);

  const savings = state.originalSize > 0 && state.compressedSize > 0
    ? Math.max(0, Math.round((1 - state.compressedSize / state.originalSize) * 100))
    : 0;

  return { state, set, loadFile, setWidth, setHeight, download, reset, applyPreset, savings };
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
