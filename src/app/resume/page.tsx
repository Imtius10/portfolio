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

const h2 = "text-[11px] font-bold uppercase tracking-[0.12em] text-black border-b border-black pb-0.5 mb-1.5";

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
          <button onClick={() => router.push("/")} className="text-slate-600 hover:text-black transition-colors text-sm font-medium cursor-pointer">
            &larr; Back to Portfolio
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-500">Developer CV · ATS · 1 page</span>
            <button onClick={handleDownload} className="px-6 py-2.5 bg-black hover:bg-slate-800 text-white font-semibold rounded transition-colors cursor-pointer">
              Save as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:pt-0 print:pb-0 print:bg-white">
        <div className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-black overflow-hidden print:shadow-none print:m-0" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="h-1 bg-black print:h-1" />

          <div className="px-7 py-3">
            <header className="mb-2.5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[26px] font-bold text-black leading-none">Imtius Ahmad</h1>
                  <p className="text-[12px] font-bold mt-1">Full Stack Developer · Next.js · TypeScript · PostgreSQL</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">Available for full-time · Remote / On-site · Open to relocation</p>
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
              <h2 className={h2}>Professional Summary</h2>
              <p className="text-[11px] leading-snug text-black">
                Results-driven <strong>Full-Stack Developer</strong> with hands-on experience designing, building, and deploying production-grade web applications using <strong>Next.js 15, React 19, TypeScript, PostgreSQL, and Prisma</strong>. Developed <strong>five end-to-end projects</strong>, including <strong>RentNest</strong>, a role-based rental marketplace with JWT authentication, Stripe payment processing, and advanced search and filtering. Skilled in RESTful API design, relational database modeling, application debugging, responsive UI development, and automated test case authoring. Proficient across the full software development lifecycle — from data schema design and backend integration to continuous deployment on Vercel.
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
                  {isBachelor(edu) ? <p className="text-[10px] text-slate-600">Exams completed — awaiting final result. Coursework: DSA, OOP, Operating Systems, Networks, DBMS, Compiler, AI/ML.</p> : edu.description && <p className="text-[10px] text-slate-600">{edu.description}</p>}
                </div>
              ))}
            </section>

            <section className="mb-2">
              <h2 className={h2}>Technical Skills</h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-0.5 text-[11px] leading-snug">
                <div><strong>Frontend:</strong> React, Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query</div>
                <div><strong>Backend:</strong> Node.js, Express 5, REST API, JWT (access+refresh), Stripe Checkout</div>
                <div><strong>Database:</strong> PostgreSQL (Neon), Prisma 7, MongoDB, Firebase</div>
                <div><strong>Languages:</strong> TypeScript, JavaScript (ES6+), C++, Python, Java</div>
                <div><strong>Tools:</strong> Git/GitHub, Vercel, Netlify, Vite, VS Code, Linux</div>
                <div><strong>Concepts:</strong> DSA, OOP, REST API, Testing, Debugging, Responsive Design</div>
              </div>
            </section>

            <section className="mb-2">
              <h2 className={h2}>Projects</h2>

              <div className="mb-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-black">RentNest — Rental Property Marketplace</h3>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                  <a href="https://github.com/Imtius10/Rentora" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">github.com/Imtius10/Rentora</a>
                  <span className="mx-1 text-slate-400">|</span>
                  <a href="https://rentora-ecru.vercel.app" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">rentora-ecru.vercel.app</a>
                </p>
                <p className="text-[11px] leading-snug text-black">Role-based marketplace (Tenant / Landlord / Admin): listings, rental requests, approvals, Stripe payments, reviews & admin moderation. JWT auth with httpOnly cookies + Next.js rewrites proxy; Prisma + PostgreSQL with search/filter by location, price & property type.</p>
                <p className="text-[10px] text-slate-600"><strong>Stack:</strong> Next.js 15, React 19, TypeScript, Tailwind 4, Express 5, Prisma 7, PostgreSQL, Stripe, Vercel</p>
              </div>

              <div className="mb-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-black">BloodDonate — Blood Donation Platform</h3>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                  <a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">bloodcare-savelife.netlify.app</a>
                </p>
                <p className="text-[11px] leading-snug text-black">Firebase Auth + role-based dashboards (donor/admin), donor search by blood group/district/upazila, Stripe donations; Framer Motion UI, fully responsive.</p>
                <p className="text-[10px] text-slate-600"><strong>Stack:</strong> React, Tailwind, Firebase Auth, MongoDB, Express, Stripe</p>
              </div>

              <div className="mb-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-black">PlateShare — Surplus Food Sharing</h3>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                  <a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">teal-puffpuff-841438.netlify.app</a>
                </p>
                <p className="text-[11px] leading-snug text-black">Donate/request food with accept/reject workflow, Firebase Auth (email + Google), imgbb uploads, AOS/Framer Motion; concurrent-request handling.</p>
                <p className="text-[10px] text-slate-600"><strong>Stack:</strong> React, Tailwind/DaisyUI, Node, Express, MongoDB, Firebase</p>
              </div>

              <div className="mb-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-[11px] font-bold text-black">GreenNest — Plant Care SPA</h3>
                </div>
                <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                  <a href="https://endearing-dolphin-0b6714.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">endearing-dolphin-0b6714.netlify.app</a>
                </p>
                <p className="text-[11px] leading-snug text-black">SPA with Swiper hero, category visuals, protected routes, profile update via updateProfile(); clean Tailwind design.</p>
                <p className="text-[10px] text-slate-600"><strong>Stack:</strong> React, Tailwind, Firebase Auth, Swiper.js, React Router</p>
              </div>

              <div>
                <h3 className="text-[11px] font-bold text-black">WayToCP — Algorithm Practice (C++)</h3>
                <p className="text-[9.5px] text-slate-700 leading-snug break-all">
                  <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 underline-offset-2">github.com/Imtius10/WayToCP</a>
                </p>
              <p className="text-[10px] text-black leading-snug">C++ solutions for DP, greedy, graphs & data structures — keeps problem-solving and debugging sharp.</p>
              </div>
            </section>

            <section className="mb-1.5">
              <h2 className={h2}>Activities & Leadership</h2>
              <ul className="text-[11px] text-black space-y-0.5 list-disc list-inside leading-snug">
                <li><strong>University Tour Manager</strong> — Logistics, budgeting & coordination for 70+ students & faculty</li>
                <li><strong>Event Organizer</strong> — Planned departmental tech events & academic programs at Netrokona University</li>
                <li><strong>Mentor</strong> — Guided juniors on DSA, debugging & course projects; daily algorithm practice</li>
              </ul>
            </section>

            <section>
              <h2 className={h2}>Languages</h2>
              <div className="flex gap-4 text-[11px] text-black">
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
