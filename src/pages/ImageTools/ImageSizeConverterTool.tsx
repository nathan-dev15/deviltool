import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Trash2,
  RotateCw,
  FlipHorizontal,
  Zap,
  Eye,
  EyeOff
} from "lucide-react";

import { SEO } from "@/src/components/SEO";
import { AdSense } from "@/src/components/AdSense";

/* ---------- MAIN TOOL ---------- */

export const ProImageTool = () => {

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
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* SEO */}
      <SEO
        title="Advanced Image Tool - Resize, Compress, Convert Online Free"
        description="Use this advanced image tool to resize, compress, convert and optimize images online with real-time preview and pro features."
        keywords="image compressor, resize image online, convert image, optimize image tool"
      />

      <AdSense slot="8156203131" />

      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
        🚀 Advanced Image Tool
      </h1>

      {/* Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed p-8 text-center rounded-2xl hover:bg-gray-50 transition"
      >
        <Upload className="mx-auto mb-2" />
        <p className="font-medium">Drag & Drop / Upload / Paste Image</p>
        <input
          type="file"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) loadFile(f);
          }}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
      )}

      {preview && (
        <div className="grid md:grid-cols-2 gap-8">

          {/* Preview */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <h2 className="font-semibold">Preview</h2>
              <button
                onClick={() => setShowBefore(!showBefore)}
                className="text-sm flex items-center gap-1"
              >
                {showBefore ? <EyeOff size={14} /> : <Eye size={14} />}
                Toggle
              </button>
            </div>

            <img
              src={showBefore ? originalPreview : preview}
              className="rounded-xl shadow-lg"
            />

            <div className="text-sm text-gray-500">
              {width} x {height} px • Saved: {saved}%
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow">

            <div className="flex gap-2">
              <input type="number" value={width} onChange={(e)=>handleWidth(+e.target.value)} className="input"/>
              <input type="number" value={height} onChange={(e)=>handleHeight(+e.target.value)} className="input"/>
            </div>

            <label className="flex gap-2 items-center">
              <input type="checkbox" checked={aspect} onChange={()=>setAspect(!aspect)}/>
              Maintain Ratio
            </label>

            <label className="flex items-center gap-2">
              <Zap size={16}/>
              Auto Apply
              <input type="checkbox" checked={auto} onChange={()=>setAuto(!auto)}/>
            </label>

            <select value={format} onChange={(e)=>setFormat(e.target.value)} className="input">
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WEBP</option>
            </select>

            <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={(e)=>setQuality(+e.target.value)} />

            <div className="flex gap-3">
              <button onClick={()=>setRotate(rotate+90)} className="btn"><RotateCw/></button>
              <button onClick={()=>setFlip(!flip)} className="btn"><FlipHorizontal/></button>
            </div>

            <select onChange={(e)=>setFilter(e.target.value)} className="input">
              <option value="none">No Filter</option>
              <option value="grayscale(100%)">Grayscale</option>
              <option value="contrast(120%)">Contrast</option>
            </select>

            <input
              type="number"
              placeholder="Target KB"
              onChange={(e)=>setTargetKB(+e.target.value)}
              className="input"
            />

            <div className="flex gap-3 pt-3">
              <button onClick={processImage} className="btn-primary">Apply</button>
              <button onClick={download} className="btn-success"><Download size={14}/>Download</button>
              <button onClick={clearAll} className="btn-danger"><Trash2 size={14}/>Clear</button>
            </div>

          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden"/>

      <AdSense slot="8156203131" />

      {/* SEO CONTENT */}

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is this tool?</h2>
        <p className="text-gray-600">
          This advanced image tool allows you to resize, compress, convert and optimize images online with real-time preview and pro-level controls.
        </p>

        <h2 className="text-2xl font-bold">Example</h2>
        <p className="text-gray-600">
          Upload a large image, reduce quality to 0.7, set target size 200KB and download optimized version instantly.
        </p>

        <h2 className="text-2xl font-bold">Benefits</h2>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Reduce image size for faster websites</li>
          <li>Convert formats like PNG, JPG, WEBP</li>
          <li>Improve SEO and page speed</li>
          <li>Free alternative to paid tools</li>
        </ul>
      </section>

      <AdSense slot="8156203131" />

    </div>
  );
};
