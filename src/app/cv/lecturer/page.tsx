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
  { id: "fallback-lect-1", institution: "Netrokona University", degree: "Bachelor of Science", field: "Computer Science & Engineering", startDate: "2022-03-22", endDate: "2026-07-20", description: "Exams completed — awaiting final result. CGPA 3.55/4.00." },
  { id: "fallback-lect-2", institution: "Bogura Government College, Rajshahi Board", degree: "Higher Secondary Certificate (HSC)", field: "Science", startDate: "2018-01-01", endDate: "2020-01-01", description: "GPA: 5.00/5.00" },
  { id: "fallback-lect-3", institution: "Govt. Mustafabia Alia Madrasah, Bogura (Madrasah Board)", degree: "Secondary School Certificate (SSC) / Dakhil", field: "Science", startDate: "2016-01-01", endDate: "2018-01-01", description: "GPA: 5.00/5.00" },
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
    document.title = "Imtius Ahmad — Lecturer CV";
    fetch("/api/education").then((r) => r.json()).then((data) => {
      if (Array.isArray(data) && data.length > 0) setEducation([...data].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()));
    }).catch(() => {});
  }, []);
  const handleDownload = () => window.print();
  const isBachelor = (edu: Edu) => edu.degree.toLowerCase().includes("bachelor");

  return (
    <>
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/lecturer")} className="text-slate-600 hover:text-[#1e3a8a] transition-colors text-sm font-medium cursor-pointer">&larr; Back to Academic Profile</button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500">Lecturer CV · 1 page · print-ready</span>
            <button onClick={handleDownload} className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172c6b] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-[#1e3a8a]/20 cursor-pointer">Save as PDF</button>
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:pt-0 print:pb-0 print:bg-white">
        <div className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-slate-800 overflow-hidden print:shadow-none print:m-0" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
          <div className="h-1.5 bg-gradient-to-r from-[#1e3a8a] to-[#3b5bdb]"></div>
          <div className="px-8 py-4">

            <header className="mb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none">Imtius Ahmad</h1>
                  <p className="text-[13px] text-[#1e3a8a] font-bold mt-1 tracking-wide">Lecturer in Computer Science & Engineering</p>
                  <p className="text-[10px] text-slate-500 mt-1">BSc CSE (Netrokona University, CGPA 3.55/4.00 — exams completed, awaiting final result) · Bogura, Bangladesh</p>
                </div>
                <div className="text-right text-[11px] text-slate-700 space-y-0.5 leading-tight">
                  <p><a href="mailto:h.imtius10@gmail.com" className="hover:text-[#1e3a8a] hover:underline">h.imtius10@gmail.com</a></p>
                  <p><a href="tel:+8801614742777" className="hover:text-[#1e3a8a] hover:underline">+8801614742777</a> <span className="text-slate-400">· WhatsApp</span></p>
                  <p><a href="https://www.linkedin.com/in/imtius10/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1e3a8a] hover:underline">linkedin.com/in/imtius10</a></p>
                  <p><a href="https://github.com/Imtius10" target="_blank" rel="noopener noreferrer" className="hover:text-[#1e3a8a] hover:underline">github.com/Imtius10</a></p>
                </div>
              </div>
            </header>
            <p className="sr-only">Email: h.imtius10@gmail.com | Phone: +8801614742777 | WhatsApp: +8801614742777 | LinkedIn: linkedin.com/in/imtius10 | GitHub: github.com/Imtius10 | Location: Bogura, Bangladesh</p>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Career Objective</h2>
              <p className="text-[11px] leading-relaxed text-slate-700">
                Final-semester <span className="font-semibold">BSc in CSE (CGPA 3.55/4.00)</span> — all coursework & final examinations completed, awaiting final result. Passionate about teaching core CS through <span className="font-semibold">project-based learning</span> and clear, example-driven explanations. Strong foundation in <span className="font-semibold">programming, DSA, OS, Networks, DBMS & software engineering</span>; experienced in peer tutoring and mentoring. Seeking a <span className="font-semibold">lecturer position</span> to contribute to academic excellence, student engagement and applied research.
              </p>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1.5">
                  <div className="flex justify-between items-baseline gap-3">
                    <h3 className="text-[11px] font-bold text-slate-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isBachelor(edu) && <span className="px-1.5 py-0.5 bg-[#eef2ff] text-[#1e3a8a] border border-[#c7d2fe] text-[10px] font-bold rounded">CGPA 3.55 / 4.00</span>}
                      <span className="text-[10px] text-slate-500 font-medium">{fmtRange(edu)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600">{edu.institution}</p>
                  {isBachelor(edu) ? <p className="text-[10px] text-slate-500 mt-0.5">Exams completed — awaiting final result. Relevant coursework: DSA, OOP, OS, Computer Networks, DBMS, Automata, Compiler, AI/ML.</p> : edu.description && <p className="text-[10px] text-slate-500 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Teaching Areas</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] leading-snug">
                <p><span className="font-bold text-slate-900">Programming:</span> <span className="text-slate-700">C, C++, Java, Python, JavaScript, TypeScript</span></p>
                <p><span className="font-bold text-slate-900">Core CS:</span> <span className="text-slate-700">Data Structures, Algorithms, OS, Networks, DBMS</span></p>
                <p><span className="font-bold text-slate-900">Theory:</span> <span className="text-slate-700">Automata Theory, Compiler Design, Complexity Analysis</span></p>
                <p><span className="font-bold text-slate-900">Applied:</span> <span className="text-slate-700">OOP, Software Engineering, AI/ML, Cryptography</span></p>
                <p><span className="font-bold text-slate-900">Web:</span> <span className="text-slate-700">REST API Design, DB Modeling (Prisma/PostgreSQL), Auth & Payments</span></p>
                <p><span className="font-bold text-slate-900">Pedagogy:</span> <span className="text-slate-700">Project-based learning, Curriculum Development, Student Assessment, Research</span></p>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Teaching & Mentoring Experience</h2>
              <ul className="text-[11px] text-slate-700 space-y-0.5 list-disc list-inside leading-snug">
                <li><span className="font-semibold text-slate-900">Peer Tutor (Netrokona University)</span> — Guided juniors in DSA, C/C++ labs and exam preparation; simplified recursion, DP and graph topics with visual examples.</li>
                <li><span className="font-semibold text-slate-900">Problem-Solving Mentor</span> — Coached classmates on DP, greedy & graphs; ran hands-on debugging sessions and complexity analysis walkthroughs.</li>
                <li><span className="font-semibold text-slate-900">Project Guide</span> — Assisted 10+ course projects (requirements, schema design, API & UI review) and introduced version control & testing habits.</li>
              </ul>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Academic Projects</h2>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[11px] font-bold text-slate-900">RentNest — Full-Stack Rental Marketplace</span>
                    <span className="flex gap-2 flex-shrink-0"><a href="https://rentora-ecru.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">Live →</a><a href="https://github.com/Imtius10/Rentora" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 font-bold hover:underline">GitHub →</a></span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">End-to-end software engineering case study: requirements, Prisma + PostgreSQL schema, JWT (httpOnly cookies) auth via Next.js rewrites, Stripe Checkout + webhooks, role-based dashboards (Tenant/Landlord/Admin) and deployment on Vercel. Ideal for teaching <span className="font-semibold">DB design, REST, auth & payments</span>.</p>
                  <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-bold">Stack:</span> Next.js 15, React 19, TypeScript, Prisma 7, PostgreSQL, Stripe, TanStack Query</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[11px] font-bold text-slate-900">WayToCP — Algorithm Practice Repository</span>
                    <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">GitHub →</a>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Personal C++ collection for DP, greedy, graphs & data structures; used as peer-teaching material for complexity analysis and problem decomposition.</p>
                  <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-bold">Stack:</span> C++, STL, Algorithm Design</p>
                </div>
                <div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[11px] font-bold text-slate-900">BloodDonate / PlateShare — MERN Case Studies</span>
                    <span className="flex gap-2 flex-shrink-0"><a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">BloodDonate →</a><a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">PlateShare →</a></span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Illustrate OOP, workflow design and real-time data management — used to teach MVC, Firebase auth and responsive UI patterns.</p>
                </div>
              </div>
            </section>

            <section className="mb-3">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">Technical Skills</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    <p><span className="font-bold text-slate-900">Languages:</span> <span className="text-slate-700">C, C++, Java, Python, JS/TS</span></p>
                    <p><span className="font-bold text-slate-900">Frameworks:</span> <span className="text-slate-700">React, Next.js, Node, Express</span></p>
                    <p><span className="font-bold text-slate-900">Databases:</span> <span className="text-slate-700">PostgreSQL, MongoDB, Prisma ORM</span></p>
                    <p><span className="font-bold text-slate-900">Tools:</span> <span className="text-slate-700">Git, GitHub, Vercel, Linux</span></p>
                  </div>
                </div>
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">Service & Leadership</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    <p><span className="font-semibold text-slate-900">Tour Manager</span> — Logistics & budgeting for 70+ students & faculty</p>
                    <p><span className="font-semibold text-slate-900">Event Organizer</span> — Tech events & academic programs, Netrokona Univ.</p>
                    <p><span className="font-semibold text-slate-900">Mentor</span> — Daily DSA practice, debugging workshops</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b border-[#1e3a8a] pb-0.5 mb-1.5">Languages</h2>
              <div className="flex gap-5 text-[11px] text-slate-700">
                <span><span className="font-bold">Bangla</span> — Native</span>
                <span><span className="font-bold">English</span> — Professional</span>
                <span><span className="font-bold">Hindi</span> — Conversational</span>
                <span><span className="font-bold">Urdu</span> — Basic</span>
              </div>
            </section>

          </div>
        </div>
      </div>
      <style>{`@media print { @page { size: A4; margin: 8mm 10mm; } .print\\:hidden{display:none!important} }`}</style>
    </>
  );
}
