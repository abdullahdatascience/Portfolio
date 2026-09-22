"use client"

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import type { Education as EducationType } from "@/lib/types";

const Education: React.FC<{ education: EducationType[] }> = ({ education }) => {
  return (
    <section id="education" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:pl-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Education
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-teal-400 to-blue-500" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/70 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl border border-border/60
                         hover:shadow-teal-500/10 hover:border-teal-500/30 transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:bg-teal-500/20 transition-colors duration-300">
                  <GraduationCap size={28} className="text-teal-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-base text-muted-foreground mb-4">
                    {edu.institution}
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-teal-500/30 via-white/10 to-transparent mb-4" />
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {edu.graduationDate && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        Graduated {edu.graduationDate}
                      </span>
                    )}
                    {edu.cgpa && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {education.length === 0 && (
            <div className="text-center py-16 opacity-40">
              <p>No education records yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
