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
        className="absolute top-0 bottom-0 z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className={`w-[2px] h-full bg-primary transition-all ${isDragging ? 'opacity-100' : 'opacity-70'}`} />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-card shadow-medium flex items-center justify-center border border-border">
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-foreground">
            <path d="M3 6L0 3V9L3 6Z" fill="currentColor" />
            <path d="M9 6L12 3V9L9 6Z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded-md bg-foreground/80 text-card text-[10px] font-semibold uppercase tracking-wider">
        Original
      </div>
      <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wider">
        Compressed
      </div>
    </div>
  );
};
