"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Mail, Send, Github, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";

const contactInfo = {
  email: "drabdullahumer@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdullahumer12",
  github: "https://github.com/abdullahdatascience",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) {
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("sending");
    try {
      await addDoc(collection(db, "messages"), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:pl-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2">
              Get In Touch
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent1" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Collaborate</p>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Let&apos;s work together on your next project.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                I&apos;m open to new opportunities and collaborations. Reach out with questions or to say hello.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card/70 border border-border/60 hover:bg-muted/70 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                  <p className="text-foreground font-medium">{contactInfo.email}</p>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/70 border border-border/60 hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-sm font-medium text-foreground">LinkedIn</span>
                </a>
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/70 border border-border/60 hover:border-muted-foreground/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted/80 flex items-center justify-center text-foreground">
                    <Github size={20} />
                  </div>
                  <span className="text-sm font-medium text-foreground">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card/70 border border-border/60 rounded-3xl p-8 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Message sent</h3>
                  <p className="text-muted-foreground max-w-xs">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-primary font-bold text-sm tracking-widest uppercase hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — hidden from users, bots often fill it */}
                  <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-card/70 border border-border/70 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-card/70 border border-border/70 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-card/70 border border-border/70 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                      <AlertCircle size={16} />
                      <span>Could not send. Check your email and try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 bg-primary text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {status === "sending" ? "Sending..." : (
                      <>
                        <span>Send message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-16 pb-10">
          © {new Date().getFullYear()} Muhammad Abdullah · Built with Next.js & Firebase
        </p>
      </div>
    </section>
  );
};

export default Contact;
