import React from "react";

// Some environments expose browser globals like `History`, `Image`, or `Lock`.
// If a JSX icon identifier accidentally resolves to a browser constructor, React will try to call it as a component
// and you can get "Uncaught TypeError: Illegal constructor".
//
// Lucide icons are React.forwardRef() objects that carry a `$$typeof` marker.
export function resolveLucideIcon<T>(Icon: any, fallback: T): any {
  if (Icon && typeof Icon === "object" && "$$typeof" in Icon) return Icon;
  return fallback;
}

export function safeLucideElement(Icon: any, fallback: any, props?: Record<string, any>) {
  const Resolved = resolveLucideIcon(Icon, fallback);
  return React.createElement(Resolved, props ?? {});
}

