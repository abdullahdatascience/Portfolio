"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, MessageSquare, Users, Lightbulb, Clock, RefreshCw, Target, BookOpen, TrendingUp } from "lucide-react";
import type { Skill } from "@/lib/types";

// ─────────────────────────────────────────────────────────────────────────────
// REAL BRAND SKILL LOGOS
// ─────────────────────────────────────────────────────────────────────────────

/** Generic fallback — shows first 2 letters of skill name */
const FallbackIcon = ({ name }: { name: string }) => (
  <div className="w-full h-full flex items-center justify-center rounded bg-primary/10 text-primary font-bold text-[10px] leading-none">
    {name.slice(0, 2).toUpperCase()}
  </div>
);

interface IconProps { size?: number; className?: string; }

/** Programming — VS Code blue brackets */
const ProgrammingIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 3L21 12L14 21" stroke="#007ACC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 3L3 12L10 21" stroke="#007ACC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Data Analysis — Pandas-style stacked cylinder */
const DataAnalysisIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="#E70488" strokeWidth="1.7" />
    <path d="M4 5.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#E70488" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M4 10.5v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="#130754" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

/** Visualization — Tableau-inspired bar chart */
const VisualizationIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2"  y="14" width="4" height="7" rx="1" fill="#E8762D" />
    <rect x="9"  y="9"  width="4" height="12" rx="1" fill="#1F3A6E" />
    <rect x="16" y="4"  width="4" height="17" rx="1" fill="#E8762D" opacity=".7" />
    <path d="M1 21h22" stroke="#1F3A6E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/** AI & Machine Learning — TensorFlow/neural-net nodes */
const AiMlIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="2.5" fill="#FF6F00" />
    <circle cx="4"  cy="7"  r="1.8" fill="#EE4C2C" />
    <circle cx="20" cy="7"  r="1.8" fill="#EE4C2C" />
    <circle cx="4"  cy="17" r="1.8" fill="#EE4C2C" />
    <circle cx="20" cy="17" r="1.8" fill="#EE4C2C" />
    <path d="M5.6 7.8L12 12M18.4 7.8L12 12M5.6 16.2L12 12M18.4 16.2L12 12"
          stroke="#FF6F00" strokeWidth="1.3" strokeOpacity=".7" />
  </svg>
);

const ImgIcon = ({ src, alt }: { src: string; alt?: string }) => (
  <Image
    src={src}
    alt={alt || "Tool Icon"}
    fill
    className="object-contain"
  />
);

/** Microsoft Excel — official green X icon (inline, always shows) */
const ExcelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#217346"/>
    <path d="M14 4h6v2h-6V4zm0 4h6v2h-6V8zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z" fill="#FFFFFF" opacity="0.4"/>
    <path d="M4 4h8v16H4V4z" fill="#185C37"/>
    <text x="8" y="16" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="bold" fill="#FFFFFF">X</text>
  </svg>
);

/** Microsoft Power BI — official yellow icon (inline, always shows) */
const PowerBIIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="13" width="4" height="7" rx="1" fill="#F2C811"/>
    <rect x="10" y="8"  width="4" height="12" rx="1" fill="#F2C811" opacity="0.75"/>
    <rect x="16" y="3"  width="4" height="17" rx="1" fill="#F2C811" opacity="0.5"/>
  </svg>
);

const nameIconMap: Record<string, React.ReactNode> = {
  // Programming
  "Python":            <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" /></div>,
  "R":                 <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" alt="R" /></div>,
  "SQL":               <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg" alt="SQL Server" /></div>,
  "MySQL":             <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" /></div>,
  "PostgreSQL":        <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" /></div>,
  "Git":               <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" /></div>,
  "Jupyter":           <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" alt="Jupyter" /></div>,
  "Jupyter Notebook":  <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" alt="Jupyter" /></div>,

  // Data Analysis
  "Excel":             <ExcelIcon />,
  "Microsoft Excel":   <ExcelIcon />,
  "Pandas":            <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" alt="Pandas" /></div>,
  "NumPy":             <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" alt="NumPy" /></div>,
  "SPSS":              <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" alt="IBM SPSS" /></div>,

  // Visualization
  "Power BI":          <PowerBIIcon />,
  "PowerBI":           <PowerBIIcon />,
  "PowerBi":           <PowerBIIcon />,
  "powerbi":           <PowerBIIcon />,
  "power bi":          <PowerBIIcon />,
  "Power Bi":          <PowerBIIcon />,
  "Microsoft Power BI": <PowerBIIcon />,
  "Tableau":           <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/tableau/tableau-icon.svg" alt="Tableau" /></div>,
  "tableau":           <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/tableau/tableau-icon.svg" alt="Tableau" /></div>,
  "Matplotlib":        <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" /></div>,
  "Looker":            <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/looker/looker-icon.svg" alt="Looker" /></div>,
  "Looker Studio":     <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/looker/looker-icon.svg" alt="Looker Studio" /></div>,
  "Power Automate":    <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/microsoft_flow/microsoft_flow-icon.svg" alt="Power Automate" /></div>,

  // AI & Machine Learning
  "Scikit-learn":      <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" /></div>,
  "Scikit Learn":      <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" /></div>,
  "TensorFlow":        <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /></div>,
  "PyTorch":           <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" alt="PyTorch" /></div>,
  "Keras":             <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg" alt="Keras" /></div>,
  "OpenCV":            <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" alt="OpenCV" /></div>,
  "AI / ML":           <AiMlIcon size={20} />,

  // DevOps & Cloud
  "Docker":            <div className="relative w-full h-full"><ImgIcon src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" /></div>,
  "AWS":               <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" alt="AWS" /></div>,
  "GCP":               <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="Google Cloud" /></div>,
  "Google Cloud":      <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" alt="Google Cloud" /></div>,
  "Azure":             <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg" alt="Azure" /></div>,
  
  // Data Engineering
  "Airflow":           <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_airflow/apache_airflow-icon.svg" alt="Apache Airflow" /></div>,
  "Apache Airflow":    <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_airflow/apache_airflow-icon.svg" alt="Apache Airflow" /></div>,
  "Spark":             <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" alt="Apache Spark" /></div>,
  "PySpark":           <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_spark/apache_spark-icon.svg" alt="Apache Spark" /></div>,
  "Hadoop":            <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_hadoop/apache_hadoop-icon.svg" alt="Apache Hadoop" /></div>,
  "Kafka":             <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg" alt="Apache Kafka" /></div>,
  "Snowflake":         <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" alt="Snowflake" /></div>,
  "BigQuery":          <div className="relative w-full h-full"><ImgIcon src="https://www.vectorlogo.zone/logos/google_bigquery/google_bigquery-icon.svg" alt="Google BigQuery" /></div>,
};

/** Helper to find icon by name (case-insensitive) */
const getSkillIcon = (name: string) => {
  const normalized = name.toLowerCase().trim();
  const entry = Object.entries(nameIconMap).find(([key]) => key.toLowerCase() === normalized);
  return entry ? entry[1] : <FallbackIcon name={name} />;
};

const categoryIconMap: Record<string, React.ReactNode> = {
  "Programming":           <ProgrammingIcon  size={22} />,
  "Data Analysis":         <DataAnalysisIcon size={22} />,
  "Visualization":         <VisualizationIcon size={22} />,
  "AI & Machine Learning": <AiMlIcon         size={22} />,
};

const CATEGORY_ORDER = ["Programming", "Data Analysis", "Visualization", "AI & Machine Learning"];

// ─────────────────────────────────────────────────────────────────────────────
// SKILL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────

interface SkillProgressProps { name: string; icon: React.ReactNode; }

const SkillProgress: React.FC<SkillProgressProps> = ({ name, icon }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      className="last:mb-0 mb-4"
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className="w-4 h-4 flex items-center justify-center flex-shrink-0 relative">
          {icon}
        </span>
        <span className="text-xs font-semibold text-foreground">{name}</span>
      </div>
      <div className="w-full bg-muted/70 h-1 rounded-full overflow-hidden border border-border/60 opacity-70" />
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
  { label: "Communication",      description: "Translating complex data into clear, compelling narratives for any audience.",           icon: <MessageSquare size={16} />, color: "bg-teal-500/5",    textColor: "text-teal-400",    borderColor: "hover:border-teal-500/30"   },
  { label: "Teamwork",            description: "Collaborating across cross-functional teams to deliver shared objectives.",              icon: <Users        size={16} />, color: "bg-blue-500/5",    textColor: "text-blue-400",    borderColor: "hover:border-blue-500/30"   },
  { label: "Problem Solving",     description: "Breaking down ambiguous challenges into structured, data-driven solutions.",             icon: <Lightbulb    size={16} />, color: "bg-yellow-500/5",  textColor: "text-yellow-400",  borderColor: "hover:border-yellow-500/30" },
  { label: "Time Management",     description: "Prioritising tasks effectively to meet tight deadlines without sacrificing quality.",    icon: <Clock        size={16} />, color: "bg-purple-500/5",  textColor: "text-purple-400",  borderColor: "hover:border-purple-500/30" },
  { label: "Adaptability",        description: "Thriving in fast-changing environments and quickly learning new tools and methods.",     icon: <RefreshCw    size={16} />, color: "bg-emerald-500/5", textColor: "text-emerald-400", borderColor: "hover:border-emerald-500/30"},
  { label: "Critical Thinking",   description: "Evaluating data objectively to draw well-reasoned, evidence-based conclusions.",        icon: <Brain        size={16} />, color: "bg-pink-500/5",    textColor: "text-pink-400",    borderColor: "hover:border-pink-500/30"   },
  { label: "Attention to Detail", description: "Ensuring accuracy and consistency across every dataset, report, and deliverable.",      icon: <Target       size={16} />, color: "bg-rose-500/5",    textColor: "text-rose-400",    borderColor: "hover:border-rose-500/30"   },
  { label: "Continuous Learning", description: "Staying ahead of the curve by actively exploring new analytical techniques.",           icon: <BookOpen     size={16} />, color: "bg-cyan-500/5",    textColor: "text-cyan-400",    borderColor: "hover:border-cyan-500/30"   },
  { label: "Results-Oriented",    description: "Focusing on measurable impact and actionable insights that drive real business value.", icon: <TrendingUp   size={16} />, color: "bg-orange-500/5",  textColor: "text-orange-400",  borderColor: "hover:border-orange-500/30" },
];

const SoftSkillCard: React.FC<{ skill: SoftSkill; index: number }> = ({ skill, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group flex flex-col gap-3 bg-card/70 rounded-xl p-5 border border-border/60 backdrop-blur-md ${skill.borderColor} hover:bg-muted/70 transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${skill.color} ${skill.textColor}`}>
          {skill.icon}
        </div>
        <span className="text-sm font-semibold text-foreground">{skill.label}</span>
      </div>
      <p className="text-[11px] text-muted-foreground leading-normal">{skill.description}</p>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Skills: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  // Group by category, preserve admin dropdown order
  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {} as Record<string, Skill[]>);

  const sortedCategories = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  return (
    <section id="skills" className="py-24 sm:py-36 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
          >
            Technical Proficiency
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
          >
            Core Competencies
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 h-0.5 w-12 bg-primary/40"
          />
        </div>

        {/* Technical skill cards */}
        {sortedCategories.length > 0 ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {sortedCategories.map((category, index) => {
              const itemCount = grouped[category].length;
              let spanClass = "col-span-1";
              
              if (category === "Programming" || itemCount > 6) {
                spanClass = "col-span-1 lg:col-span-2";
              }

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`bg-card/60 rounded-2xl p-7 border border-border/60 hover:border-border/80 transition-all duration-500 ${spanClass} flex flex-col h-full group`}
                >
                  <div className="flex items-center gap-4 mb-10 pb-4 border-b border-border/60">
                    <div className="w-9 h-9 rounded-xl bg-muted/80 text-primary flex-shrink-0 flex items-center justify-center border border-border/60 transition-all duration-300 group-hover:scale-105">
                      {categoryIconMap[category] ?? <AiMlIcon size={20} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground tracking-tight leading-none">{category}</h3>
                      <p className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mt-1.5">Skills</p>
                    </div>
                    <span className="ml-auto text-xs font-bold text-muted-foreground tabular-nums">
                      {grouped[category].length.toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className={spanClass.includes("col-span-2") ? "grid grid-cols-1 sm:grid-cols-2 gap-x-12" : "flex flex-col"}>
                    {grouped[category].map((skill) => (
                      <SkillProgress
                        key={skill.id}
                        name={skill.name}
                        icon={getSkillIcon(skill.name)}
                      />
                    ))}
                  </div>
                </motion.div>
              )})}
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center py-20 bg-card/60 border border-border/60 rounded-3xl">
            <Brain size={40} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-sm italic tracking-widest px-6">
              No technical skills have been added to the database yet. 
              <br/>
              <span className="text-[10px] uppercase mt-2 block opacity-60">Populate the &apos;skills&apos; collection in the admin portal.</span>
            </p>
          </div>
        )}

        {/* Soft Skills */}
        <div className="max-w-6xl mx-auto mt-32">
          <div className="flex items-center gap-6 mb-16">
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.5em] whitespace-nowrap">Intrapersonal Skills</h3>
            <div className="h-px w-full bg-border/60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOFT_SKILLS.map((skill, index) => (
              <SoftSkillCard key={skill.label} skill={skill} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
