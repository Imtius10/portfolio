"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_LECTURER_CV,
  type LecturerCvData,
  type LecturerProject,
} from "@/lib/lecturerCvDefaults";
import { CONTACT, shortUrl } from "@/lib/contact";

interface Edu {
  id: string;
  institution: string;
  degree: string;
  field: string | null;
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
  { id: "fallback-lect-1", institution: "Netrokona University", degree: "Bachelor of Science", field: "Computer Science & Engineering", startDate: "2022-03-22", endDate: "2026-07-20", description: "Exams completed — awaiting final result. CGPA 3.55/4.00." },
  { id: "fallback-lect-2", institution: "Bogura Government College, Rajshahi Board", degree: "Higher Secondary Certificate (HSC)", field: "Science", startDate: "2018-01-01", endDate: "2020-01-01", description: "GPA: 5.00/5.00" },
  { id: "fallback-lect-3", institution: "Govt. Mustafabia Alia Madrasah, Bogura (Madrasah Board)", degree: "Secondary School Certificate (SSC) / Dakhil", field: "Science", startDate: "2016-01-01", endDate: "2018-01-01", description: "GPA: 5.00/5.00" },
];

const FALLBACK_CONTACT: Contact = {
  name: CONTACT.name,
  email: CONTACT.email,
  phone: CONTACT.phone,
  github: CONTACT.github,
  linkedin: CONTACT.linkedin,
};

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

const h2 = "text-[11px] font-bold uppercase text-black border-b border-black pb-0.5 mb-1";
const linkCls = "text-blue-700 underline underline-offset-2 decoration-blue-300 hover:text-blue-900 cursor-pointer print:text-black print:decoration-black";

/** "Label: items" → bold label, plain rest. */
function splitLabel(text: string) {
  const i = text.indexOf(":");
  if (i === -1) return { label: "", rest: text };
  return { label: text.slice(0, i + 1), rest: text.slice(i + 1) };
}

/** "Head — detail" → bold head, plain detail. */
function splitHead(text: string) {
  const i = text.indexOf(" — ");
  if (i === -1) return { head: "", rest: text };
  return { head: text.slice(0, i), rest: text.slice(i + 3) };
}

function LecturerCVContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoPrint = searchParams.get("print") === "1";

  const [cv, setCv] = useState<LecturerCvData>(DEFAULT_LECTURER_CV);
  const [contact, setContact] = useState<Contact>(FALLBACK_CONTACT);
  const [education, setEducation] = useState<Edu[]>(FALLBACK_EDUCATION);

  useEffect(() => {
    document.title = `${FALLBACK_CONTACT.name} - Lecturer CV`;
    let cancelled = false;

    Promise.allSettled([
      fetch("/api/lecturer-cv").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/education").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/profile").then((r) => (r.ok ? r.json() : null)),
    ]).then(([cvRes, eduRes, profileRes]) => {
      if (cancelled) return;
      if (cvRes.status === "fulfilled" && cvRes.value) {
        const row = cvRes.value as Partial<LecturerCvData>;
        const projects = Array.isArray(row.projects)
          ? (row.projects as LecturerProject[])
          : DEFAULT_LECTURER_CV.projects;
        setCv({ ...DEFAULT_LECTURER_CV, ...row, projects });
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
          document.title = `${c.name} - Lecturer CV`;
        }
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

      <div className="pt-14 pb-10 flex justify-center bg-slate-100 min-h-screen print:block print:pt-0 print:pb-0 print:bg-white">
        <div className="cv-sheet w-[210mm] bg-white shadow-2xl shadow-slate-300/50 text-black overflow-hidden print:w-full print:py-4 print:shadow-none print:m-0" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
          <div className="h-1 bg-black" />
          <div className="px-7 py-3">

            <header className="mb-2.5">
              <h1 className="text-[26px] font-bold text-black leading-none">{contact.name}</h1>
              <p className="text-[12px] font-bold mt-1">{cv.headline}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{cv.locationLine}</p>
              <p className="text-[11px] text-black mt-1 leading-tight">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <span className="mx-1.5 text-slate-400">|</span>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                <span className="mx-1.5 text-slate-400">|</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{shortUrl(contact.linkedin)}</a>
                <span className="mx-1.5 text-slate-400">|</span>
                <a href={contact.github} target="_blank" rel="noopener noreferrer">{shortUrl(contact.github)}</a>
              </p>
            </header>

            <section className="mb-1">
              <h2 className={h2}>Career Objective</h2>
              <p className="text-[11px] leading-snug text-black">{cv.objective}</p>
            </section>

            <section className="mb-1">
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

            <section className="mb-1">
              <h2 className={h2}>Teaching Areas</h2>
              <div className="grid grid-cols-2 print:grid-cols-1 gap-x-5 gap-y-0.5 text-[11px] leading-snug">
                {cv.teachingAreas.map((area, i) => {
                  const { label, rest } = splitLabel(area);
                  return (
                    <p key={i}>
                      {label && <strong>{label}</strong>} {rest}
                    </p>
                  );
                })}
              </div>
            </section>

            <section className="mb-1">
              <h2 className={h2}>Teaching & Mentoring Experience</h2>
              <ul className="text-[11px] text-black space-y-0.5 list-disc list-inside leading-snug">
                {cv.experience.map((item, i) => {
                  const { head, rest } = splitHead(item);
                  return (
                    <li key={i}>
                      {head ? <><strong>{head}</strong> — {rest}</> : item}
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="mb-1">
              <h2 className={h2}>Academic Projects</h2>
              <div className="space-y-1">
                {cv.projects.map((p: LecturerProject, i: number) => (
                  <div key={i}>
                    <span className="text-[11px] font-bold text-black">{p.title}</span>
                    {p.links?.length > 0 && (
                      <p className="text-[10px] leading-snug break-all">
                        {p.links.map((url, li) => (
                          <span key={li}>
                            {li > 0 && <span className="mx-1 text-slate-400">|</span>}
                            <a href={url} target="_blank" rel="noopener noreferrer" className={linkCls}>{shortUrl(url)}</a>
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="text-[11px] text-black leading-snug">{p.description}</p>
                    {p.stack && <p className="text-[10px] text-slate-600"><strong>Stack:</strong> {p.stack}</p>}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-1">
              <div className="grid grid-cols-2 print:grid-cols-1 gap-x-5">
                <div>
                  <h2 className={h2}>Technical Skills</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    <p><strong>Languages:</strong> {cv.skillsLanguages}</p>
                    <p><strong>Frameworks:</strong> {cv.skillsFrameworks}</p>
                    <p><strong>Databases:</strong> {cv.skillsDatabases}</p>
                    <p><strong>Tools:</strong> {cv.skillsTools}</p>
                  </div>
                </div>
                <div>
                  <h2 className={h2}>Service & Leadership</h2>
                  <div className="space-y-0.5 text-[11px] leading-snug">
                    {cv.serviceLeadership.map((item, i) => {
                      const { head, rest } = splitHead(item);
                      return (
                        <p key={i}>
                          {head ? <><strong>{head}</strong> — {rest}</> : item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className={h2}>Languages</h2>
              <div className="flex flex-wrap gap-x-5 gap-y-0.5 text-[11px] text-black">
                {cv.languages.map((l, i) => {
                  const { head, rest } = splitHead(l);
                  return (
                    <span key={i}>
                      {head ? <><strong>{head}</strong> — {rest}</> : l}
                    </span>
                  );
                })}
              </div>
            </section>

          </div>
        </div>
      </div>
      <style>{`@media print { @page { size: A4; margin: 0; } .print\\:hidden{display:none!important} }`}</style>
    </>
  );
}

export default function LecturerCVPage() {
  return (
    <Suspense>
      <LecturerCVContent />
    </Suspense>
  );
}
