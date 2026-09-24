"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillWithCategory } from "@/lib/types";

interface SkillsProps { skills: SkillWithCategory[]; }

const skillIcons: Record<string, string> = {
  "React.js": "⚛️", React: "⚛️", "Tailwind CSS": "🎨", "HTML5/CSS3": "🌐", "JavaScript (ES6+)": "📜", JavaScript: "📜",
  "Node.js": "🟢", "Express.js": "🚀", MongoDB: "🍃", PostgreSQL: "🐘", Firebase: "🔥",
  "C++": "⚙️", Java: "☕", Python: "🐍", "Git & GitHub": "📦", Git: "📦", Vite: "⚡", Netlify: "☁️",
  "Event Management": "📋", "Team Coordination": "🤝", TypeScript: "🔷", "Next.js": "▲", "Prisma ORM": "◆",
};

const catGrad: Record<string, string> = {
  Frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/25",
  Backend: "from-emerald-500/20 to-teal-500/20 border-emerald-500/25",
  "Programming Languages": "from-violet-500/20 to-purple-500/20 border-violet-500/25",
  "Tools & Others": "from-amber-500/20 to-orange-500/20 border-amber-500/25",
  "Leadership & Organization": "from-rose-500/20 to-pink-500/20 border-rose-500/25",
};
const catText: Record<string, string> = {
  Frontend: "text-blue-300", Backend: "text-emerald-300", "Programming Languages": "text-violet-300", "Tools & Others": "text-amber-300", "Leadership & Organization": "text-rose-300",
};

const INITIAL = 3;

export default function Skills({ skills }: SkillsProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const grouped = skills.reduce<Record<string, SkillWithCategory[]>>((acc, s) => {
    const k = s.category?.name || "Other"; if (!acc[k]) acc[k] = []; acc[k].push(s); return acc;
  }, {});
  const toggle = (c: string) => setExpanded((p) => { const n = new Set(p); if (n.has(c)) n.delete(c); else n.add(c); return n; });

  return (
    <section id="skills" className="py-20 bg-slate-900 light:bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-emerald-500/[0.04] rounded-full blur-[80px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-emerald-300 text-xs font-bold tracking-widest mb-3">STACK • TOOLS • LEADERSHIP</motion.p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white light:text-slate-800 mb-3">My <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Skills</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full" />
        </div>

        <div className="grid gap-10">
          {Object.entries(grouped).map(([cat, list], idx) => {
            const isExpanded = expanded.has(cat);
            const visible = isExpanded ? list : list.slice(0, INITIAL);
            const hasMore = list.length > INITIAL;
            return (
              <motion.div key={cat} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }}>
                <h3 className={`text-lg font-black tracking-wide mb-6 text-center ${catText[cat] || "text-emerald-300"}`}>{cat}</h3>
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                  <AnimatePresence initial={false}>
                    {visible.map((skill) => {
                      const g = catGrad[cat] || "from-emerald-500/15 to-teal-500/15 border-emerald-500/25";
                      return (
                        <motion.div key={skill.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
                          whileHover={{ y: -4, scale: 1.02 }} className={`bg-gradient-to-br ${g} premium-card rounded-2xl p-6 text-center cursor-default`}>
                          <span className="text-3xl block mb-2">{skillIcons[skill.name] || "💻"}</span>
                          <h4 className="text-white font-bold text-sm">{skill.name}</h4>
                          <span className="inline-block mt-2 w-6 h-1 rounded-full bg-white/20" />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
                {hasMore && (
                  <div className="text-center mt-4">
                    <button onClick={() => toggle(cat)} className="px-6 py-2 text-sm bg-white/[0.06] border border-white/10 text-white rounded-full hover:bg-white/[0.10] hover:border-emerald-400/30 transition-colors font-semibold">
                      {isExpanded ? "Show Less" : `+${list.length - INITIAL} more`}
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
