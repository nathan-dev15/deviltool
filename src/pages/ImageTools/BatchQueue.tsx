import { X } from "lucide-react";

export interface QueueItem {
  id: string;
  file: File;
  thumbnail: string;
  name: string;
}

interface BatchQueueProps {
  items: QueueItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export const BatchQueue = ({ items, activeId, onSelect, onRemove, onAdd }: BatchQueueProps) => {
  if (items.length === 0) return null;

  return (
    <footer className="h-20 border-t border-border bg-card/80 backdrop-blur-md px-4 flex items-center gap-3 overflow-x-auto">
      {items.map((item) => (
        <div
          key={item.id}
          className={`relative group shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-all shadow-low ${
            activeId === item.id
              ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
              : "opacity-60 hover:opacity-100"
          }`}
          onClick={() => onSelect(item.id)}
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="shrink-0 w-14 h-14 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <span className="text-xl leading-none">+</span>
      </button>
    </footer>
  );
};
