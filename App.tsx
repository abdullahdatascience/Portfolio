import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans leading-normal tracking-tight">
      <Header />
      <main className="container mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-24">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <footer className="text-center py-8 text-gray-500">
        <p>&copy; 2024 Muhammad Abdullah. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
