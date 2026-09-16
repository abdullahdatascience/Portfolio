"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  {
    href: "#hero",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "#about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    href: "#education",
    label: "Education",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    href: "#experience",
    label: "Experience",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
  },
  {
    href: "#projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    href: "#certifications",
    label: "Certs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 21l3-3 3 3" />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
      </svg>
    ),
  },
];

const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const allSectionIds = ["hero", "about", "education", "experience", "projects", "certifications", "contact"];
    const sections = allSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 top-0 bottom-0 z-50 hidden md:flex flex-col items-center justify-between py-6 lg:py-8 px-2 lg:px-3 w-14 lg:w-16"
      >
        {/* Top: Logo */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-lg border border-border/60 bg-card/70 text-foreground shadow-sm transition-all duration-300 hover:scale-105"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, "#hero")}
            className="group relative flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10"
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-slate-900 font-bold text-[10px] lg:text-xs shadow-lg group-hover:scale-110 transition-transform duration-300 uppercase">
              M.A
            </div>
          </a>
        </div>

        {/* Middle: Nav links */}
        <div className="flex flex-col items-center gap-0.5 lg:gap-1 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-lg hover:bg-muted/60 transition-all duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="side-nav-active"
                    className="absolute inset-0 bg-teal-500/10 border border-teal-500/20 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-teal-400" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {link.icon}
                </span>

                <div className="absolute left-full ml-2 lg:ml-3 px-2.5 lg:px-3 py-1.5 bg-background/95 backdrop-blur-xl border border-border rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0 whitespace-nowrap shadow-xl">
                  <span className="text-[9px] lg:text-[10px] font-bold text-foreground tracking-[0.2em] uppercase">
                    {link.label}
                  </span>
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-1.5 h-1.5 bg-background/95 border-l border-b border-border rotate-45" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom: Scroll progress */}
        <div className="flex flex-col items-center gap-2 lg:gap-3">
          <div className="relative w-[2px] h-12 lg:h-16 bg-border/70 rounded-full overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-teal-400 to-blue-500 rounded-full"
              style={{ height: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Decorative vertical line */}
        <div className="absolute right-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-border/80 to-transparent" />
      </motion.nav>
    </>
  );
};

export default SideNav;
