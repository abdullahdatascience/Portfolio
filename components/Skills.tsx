import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

// --- Brand Logo Components (Natural Colors) ---

const PythonLogo = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <defs>
      <linearGradient id="python-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3776AB" />
        <stop offset="100%" stopColor="#275D8B" />
      </linearGradient>
      <linearGradient id="python-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD43B" />
        <stop offset="100%" stopColor="#FFE873" />
      </linearGradient>
    </defs>
    <path
      d="M63.04 19.12c-16.16 0-26.19 7.11-26.19 19.34h26.62v3.87H23.28c-13.31 0-21.94 9.03-21.94 21.63 0 12.6 11.61 21.63 24.31 21.63h6.1v-9.43c0-12.6 11.08-24.03 24.31-24.03h27.99V33.12c0-13.5-11.08-24-24.31-24h-10.71z"
      fill="url(#python-blue)"
    />
    <path
      d="M20.35 96.18h10.71c13.23 0 24.62-5.58 24.62-19.12h-26.62v-3.87h40.19c13.31 0 24.31 9.03 24.31 21.63 0 12.6-11.08 21.63-24.31 21.63h-5.9v9.43c0 12.6-11.08 24.03-24.31 24.03h-28.19v-18.77c0-13.5 11.08-24.37 24.31-24.37z"
      fill="url(#python-yellow)"
    />
    <circle cx="45.7" cy="38.5" r="6" fill="#fff" />
    <circle cx="80.3" cy="95.6" r="6" fill="#fff" />
  </svg>
);

const RLogo = () => (
  <svg viewBox="0 0 128 128" className="w-full h-full">
    <path
      fill="#84919c"
      d="M68.6 32.4h39.5c7.5 0 13.6 6.1 13.6 13.6v34.3c0 7.5-6.1 13.6-13.6 13.6H68.6V32.4z"
      fillOpacity="0.4"
    />
    <path
      fill="#276DC3"
      d="M64.6 60.6c8.8 0 15.9-7.1 15.9-15.9s-7.1-15.9-15.9-15.9H25.1c-8.8 0-15.9 7.1-15.9 15.9V98c0 8.8 7.1 15.9 15.9 15.9h18.6V83.7h7.9l12.1 30.2h21.2L71.7 81c4.9-2.6 8.3-7.7 8.3-13.6 0-3.8-2.5-6.8-5.4-6.8H64.6z"
    />
  </svg>
);

const SqlLogo = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 10C18.745 10 8 13.58 8 18C8 22.42 18.745 26 32 26C45.255 26 56 22.42 56 18C56 13.58 45.255 10 32 10Z" fill="#00BCF2" fillOpacity="0.2" stroke="#00BCF2" strokeWidth="2"/>
    <path d="M56 26V34C56 38.42 45.255 42 32 42C18.745 42 8 38.42 8 34V26" stroke="#00BCF2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M56 42V50C56 54.42 45.255 58 32 58C18.745 58 8 54.42 8 50V42" stroke="#00BCF2" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 18C45.255 18 56 14.42 56 10" stroke="#00BCF2" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 4"/>
  </svg>
);

const ExcelLogo = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <rect x="4" y="8" width="56" height="48" rx="4" fill="#217346" />
    <path d="M4 18h56v28H4z" fill="#1E6C41" fillOpacity="0.3" />
    <path
      d="M22 22L32 38L42 22H36L32 30L28 22H22Z"
      fill="white"
    />
    <path
      d="M22 42L32 26L42 42H36L32 34L28 42H22Z"
      fill="white"
    />
    <rect x="12" y="12" width="4" height="4" fill="white" fillOpacity="0.3" />
    <rect x="48" y="48" width="4" height="4" fill="white" fillOpacity="0.3" />
  </svg>
);

const PowerBiLogo = () => (
  <svg viewBox="0 0 32 32" className="w-full h-full">
    <rect x="6" y="14" width="6" height="12" rx="1" fill="#E6AD10" />
    <rect x="13" y="8" width="6" height="18" rx="1" fill="#F6D240" />
    <rect x="20" y="4" width="6" height="22" rx="1" fill="#F8E588" />
  </svg>
);

// --- Natural Category Logos ---

interface IconProps {
  size?: number;
  className?: string;
}

const ProgrammingCategoryLogo = ({ size = 32, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20L14 4" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M17 8L22 12L17 16" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 16L2 12L7 8" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DataAnalysisCategoryLogo = ({ size = 32, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 12V17C20 20.5 16.5 22 12 22C7.5 22 4 20.5 4 17V12" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="12" cy="7" rx="8" ry="3" stroke="#2DD4BF" strokeWidth="2" />
    <path d="M4 12C4 14.5 7.5 16 12 16" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="5" fill="#1F2937" stroke="#F472B6" strokeWidth="2"/>
    <path d="M19.5 19.5L22 22" stroke="#F472B6" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VisualizationCategoryLogo = ({ size = 32, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="13" width="4" height="8" rx="1" fill="#F472B6" />
    <rect x="9" y="8" width="4" height="13" rx="1" fill="#818CF8" />
    <rect x="15" y="4" width="4" height="17" rx="1" fill="#34D399" />
  </svg>
);

const AiMlCategoryLogo = ({ size = 32, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.5" fill="#F472B6" />
    <circle cx="5" cy="7" r="2" fill="#A78BFA" />
    <circle cx="19" cy="7" r="2" fill="#A78BFA" />
    <circle cx="5" cy="17" r="2" fill="#A78BFA" />
    <circle cx="19" cy="17" r="2" fill="#A78BFA" />
    
    <path d="M5 7L12 12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M19 7L12 12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M5 17L12 12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
    <path d="M19 17L12 12" stroke="#60A5FA" strokeWidth="1.5" strokeOpacity="0.6" />
  </svg>
);

interface SkillProgressProps {
  name: string;
  level: number;
  icon: React.ReactNode;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ name, level, icon }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-base font-medium text-white flex items-center gap-2">
          <span className="w-5 h-5 flex items-center justify-center">{icon}</span> {name}
        </span>
        <span className="text-sm font-medium text-teal-400">{level}%</span>
      </div>

      <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-3 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
        />
      </div>
    </motion.div>
  );
};

const SoftSkillBadge: React.FC<{ skill: string; delay: number }> = ({
  skill,
  delay,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-gray-700 text-teal-300 text-sm font-medium px-4 py-2 rounded-full shadow-xl border border-gray-700 transition-all duration-300 hover:shadow-teal-500/20 hover:border-teal-500/50"
    >
      {skill}
    </motion.span>
  );
};

const technicalSkills = [
  {
    category: "Programming",
    icon: <ProgrammingCategoryLogo size={22} />,
    skills: [
      { name: "Python", level: 85, icon: <PythonLogo /> },
      { name: "R", level: 75, icon: <RLogo /> },
    ],
  },
  {
    category: "Data Analysis",
    icon: <DataAnalysisCategoryLogo size={22} />,
    skills: [
      { name: "SQL", level: 65, icon: <SqlLogo /> },
      { name: "Excel", level: 90, icon: <ExcelLogo /> },
    ],
  },
  {
    category: "Visualization",
    icon: <VisualizationCategoryLogo size={22} />,
    skills: [{ name: "Power BI", level: 70, icon: <PowerBiLogo /> }],
  },
  {
    category: "AI & Machine Learning",
    icon: <AiMlCategoryLogo size={22} />,
    skills: [{ name: "AI / ML", level: 60, icon: <AiMlCategoryLogo size={20} /> }],
  },
];

const softSkills = [
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Attention to Detail",
  "Time Management",
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-bold text-center text-white mb-12"
        >
          Core Competencies
        </motion.h2>

        {/* Technical Skill Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {technicalSkills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-800/50 rounded-lg shadow-xl p-8 backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-teal-500/20 hover:border-teal-500/50 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-6 h-6">{category.icon}</span>
                <h3 className="text-2xl font-bold text-white">
                  {category.category}
                </h3>
              </div>

              <div>
                {category.skills.map((skill) => (
                  <SkillProgress
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/50 rounded-lg shadow-xl p-8 max-w-4xl mx-auto backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-teal-500/20 hover:border-teal-500/50 transform hover:-translate-y-1"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
            <Brain size={22} className="text-teal-400" /> Soft Skills
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill, index) => (
              <SoftSkillBadge key={skill} skill={skill} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;