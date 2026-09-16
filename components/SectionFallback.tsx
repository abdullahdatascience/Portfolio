"use client";

import React from "react";

interface SectionFallbackProps {
  title: string;
  description: string;
}

const SectionFallback: React.FC<SectionFallbackProps> = ({ title, description }) => (
  <div className="rounded-2xl border border-border/60 bg-card/60 px-6 py-8 text-center text-sm text-muted-foreground">
    <p className="font-semibold text-foreground">{title}</p>
    <p className="mt-2">{description}</p>
  </div>
);

export default SectionFallback;
