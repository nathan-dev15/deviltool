import { useState, useRef, useCallback } from "react";
import React, { ReactNode } from "react";

interface ComparisonSliderProps {
  originalSrc: string;
  compressedSrc: string;
}

export const ComparisonSlider = ({ originalSrc, compressedSrc }: ComparisonSliderProps) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-col-resize select-none overflow-hidden rounded-lg shadow-high"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Compressed (full background) */}
      <img
        src={compressedSrc}
        alt="Compressed"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* Original (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={originalSrc}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ width: `${containerRef.current?.offsetWidth ?? 0}px`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className={`w-[2px] h-full bg-orange-500/80 backdrop-blur-sm transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] ${isDragging ? 'opacity-100 scale-x-150' : 'opacity-50'}`} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center justify-center cursor-col-resize active:scale-90 transition-transform pointer-events-auto">
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-white/40 rounded-full" />
             <div className="w-1 h-3 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl">
        Original
      </div>
      <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl">
        Optimized
      </div>
    </div>
  );
};
