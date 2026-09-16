"use client"

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Presentation, Wallet, ChevronDown, Search, Target, TrendingUp, Brain, Lightbulb, ExternalLink } from "lucide-react";
import type { Project as ProjectData } from "@/lib/types";

interface Project extends ProjectData {
  icon: React.ReactNode;
}

const getToolStyle = (tool: string) => {
  const lower = tool.toLowerCase();
  if (lower.includes("python"))   return "bg-[#3776AB]/10 text-[#3776AB] border-[#3776AB]/30 hover:bg-[#3776AB]/20";
  if (lower.includes("pandas"))   return "bg-[#150458]/10 text-[#818CF8] border-[#150458]/30 hover:bg-[#150458]/20";
  if (lower.includes("scikit"))   return "bg-[#F7931E]/10 text-[#FB923C] border-[#F7931E]/30 hover:bg-[#F7931E]/20";
  if (lower.includes("sql"))      return "bg-[#00BCF2]/10 text-[#22D3EE] border-[#00BCF2]/30 hover:bg-[#00BCF2]/20";
  if (lower.includes("power bi")) return "bg-[#F2C811]/10 text-[#FACC15] border-[#F2C811]/30 hover:bg-[#F2C811]/20";
  if (lower.includes("excel"))    return "bg-[#217346]/10 text-[#4ADE80] border-[#217346]/30 hover:bg-[#217346]/20";
  return "bg-muted/70 text-foreground/80 border-border/60 hover:bg-muted/80";
};

const ToolBadge: React.FC<{ tool: string }> = ({ tool }) => (
  <span className={`text-[10px] font-semibold px-3 py-1 rounded-full border transition-colors duration-300 ${getToolStyle(tool)}`}>
    {tool}
  </span>
);

const themeStyles = {
  rose: {
    iconBg: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20 group-hover:bg-rose-500/20 group-hover:ring-rose-500/40",
    titleHover: "group-hover:text-rose-400",
    borderHover: "hover:border-rose-500/50",
    shadowHover: "hover:shadow-rose-500/20",
    chevron: "text-rose-400",
  },
  blue: {
    iconBg: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 group-hover:bg-blue-500/20 group-hover:ring-blue-500/40",
    titleHover: "group-hover:text-blue-400",
    borderHover: "hover:border-blue-500/50",
    shadowHover: "hover:shadow-blue-500/20",
    chevron: "text-blue-400",
  },
  emerald: {
    iconBg: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:ring-emerald-500/40",
    titleHover: "group-hover:text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    shadowHover: "hover:shadow-emerald-500/20",
    chevron: "text-emerald-400",
  },
  teal: {
    iconBg: "bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20 group-hover:bg-teal-500/20 group-hover:ring-teal-500/40",
    titleHover: "group-hover:text-teal-400",
    borderHover: "hover:border-teal-500/50",
    shadowHover: "hover:shadow-teal-500/20",
    chevron: "text-teal-400",
  },
  violet: {
    iconBg: "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20 group-hover:bg-violet-500/20 group-hover:ring-violet-500/40",
    titleHover: "group-hover:text-violet-400",
    borderHover: "hover:border-violet-500/50",
    shadowHover: "hover:shadow-violet-500/20",
    chevron: "text-violet-400",
  },
  amber: {
    iconBg: "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20 group-hover:bg-amber-500/20 group-hover:ring-amber-500/40",
    titleHover: "group-hover:text-amber-400",
    borderHover: "hover:border-amber-500/50",
    shadowHover: "hover:shadow-amber-500/20",
    chevron: "text-amber-400",
  },
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = themeStyles[project.themeColor as keyof typeof themeStyles] || themeStyles.emerald;
  const detailsId = `project-details-${project.id}`;
  const safeLink = project.link && /^https?:\/\//i.test(project.link) ? project.link : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={`group relative bg-card/70 rounded-2xl overflow-hidden border border-border/60 ${styles.borderHover} transition-all duration-500 backdrop-blur-sm`}
    >
      <div className={`h-1 w-0 group-hover:w-full transition-all duration-700 ease-out absolute top-0 left-0 ${
        project.themeColor === 'rose'    ? 'bg-rose-500'    :
        project.themeColor === 'blue'    ? 'bg-blue-500'    :
        project.themeColor === 'emerald' ? 'bg-emerald-500' :
        project.themeColor === 'teal'    ? 'bg-teal-500'    :
        project.themeColor === 'violet'  ? 'bg-violet-500'  :
        project.themeColor === 'amber'   ? 'bg-amber-500'   : 'bg-teal-500'
      }`} />

      {project.image && (
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-xl transition-all duration-500 flex-shrink-0 ${styles.iconBg}`}>
            {project.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-bold text-foreground mb-1 transition-colors duration-300 ${styles.titleHover}`}>
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.summary}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map((tool) => <ToolBadge key={tool} tool={tool} />)}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={detailsId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="h-px w-full bg-border/60 mb-4" />
              <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex items-center mt-4 ${safeLink ? "justify-between" : "justify-center"}`}>
          {safeLink && (
            <a
              href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-border/60 text-muted-foreground transition-colors duration-300 hover:text-foreground hover:border-teal-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden />
              View Project
            </a>
          )}

          <button
            type="button"
            onClick={() => setIsExpanded((p) => !p)}
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            aria-label={`${isExpanded ? "Collapse" : "Expand"} description for ${project.title}`}
            className={`inline-flex items-center justify-center p-1 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${styles.chevron}`}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex"
            >
              <ChevronDown size={18} strokeWidth={2} aria-hidden />
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC<{ projects: ProjectData[] }> = ({ projects }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const getIconForTheme = (theme: string) => {
    switch (theme) {
      case "rose":    return <Target size={24} />;
      case "blue":    return <Presentation size={24} />;
      case "emerald": return <Wallet size={24} />;
      case "teal":    return <TrendingUp size={24} />;
      case "violet":  return <Brain size={24} />;
      case "amber":   return <Lightbulb size={24} />;
      default:        return <Presentation size={24} />;
    }
  };

  const projectCards: Project[] = projects.map((p) => ({ ...p, icon: getIconForTheme(p.themeColor) }));

  const allTools = Array.from(new Set(projectCards.flatMap(p => p.tools))).sort();

  const filteredProjects = projectCards.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTool = selectedTool ? p.tools.includes(selectedTool) : true;
    return matchesSearch && matchesTool;
  });

  return (
    <section id="projects" className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent2/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 md:pl-24 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent1 to-accent2 animate-gradient-x">
              Featured Projects
            </span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-accent1" />
        </motion.div>

        <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search projects by name or summary..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card/70 border border-border/70 rounded-xl pl-12 pr-5 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all placeholder-muted-foreground backdrop-blur-md"
            />
          </div>
          
          <div className="w-full md:flex-1 flex overflow-x-auto gap-2 no-scrollbar pb-2">
            <button 
              onClick={() => setSelectedTool(null)}
              className={`relative shrink-0 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 ${!selectedTool ? 'text-foreground bg-primary/20 border border-primary/30' : 'text-muted-foreground border border-border/60 hover:border-border/80'}`}
            >
              All Tools
            </button>
            {allTools.map(tool => (
              <button 
                key={tool}
                onClick={() => setSelectedTool(tool)}
                className={`relative shrink-0 text-xs font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 ${selectedTool === tool ? 'text-foreground bg-primary/20 border border-primary/30' : 'text-muted-foreground border border-border/60 hover:border-border/80'}`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="max-w-xl mx-auto text-center py-20 bg-card/60 border border-border/60 rounded-3xl backdrop-blur-sm">
            <Presentation size={48} className="text-muted-foreground mx-auto mb-6 opacity-30" />
            <p className="text-muted-foreground text-sm font-medium">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
