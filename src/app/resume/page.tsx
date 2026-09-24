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
    id: "fallback-dev-1",
    institution: "Netrokona University",
    degree: "Bachelor of Science",
    field: "Computer Science & Engineering",
    startDate: "2022-03-22",
    endDate: "2026-07-20",
    description: "Exams completed — awaiting final result.",
  },
  {
    id: "fallback-dev-2",
    institution: "Bogura Government College, Rajshahi Board",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    startDate: "2018-01-01",
    endDate: "2020-01-01",
    description: "GPA: 5.00/5.00",
  },
  {
    id: "fallback-dev-3",
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

export default function ResumePage() {
  const router = useRouter();
  const [education, setEducation] = useState<Edu[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    document.title = "Imtius Ahmad — Full Stack Developer";
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

  const handleDownload = () => window.print();
  const isBachelor = (edu: Edu) => edu.degree.toLowerCase().includes("bachelor");

  return (
    <>
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-slate-600 hover:text-[#1e3a8a] transition-colors text-sm font-medium cursor-pointer">
            &larr; Back to Portfolio
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500">Developer CV · ATS-optimized · 1 page</span>
            <button onClick={handleDownload} className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172c6b] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-[#1e3a8a]/20 cursor-pointer">
              Save as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:pt-0 print:pb-0 print:bg-white">
        <div className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-slate-800 overflow-hidden print:shadow-none print:m-0" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif" }}>
          <div className="h-1.5 bg-gradient-to-r from-[#1e3a8a] to-[#3b5bdb] print:h-1"></div>

          <div className="px-8 py-4">
            <header className="mb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-none">Imtius Ahmad</h1>
                  <p className="text-[13px] text-[#1e3a8a] font-bold mt-1 tracking-wide">Full Stack Developer · Next.js · TypeScript · PostgreSQL</p>
                  <p className="text-[10px] text-slate-500 mt-1">Bogura, Bangladesh · Available for full-time · Remote / On-site · Open to relocation</p>
                </div>
                <div className="text-right text-[11px] text-slate-700 space-y-0.5 leading-tight">
                  <p><a href="mailto:h.imtius10@gmail.com" className="hover:text-[#1e3a8a] hover:underline">h.imtius10@gmail.com</a></p>
                  <p><a href="tel:+8801614742777" className="hover:text-[#1e3a8a] hover:underline">+8801614742777</a> <span className="text-slate-400">· WhatsApp</span></p>
                  <p><a href="https://www.linkedin.com/in/imtius10/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1e3a8a] hover:underline">linkedin.com/in/imtius10</a></p>
                  <p><a href="https://github.com/Imtius10" target="_blank" rel="noopener noreferrer" className="hover:text-[#1e3a8a] hover:underline">github.com/Imtius10</a> <span className="text-slate-400">· portfolio</span></p>
                </div>
              </div>
            </header>
            <p className="sr-only">Email: h.imtius10@gmail.com | Phone: +8801614742777 | WhatsApp: +8801614742777 | LinkedIn: linkedin.com/in/imtius10 | GitHub: github.com/Imtius10 | Location: Bogura, Bangladesh</p>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-2">Professional Summary</h2>
              <p className="text-[11px] leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Full-stack developer</span> focused on shipping production-ready web apps with <span className="font-semibold">Next.js 15, React 19, TypeScript, PostgreSQL & Prisma</span>. Built <span className="font-semibold">5 projects</span> including <span className="font-semibold text-[#1e3a8a]">RentNest</span> — a role-based rental marketplace (Tenant / Landlord / Admin) with JWT auth (httpOnly cookies), Stripe Checkout + webhooks, and advanced search/filter. Strong in <span className="font-semibold">REST API design, relational data modeling, debugging & responsive UI</span>. Writes test cases for every feature; comfortable from schema to deploy on <span className="font-semibold">Vercel</span>.
              </p>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-2">Education</h2>
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
                  {isBachelor(edu) ? <p className="text-[10px] text-slate-500 mt-0.5">Exams completed — awaiting final result. Coursework: DSA, OOP, Operating Systems, Networks, DBMS, Compiler, AI/ML.</p> : edu.description && <p className="text-[10px] text-slate-500 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-2">Technical Skills</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px]">
                <div><span className="font-bold text-slate-900">Frontend:</span> <span className="text-slate-700">React, Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query</span></div>
                <div><span className="font-bold text-slate-900">Backend:</span> <span className="text-slate-700">Node.js, Express 5, REST API, JWT (access+refresh), Stripe Checkout</span></div>
                <div><span className="font-bold text-slate-900">Database:</span> <span className="text-slate-700">PostgreSQL (Neon), Prisma 7, MongoDB, Firebase</span></div>
                <div><span className="font-bold text-slate-900">Languages:</span> <span className="text-slate-700">TypeScript, JavaScript (ES6+), C++, Python, Java</span></div>
                <div><span className="font-bold text-slate-900">Tools:</span> <span className="text-slate-700">Git/GitHub, Vercel, Netlify, Vite, VS Code, Linux</span></div>
                <div><span className="font-bold text-slate-900">Concepts:</span> <span className="text-slate-700">DSA (Data Structures and Algorithms), OOP, REST API, Testing, Debugging, Responsive Design, System Design</span></div>
              </div>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-2">Projects</h2>

              <div className="mb-2.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-slate-900">RentNest — Rental Property Marketplace <span className="ml-1 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold uppercase tracking-widest align-middle">Flagship</span></h3>
                  <span className="flex gap-2 flex-shrink-0">
                    <a href="https://rentora-ecru.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">Live →</a>
                    <a href="https://github.com/Imtius10/Rentora" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 font-bold hover:underline">GitHub →</a>
                    <a href="https://rent-nest-api-seven.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[10px] text-slate-500 font-bold hover:underline">API →</a>
                  </span>
                </div>
                <ul className="mt-1 ml-3 list-disc text-[11px] text-slate-600 space-y-0.5 leading-snug">
                  <li><span className="font-semibold text-slate-800">Role-based marketplace</span> for Bangladesh (Tenant / Landlord / Admin): listings, rental requests, one-click approvals, Stripe payments, reviews & admin moderation (ban/unban, role reassignment).</li>
                  <li>Built <span className="font-semibold">JWT auth with httpOnly cookies</span> (access+refresh) + Next.js rewrites proxy (<code className="px-1 py-0.5 bg-slate-100 rounded text-[10px]">/api/*</code>) to keep cookies same-origin; Prisma + PostgreSQL (Neon) with search/filter by location, price & property type.</li>
                </ul>
                <p className="text-[10px] text-slate-500 mt-1"><span className="font-bold">Stack:</span> Next.js 15, React 19, TypeScript, Tailwind 4, shadcn/ui, TanStack Query, Express 5, Prisma 7, PostgreSQL, Stripe, Vercel &nbsp;·&nbsp; <span className="text-slate-400">Demo: admin@rentnest.com / admin123</span></p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-slate-900">BloodDonate — Blood Donation Platform</h3>
                  <a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">Live →</a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Firebase Auth + role-based dashboards (donor/admin), donor search by blood group/district/upazila, Stripe donations; Framer Motion UI, fully responsive.</p>
                <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-bold">Stack:</span> React, Tailwind, Firebase Auth, MongoDB, Express, Stripe</p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-slate-900">PlateShare — Surplus Food Sharing</h3>
                  <a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">Live →</a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">Donate/request food with accept/reject workflow, Firebase Auth (email + Google), imgbb uploads, AOS/Framer Motion; concurrent-request handling.</p>
                <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-bold">Stack:</span> React, Tailwind/DaisyUI, Node, Express, MongoDB, Firebase</p>
              </div>

              <div className="mb-1">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-slate-900">GreenNest — Plant Care SPA</h3>
                  <a href="https://endearing-dolphin-0b6714.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">Live →</a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">SPA with Swiper hero, category visuals, protected routes, profile update via <code className="px-1 py-0.5 bg-slate-100 rounded text-[10px]">updateProfile()</code>; clean Tailwind design.</p>
                <p className="text-[10px] text-slate-500 mt-0.5"><span className="font-bold">Stack:</span> React, Tailwind, Firebase Auth, Swiper.js, React Router</p>
              </div>

              <div className="flex justify-between items-baseline gap-2 mt-1">
                <h3 className="text-[11px] font-bold text-slate-900">WayToCP — Algorithm Practice (C++)</h3>
                <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#1e3a8a] font-bold hover:underline">GitHub →</a>
              </div>
              <p className="text-[10px] text-slate-500 leading-snug">C++ solutions for DP, greedy, graphs & data structures — keeps problem-solving and debugging sharp.</p>
            </section>

            <section className="mb-3">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-2">Activities & Leadership</h2>
              <ul className="text-[11px] text-slate-700 space-y-0.5 list-disc list-inside leading-snug">
                <li><span className="font-semibold">University Tour Manager</span> — Logistics, budgeting & coordination for 70+ students & faculty (multi-day tours)</li>
                <li><span className="font-semibold">Event Organizer</span> — Planned departmental tech events & academic programs at Netrokona University</li>
                <li><span className="font-semibold">Mentor</span> — Guided juniors on DSA, debugging & course projects; daily algorithm practice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1e3a8a] border-b-2 border-[#1e3a8a] pb-0.5 mb-1.5">Languages</h2>
              <div className="flex gap-4 text-[11px] text-slate-700">
                <span><span className="font-bold">Bangla</span> — Native</span>
                <span><span className="font-bold">English</span> — Professional</span>
                <span><span className="font-bold">Hindi</span> — Conversational</span>
                <span><span className="font-bold">Urdu</span> — Basic</span>
              </div>
            </section>

            <p className="text-[10px] text-slate-400 text-center mt-4 border-t border-slate-200 pt-2">References available on request · Last updated Sep 2026 · PDF generated from imtius.dev/resume</p>
          </div>
        </div>
      </div>
      <style>{`@media print { @page { size: A4; margin: 8mm 10mm; } .print\\:hidden{display:none!important} }`}</style>
    </>
  );
}
