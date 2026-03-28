import React, { ReactNode } from "react";

interface InspectorGroupProps {
  title: string;
  children: ReactNode;
}

export const InspectorGroup: React.FC<InspectorGroupProps> = ({ title, children }) => {
  return (
    <div className="space-y-3 pb-5 mb-5 border-b border-border last:border-0 last:mb-0 last:pb-0">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
};