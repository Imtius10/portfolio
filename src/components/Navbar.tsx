"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
      document.documentElement.classList.toggle("dark", saved === "dark");
      document.documentElement.classList.toggle("light", saved !== "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
    document.documentElement.classList.toggle("light", !newTheme);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/80 backdrop-blur-xl border-b border-white/10 light:border-slate-200 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="#home"
            className="text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Imtius<span className="text-slate-400 light:text-slate-600 font-normal">.dev</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hobbies"
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
            >
              Hobbies
            </Link>
            <Link
              href="/resume"
              className="ml-2 px-4 py-2 bg-emerald-500/80 hover:bg-emerald-400/80 backdrop-blur-sm text-white text-sm font-semibold rounded-lg border border-emerald-400/20 transition-all duration-200"
            >
              Resume
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/95 backdrop-blur-xl border-t border-white/10 light:border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/hobbies"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 light:text-slate-600 hover:text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
            >
              Hobbies
            </Link>
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-emerald-400 hover:bg-white/5 light:hover:bg-slate-100 transition-all duration-200"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
