import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

interface DropzoneProps {
  onFile: (file: File) => void;
}

export const Dropzone = ({ onFile }: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full transition-colors duration-200 ${
        isDragOver ? "bg-primary/5" : ""
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div
        className={`flex flex-col items-center gap-4 p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-muted-foreground/40"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <Upload className="w-6 h-6 text-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-foreground">
            Drop image here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, WEBP • Paste from clipboard supported
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />
      </div>
    </div>
  );
};
