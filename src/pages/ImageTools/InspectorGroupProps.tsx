import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface InspectorGroupProps {
  title: string;
  children: ReactNode;
}

export const InspectorGroup: React.FC<InspectorGroupProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-slate-300 dark:border-slate-800/60 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 group cursor-pointer"
      >
        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <ChevronDown 
          size={12} 
          className={`text-muted-foreground transition-transform duration-300 ${isOpen ? '' : '-rotate-90 opacity-40'}`} 
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {children}
      </div>
    </div>
  );
};