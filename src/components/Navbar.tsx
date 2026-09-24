"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) { setIsDark(saved === "dark"); document.documentElement.classList.toggle("dark", saved === "dark"); document.documentElement.classList.toggle("light", saved !== "dark"); }
    else document.documentElement.classList.add("dark");
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const n = !isDark; setIsDark(n); localStorage.setItem("theme", n ? "dark" : "light");
    document.documentElement.classList.toggle("dark", n); document.documentElement.classList.toggle("light", !n);
  };

  return (
    <motion.nav initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} className={`fixed top-0 left-0 right-0 z-50 border-b transition-all ${scrolled ? "bg-slate-900/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]" : "bg-slate-900/40 backdrop-blur-xl border-white/5"} light:bg-white/75 light:border-slate-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[64px]">
          <Link href="#home" className="flex items-center gap-2 group">
            <span className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 grid place-items-center shadow-[0_8px_20px_rgba(16,185,129,0.35)]">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <span className="text-[18px] font-black tracking-tight text-white light:text-slate-800">Imtius<span className="font-light text-white/60 light:text-slate-400">.dev</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="px-3 py-2 rounded-xl text-sm font-medium text-white/70 light:text-slate-600 hover:text-white hover:bg-white/5 light:hover:bg-slate-100 transition-colors">{l.label}</Link>
            ))}
            <Link href="/hobbies" className="px-3 py-2 rounded-xl text-sm font-medium text-white/70 light:text-slate-600 hover:text-white hover:bg-white/5 light:hover:bg-slate-100 transition-colors">Hobbies</Link>
            <Link href="/resume" className="ml-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-sm font-bold rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.3)] transition-all">Resume</Link>
            <button onClick={toggleTheme} className="ml-1 p-2.5 rounded-xl text-white/70 light:text-slate-600 hover:text-white hover:bg-white/5 light:hover:bg-slate-100 transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors">{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors" aria-label="Toggle menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden bg-slate-900/90 backdrop-blur-2xl border-t border-white/10 light:bg-white/95 light:border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors">{l.label}</Link>
              ))}
              <Link href="/hobbies" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/5">Hobbies</Link>
              <Link href="/resume" onClick={() => setIsOpen(false)} className="block px-3 py-2.5 rounded-xl text-base font-bold text-emerald-300 hover:bg-white/5">Resume</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
