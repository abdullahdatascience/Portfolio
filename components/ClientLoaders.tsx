"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

export const LazySideNav = dynamic(() => import("./SideNav"), { ssr: false });
export const LazyMobileBottomNav = dynamic(() => import("./MobileBottomNav"), { ssr: false });
export const LazyScrollToTop = dynamic(() => import("./ScrollToTop"), { ssr: false });
export const LazyContact = dynamic(() => import("./Contact"), { ssr: false });

// ── Boot loader ─────────────────────────────────────────────────────────────
// A minimal, branded full-screen overlay shown while the initial app shell
// boots (JS bundle loads + React hydrates). It is server-rendered so it paints
// with the very first page render, and releases as soon as the document is
// fully loaded (all async chunks executed) — but never longer than the fixed
// LOADER_DURATION_MS cap, whichever happens first.

type BootPhase = "loading" | "exiting" | "done";

const EXIT_FAILSAFE_MS = 800; // drop the overlay even if `transitionend` doesn't fire
const LOADER_DURATION_MS = 900; // hard cap on how long the loader stays visible

export const BootLoader = () => {
  const [phase, setPhase] = useState<BootPhase>("loading");

  useEffect(() => {
    const dismiss = () => setPhase((p) => (p === "loading" ? "exiting" : p));

    // Hydration has just completed. If the document is already fully loaded,
    // release; otherwise wait for the `load` event (all async chunks done).
    const poll = window.setTimeout(() => {
      if (document.readyState === "complete") {
        dismiss();
      } else {
        window.addEventListener("load", dismiss);
      }
    }, 0);

    // Fixed duration cap: release the overlay after LOADER_DURATION_MS even if
    // the load event hasn't fired yet.
    const cap = window.setTimeout(() => {
      window.removeEventListener("load", dismiss);
      dismiss();
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(poll);
      window.clearTimeout(cap);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  // Unmount the overlay once its fade-out has finished.
  useEffect(() => {
    if (phase !== "exiting") return;
    const t = window.setTimeout(() => setPhase((p) => (p === "exiting" ? "done" : p)), EXIT_FAILSAFE_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  const handleExitTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === "opacity") setPhase((p) => (p === "exiting" ? "done" : p));
  };

  if (phase === "done") return null;

  const exiting = phase === "exiting";

  return (
    <div
      role="status"
      aria-hidden={exiting}
      className={`fixed inset-0 z-[8000] flex items-center justify-center bg-background transition-all duration-500 ease-out ${
        exiting ? "pointer-events-none opacity-0 scale-[1.02]" : ""
      }`}
      onTransitionEnd={handleExitTransitionEnd}
    >
      <div className="flex flex-col items-center gap-7">
        {/* Existing "M.A" monogram mark used across the site */}
        <div className="animate-loader-pop flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 shadow-2xl shadow-teal-500/20">
          <span className="text-slate-900 font-bold text-sm uppercase tracking-[0.08em]">M.A</span>
        </div>
        <div className="flex flex-col items-center gap-3.5">
          <p className="text-sm text-muted-foreground font-light tracking-wide">Preparing portfolio…</p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="animate-loader-dot block w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="animate-loader-dot block w-1.5 h-1.5 rounded-full bg-teal-400" style={{ animationDelay: "0.2s" }} />
            <span className="animate-loader-dot block w-1.5 h-1.5 rounded-full bg-teal-400" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};
