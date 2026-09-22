import React, { useState, useCallback, useRef, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { LogOut, AlertTriangle } from "lucide-react";
import { auth } from "../firebase";
import { Toast } from "./types";

const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Certifications = lazy(() => import("./Certifications"));
const Education = lazy(() => import("./Education"));
const Experience = lazy(() => import("./Experience"));
const Messages = lazy(() => import("./Messages"));
const ProfileSettings = lazy(() => import("./ProfileSettings"));

type Tab = "skills" | "projects" | "certifications" | "education" | "experience" | "messages" | "profile";

const TABS: { key: Tab; label: string }[] = [
  { key: "skills",          label: "Skills" },
  { key: "projects",        label: "Projects" },
  { key: "certifications",  label: "Certs" },
  { key: "education",       label: "Education" },
  { key: "experience",      label: "Experience" },
  { key: "messages",        label: "Messages" },
  { key: "profile",         label: "Profile" },
];

interface AdminDashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState<Tab>("skills");
  const [toast, setToast] = useState<Toast | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; onConfirm: () => void } | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const notify = useCallback((text: string, type: "success" | "error") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ text, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-[500px]" role="status" aria-label="Loading content">
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/30 border-t-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          role="status"
          aria-live="polite"
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl font-semibold text-sm shadow-xl
            ${toast.type === "success"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
        >
          {toast.type === "success" && <span className="mr-1.5">&#10003;</span>}
          {toast.type === "error" && <span className="mr-1.5">!</span>}
          {toast.text}
        </motion.div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm action"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card/95 border border-border/70 rounded-2xl p-7 max-w-sm w-full shadow-2xl backdrop-blur-xl"
          >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-base mb-1">Confirm Action</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{confirmDialog.message}</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500
                            flex items-center justify-center text-slate-900 font-bold text-sm shadow-lg shadow-teal-500/20">
              M.A.
            </div>
            <div>
              <p className="text-sm font-bold text-foreground tracking-tight">Muhammad Abdullah</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>
          <button onClick={() => { auth.signOut(); setIsLoggedIn(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-card/70 hover:bg-muted/70 text-muted-foreground hover:text-foreground rounded-xl text-sm font-medium transition-colors border border-border/70">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Tabs */}
        <nav className="flex gap-1 mb-8 bg-card/60 p-1.5 rounded-2xl border border-border/70 w-fit flex-wrap" aria-label="Admin sections">
          {TABS.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              aria-current={activeTab === key ? "page" : undefined}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeTab === key
                  ? "bg-primary text-slate-950 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="min-h-[500px]">
          <Suspense fallback={<LoadingSpinner />}>
            {activeTab === "skills" && <Skills notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "projects" && <Projects notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "certifications" && <Certifications notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "education" && <Education notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "experience" && <Experience notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "messages" && <Messages notify={notify} setConfirmDialog={setConfirmDialog} />}
            {activeTab === "profile" && <ProfileSettings notify={notify} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
