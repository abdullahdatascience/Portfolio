"use client"

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import type { Certification } from "@/lib/types";

// ─── Credly embed script loader (singleton) ─────────────────
let credlyLoaded = false;

const loadCredlyScript = (): Promise<void> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve();
    if (credlyLoaded) {
      if (window.Credly?.embed) window.Credly.embed();
      return resolve();
    }
    const src = "https://cdn.credly.com/assets/utilities/embed.js";
    if (document.querySelector(`script[src="${src}"]`)) {
      credlyLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => { credlyLoaded = true; resolve(); };
    s.onerror = () => resolve(); 
    document.body.appendChild(s);
  });

const CertCard: React.FC<{ cert: Certification; index: number }> = ({ cert, index }) => {
  const [badgeReady, setBadgeReady] = useState(false);
  const hasCredly = Boolean(cert.badgeId);

  useEffect(() => {
    if (!hasCredly) return;
    loadCredlyScript().then(() => setBadgeReady(true));
  }, [hasCredly]);

  useEffect(() => {
    if (badgeReady && window.Credly?.embed) {
      window.Credly.embed();
    }
  }, [badgeReady]);

  const renderMedia = () => {
    if (hasCredly) {
      return (
        <div className="relative min-w-[150px] min-h-[200px] flex items-center justify-center">
          {!badgeReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse">
              <div className="w-28 h-28 bg-white/5 rounded-full" />
              <div className="w-20 h-2.5 bg-white/5 rounded" />
              <div className="w-16 h-2.5 bg-white/5 rounded" />
            </div>
          )}
          <div
            data-iframe-width="150"
            data-iframe-height="200"
            data-share-badge-id={cert.badgeId}
            data-share-badge-host="https://www.credly.com"
            className={badgeReady ? "visible" : "invisible"}
          />
        </div>
      );
    }
    
    return (
      <div className="w-28 h-28 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
        <Award size={48} className="text-teal-400" />
      </div>
    );
  };

  const getButtonInfo = () => {
    if (hasCredly) {
      return {
        label: "Verify on Credly",
        url: `https://www.credly.com/badges/${cert.badgeId}`,
        icon: <ExternalLink size={14} />
      };
    }
    if (cert.certificateUrl && /^https?:\/\//i.test(cert.certificateUrl)) {
      return {
        label: "View Certificate",
        url: cert.certificateUrl,
        icon: <ExternalLink size={14} />
      };
    }
    return null;
  };

  const buttonInfo = getButtonInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card/70 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl border border-border/60
                 hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-2 group"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-shrink-0 flex justify-center">
          {renderMedia()}
        </div>

        <div className="flex-1 text-center md:text-left">
          <span className="inline-block mb-2 text-xs font-bold text-teal-400 uppercase tracking-[0.2em]">
            {cert.issuer}
          </span>
          <h3 className="text-2xl font-sans font-bold tracking-tight text-foreground mb-3">
            {cert.title}
          </h3>
          {cert.issueDate && (
            <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
               <Award size={14} /> {cert.issueDate}
            </p>
          )}
          
          <div className="h-px w-full bg-gradient-to-r from-teal-500/30 via-white/10 to-transparent mb-6" />

          {buttonInfo && (
            <a
              href={buttonInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-slate-950 font-bold rounded-xl hover:bg-teal-400 transition-all duration-300 text-sm shadow-lg hover:shadow-teal-500/40"
            >
              {buttonInfo.label}
              {buttonInfo.icon}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC<{ certs: Certification[] }> = ({ certs }) => {
  return (
    <section id="certifications" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 md:pl-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2 animate-gradient-x">
               Certifications
             </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-teal-400 to-blue-500" />
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {certs.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
          {certs.length === 0 && (
            <div className="text-center py-16 opacity-40">
              <p>No certifications recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

declare global {
  interface Window {
    Credly?: { embed: () => void };
  }
}
