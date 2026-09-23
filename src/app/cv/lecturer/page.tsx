"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Edu {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

const FALLBACK_EDUCATION: Edu[] = [
  {
    id: "fallback-lect-1",
    institution: "Netrokona University",
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    startDate: "2022-03-22",
    endDate: "2026-07-20",
    description: "Exams completed — awaiting final result. CGPA 3.55/4.00.",
  },
  {
    id: "fallback-lect-2",
    institution: "Bogura Government College, Rajshahi Board",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    startDate: "2018-01-01",
    endDate: "2020-01-01",
    description: "GPA: 5.00/5.00",
  },
  {
    id: "fallback-lect-3",
    institution: "Govt. Mustafabia Alia Madrasah, Bogura (Madrasah Board)",
    degree: "Secondary School Certificate (SSC) / Dakhil",
    field: "Science",
    startDate: "2016-01-01",
    endDate: "2018-01-01",
    description: "GPA: 5.00/5.00",
  },
];

function fmtDate(d: string) {
  const x = new Date(d);
  if (Number.isNaN(x.getTime())) return "";
  if (x.getMonth() === 0 && x.getDate() === 1) return String(x.getFullYear());
  return x.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function fmtRange(edu: Edu) {
  const start = fmtDate(edu.startDate);
  const end = edu.endDate ? fmtDate(edu.endDate) : "Present";
  return `${start} – ${end}`;
}

export default function LecturerCVPage() {
  const router = useRouter();
  const [education, setEducation] = useState<Edu[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    document.title = "Imtius Ahmad";

    fetch("/api/education")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
          setEducation(sorted);
        }
      })
      .catch(() => {});
  }, []);

  const handleDownload = () => {
    window.print();
  };

  const isBachelor = (edu: Edu) => edu.degree.toLowerCase().includes("bachelor");

  return (
    <>
      {/* Action Bar - hidden on print */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/lecturer")}
            className="text-slate-600 hover:text-[#1e3a8a] transition-colors text-sm font-medium cursor-pointer"
          >
            &larr; Back to Portfolio
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172c6b] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-[#1e3a8a]/20 cursor-pointer"
          >
            Save as PDF
          </button>
        </div>
      </div>

      {/* CV Content */}
      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen">
        <div
          className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-slate-800 overflow-hidden print:shadow-none print:m-0"
          style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
          {/* Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#1e3a8a] to-[#3b5bdb]"></div>

          <div className="px-8 py-5">
            {/* Header */}
            <header className="mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Imtius Ahmad
                  </h1>
                  <p className="text-base text-[#1e3a8a] font-semibold mt-0.5">
                    Lecturer in Computer Science & Engineering
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-600 space-y-0.5">
                  <p>h.imtius10@gmail.com</p>
                  <p>+8801614742777</p>
                  <p>linkedin.com/in/imtius10</p>
                  <p>github.com/Imtius10</p>
                </div>
              </div>
            </header>

            {/* Objective */}
            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Career Objective
              </h2>
              <p className="text-[11px] leading-relaxed text-slate-700">
                Final-semester BSc in Computer Science &amp; Engineering student (CGPA 3.55/4.00) who has completed
                all coursework and final examinations (awaiting final result), with hands-on experience in programming,
                algorithms, and data structures. Passionate about teaching and committed to fostering student
                engagement through practical, project-based learning. Seeking a lecturer position to contribute to
                academic excellence while growing as an educator.
              </p>
            </section>

            {/* Education */}
            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[11px] font-bold text-slate-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {isBachelor(edu) && (
                        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-300 text-[9px] font-bold rounded">
                          CGPA: 3.55/4.00
                        </span>
                      )}
                      <span className="text-[9px] text-slate-500">
                        {fmtRange(edu)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600">{edu.institution}</p>
                  {isBachelor(edu) && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Exams completed — awaiting final result.
                    </p>
                  )}
                  {edu.description && !isBachelor(edu) && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </section>

            {/* Teaching Areas */}
            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Teaching Areas
              </h2>
              <p className="text-[11px] text-slate-700">
                <span className="font-bold text-slate-900">Programming:</span> C, C++, Java, Python, JavaScript, TypeScript
              </p>
              <p className="text-[11px] text-slate-700">
                <span className="font-bold text-slate-900">Core CS:</span> Data Structures, Algorithms, OS, Computer Networks, Automata Theory
              </p>
              <p className="text-[11px] text-slate-700">
                <span className="font-bold text-slate-900">Other:</span> AI, Machine Learning, Compiler Design, OOP, Cryptography
              </p>
            </section>

            {/* Teaching Experience */}
            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Teaching & Mentoring
              </h2>
              <div className="space-y-1 text-[11px] text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Peer Tutor</span> — Helped junior students with DSA, Programming, and exam preparation at Netrokona University
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Problem-Solving Mentor</span> — Helped classmates work through algorithms (dynamic programming, greedy, graphs) and debugging
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Project Guide</span> — Assisted classmates with course projects, debugging, and software design
                </p>
              </div>
            </section>

            {/* Academic Projects */}
            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Academic Projects
              </h2>
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">WayToCP — Competitive Programming Repository</span>
                    <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#1e3a8a] font-semibold">
                      GitHub →
                    </a>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    A personal C++ practice collection covering DP,
                    Greedy Algorithms, Graph Theory, and Data Structures. Demonstrates algorithmic problem-solving and
                    complexity analysis skills.
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    <span className="font-semibold">Tech:</span> C++, STL, Algorithm Design, Complexity Analysis
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">BloodDonate — Full-Stack Web Application</span>
                    <a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#1e3a8a] font-semibold">
                      Live Demo →
                    </a>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Blood donation platform demonstrating end-to-end software engineering: requirements analysis,
                    database design, API development, authentication, payment integration, and responsive UI.
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    <span className="font-semibold">Tech:</span> React, Node.js, MongoDB, Firebase, Stripe
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-900">PlateShare — Food Sharing Platform</span>
                    <a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[9px] text-[#1e3a8a] font-semibold">
                      Live Demo →
                    </a>
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    Surplus food sharing application featuring donation/request workflows, real-time data management,
                    and user authentication. Applied OOP principles and responsive UI design.
                  </p>
                  <p className="text-[9px] text-slate-500 mt-0.5">
                    <span className="font-semibold">Tech:</span> React, Express.js, MongoDB, Firebase
                  </p>
                </div>
              </div>
            </section>

            {/* Skills & Activities Row */}
            <section className="mb-3">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                    Technical Skills
                  </h2>
                  <div className="space-y-0.5 text-[11px]">
                    <p>
                      <span className="font-bold text-slate-900">Languages:</span>{" "}
                      <span className="text-slate-700">C, C++, Java, Python, JavaScript, TypeScript</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-900">Frameworks:</span>{" "}
                      <span className="text-slate-700">React, Next.js, Node.js, Express.js</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-900">Databases:</span>{" "}
                      <span className="text-slate-700">PostgreSQL, MongoDB, Firebase, Prisma ORM</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-900">Tools:</span>{" "}
                      <span className="text-slate-700">Git, GitHub, VS Code, Linux, Netlify</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                    Activities & Leadership
                  </h2>
                  <div className="space-y-0.5 text-[11px]">
                    <p>
                      <span className="font-semibold text-slate-900">University Tour Manager</span> — Coordinated
                      logistics, budgeting for 70+ students and faculty across multi-day departmental tours
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Event Organizer</span> — Planned and executed
                      departmental tech events and academic programs at Netrokona University
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Competitive Programmer</span> — Active on
                      solving algorithm problems for self-practice
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">
                Languages
              </h2>
              <div className="flex gap-5 text-[11px] text-slate-700">
                <span><span className="font-semibold">Bangla</span> — Native</span>
                <span><span className="font-semibold">English</span> — Professional</span>
                <span><span className="font-semibold">Hindi</span> — Conversational</span>
                <span><span className="font-semibold">Urdu</span> — Basic</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}