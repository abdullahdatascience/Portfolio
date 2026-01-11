import React, { useEffect, useState, useRef } from "react";

/**
 * Improvements made:
 * 1. Layout Stability: Added min-width/height constraints to the badge container to prevent layout shifts when the iframe loads.
 * 2. Loading State: Added a skeleton pulse animation while the external script is loading the badge.
 * 3. Robust Script Loading: Checks if the script already exists to avoid duplicate tags. Triggers a refresh if the global Credly object exists.
 * 4. Sizing: Significantly increased max-width (max-w-5xl) and padding (p-10) to improve length and width presence.
 */

const Certifications: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const badgeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptSrc = "https://cdn.credly.com/assets/utilities/embed.js";
    
    // Function to check if script is loaded and initialize embed
    const loadScript = () => {
      // Check if script already exists in DOM
      const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.onload = () => {
          setIsLoading(false);
        };
        script.onerror = () => {
          console.error("Failed to load Credly embed script");
          setIsLoading(false); // Stop loading spinner even on error
        };
        document.body.appendChild(script);
      } else {
        // If script exists, we might need to re-trigger the embed parser
        setIsLoading(false);
        if (window.Credly && typeof window.Credly.embed === 'function') {
           window.Credly.embed();
        }
      }
    };

    loadScript();
  }, []);

  return (
    <section id="certifications" className="py-16 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-white mb-16">
          Certifications
        </h2>

        {/* Increased max-width to 5xl and padding to p-10 for better width and length */}
        <div className="bg-gray-800/50 rounded-2xl shadow-2xl p-10 backdrop-blur-sm border border-gray-700/50 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-teal-500/20 hover:border-teal-500/50 transform hover:-translate-y-1 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Certification Badge Area */}
            <div className="flex-shrink-0 flex justify-center relative">
              {/* 
                Container with min dimensions matches the data-iframe attributes 
                to prevent layout shift and provide space for the loader.
              */}
              <div 
                ref={badgeContainerRef}
                className="relative min-w-[150px] min-h-[270px] flex items-center justify-center"
              >
                 {/* Skeleton Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 animate-pulse">
                    <div className="w-32 h-32 bg-gray-700 rounded-full"></div>
                    <div className="w-24 h-4 bg-gray-700 rounded"></div>
                    <div className="w-20 h-4 bg-gray-700 rounded"></div>
                  </div>
                )}

                {/* The actual embed div */}
                <div
                  data-iframe-width="150"
                  data-iframe-height="270"
                  data-share-badge-id="fb520fa3-6605-48e6-8034-e14a2198cac6"
                  data-share-badge-host="https://www.credly.com"
                  className={isLoading ? 'invisible' : 'visible'}
                ></div>
              </div>
            </div>

            {/* Certification Details */}
            <div className="flex-1 text-center md:text-left flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                IT-Specialist
              </h3>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="bg-gray-700 text-teal-400 text-sm font-semibold px-4 py-1.5 rounded-full border border-gray-600">
                  Certiport
                </span>
              </div>

              <div className="flex justify-center md:justify-start">
                <a
                  href="https://www.credly.com/users/muhammad-abdullah.42c52f56"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Muhammad Abdullah's Credly Profile"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-teal-500 text-gray-900 font-bold rounded-xl hover:bg-teal-400 transition-all duration-300 text-base shadow-lg hover:shadow-teal-500/50"
                >
                  View Credly Profile
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add global type definition for Credly to avoid TS errors
declare global {
  interface Window {
    Credly?: {
      embed: () => void;
    };
  }
}

export default Certifications;