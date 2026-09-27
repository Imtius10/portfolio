"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_CV, type CvContentData } from "@/lib/cvDefaults";
import { mockProfile } from "@/lib/mockData";
import { CONTACT, shortUrl } from "@/lib/contact";
import type { Project } from "@/lib/types";

interface Edu {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

interface Exp {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

interface Contact {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
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

function contactFromProfile(data: unknown): Contact | null {
  if (!data || typeof data !== "object") return null;
  const p = data as {
    name?: string;
    email?: string;
    phone?: string;
    socialLinks?: { platform: string; url: string }[];
  };
  if (!p.name) return null;
  const find = (key: string) =>
    p.socialLinks?.find((l) => l.platform.toLowerCase().includes(key))?.url ?? "";
  return {
    name: p.name,
    email: p.email || CONTACT.email,
    phone: p.phone || CONTACT.phone,
    github: find("github") || CONTACT.github,
    linkedin: find("linkedin") || CONTACT.linkedin,
  };
}

const FALLBACK_CONTACT: Contact = {
  name: CONTACT.name,
  email: CONTACT.email,
  phone: CONTACT.phone,
  github: CONTACT.github,
  linkedin: CONTACT.linkedin,
};

const FALLBACK_PROJECTS: Project[] = [...mockProfile.projects]
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""));
  })
  .slice(0, 5);

function fmtDate(d: string) {
  const x = new Date(d);
  if (Number.isNaN(x.getTime())) return "";
  if (x.getMonth() === 0 && x.getDate() === 1) return String(x.getFullYear());
  return x.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function fmtRange(startDate: string, endDate: string | null) {
  const start = fmtDate(startDate);
  const end = endDate ? fmtDate(endDate) : "Present";
  return `${start} – ${end}`;
}

const h2 = "text-[11px] font-bold uppercase text-black border-b border-black pb-0.5 mb-1";
const linkCls = "text-blue-700 underline underline-offset-2 decoration-blue-300 hover:text-blue-900 cursor-pointer print:text-black print:decoration-black";

function ProjectEntry({ p }: { p: Project }) {
  return (
    <div className="mb-1.5">
      <h3 className="text-[11px] font-bold text-black">{p.title}</h3>
      {(p.githubUrl || p.liveUrl) && (
        <p className="text-[10px] leading-snug">
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>GitHub</a>
          )}
          {p.githubUrl && p.liveUrl && <span className="mx-1 text-slate-400">|</span>}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>Live Link</a>
          )}
        </p>
      )}
      <p className="text-[11px] leading-snug text-black">{p.description}</p>
      {p.techStack.length > 0 && (
        <p className="text-[10px] text-slate-600"><strong>Stack:</strong> {p.techStack.join(", ")}</p>
      )}
    </div>
  );
}

function ResumeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoPrint = searchParams.get("print") === "1";

  const [cv, setCv] = useState<CvContentData>(DEFAULT_CV);
  const [contact, setContact] = useState<Contact>(FALLBACK_CONTACT);
  const [education, setEducation] = useState<Edu[]>(FALLBACK_EDUCATION);
  const [experience, setExperience] = useState<Exp[]>([]);
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);

  useEffect(() => {
    document.title = `${FALLBACK_CONTACT.name} - Full Stack Developer CV`;
    let cancelled = false;

    Promise.allSettled([
      fetch("/api/cv").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/education").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/profile").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/projects").then((r) => (r.ok ? r.json() : null)),
    ]).then(([cvRes, eduRes, profileRes, projRes]) => {
      if (cancelled) return;
      if (cvRes.status === "fulfilled" && cvRes.value) {
        setCv({ ...DEFAULT_CV, ...cvRes.value });
      }
      if (eduRes.status === "fulfilled" && Array.isArray(eduRes.value) && eduRes.value.length > 0) {
        setEducation(
          [...eduRes.value].sort(
            (a: Edu, b: Edu) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          )
        );
      }
      if (profileRes.status === "fulfilled" && profileRes.value) {
        const c = contactFromProfile(profileRes.value);
        if (c) {
          setContact(c);
          document.title = `${c.name} - Full Stack Developer CV`;
        }
        const exp = (profileRes.value as { experience?: Exp[] }).experience;
        if (Array.isArray(exp) && exp.length > 0) {
          setExperience(
            [...exp].sort(
              (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
            )
          );
        }
      }
      if (projRes.status === "fulfilled" && Array.isArray(projRes.value) && projRes.value.length > 0) {
        const sorted = [...projRes.value].sort((a: Project, b: Project) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""));
        });
        setProjects(sorted.slice(0, 5));
      }
      if (autoPrint) {
        setTimeout(() => window.print(), 600);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [autoPrint]);

  const handleDownload = () => window.print();
  const isBachelor = (edu: Edu) => edu.degree.toLowerCase().includes("bachelor");
  const skillRows: [string, string][] = [
    ["Frontend:", cv.skillsFrontend],
    ["Backend:", cv.skillsBackend],
    ["Database:", cv.skillsDatabase],
    ["Languages:", cv.skillsLanguages],
    ["Tools:", cv.skillsTools],
    ["Concepts:", cv.skillsConcepts],
  ].filter(([, v]) => v.trim() !== "") as [string, string][];

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

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:block print:pt-0 print:pb-0 print:bg-white">
        <div className="cv-sheet w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-black overflow-hidden print:w-full print:py-4 print:shadow-none print:m-0" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="h-1 bg-black print:h-1" />

          <div className="px-7 py-3">
            <header className="mb-2.5">
              <h1 className="text-[26px] font-bold text-black leading-none">{contact.name}</h1>
              <p className="text-[12px] font-bold mt-1">{cv.headline}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{cv.locationLine}</p>
              <p className="text-[11px] text-black mt-1 leading-tight">
                {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
                {contact.email && (contact.phone || contact.linkedin || contact.github) && <span className="mx-1.5 text-slate-400">|</span>}
                {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>}
                {contact.phone && (contact.linkedin || contact.github) && <span className="mx-1.5 text-slate-400">|</span>}
                {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{shortUrl(contact.linkedin)}</a>}
                {contact.linkedin && contact.github && <span className="mx-1.5 text-slate-400">|</span>}
                {contact.github && <a href={contact.github} target="_blank" rel="noopener noreferrer">{shortUrl(contact.github)}</a>}
              </p>
            </header>

            <section className="mb-1.5">
              <h2 className={h2}>Professional Summary</h2>
              <p className="text-[11px] leading-snug text-black">{cv.summary}</p>
            </section>

            {experience.length > 0 && (
              <section className="mb-1.5">
                <h2 className={h2}>Experience</h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-1">
                    <div className="flex justify-between items-baseline gap-3">
                      <h3 className="text-[11px] font-bold text-black">{exp.position} — {exp.company}</h3>
                      <span className="text-[10px] text-slate-600 flex-shrink-0">{fmtRange(exp.startDate, exp.endDate)}</span>
                    </div>
                    {exp.description && <p className="text-[10px] text-slate-600">{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            <section className="mb-1.5">
              <h2 className={h2}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-1">
                  <div className="flex justify-between items-baseline gap-3">
                    <h3 className="text-[11px] font-bold text-black">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isBachelor(edu) && cv.cgpaText && <span className="text-[10px] font-bold text-black">{cv.cgpaText}</span>}
                      <span className="text-[10px] text-slate-600">{fmtRange(edu.startDate, edu.endDate)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-black">{edu.institution}</p>
                  {isBachelor(edu)
                    ? (cv.bachelorNote && <p className="text-[10px] text-slate-600">{cv.bachelorNote}</p>)
                    : (edu.description && <p className="text-[10px] text-slate-600">{edu.description}</p>)}
                </div>
              ))}
            </section>

            {skillRows.length > 0 && (
              <section className="mb-1.5">
                <h2 className={h2}>Technical Skills</h2>
                <div className="grid grid-cols-2 print:grid-cols-1 gap-x-5 gap-y-0.5 text-[11px] leading-snug">
                  {skillRows.map(([label, value]) => (
                    <div key={label}><strong>{label}</strong> {value}</div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="mb-1.5">
                <h2 className={h2}>Projects</h2>
                {projects.map((p) => (
                  <ProjectEntry key={p.id} p={p} />
                ))}
              </section>
            )}

            {cv.activities.length > 0 && (
              <section className="mb-1">
                <h2 className={h2}>Activities & Leadership</h2>
                <ul className="text-[11px] text-black space-y-0.5 list-disc list-inside leading-snug">
                  {cv.activities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}

            {cv.languages.length > 0 && (
              <section>
                <h2 className={h2}>Languages</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-black">
                  {cv.languages.map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
      <style>{`@media print { @page { size: A4; margin: 0; } .print\\:hidden{display:none!important} }`}</style>
    </>
  );
}

export default function ResumePage() {
  return (
    <Suspense>
      <ResumeContent />
    </Suspense>
  );
}
