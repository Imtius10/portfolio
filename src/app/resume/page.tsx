"use client";

import { useRouter } from "next/navigation";

export default function ResumePage() {
  const router = useRouter();

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      {/* Action Bar - hidden on print */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium cursor-pointer"
          >
            &larr; Back to Portfolio
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            Save as PDF
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen">
        <div
          className="w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-slate-800 overflow-hidden print:shadow-none print:m-0"
          style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
          {/* Top Accent Bar */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>

          <div className="px-8 py-6">
            {/* Header */}
            <header className="mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Imtius Ahmad
                  </h1>
                  <p className="text-base text-emerald-600 font-semibold mt-0.5">
                    Full Stack Developer
                  </p>
                </div>
                <div className="text-right text-xs text-slate-600 space-y-0.5">
                  <p>h.imtius10@gmail.com</p>
                  <p>+8801614742777</p>
                  <p>linkedin.com/in/imtius10</p>
                  <p>github.com/Imtius10</p>
                  <p>codeforces.com/imtius10</p>
                </div>
              </div>
            </header>

            {/* Summary */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-slate-700">
                Full-stack developer with strong problem-solving skills from competitive programming on Codeforces. Built 3+ projects using Next.js, TypeScript, PostgreSQL, and the MERN stack — including a blood donation platform with Stripe payments and a food sharing app with real-time workflows. Experienced in REST API design, database modeling with Prisma ORM, and responsive UI development. Managed university tours for 70+ students and faculty, and organized departmental tech events. Seeking a junior full-stack developer role to contribute to real-world products.
              </p>
            </section>

            {/* Education */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Education
              </h2>

              <div className="mb-1.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    BSc in Computer Science & Engineering
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">
                      CGPA: 3.55/4.00
                    </span>
                    <span className="text-[10px] text-slate-500">2020 – Present</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600">Netrokona University</p>
              </div>

              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-slate-900">HSC (Science) — GPA: 5.00/5.00</h3>
                <span className="text-[10px] text-slate-500">2018 – 2020</span>
              </div>
              <p className="text-xs text-slate-600">Bogura Government College, Rajshahi Board</p>
            </section>

            {/* Skills */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Technical Skills
              </h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                <div>
                  <span className="font-bold text-slate-900">Frontend:</span>{" "}
                  <span className="text-slate-700">React, Next.js, TypeScript, Tailwind CSS</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Backend:</span>{" "}
                  <span className="text-slate-700">Node.js, Express.js, REST API Design</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Database:</span>{" "}
                  <span className="text-slate-700">PostgreSQL, MongoDB, Prisma ORM, Firebase</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Languages:</span>{" "}
                  <span className="text-slate-700">JavaScript, TypeScript, C++, Python, Java</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Tools:</span>{" "}
                  <span className="text-slate-700">Git, GitHub, VS Code, Vite, Netlify, Linux</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Concepts:</span>{" "}
                  <span className="text-slate-700">DSA, OOP, OS, Networking, API Design</span>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Projects
              </h2>

              <div className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">BloodDonate</h3>
                  <a href="https://bloodcare-savelife.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-semibold hover:underline">
                    Live Demo →
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Blood donation platform connecting donors with recipients. Features Firebase authentication, Stripe payment integration, donor search by blood group and location, and role-based dashboards for donors and admins.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-semibold">Tech:</span> React, Tailwind CSS, Node.js, Express.js, MongoDB, Firebase, Stripe
                </p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">PlateShare</h3>
                  <a href="https://teal-puffpuff-841438.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-semibold hover:underline">
                    Live Demo →
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Surplus food sharing platform with donation and request workflows. Firebase authentication, image uploads via imgbb, and responsive UI with Framer Motion animations.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-semibold">Tech:</span> React, Tailwind CSS, DaisyUI, Node.js, Express.js, MongoDB, Firebase
                </p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">GreenNest</h3>
                  <a href="https://endearing-dolphin-0b6714.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-semibold hover:underline">
                    Live Demo →
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Indoor plant care SPA with hero slider, product cards, protected routes, and user profile management. Clean UI with Swiper.js integration.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-semibold">Tech:</span> React, Tailwind CSS, Firebase Auth, Swiper.js
                </p>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">WayToCP</h3>
                  <a href="https://github.com/Imtius10/WayToCP" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-semibold hover:underline">
                    GitHub →
                  </a>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Competitive programming solutions in C++ — DP, Greedy, Graph Algorithms, Data Structures. Actively solving problems on Codeforces.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  <span className="font-semibold">Tech:</span> C++, STL, Algorithm Design
                </p>
              </div>
            </section>

            {/* Activities & Leadership */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Activities & Leadership
              </h2>
              <ul className="text-xs text-slate-700 space-y-0.5 list-disc list-inside">
                <li><span className="font-semibold">University Tour Manager</span> — Managed logistics, budgeting, and coordination for 70+ students and faculty across multi-day departmental tours</li>
                <li><span className="font-semibold">Event Organizer</span> — Planned and executed departmental tech events and academic programs at Netrokona University</li>
                <li><span className="font-semibold">Competitive Programmer</span> — Active on Codeforces solving problems in DP, Greedy, and Graph Algorithms</li>
              </ul>
            </section>

            {/* Languages */}
            <section className="mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 border-b-2 border-emerald-600 pb-0.5 mb-2">
                Languages
              </h2>
              <div className="flex gap-4 text-xs text-slate-700">
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
