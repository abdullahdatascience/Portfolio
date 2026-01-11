import React from 'react';

const skills = ['Python', 'R', 'Excel', 'SQL', 'AI'];

// Skill badge
const SkillBadge: React.FC<{ skill: string }> = ({ skill }) => (
  <span className="bg-gray-700 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full">
    {skill}
  </span>
);

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
          About Me
        </h2>

        <div className="bg-gray-800/50 rounded-lg shadow-xl p-8 md:p-12 backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-teal-500/20 hover:border-teal-500/50 transform hover:-translate-y-1">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
            {/* Image */}
            <div className="md:w-2/5 flex-shrink-0">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuBD2vMVbuccflqzPSFy2D2Do_aTdAagUCPsoOuIv2R5hV6SHlERgUinE&sig=QmJ5k1bXW6U6d8Y6nXv3F4Kf1kU5r1Z0"
                alt="Data analysis workspace"
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>

            {/* Text */}
            <div className="md:w-3/5 text-lg text-gray-300">
              <p className="mb-6">
                I am a results-driven Data Analyst with a passion for uncovering hidden patterns and stories within data. My expertise lies in leveraging advanced statistical techniques and machine learning models to provide clear, strategic insights that drive business growth and efficiency.
              </p>
              <p className="mb-8">
                With a strong foundation in programming and database management, I thrive in collaborative environments, translating complex analytical findings into understandable and impactful business solutions.
              </p>

              {/* Core Skills */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Core Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
