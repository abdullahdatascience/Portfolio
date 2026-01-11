    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { LogOut, Presentation, Wallet, ChevronDown } from 'lucide-react';

    interface Project {
      title: string;
      tools: string[];
      summary: string;
      description: string;
      icon: React.ReactNode;
      themeColor: string; // 'rose' | 'blue' | 'emerald'
    }

    const projectsData: Project[] = [
      {
  title: 'Customer Churn Prediction',
  tools: ['Python', 'Pandas', 'Scikit-learn', 'SQL'],
  summary: 'Built a machine learning model to predict which customers are likely to churn.',
  description: 'Using historical customer data, a Random Forest model was developed to identify customers at risk of cancellation. The model achieved 80% accuracy, performing strongly for non-churn customers and providing valuable insights for early retention actions.',
  icon: <LogOut size={28} />,
  themeColor: 'rose'
},
      {
        title: 'Interactive Sales Dashboard',
        tools: ['Power BI', 'SQL', 'Excel'],
        summary: 'Designed a dynamic dashboard to visualize key sales metrics and performance.',
        description: 'Consolidated data from multiple regional databases into a centralized view. Provided real-time insights into revenue, product performance, and regional trends, leading to a 10% increase in sales efficiency.',
        icon: <Presentation size={28} />,
        themeColor: 'blue'
      },
      {
  title: 'Census Income Prediction',
  tools: ['Python', 'Pandas', 'Scikit-learn'],
  summary: 'Built a machine learning model to predict whether an individual earns above or below $50K based on demographic and work-related features.',
  description: 'Performed extensive exploratory analysis, cleaned inconsistent labels, handled missing and noisy values, engineered new features such as capital_net and age groups, and compared multiple encoding strategies. A Random Forest model achieved 85% accuracy on the test set, with strong performance on the <=50K class and balanced precision/recall on >50K incomes. Insights highlighted education level, hours worked, and capital gain as the most influential predictors.',
  icon: <Wallet size={28} />,
  themeColor: 'emerald'
}
    ];

    // Brand color mapping for tools
    const getToolStyle = (tool: string) => {
      const lower = tool.toLowerCase();
      if (lower.includes('python')) return 'bg-[#3776AB]/10 text-[#3776AB] border-[#3776AB]/30 hover:bg-[#3776AB]/20';
      if (lower.includes('pandas')) return 'bg-[#150458]/10 text-[#818CF8] border-[#150458]/30 hover:bg-[#150458]/20'; 
      if (lower.includes('scikit')) return 'bg-[#F7931E]/10 text-[#FB923C] border-[#F7931E]/30 hover:bg-[#F7931E]/20';
      if (lower.includes('sql')) return 'bg-[#00BCF2]/10 text-[#22D3EE] border-[#00BCF2]/30 hover:bg-[#00BCF2]/20';
      if (lower.includes('power bi')) return 'bg-[#F2C811]/10 text-[#FACC15] border-[#F2C811]/30 hover:bg-[#F2C811]/20';
      if (lower.includes('excel')) return 'bg-[#217346]/10 text-[#4ADE80] border-[#217346]/30 hover:bg-[#217346]/20';
      
      return 'bg-gray-700 text-gray-300 border-gray-600/50';
    };

    const ToolBadge: React.FC<{ tool: string }> = ({ tool }) => (
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getToolStyle(tool)} transition-colors duration-300`}>
        {tool}
      </span>
    );

    const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
      const [isExpanded, setIsExpanded] = useState(false);

      // Dynamic style classes based on theme
      const themeStyles = {
        rose: {
          iconBg: 'bg-rose-500/10 text-rose-400 ring-rose-500/20 group-hover:bg-rose-500/20 group-hover:ring-rose-500/40',
          titleHover: 'group-hover:text-rose-400',
          borderHover: 'hover:border-rose-500/50',
          shadowHover: 'hover:shadow-rose-500/20',
          chevron: 'text-rose-400',
        },
        blue: {
          iconBg: 'bg-blue-500/10 text-blue-400 ring-blue-500/20 group-hover:bg-blue-500/20 group-hover:ring-blue-500/40',
          titleHover: 'group-hover:text-blue-400',
          borderHover: 'hover:border-blue-500/50',
          shadowHover: 'hover:shadow-blue-500/20',
          chevron: 'text-blue-400',
        },
        emerald: {
          iconBg: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:ring-emerald-500/40',
          titleHover: 'group-hover:text-emerald-400',
          borderHover: 'hover:border-emerald-500/50',
          shadowHover: 'hover:shadow-emerald-500/20',
          chevron: 'text-emerald-400',
        }
      };

      const styles = themeStyles[project.themeColor as keyof typeof themeStyles];

      return (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`group relative bg-gray-800/40 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700/50 overflow-hidden cursor-pointer ${styles.borderHover} ${styles.shadowHover} transition-all duration-500`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-${project.themeColor}-500 pointer-events-none`} />

          <div className="p-8 pb-2">
            <div className="flex items-start gap-6">
              {/* Icon Container */}
              <div className={`p-4 rounded-2xl transition-all duration-500 ring-1 ${styles.iconBg}`}>
                  {project.icon}
              </div>
              
              <div className="flex-1 space-y-3">
                  <h3 className={`text-2xl font-bold text-white transition-colors duration-300 ${styles.titleHover}`}>
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => <ToolBadge key={tool} tool={tool} />)}
                  </div>
              </div>
            </div>

            <div className="mt-6">
                <p className="text-gray-300 leading-relaxed text-lg">{project.summary}</p>
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-8 pb-8 pt-4">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4" />
                        
                        <p className="text-gray-400 leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center py-4">
            <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`transition-colors duration-300 ${styles.chevron}`}
            >
                <ChevronDown size={24} strokeWidth={3} />
            </motion.div>
          </div>
        </motion.div>
      );
    };

    const Projects: React.FC = () => {
      return (
        <section id="projects" className="py-16 sm:py-24 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-5xl font-bold text-center text-white mb-16"
            >
              Projects Showcase
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {projectsData.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Projects;