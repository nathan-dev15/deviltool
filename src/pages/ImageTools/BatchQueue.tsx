
import React, { useRef } from "react";
import { X, Plus, Image as ImageIcon } from "lucide-react";

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

  return (
    <footer className="h-28 border-t border-border bg-card flex-shrink-0 p-3">
      <div ref={scrollRef} className="flex items-center gap-3 h-full overflow-x-auto">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`h-full aspect-square rounded-lg relative overflow-hidden cursor-pointer flex-shrink-0 transition-all border-2 ${
              activeId === item.id
                ? "border-primary shadow-low scale-105"
                : "border-border hover:border-primary/40"
            }`}
          >
            <img
              src={item.thumbnail}
              className="w-full h-full object-cover"
              alt={item.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-1 left-2 text-[10px] text-white font-medium truncate">
              {item.name}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/50 text-white/80 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          onClick={onAdd}
          className="h-full aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center text-muted-foreground hover:text-primary"
        >
          <Plus size={18} />
          <span className="text-[10px] mt-1">Add</span>
        </button>
      </div>
    </footer>
  );
};
