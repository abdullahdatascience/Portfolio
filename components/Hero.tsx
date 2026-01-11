import React from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import profileImg from "../assets/images/profile.jpg";


const Hero: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-6 md:px-20 text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 opacity-40 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_center,#14b8a6_1px,transparent_1px)] bg-[size:45px_45px]"></div>

      {/* Text Section */}
      <div className="max-w-xl space-y-6 text-center md:text-left mt-10 md:mt-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Muhammad Abdullah
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-2xl text-teal-300 font-medium"
        >
          <Typewriter
            options={{
              strings: [
                "Transforming data into actionable insights",
                "Turning raw data into meaningful stories",
                "Data analytics with precision & clarity",
              ],
              autoStart: true,
              loop: true,
              delay: 55,
              deleteSpeed: 30,
            }}
          />
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-teal-600/30 transition-all hover:scale-105"
        >
          Learn More
        </motion.a>
      </div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative flex justify-center items-center"
      >
        <div className="relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-teal-400 shadow-[0_0_60px_20px_rgba(20,184,166,0.45)]">
          <img
            src={profileImg}
            alt="Muhammad Abdullah"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
