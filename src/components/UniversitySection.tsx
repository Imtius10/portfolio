"use client";

import { useState } from "react";

interface Subject {
  name: string;
  icon: string;
  description: string;
  category: string;
}

const universitySubjects: Subject[] = [
  { name: "C", icon: "©️", description: "Procedural programming, memory management, pointers", category: "Programming" },
  { name: "C++", icon: "⚙️", description: "OOP, STL, templates, competitive programming", category: "Programming" },
  { name: "Java", icon: "☕", description: "OOP, collections, multithreading, JVM", category: "Programming" },
  { name: "Python", icon: "🐍", description: "Scripting, data analysis, automation", category: "Programming" },
  { name: "Data Structures", icon: "🏗️", description: "Arrays, linked lists, trees, graphs, hash tables", category: "Core CS" },
  { name: "Algorithms", icon: "🧮", description: "Sorting, searching, DP, greedy, graph algorithms", category: "Core CS" },
  { name: "Automata Theory", icon: "🔄", description: "Finite automata, regular expressions, CFGs, Turing machines", category: "Theory" },
  { name: "Compiler Design", icon: "🔧", description: "Lexical analysis, parsing, code generation, optimization", category: "Theory" },
  { name: "Artificial Intelligence", icon: "🤖", description: "Search algorithms, logic, planning, NLP basics", category: "Advanced" },
  { name: "Machine Learning", icon: "🧠", description: "Supervised/unsupervised learning, neural networks", category: "Advanced" },
  { name: "Operating Systems", icon: "🖥️", description: "Process management, memory, file systems, concurrency", category: "Core CS" },
  { name: "Computer Networks", icon: "🌐", description: "TCP/IP, HTTP, routing, network security", category: "Core CS" },
  { name: "Telecommunication", icon: "📡", description: "Signal processing, wireless comms, 4G/5G protocols", category: "Specialized" },
  { name: "Cryptography", icon: "🔐", description: "Encryption, hashing, digital signatures, TLS/SSL", category: "Security" },
];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Programming: { bg: "from-blue-500/20 to-indigo-500/20", text: "text-blue-400", border: "border-blue-500/30" },
  "Core CS": { bg: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-400", border: "border-emerald-500/30" },
  Theory: { bg: "from-purple-500/20 to-violet-500/20", text: "text-purple-400", border: "border-purple-500/30" },
  Advanced: { bg: "from-rose-500/20 to-pink-500/20", text: "text-rose-400", border: "border-rose-500/30" },
  Specialized: { bg: "from-amber-500/20 to-orange-500/20", text: "text-amber-400", border: "border-amber-500/30" },
  Security: { bg: "from-red-500/20 to-orange-500/20", text: "text-red-400", border: "border-red-500/30" },
};

export default function UniversitySection() {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;

  const visible = showAll ? universitySubjects : universitySubjects.slice(0, INITIAL_COUNT);

  return (
    <section id="university" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Learned in{" "}
            <span className="text-emerald-400">University</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Core computer science subjects I&apos;ve studied during my BSc in CSE at
            Netrokona University
          </p>
          <div className="w-20 h-1 bg-emerald-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {visible.map((subject) => {
            const colors =
              categoryColors[subject.category] ||
              categoryColors["Core CS"];
            return (
              <div
                key={subject.name}
                className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-default group`}
              >
                <div className="text-center">
                  <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </span>
                  <h4 className="text-white font-semibold text-sm sm:text-base mt-2">
                    {subject.name}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 hidden sm:block">
                    {subject.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${colors.text} bg-white/5`}
                  >
                    {subject.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {universitySubjects.length > INITIAL_COUNT && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border-2 border-emerald-400 text-emerald-400 rounded-full hover:bg-emerald-400 hover:text-white transition-all duration-300 font-semibold"
            >
              {showAll
                ? "Show Less"
                : `Show All (${universitySubjects.length} subjects)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
