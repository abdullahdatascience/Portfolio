"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain } from "lucide-react";
import type { ProfileData, Skill } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// ODOMETER COUNTER
// ─────────────────────────────────────────────────────────────────────────────

const OdometerCounter: React.FC<{ target: number; suffix?: string; label: string }> = ({
  target, suffix = "", label,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-teal-300 to-teal-600 tabular-nums leading-none">
        {count}{suffix}
      </div>
      <p className="text-[8px] sm:text-[9px] text-muted-foreground font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1.5 sm:mt-2">{label}</p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS RADAR (SVG-based)
// ─────────────────────────────────────────────────────────────────────────────

const RadarChart: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(grouped).slice(0, 6);
  const cx = 100, cy = 100, r = 80;
  const angleStep = (Math.PI * 2) / Math.max(categories.length, 3);

  const getPoint = (i: number, dist: number) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * r * dist,
      y: cy + Math.sin(angle) * r * dist,
    };
  };

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] mx-auto">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon
          key={ring}
          points={categories.map((_, i) => {
            const p = getPoint(i, ring);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(20, 184, 166, 0.1)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {categories.map((_, i) => {
        const p = getPoint(i, 1);
        return (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(20, 184, 166, 0.08)" strokeWidth="0.5" />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={categories.map((cat, i) => {
          const avgLevel = grouped[cat].reduce((s, sk) => s + sk.level, 0) / grouped[cat].length / 100;
          const p = getPoint(i, avgLevel);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="rgba(20, 184, 166, 0.12)"
        stroke="#14b8a6"
        strokeWidth="1.5"
      />

      {/* Data points + labels */}
      {categories.map((cat, i) => {
        const avgLevel = grouped[cat].reduce((s, sk) => s + sk.level, 0) / grouped[cat].length / 100;
        const p = getPoint(i, avgLevel);
        const lp = getPoint(i, 1.18);
        return (
          <g key={cat}>
            <circle cx={p.x} cy={p.y} r="3" fill="#14b8a6" />
            <text
              x={lp.x} y={lp.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(148, 163, 184, 0.7)"
              fontSize="6"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {cat.length > 10 ? cat.slice(0, 10) : cat}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// BENTO TILE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const BentoTile: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = "", delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`group relative bg-card/70 border border-border/60 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm hover:border-teal-500/20 transition-all duration-500 ${className}`}
    >
      {/* Scan line hover effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out bg-gradient-to-b from-transparent via-teal-500/[0.03] to-transparent" />
      </div>

      {/* Glitch artifact on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      </div>

      <div className="relative z-10 p-4 sm:p-5 md:p-6 h-full">{children}</div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN BENTO GRID
// ─────────────────────────────────────────────────────────────────────────────

interface BentoGridProps {
  aboutData: ProfileData;
  skills: Skill[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ aboutData, skills }) => {
  const bioParas = aboutData.aboutBio
    ? aboutData.aboutBio.split("\n\n").filter((p) => p.trim())
    : [
        "New graduate from Government College University Faisalabad focused on Data Science, Machine Learning, and AI.",
        "Working hands-on with Python, R, SQL, Excel, and Power BI — cleaning and analyzing data, running statistical tests, and building predictive models.",
      ];

  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-violet-500/5 rounded-full blur-[80px] sm:blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:pl-24">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-teal-400 text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-2 sm:mb-3"
        >
          {"// SYSTEM.OVERVIEW"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 sm:mb-12"
        >
          <span className="font-mono text-teal-400/50 text-base sm:text-lg mr-2">01.</span>
          About
        </motion.h2>

        {/* ── BENTO MOSAIC ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">

          {/* TILE 1: Bio with Photo (Large — 2 cols wide, 2 rows tall on md+) */}
          <BentoTile className="sm:col-span-2 md:row-span-2" delay={0}>
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-teal-400/60 tracking-[0.2em] sm:tracking-[0.3em] uppercase">BIO // PROFILE</span>
              </div>

              {/* Photo + text side by side on larger, stacked on mobile */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
                {/* Profile photo — visible inside bio tile */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-border/70 shadow-lg ring-1 ring-teal-500/10 group">
                    <Image
                      src="/profile.jpeg"
                      alt="Muhammad Abdullah"
                      fill
                      sizes="(max-width: 768px) 128px, 160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <p className="text-[7px] font-mono text-teal-400/60 tracking-[0.2em]">MUHAMMAD A.</p>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                    {aboutData.aboutTitle.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400">
                      {aboutData.aboutTitle.split(" ").slice(-1)}
                    </span>
                  </h3>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {bioParas.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground tracking-wider">OPEN TO WORK</span>
                </div>
                <div className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground/80 hidden sm:inline">DATA.SCIENCE</span>
              </div>
            </div>
          </BentoTile>

          {/* TILE 2: Live Odometer Stats */}
          <BentoTile className="sm:col-span-1" delay={0.1}>
            <div className="h-full flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4 sm:mb-5">
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-teal-400/60 tracking-[0.2em] sm:tracking-[0.3em] uppercase">METRICS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <OdometerCounter target={aboutData.projectsCount} suffix="+" label="Projects" />
                <OdometerCounter target={aboutData.toolsCount} suffix="+" label="Tools" />
                <OdometerCounter target={aboutData.experienceCount} suffix="+" label="Years" />
              </div>
            </div>
          </BentoTile>

          {/* TILE 3: Skills Radar */}
          <BentoTile className="sm:col-span-1" delay={0.15}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-teal-400/60 tracking-[0.2em] sm:tracking-[0.3em] uppercase">RADAR</span>
              </div>
              {skills.length > 0 ? (
                <div className="flex-1 flex items-center justify-center min-h-[120px] sm:min-h-[140px]">
                  <RadarChart skills={skills} />
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground/80 font-mono">NO DATA</p>
              )}
            </div>
          </BentoTile>

          {/* TILE 4: Current Focus */}
          <BentoTile className="sm:col-span-2 md:col-span-1" delay={0.25}>
            <div className="h-full flex flex-col justify-center items-center text-center py-2 sm:py-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-2 sm:mb-3">
                <Brain size={16} className="text-violet-400" />
              </div>
              <p className="text-[8px] sm:text-[9px] font-mono font-bold text-muted-foreground tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1">Current Focus</p>
              <p className="text-xs sm:text-sm font-bold text-foreground">AI & Data Science</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-1">Building data & ML projects</p>
            </div>
          </BentoTile>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
