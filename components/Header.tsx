import React, { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#about", label: "About" },
 { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
   { href: "#certifications", label: "Certifications" }, 
    { href: "#contact", label: "Contact" },
];


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Active section detection
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActiveSection(`#${entry.target.id}`);
        });
      },
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => section && observer.observe(section));
    return () =>
      sections.forEach((section) => section && observer.unobserve(section));
  }, []);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Close mobile menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll with offset
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const el = document.querySelector(href) as HTMLElement;
    if (el) {
      const offset = -80;
      const position =
        el.getBoundingClientRect().top +
        window.pageYOffset +
        offset;
      window.scrollTo({ top: position, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-slate-900/40 backdrop-blur-md py-4"
      }`}
    >
      {/* Scroll Progress */}
      <div className="h-1 w-full bg-slate-700/20">
        <div
          className="h-1 bg-gradient-to-r from-teal-400 to-blue-500 transition-all"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto flex justify-between items-center px-6 md:px-10">
        
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 
            flex items-center justify-center text-gray-900 font-bold text-lg shadow-md 
            group-hover:scale-105 transition-transform">
            M.A.
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold text-white">
              Muhammad Abdullah
            </span>
            <span className="text-sm text-gray-400">Data Analyst</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`relative text-lg font-medium transition-colors 
              ${
                activeSection === link.href
                  ? "text-teal-400"
                  : "text-gray-300 hover:text-teal-400"
              }`}
            >
              {link.label}

              {/* Underline */}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-teal-400 to-blue-500 
                  transition-all duration-300 
                  ${activeSection === link.href ? "w-full" : "w-0"}
                `}
              />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-500 
        ${
          isMenuOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-slate-900/60 backdrop-blur-xl flex flex-col items-center py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-lg font-medium transition-colors 
              ${
                activeSection === link.href
                  ? "text-teal-400"
                  : "text-gray-300 hover:text-teal-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
