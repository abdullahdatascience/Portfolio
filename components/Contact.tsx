import React from 'react';

const contactInfo = {
  email: 'drabdullahumer@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdullahumer12',
  github: 'https://github.com/abdullahdatascience',
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-white mb-16">
          Get In Touch
        </h2>

        {/* Container with increased width and padding */}
        <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-10 backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-teal-500/20 hover:border-teal-500/50 transform hover:-translate-y-1 max-w-5xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Left Side: Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.
              </p>
            </div>

            {/* Right Side: Actions with Natural Icons */}
            <div className="w-full md:w-auto">
              <ul className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-end">
                {/* Gmail Button - Natural Style: White Background (Envelope) with Red Icon */}
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="group inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 text-base shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 gap-3"
                  >
                    <svg className="w-6 h-6 text-[#EA4335] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                    <span>Gmail</span>
                  </a>
                </li>

                {/* LinkedIn Button - Official Brand Color (#0A66C2) */}
                <li>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-[#0A66C2] text-white font-bold rounded-xl hover:bg-[#004182] transition-all duration-300 text-base shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 gap-3"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>

                {/* GitHub Button - Official Brand Color (Dark) */}
                <li>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex justify-center items-center w-full sm:w-auto px-8 py-4 bg-[#24292e] text-white font-bold rounded-xl hover:bg-[#1b1f23] border border-gray-700 transition-all duration-300 text-base shadow-lg hover:shadow-gray-500/50 hover:-translate-y-0.5 gap-3"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;