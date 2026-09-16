"use client"

import React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import type { ProfileData } from "@/lib/types";

interface HeroProps {
  heroData: ProfileData;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const nameParts = heroData.name.split(" ");
  const firstName = nameParts[0] || "Muhammad";
  const lastName = nameParts.slice(1).join(" ") || "Abdullah";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-20 text-foreground overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/80 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(100%,600px)] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:pl-24 relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16 min-h-screen">
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-2xl">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="h-px w-6 sm:w-8 bg-teal-400 rounded-full" />
            <p className="text-teal-400 text-[9px] sm:text-[10px] font-bold tracking-[0.35em] sm:tracking-[0.45em] uppercase">
              {heroData.tagline}
            </p>
          </div>

          <h1 className="mb-6 sm:mb-8">
            <span
              className="block text-foreground font-light tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)", lineHeight: 0.95 }}
            >
              {firstName}
            </span>
            <span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-violet-400 to-blue-400 font-black -mt-1 sm:-mt-2 md:-mt-4"
              style={{ fontSize: "clamp(2.5rem, 10vw, 7rem)", lineHeight: 0.95 }}
            >
              {lastName}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-lg mb-8 sm:mb-10">
            {heroData.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-slate-950 bg-teal-400 rounded-lg hover:bg-teal-300 transition-colors text-sm"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-foreground bg-card/70 border border-border/70 rounded-lg hover:border-teal-400/50 hover:bg-muted/70 transition-colors text-sm"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 font-semibold text-muted-foreground border border-border/70 rounded-lg hover:border-teal-400/40 hover:text-foreground transition-colors text-sm"
            >
              <FileText size={16} aria-hidden />
              Resume
            </a>
          </div>
        </div>

        <div className="relative flex-shrink-0 hidden sm:block">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border border-border/70 shadow-2xl">
            <Image
              src="/profile.jpeg"
              alt="Muhammad Abdullah"
              fill
              priority
              sizes="(max-width: 1024px) 224px, 256px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-3 -right-2 sm:-bottom-4 sm:-right-4 bg-card/90 border border-border/70 rounded-xl px-3 sm:px-4 py-2 text-xs flex items-center gap-2 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <span className="text-muted-foreground font-medium text-[10px] sm:text-xs">Open to opportunities</span>
          </div>
        </div>

        <div className="sm:hidden relative mt-4">
          <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-border/70 shadow-xl mx-auto">
            <Image
              src="/profile.jpeg"
              alt="Muhammad Abdullah"
              fill
              sizes="144px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;