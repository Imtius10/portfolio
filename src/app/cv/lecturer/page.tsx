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

const h2 = "text-[11px] font-bold uppercase tracking-[0.12em] text-black border-b border-black pb-0.5 mb-1.5";

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
          <button onClick={() => router.push("/lecturer")} className="text-slate-600 hover:text-black transition-colors text-sm font-medium cursor-pointer">&larr; Back to Academic Profile</button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500">Lecturer CV · ATS · 1 page</span>
            <button onClick={handleDownload} className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-semibold rounded transition-colors cursor-pointer">Save as PDF</button>
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:pt-0 print:pb-0 print:bg-white">
        <div className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-black overflow-hidden print:shadow-none print:m-0" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="h-1 bg-black" />
          <div className="px-7 py-3">

            <header className="mb-2.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[26px] font-bold text-black leading-none">Imtius Ahmad</h1>
                  <p className="text-[12px] font-bold mt-1">Lecturer in Computer Science & Engineering</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">BSc CSE (Netrokona University, CGPA 3.55/4.00 — exams completed, awaiting final result)</p>
                </div>
                <div className="text-right text-[11px] text-black space-y-0.5 leading-tight">
                  <p><a href="mailto:h.imtius10@gmail.com">h.imtius10@gmail.com</a></p>
                  <p><a href="tel:+8801614742777">+8801614742777</a></p>
                  <p><a href="https://www.linkedin.com/in/imtius10/" target="_blank" rel="noopener noreferrer">linkedin.com/in/imtius10</a></p>
                  <p><a href="https://github.com/Imtius10" target="_blank" rel="noopener noreferrer">github.com/Imtius10</a></p>
                </div>
              </div>
            </header>
            <p className="sr-only">Email: h.imtius10@gmail.com | Phone: +8801614742777 | LinkedIn: linkedin.com/in/imtius10 | GitHub: github.com/Imtius10</p>

            <section className="mb-2">
              <h2 className={h2}>Career Objective</h2>
              <p className="text-[11px] leading-snug text-black">
                Dedicated and academically accomplished final-semester <strong>BSc graduate in Computer Science & Engineering</strong> (CGPA: 3.55/4.00; final examinations completed, awaiting results). Seeking a <strong>lecturer position</strong> to apply a solid academic background in <strong>programming, data structures and algorithms, operating systems, computer networks, and database management systems</strong> toward fostering student development and academic success. Experienced in peer tutoring, mentoring, and delivering clear, example-driven instruction grounded in project-based pedagogy. Committed to advancing academic excellence, meaningful student engagement, and applied research within a higher-education institution.
              </p>
            </section>

            <section className="mb-2">
              <h2 className={h2}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1">
                  <div className="flex justify-between items-baseline gap-3">
                    <h3 className="text-[11px] font-bold text-black">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isBachelor(edu) && <span className="text-[10px] font-bold text-black">CGPA 3.55 / 4.00</span>}
                      <span className="text-[10px] text-slate-600">{fmtRange(edu)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-black">{edu.institution}</p>
                  {isBachelor(edu) ? <p className="text-[10px] text-slate-600">Exams completed — awaiting final result. Relevant coursework: DSA, OOP, OS, Computer Networks, DBMS, Automata, Compiler, AI/ML.</p> : edu.description && <p className="text-[10px] text-slate-600">{edu.description}</p>}
                </div>
              ))}
            </section>

            <section className="mb-2">
              <h2 className={h2}>Teaching Areas</h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-0.5 text-[11px] leading-snug">
                <p><strong>Programming:</strong> C, C++, Java, Python, JavaScript, TypeScript</p>
                <p><strong>Core CS:</strong> Data Structures, Algorithms, OS, Networks, DBMS</p>
                <p><strong>Theory:</strong> Automata Theory, Compiler Design, Complexity Analysis</p>
                <p><strong>Applied:</strong> OOP, Software Engineering, AI/ML, Cryptography</p>
                <p><strong>Web:</strong> REST API Design, DB Modeling (Prisma/PostgreSQL), Auth & Payments</p>
                <p><strong>Pedagogy:</strong> Project-based learning, Curriculum Development, Student Assessment, Research</p>
              </div>
            </section>

            <section className="mb-2">
              <h2 className={h2}>Teaching & Mentoring Experience</h2>
              <ul className="text-[11px] text-black space-y-0.5 list-disc list-inside leading-snug">
                <li><strong>Peer Tutor (Netrokona University)</strong> — Guided juniors in DSA, C/C++ labs and exam preparation; simplified recursion, DP and graph topics with visual examples.</li>
                <li><strong>Problem-Solving Mentor</strong> — Coached classmates on DP, greedy & graphs; ran hands-on debugging sessions and complexity analysis walkthroughs.</li>
                <li><strong>Project Guide</strong> — Assisted 10+ course projects (requirements, schema design, API & UI review) and introduced version control & testing habits.</li>
              </ul>
            </section>

            <section className="mb-2">
              <h2 className={h2}>Academic Projects</h2>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[11px] font-bold text-black">RentNest — Full-Stack Rental Marketplace</span>
                  <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                    <a href="https://github.com/Imtius10/Rentora" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">github.com/Imtius10/Rentora</a>
                    <span className="mx-1 text-slate-400">|</span>
                    <a href="https://rentora-ecru.vercel.app" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">rentora-ecru.vercel.app</a>
                  </p>
                  <p className="text-[11px] text-black leading-snug">Software engineering case study: Prisma + PostgreSQL schema, JWT (httpOnly cookies) auth, Stripe Checkout + webhooks, role-based dashboards (Tenant/Landlord/Admin), Vercel deploy. Ideal for teaching <strong>DB design, REST, auth & payments</strong>.</p>
                  <p className="text-[10px] text-slate-600"><strong>Stack:</strong> Next.js 15, React 19, TypeScript, Prisma 7, PostgreSQL, Stripe, TanStack Query</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-black">WayToCP — Algorithm Practice Repository</span>
                  <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                    <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">github.com/Imtius10/WayToCP</a>
                  </p>
                  <p className="text-[11px] text-black leading-snug">C++ collection for DP, greedy, graphs & data structures; used as peer-teaching material for complexity analysis and problem decomposition.</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-black">BloodDonate / PlateShare — MERN Case Studies</span>
                  <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                    <a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">bloodcare-savelife.netlify.app</a>
                    <span className="mx-1 text-slate-400">|</span>
                    <a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">teal-puffpuff-841438.netlify.app</a>
                  </p>
                  <p className="text-[11px] text-black leading-snug">Illustrate OOP, workflow design and real-time data management — used to teach MVC, Firebase auth and responsive UI patterns.</p>
                </div>
              </div>
            </section>

            <section className="mb-1.5">
              <div className="grid grid-cols-2 gap-x-5">
                <div>
                  <h2 className={h2}>Technical Skills</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    <p><strong>Languages:</strong> C, C++, Java, Python, JS/TS</p>
                    <p><strong>Frameworks:</strong> React, Next.js, Node, Express</p>
                    <p><strong>Databases:</strong> PostgreSQL, MongoDB, Prisma ORM</p>
                    <p><strong>Tools:</strong> Git, GitHub, Vercel, Linux</p>
                  </div>
                </div>
                <div>
                  <h2 className={h2}>Service & Leadership</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    <p><strong>Tour Manager</strong> — Logistics & budgeting for 70+ students & faculty</p>
                    <p><strong>Event Organizer</strong> — Tech events & academic programs, Netrokona Univ.</p>
                    <p><strong>Mentor</strong> — Daily DSA practice, debugging workshops</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={h2}>Languages</h2>
              <div className="flex gap-5 text-[11px] text-black">
                <span><strong>Bangla</strong> — Native</span>
                <span><strong>English</strong> — Professional</span>
                <span><strong>Hindi</strong> — Conversational</span>
                <span><strong>Urdu</strong> — Basic</span>
              </div>
            </section>

          </div>
        </div>
      </div>
      <style>{`@media print { @page { size: A4; margin: 6mm 8mm; } .print\\:hidden{display:none!important} }`}</style>
    </>
  );
}
