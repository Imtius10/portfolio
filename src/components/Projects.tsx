"use client";
import type { Project } from "@/lib/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectsProps { projects: Project[]; showAll?: boolean; }

export default function Projects({ projects, showAll = false }: ProjectsProps) {
  const displayProjects = showAll ? projects : projects.slice(0, 3);
  const hasMore = projects.length > 3;
  return (
    <section id="projects" className="py-20 bg-slate-800/50 light:bg-slate-100/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-emerald-500/[0.06] rounded-full blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-blue-500/[0.06] rounded-full blur-[80px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> SELECTED WORK
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white light:text-slate-800 mb-3">My <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Projects</span></h2>
          <p className="text-slate-400 light:text-slate-500 max-w-2xl mx-auto">Production-grade builds — from marketplace to donation platform. Hover to explore.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mt-4" />
        </div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {displayProjects.map((project) => (
            <motion.div key={project.id} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="group relative premium-card rounded-[1.4rem] overflow-hidden flex flex-col">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 opacity-80" />
              <div className="relative h-48 overflow-hidden">
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full relative bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-400/25 rounded-full blur-2xl" />
                    <div className="absolute -bottom-12 -left-6 w-44 h-44 bg-blue-400/25 rounded-full blur-2xl" />
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)", backgroundSize: "18px 18px" }} />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="text-7xl font-black text-white/22 drop-shadow-lg tracking-tighter">{project.title.charAt(0)}</span>
                    </div>
                    <div className="absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-widest text-white/50">{project.techStack[0]}</div>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white text-slate-900 text-[11px] font-black rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Featured
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">{project.title}<ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-[-2px] group-hover:translate-x-0 transition-all" /></h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.slice(0, 4).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white/[0.06] border border-white/10 text-emerald-300 text-[11px] font-medium rounded-full">{tech}</span>
                  ))}
                  {project.techStack.length > 4 && <span className="px-2 py-1 bg-white/[0.04] border border-white/10 text-slate-400 text-[11px] rounded-full">+{project.techStack.length - 4} more</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.id}`} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold rounded-xl transition-colors">View Details</Link>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.06] border border-white/10 text-white hover:text-emerald-300 hover:border-emerald-400/30 rounded-xl transition-colors" aria-label="Live demo"><ExternalLink className="w-4 h-4" /></a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/[0.06] border border-white/10 text-white hover:text-emerald-300 hover:border-emerald-400/30 rounded-xl transition-colors" aria-label="GitHub"><GithubIcon className="w-4 h-4" /></a>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {hasMore && !showAll && (
          <div className="text-center mt-10">
            <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.25)] transition-all">View All Projects <ExternalLink className="w-4 h-4" /></Link>
          </div>
        )}
      </div>
    </section>
  );
}
