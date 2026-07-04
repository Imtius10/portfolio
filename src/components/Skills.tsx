"use client";

import { useState } from "react";
import { SkillWithCategory } from "@/lib/types";

interface SkillsProps {
  skills: SkillWithCategory[];
}

const skillIcons: Record<string, string> = {
  "React.js": "⚛️",
  "React": "⚛️",
  "Tailwind CSS": "🎨",
  "HTML5/CSS3": "🌐",
  "JavaScript (ES6+)": "📜",
  "JavaScript": "📜",
  "Node.js": "🟢",
  "Express.js": "🚀",
  "MongoDB": "🍃",
  "PostgreSQL": "🐘",
  "Firebase": "🔥",
  "C++": "⚙️",
  "Java": "☕",
  "Python": "🐍",
  "Git & GitHub": "📦",
  "Git": "📦",
  "Vite": "⚡",
  "Netlify": "☁️",
  "Event Management": "📋",
  "Team Coordination": "🤝",
  "TypeScript": "🔷",
  "Next.js": "▲",
  "Prisma ORM": "◆",
  "Docker": "🐳",
  "AWS": "☁️",
  "Linux": "🐧",
  "MySQL": "🗃️",
  "Redis": "🔴",
  "GraphQL": "◆",
  "REST API": "🔗",
  "Figma": "🎯",
  "VS Code": "💻",
};

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  Backend: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "Programming Languages": "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "Tools & Others": "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  "Leadership & Organization": "from-rose-500/20 to-pink-500/20 border-rose-500/30",
};

const categoryTextColors: Record<string, string> = {
  Frontend: "text-blue-400 light:text-blue-600",
  Backend: "text-green-400 light:text-green-600",
  "Programming Languages": "text-purple-400 light:text-purple-600",
  "Tools & Others": "text-orange-400 light:text-orange-600",
  "Leadership & Organization": "text-rose-400 light:text-rose-600",
};

const INITIAL_PER_CATEGORY = 3;

export default function Skills({ skills }: SkillsProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const categorizedSkills = skills.reduce<
    Record<string, SkillWithCategory[]>
  >((acc, skill) => {
    const categoryName = skill.category?.name || "Other";
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(skill);
    return acc;
  }, {});

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <section id="skills" className="py-20 bg-slate-900 light:bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            My <span className="text-emerald-400 light:text-emerald-600">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-10">
          {Object.entries(categorizedSkills).map(
            ([categoryName, categorySkills]) => {
              const isExpanded = expandedCategories.has(categoryName);
              const visibleSkills = isExpanded
                ? categorySkills
                : categorySkills.slice(0, INITIAL_PER_CATEGORY);
              const hasMore =
                categorySkills.length > INITIAL_PER_CATEGORY;

              return (
                <div key={categoryName}>
                  <h3
                    className={`text-xl font-semibold mb-6 text-center ${
                      categoryTextColors[categoryName] || "text-emerald-400 light:text-emerald-600"
                    }`}
                  >
                    {categoryName}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                    {visibleSkills.map((skill) => {
                      const gradient =
                        categoryColors[categoryName] ||
                        "from-emerald-500/20 to-teal-500/20 border-emerald-500/30";
                      return (
                        <div
                          key={skill.id}
                          className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border border-white/10 light:border-slate-200 backdrop-blur-md transition-all duration-300 cursor-default group shadow-lg shadow-black/10`}
                        >
                          <div className="text-center">
                            <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                              {skillIcons[skill.name] || "💻"}
                            </span>
                            <h4 className="text-white light:text-slate-800 font-semibold text-sm sm:text-base mt-2">
                              {skill.name}
                            </h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {hasMore && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => toggleCategory(categoryName)}
                        className="px-6 py-2 text-sm bg-white/5 light:bg-slate-100 backdrop-blur-md border border-white/10 light:border-slate-200 text-emerald-400 light:text-emerald-600 rounded-full hover:bg-emerald-400/10 light:hover:bg-emerald-50 hover:border-emerald-400/30 transition-all duration-300 font-medium"
                      >
                        {isExpanded
                          ? "Show Less"
                          : `+${categorySkills.length - INITIAL_PER_CATEGORY} more`}
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
