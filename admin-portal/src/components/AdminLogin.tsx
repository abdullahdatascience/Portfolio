import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

interface AdminLoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type Mode = "signin" | "forgot";

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const AdminLogin: React.FC<AdminLoginProps> = ({ setIsLoggedIn }) => {
  const [mode, setMode]         = useState<Mode>("signin");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(false);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError("");
    setSuccess("");
    setPassword("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!email || !password) return setError("Please fill in all fields.");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await userCredential.user.getIdToken(true);
      setIsLoggedIn(true);
    } catch (err: any) {
      const code = err.code;
      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential" ||
        code === "auth/invalid-email" ||
        code === "auth/invalid-login-credentials"
      ) {
        setError("Invalid email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a few minutes.");
      } else if (code === "auth/user-disabled") {
        setError("This account has been disabled.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection.");
      } else {
        setError(`Error: ${code}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!email) return setError("Please enter your email address.");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Reset link sent! Check your inbox and spam folder.");
    } catch (err: any) {
      const code = err.code;
      if (code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (code === "auth/network-request-failed") {
        setError("Network error. Check your internet connection.");
      } else {
        setError(`Error: ${code}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-3 sm:px-4 py-4 sm:py-8">
      {/* Background pattern — matches Hero */}
      <div className="absolute inset-0 -z-10 bg-slate-950" />
      <div className="absolute inset-0 -z-10 opacity-[0.07] bg-[radial-gradient(circle_at_center,#14b8a6_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />

      {/* Animated glowing orbs — matches Hero */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[140px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-[50%] right-[40%] w-[300px] h-[300px] rounded-full bg-blue-500/[0.08] blur-[100px] -z-10 pointer-events-none"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/40"
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent1 to-accent2 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20 relative group"
        >
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Eyebrow label — matches Hero */}
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="h-px w-6 bg-primary rounded-full" />
            <p className="text-primary text-[10px] font-bold tracking-[0.45em] uppercase">
              Secure Portal
            </p>
            <span className="h-px w-6 bg-primary rounded-full" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            {mode === "signin" ? (
              <>Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2">Access</span></>
            ) : (
              <>Reset <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2">Password</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {mode === "signin"
              ? "Secure portal for portfolio management"
              : "We'll send a reset link to your email"}
          </p>
        </motion.div>

        {/* Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/25 text-teal-400 text-sm font-medium"
          >
            {success}
          </motion.div>
        )}

        {/* SIGN IN */}
        {mode === "signin" && (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSignIn}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Email Address
              </label>
              <input
                type="email" placeholder="admin@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                disabled={loading} required autoComplete="email"
                className="w-full px-4 py-3 sm:py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-lg sm:rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.08)] transition-all duration-300"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 gap-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button type="button"
                  onClick={() => switchMode("forgot")}
                  className="text-xs font-semibold text-primary hover:text-teal-300 transition-colors whitespace-nowrap"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  disabled={loading} required autoComplete="current-password"
                  className="w-full px-4 py-3 sm:py-3.5 pr-12 bg-white/[0.04] border border-white/[0.08] rounded-lg sm:rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.08)] transition-all duration-300"
                />
                <button type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-2 -m-1"
                >
                  {showPass ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 sm:py-4 mt-2 bg-gradient-to-r from-primary to-accent1 hover:from-teal-400 hover:to-violet-500 text-slate-950 font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:shadow-[0_0_50px_rgba(20,184,166,0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center text-xs sm:text-sm uppercase tracking-widest overflow-hidden relative group"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              {loading ? (
                <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                "Access Admin Panel"
              )}
            </button>
          </motion.form>
        )}

        {/* FORGOT PASSWORD */}
        {mode === "forgot" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleForgot} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Email Address
                </label>
                <input
                  type="email" placeholder="admin@example.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  disabled={loading} required autoComplete="email"
                  className="w-full px-4 py-3 sm:py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-lg sm:rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.08)] transition-all duration-300"
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 sm:py-3.5 bg-primary hover:bg-teal-400 text-slate-950 font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(20,184,166,0.25)] hover:shadow-[0_0_40px_rgba(20,184,166,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center text-xs sm:text-sm"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <button onClick={() => switchMode("signin")}
              className="w-full mt-4 text-xs sm:text-sm text-slate-500 hover:text-slate-300 font-medium transition-colors py-3 sm:py-2"
            >
              ← Back to sign in
            </button>
          </motion.div>
        )}

        {/* Footer */}
        <p className="text-center text-[10px] sm:text-[11px] text-slate-700 mt-6 sm:mt-8 tracking-wider px-2">
          Authorized Personnel Only · Muhammad Abdullah
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
