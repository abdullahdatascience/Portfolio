"use client"

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import type { Experience as ExperienceType } from "@/lib/types";

const Experience: React.FC<{ experience: ExperienceType[] }> = ({ experience }) => {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:pl-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2 animate-gradient-x">
              Experience
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-teal-400 to-blue-500" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experience.length > 0 && (
            <div className="relative">
              <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/30 via-blue-500/20 to-transparent" />

              {experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-card/70 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl border border-border/60
                                    hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-2 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors duration-300">
                          <Briefcase size={18} className="text-teal-400" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{exp.company}</p>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground mb-4 font-mono">
                        {exp.startDate} — {exp.endDate}
                      </p>

                      <div className="h-px w-full bg-gradient-to-r from-teal-500/30 via-white/10 to-transparent mb-4" />

                      {exp.responsibilities && (
                        <ul className={`space-y-2 text-sm text-muted-foreground ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}>
                          {exp.responsibilities.split("\n").filter((r) => r.trim()).map((item, i) => (
                            <li key={i} className={`flex items-start gap-2 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                              <span>{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="hidden md:flex absolute left-5 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-teal-500 border-4 border-background z-10" />
                </motion.div>
              ))}
            </div>
          )}
          {experience.length === 0 && (
            <div className="text-center py-16 opacity-40">
              <p>No experience records yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
