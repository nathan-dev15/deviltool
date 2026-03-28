import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";

interface DropzoneProps {
  onFile: (file: File) => void;
}

export const Dropzone = ({ onFile }: DropzoneProps) => {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-full transition-all duration-300 ${
        isDragOver ? "bg-primary/5" : ""
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div
        className={`flex flex-col items-center gap-4 p-10 rounded-[2rem] border-2 border-dashed transition-all cursor-pointer group relative overflow-hidden bg-card/10 backdrop-blur-md shadow-2xl ${
          isDragOver
            ? "border-orange-500 bg-orange-500/10 scale-[1.01] shadow-orange-500/20 border-b-2"
            : "border-slate-300 dark:border-slate-800 hover:border-orange-500/50 border-b-8 shadow-black/10 dark:shadow-black/40"
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-14 h-14 rounded-xl bg-orange-500/15 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-500">
          <Upload className="w-7 h-7 text-orange-600 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
        </div>
        
        <div className="text-center space-y-1 relative z-10">
          <p className="text-md font-black tracking-tight text-foreground/90 uppercase">
            {t('pro_image.drop_here') || "Drop image here"}
          </p>
          <p className="text-[10px] text-muted-foreground font-medium flex items-center justify-center gap-2 opacity-70">
            <span>PNG</span> • <span>JPG</span> • <span>WEBP</span>
          </p>
          <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-2 bg-primary/10 py-1 px-3 rounded-lg border border-primary/20 inline-block">
             {t('pro_image.browse') || "Click to Browse"}
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
            e.target.value = "";
          }}
        />
      </div>
      
      <p className="mt-8 text-[11px] text-muted-foreground/50 font-black uppercase tracking-[0.3em]">
        {t('pro_image.paste_hint') || "Paste from clipboard supported"}
      </p>
    </div>
  );
};
