"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProfileData } from "@/lib/types";
import TypeWriter from "./TypeWriter";
import { Download, ExternalLink, FileText, Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon, InstagramIcon, TwitterIcon } from "./SocialIcons";
import { useRef } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

interface HeroProps { profile: ProfileData; }

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  twitter: <TwitterIcon />,
};
const typingWords = ["Full Stack Developer", "Next.js & TypeScript", "PostgreSQL • Prisma • Stripe", "Open to Opportunities"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export default function Hero({ profile }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rx = useTransform(sy, [-0.5, 0.5], ["4deg", "-4deg"]);
  const ry = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="min-h-screen flex items-center justify-center bg-slate-900 pt-16 relative overflow-hidden">
      <HeroCanvas />
      {/* premium gradient mesh fallback */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute -top-40 -right-40 w-[38rem] h-[38rem] bg-emerald-500/[0.07] rounded-full blur-[90px]" />
        <div className="absolute -bottom-48 -left-40 w-[42rem] h-[42rem] bg-blue-500/[0.07] rounded-full blur-[90px]" />
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-full mb-6 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
              <span className="text-emerald-300 text-sm font-medium tracking-wide">Available for hire</span>
              <span className="hidden sm:inline-flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-[10px] font-bold tracking-widest text-emerald-300">REMOTE • ONSITE</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight text-white mb-4 leading-[0.95]">
              Hi, I&apos;m <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent"> {profile.name}</span>
            </motion.h1>

            <motion.h2 variants={item} className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-200 mb-6 min-h-[1.2em]">
              I&apos;m a <span className="text-emerald-300"><TypeWriter words={typingWords} /></span>
            </motion.h2>

            <motion.p variants={item} className="text-[17px] leading-relaxed text-slate-300/90 mb-8 max-w-xl mx-auto lg:mx-0">
              I build <span className="text-white font-semibold">modern full-stack apps</span> with <span className="text-emerald-300 font-semibold">Next.js</span>, <span className="text-emerald-300 font-semibold">TypeScript</span> and <span className="text-emerald-300 font-semibold">PostgreSQL</span>. Clean architecture, typed code, production-ready — from <span className="text-slate-200">Prisma schema to Stripe checkout</span>.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {[
                { k: "5+", v: "Projects Shipped" },
                { k: "15+", v: "Technologies" },
                { k: "RentNest", v: "Flagship · Live", hl: true },
              ].map((s) => (
                <div key={s.v} className={`px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.22)] ${s.hl ? "bg-emerald-500/10 border-emerald-400/25 text-emerald-300" : "bg-white/[0.06] border-white/10 text-white"}`}>
                  <p className={`text-[15px] font-black tracking-tight ${s.hl ? "text-emerald-300" : "text-white"}`}>{s.k}</p>
                  <p className="text-[11px] tracking-wide opacity-70">{s.v}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold rounded-2xl shadow-[0_12px_28px_rgba(16,185,129,0.35)] transition-all">
                <Mail className="w-5 h-5" /> Hire Me <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href={profile.resumeUrl || "/resume"} target={profile.resumeUrl ? "_blank" : undefined} rel={profile.resumeUrl ? "noopener noreferrer" : undefined} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] backdrop-blur-xl border border-white/10 text-white font-semibold rounded-2xl transition-all">
                {profile.resumeUrl ? <Download className="w-5 h-5" /> : <FileText className="w-5 h-5" />} {profile.resumeUrl ? "Download Resume" : "View Resume"}
              </a>
              <a href="#projects" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 text-slate-200 hover:text-white font-semibold rounded-2xl transition-all">
                <ExternalLink className="w-5 h-5" /> View Projects
              </a>
            </motion.div>

            <motion.div variants={item} className="flex gap-2.5 justify-center lg:justify-start">
              {profile.socialLinks.map((link) => (
                <motion.a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.98 }} className="p-3 bg-white/[0.06] backdrop-blur-xl hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400/30 rounded-xl text-slate-300 hover:text-emerald-300 transition-colors shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
                  {socialIcons[link.platform.toLowerCase()] || <ExternalLink className="w-5 h-5" />}
                </motion.a>
              ))}
              <motion.a href={profile.photoUrl || "/images/profile.jpg"} download={`${profile.name.replace(/\s+/g, "-")}.jpg`} whileHover={{ y: -2 }} className="p-3 bg-white/[0.06] backdrop-blur-xl hover:bg-white/[0.10] border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div style={{ rotateX: rx as unknown as string, rotateY: ry as unknown as string, transformPerspective: 900 } as any} className="flex-shrink-0 relative" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="relative">
              <div className="relative w-72 h-72 sm:w-[22rem] sm:h-[22rem] rounded-2xl overflow-hidden border border-white/15 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={profile.photoUrl || ""} alt={profile.name} className="w-full h-full object-cover" onError={(e) => {
                  const t = e.target as HTMLImageElement; t.style.display = "none";
                  const p = t.parentElement; if (p && !p.querySelector(".fallback-avatar")) { const f = document.createElement("div"); f.className = "fallback-avatar w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center"; f.innerHTML = `<span class="text-6xl font-black text-white">${profile.name.charAt(0)}</span>`; p.appendChild(f); }
                }} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-800/40 to-transparent pointer-events-none" />
    </section>
  );
}
