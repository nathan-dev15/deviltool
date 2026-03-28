import React, { useRef } from "react";
import { X, Plus, Image as ImageIcon } from "lucide-react";
import { useI18n } from "../../i18n/I18nContext";

export interface QueueItem {
  id: string;
  file: File;
  name: string;
  thumbnail: string;
}

interface BatchQueueProps {
  items: QueueItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export const BatchQueue: React.FC<BatchQueueProps> = ({ items, activeId, onSelect, onRemove, onAdd }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  return (
    <footer className="h-24 border-t-2 border-border bg-card/10 backdrop-blur-2xl flex-shrink-0 p-3 transition-all">
      <div ref={scrollRef} className="flex items-center gap-4 h-full overflow-x-auto custom-scrollbar px-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`h-full aspect-square rounded-2xl relative overflow-hidden cursor-pointer flex-shrink-0 transition-all border-b-4 group shadow-xl ${
              activeId === item.id
                ? "border-orange-500 shadow-orange-500/20 translate-y-[-4px] scale-105"
                : "border-slate-300 dark:border-slate-800 hover:border-orange-500/40 hover:translate-y-[-2px]"
            }`}
          >
            <img
              src={item.thumbnail}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt={item.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40" />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 backdrop-blur-md text-white/80 hover:bg-error hover:text-white transition-all flex items-center justify-center border border-white/10 group-hover:scale-110 shadow-lg cursor-pointer"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          onClick={onAdd}
          className="h-full aspect-square rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-orange-500/50 transition-all flex flex-col items-center justify-center text-muted-foreground hover:text-orange-500 hover:bg-orange-500/5 cursor-pointer border-b-4 active:translate-y-1 active:border-b-0 group"
        >
          <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
             <Plus size={18} />
          </div>
          <span className="text-[9px] mt-2 font-black uppercase tracking-widest">{t("pro_image.batch_add") || "Add"}</span>
        </button>
      </div>
    </footer>
  );
};
