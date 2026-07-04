"use client";

import {
  Code,
  Server,
  Database,
  GitBranch,
  Puzzle,
  Rocket,
} from "lucide-react";

const reasons = [
  {
    icon: <Code className="w-7 h-7" />,
    title: "Next.js & TypeScript",
    description:
      "App Router, server components, API routes — all typed end-to-end with TypeScript for reliable, maintainable code.",
  },
  {
    icon: <Server className="w-7 h-7" />,
    title: "Backend & APIs",
    description:
      "Node.js, Express.js, and Next.js API routes with authentication, validation, and clean error handling.",
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "PostgreSQL & Prisma",
    description:
      "Schema design, relations, migrations, and queries with Prisma ORM and relational databases.",
  },
  {
    icon: <GitBranch className="w-7 h-7" />,
    title: "Version Control",
    description:
      "Git/GitHub workflows, pull requests, branching strategies, and clean commit history.",
  },
  {
    icon: <Puzzle className="w-7 h-7" />,
    title: "Problem Solving",
    description:
      "Strong DSA foundation from competitive programming — DP, graphs, greedy, and more.",
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    title: "Ship Fast & Learn",
    description:
      "I deploy real projects, get feedback, iterate quickly, and continuously improve my stack.",
  },
];

export default function WhyHireMe() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why <span className="text-emerald-400">Hire Me</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            I bring a strong foundation in modern full-stack development, a problem-solving
            mindset, and a passion for building products that matter.
          </p>
          <div className="w-20 h-1 bg-emerald-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-emerald-400/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
