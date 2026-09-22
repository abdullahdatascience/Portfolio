"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Users,
  Lightbulb,
  Clock,
  RefreshCw,
  Target,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import type { Skill } from "@/lib/types";
import { getSkillIcon, SkillLogo } from "@/lib/skillIcons";

/**
 * Generic fallback icon for skills that do not have a mapped logo.
 */
const FallbackIcon = ({ name }: { name: string }) => (
  <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 relative">
    <span className="w-full h-full flex items-center justify-center rounded bg-primary/10 text-primary font-bold text-[10px] leading-none">
      {name.slice(0, 2).toUpperCase()}
    </span>
  </span>
);

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Category icon — Software Engineering
 */
const SoftwareIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M8 6L3 12L8 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 6L21 12L16 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 4L10.5 20"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Category icon — Data & Analytics
 */
const DataAnalyticsIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 20V10M10 20V4M16 20V13M22 20H2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="10" r="2.5" fill="currentColor" />
  </svg>
);

/**
 * Category icon — Machine Learning
 */
const MachineLearningIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <circle cx="4" cy="7" r="1.8" fill="currentColor" />
    <circle cx="20" cy="7" r="1.8" fill="currentColor" />
    <circle cx="4" cy="17" r="1.8" fill="currentColor" />
    <circle cx="20" cy="17" r="1.8" fill="currentColor" />

    <path
      d="M5.6 7.8L12 12M18.4 7.8L12 12M5.6 16.2L12 12M18.4 16.2L12 12"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeOpacity=".7"
    />
  </svg>
);

/**
 * Category icon — Databases & Infrastructure
 */
const DatabaseIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <ellipse
      cx="12"
      cy="5.5"
      rx="8"
      ry="3"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    <path
      d="M4 5.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />

    <path
      d="M12 13.5v5M4 10.5v5c0 1.66 3.58 3 8 3 2.24 0 4.28-.31 5.87-.85"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const categoryIconMap: Record<string, React.ReactNode> = {
  "Software Engineering": <SoftwareIcon size={22} />,
  "Data & Analytics": <DataAnalyticsIcon size={22} />,
  "Machine Learning": <MachineLearningIcon size={22} />,
  "Databases & Infrastructure": <DatabaseIcon size={22} />,
};

const categoryColorMap: Record<string, string> = {
  "Software Engineering": "text-teal-400",
  "Data & Analytics": "text-amber-400",
  "Machine Learning": "text-blue-400",
  "Databases & Infrastructure": "text-rose-400",
};

const CATEGORY_ORDER = [
  "Software Engineering",
  "Data & Analytics",
  "Machine Learning",
  "Databases & Infrastructure",
];

// ─────────────────────────────────────────────────────────────────────────────
// SKILL ROW
// ─────────────────────────────────────────────────────────────────────────────

interface SkillRowProps {
  name: string;
  icon: React.ReactNode;
}

const SkillRow: React.FC<SkillRowProps> = ({ name, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="last:mb-0 mb-4"
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-xs font-semibold text-foreground">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SOFT SKILLS
// ─────────────────────────────────────────────────────────────────────────────

interface SoftSkill {
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  borderColor: string;
}

const SOFT_SKILLS: SoftSkill[] = [
  {
    label: "Communication",
    description:
      "Translating complex data into clear, compelling narratives for any audience.",
    icon: <MessageSquare size={16} />,
    color: "bg-teal-500/5",
    textColor: "text-teal-400",
    borderColor: "hover:border-teal-500/30",
  },
  {
    label: "Teamwork",
    description:
      "Collaborating across cross-functional teams to deliver shared objectives.",
    icon: <Users size={16} />,
    color: "bg-blue-500/5",
    textColor: "text-blue-400",
    borderColor: "hover:border-blue-500/30",
  },
  {
    label: "Problem Solving",
    description:
      "Breaking down ambiguous challenges into structured, data-driven solutions.",
    icon: <Lightbulb size={16} />,
    color: "bg-yellow-500/5",
    textColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/30",
  },
  {
    label: "Time Management",
    description:
      "Prioritising tasks effectively to meet tight deadlines without sacrificing quality.",
    icon: <Clock size={16} />,
    color: "bg-purple-500/5",
    textColor: "text-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    label: "Adaptability",
    description:
      "Thriving in fast-changing environments and quickly learning new tools and methods.",
    icon: <RefreshCw size={16} />,
    color: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    borderColor: "hover:border-emerald-500/30",
  },
  {
    label: "Critical Thinking",
    description:
      "Evaluating data objectively to draw well-reasoned, evidence-based conclusions.",
    icon: <Brain size={16} />,
    color: "bg-pink-500/5",
    textColor: "text-pink-400",
    borderColor: "hover:border-pink-500/30",
  },
  {
    label: "Attention to Detail",
    description:
      "Ensuring accuracy and consistency across every dataset, report, and deliverable.",
    icon: <Target size={16} />,
    color: "bg-rose-500/5",
    textColor: "text-rose-400",
    borderColor: "hover:border-rose-500/30",
  },
  {
    label: "Continuous Learning",
    description:
      "Staying ahead of the curve by actively exploring new analytical techniques.",
    icon: <BookOpen size={16} />,
    color: "bg-cyan-500/5",
    textColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    label: "Results-Oriented",
    description:
      "Focusing on measurable impact and actionable insights that drive real business value.",
    icon: <TrendingUp size={16} />,
    color: "bg-orange-500/5",
    textColor: "text-orange-400",
    borderColor: "hover:border-orange-500/30",
  },
];

const SoftSkillCard: React.FC<{
  skill: SoftSkill;
  index: number;
}> = ({ skill, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group flex flex-col gap-3 bg-card/70 rounded-xl p-5 border border-border/60 backdrop-blur-md ${skill.borderColor} hover:bg-muted/70 transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${skill.color} ${skill.textColor}`}
        >
          {skill.icon}
        </div>

        <span className="text-sm font-semibold text-foreground">
          {skill.label}
        </span>
      </div>

      <p className="text-[11px] text-muted-foreground leading-normal">
        {skill.description}
      </p>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Skills: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const resolveIcon = (name: string) => {
    const icon = getSkillIcon(name);

    if (icon) {
      return <SkillLogo icon={icon} />;
    }

    return <FallbackIcon name={name} />;
  };

  const grouped = skills.reduce(
    (acc, skill) => {
      (acc[skill.category] ??= []).push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  const sortedCategories = [
    ...CATEGORY_ORDER.filter((category) => grouped[category]),
    ...Object.keys(grouped).filter(
      (category) => !CATEGORY_ORDER.includes(category),
    ),
  ];

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 bg-background relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section heading */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Technical Skills
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight"
          >
            Core Competencies
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 h-0.5 w-12 bg-primary/40"
          />
        </div>

        {/* Technical skill cards */}
        {sortedCategories.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {sortedCategories.map((category, index) => {
              const categorySkills = grouped[category];
              const itemCount = categorySkills.length;

              const isWide =
                category === "Software Engineering" || itemCount > 6;

              const spanClass = isWide
                ? "col-span-1 lg:col-span-2"
                : "col-span-1";

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                  }}
                  className={`bg-card/60 rounded-2xl p-7 border border-border/60 hover:border-border/80 transition-all duration-500 ${spanClass} flex flex-col h-full group`}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-10 pb-4 border-b border-border/60">
                    <div
                      className={`w-9 h-9 rounded-xl bg-muted/80 flex-shrink-0 flex items-center justify-center border border-border/60 transition-all duration-300 group-hover:scale-105 ${
                        categoryColorMap[category] ?? "text-primary"
                      }`}
                    >
                      {categoryIconMap[category] ?? (
                        <MachineLearningIcon size={20} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-foreground tracking-tight leading-none">
                        {category}
                      </h3>

                      <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">
                        Skills
                      </p>
                    </div>

                    <span className="ml-auto text-xs font-bold text-muted-foreground tabular-nums">
                      {itemCount.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Skill list */}
                  <div
                    className={
                      isWide
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-x-12"
                        : "flex flex-col"
                    }
                  >
                    {categorySkills.map((skill) => (
                      <SkillRow
                        key={skill.id}
                        name={skill.name}
                        icon={resolveIcon(skill.name)}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-20 bg-card/60 border border-border/60 rounded-3xl">
            <Brain
              size={40}
              className="text-muted-foreground mx-auto mb-4 opacity-50"
            />

            <p className="text-muted-foreground text-sm italic tracking-widest px-6">
              No technical skills have been added to the database yet.
              <br />

              <span className="text-[10px] uppercase mt-2 block opacity-60">
                Populate the &apos;skills&apos; collection in the admin portal.
              </span>
            </p>
          </div>
        )}

        {/* Soft skills */}
        <div className="max-w-6xl mx-auto mt-32">
          <div className="flex items-center gap-6 mb-16">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em] whitespace-nowrap">
              Intrapersonal Skills
            </h3>

            <div className="h-px w-full bg-border/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillCard
                key={skill.label}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

