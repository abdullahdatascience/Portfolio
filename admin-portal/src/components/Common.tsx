import React from "react";

export const inputCls =
  "w-full px-3 py-2.5 bg-card/70 border border-border/70 rounded-xl text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300";

export const selectCls = `${inputCls} cursor-pointer`;

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

export const SaveBtn = ({ onClick, label = "Save" }: { onClick: () => void; label?: string }) => (
  <button onClick={onClick}
    className="px-4 py-2 bg-primary hover:bg-primary/90 text-slate-950 font-bold rounded-xl text-sm transition-colors">
    {label}
  </button>
);

export const CancelBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}
    className="px-4 py-2 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/70 font-semibold rounded-xl text-sm transition-colors">
    Cancel
  </button>
);

export const EditBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}
    className="px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-semibold transition-colors">
    Edit
  </button>
);

export const DeleteBtn = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick}
    className="px-3 py-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold transition-colors">
    Delete
  </button>
);

export const LoadingDots: React.FC = () => (
  <div className="flex justify-center gap-2 py-16" role="status" aria-label="Loading">
    {[0, 1, 2].map(i => (
      <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }} />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
);

export const EmptyState: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="max-w-xl mx-auto text-center py-20 bg-card/60 border border-border/60 rounded-3xl backdrop-blur-sm">
    <p className="text-muted-foreground text-sm font-medium">{title}</p>
    {description && <p className="text-muted-foreground/60 text-xs mt-1">{description}</p>}
  </div>
);
