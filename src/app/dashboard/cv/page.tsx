"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_CV, type CvContentData } from "@/lib/cvDefaults";
import {
  DEFAULT_LECTURER_CV,
  type LecturerCvData,
  type LecturerProject,
} from "@/lib/lecturerCvDefaults";
import { Toast } from "@/components/dashboard/Modal";
import NoDbMessage from "@/components/dashboard/NoDbMessage";

const inputCls =
  "w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400";
const labelCls = "block text-sm font-medium text-slate-400 mb-1";

function Field({
  label,
  children,
  span = false,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={span ? "md:col-span-2" : ""}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function PdfRow({
  title,
  description,
  previewHref,
  pdfHref,
}: {
  title: string;
  description: string;
  previewHref: string;
  pdfHref: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/60 border border-slate-700/60 rounded-lg">
      <div>
        <p className="text-white font-semibold">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="flex gap-2">
        <Link
          href={previewHref}
          target="_blank"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          👁 Preview
        </Link>
        <button
          onClick={() => window.open(pdfHref, "_blank")}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
        >
          ⬇ Generate PDF
        </button>
      </div>
    </div>
  );
}

const tabCls = (active: boolean) =>
  `px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
    active
      ? "bg-emerald-600 text-white"
      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
  }`;

export default function CvPage() {
  const [tab, setTab] = useState<"developer" | "lecturer">("developer");

  const [cv, setCv] = useState<CvContentData>(DEFAULT_CV);
  const [lect, setLect] = useState<LecturerCvData>(DEFAULT_LECTURER_CV);

  const [dbConnected, setDbConnected] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [isLectNew, setIsLectNew] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cv")
      .then(async (r) => {
        if (r.ok) return { kind: "row" as const, d: await r.json() };
        if (r.status === 404) return { kind: "empty" as const, d: null };
        throw new Error("No DB");
      })
      .then(({ kind, d }) => {
        if (kind === "row" && d) {
          setCv({ ...DEFAULT_CV, ...d });
        } else {
          setIsNew(true);
        }
      })
      .catch(() => setDbConnected(false));

    fetch("/api/lecturer-cv")
      .then(async (r) => {
        if (r.ok) return { kind: "row" as const, d: await r.json() };
        if (r.status === 404) return { kind: "empty" as const, d: null };
        throw new Error("No DB");
      })
      .then(({ kind, d }) => {
        if (kind === "row" && d) {
          const projects = Array.isArray(d.projects)
            ? (d.projects as LecturerProject[])
            : DEFAULT_LECTURER_CV.projects;
          setLect({ ...DEFAULT_LECTURER_CV, ...d, projects });
        } else {
          setIsLectNew(true);
        }
      })
      .catch(() => setIsLectNew(true));
  }, []);

  const set = (key: keyof CvContentData, value: string) =>
    setCv((prev) => ({ ...prev, [key]: value }));

  const setLectField = (key: keyof LecturerCvData, value: string | string[]) =>
    setLect((prev) => ({ ...prev, [key]: value }));

  const setProject = (index: number, patch: Partial<LecturerProject>) =>
    setLect((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));

  const addProject = () =>
    setLect((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", links: [], description: "", stack: "" }],
    }));

  const removeProject = (index: number) =>
    setLect((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));

  const handleSaveDeveloper = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...cv,
          activities: cv.activities.map((a) => a.trim()).filter(Boolean),
          languages: cv.languages.map((l) => l.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        setCv({ ...DEFAULT_CV, ...saved });
        setIsNew(false);
        setToast({ message: "Developer CV saved!", type: "success" });
      } else {
        setToast({ message: "Database not connected", type: "error" });
      }
    } catch {
      setToast({ message: "Database not connected", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLecturer = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/lecturer-cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lect,
          teachingAreas: lect.teachingAreas.map((s) => s.trim()).filter(Boolean),
          experience: lect.experience.map((s) => s.trim()).filter(Boolean),
          serviceLeadership: lect.serviceLeadership.map((s) => s.trim()).filter(Boolean),
          languages: lect.languages.map((s) => s.trim()).filter(Boolean),
          projects: lect.projects
            .filter((p) => p.title.trim() !== "")
            .map((p) => ({
              ...p,
              title: p.title.trim(),
              links: p.links.map((l) => l.trim()).filter(Boolean),
            })),
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        const projects = Array.isArray(saved.projects)
          ? (saved.projects as LecturerProject[])
          : DEFAULT_LECTURER_CV.projects;
        setLect({ ...DEFAULT_LECTURER_CV, ...saved, projects });
        setIsLectNew(false);
        setToast({ message: "Lecturer CV saved!", type: "success" });
      } else {
        setToast({ message: "Database not connected", type: "error" });
      }
    } catch {
      setToast({ message: "Database not connected", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const lines = (arr: string[]) => arr.join("\n");
  const toLines = (value: string) =>
    value.split("\n").map((s) => s.trimEnd());

  if (!dbConnected) return <NoDbMessage page="CV / Resume" />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">
          CV / <span className="text-emerald-400">Resume</span>
        </h1>
      </div>

      <div className="mb-8 max-w-3xl">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-1">Generate PDF</h2>
          <p className="text-sm text-slate-500 mb-4">
            Opens the live CV in a new tab and starts the print dialog — choose{" "}
            <strong>Save as PDF</strong>. Both CVs are single-column, plain black text and ATS friendly.
          </p>
          <div className="space-y-3">
            <PdfRow
              title="Developer CV"
              description="/resume — skills, experience, education & projects"
              previewHref="/resume"
              pdfHref="/resume?print=1"
            />
            <PdfRow
              title="Lecturer CV"
              description="/cv/lecturer — teaching areas, mentoring & academic projects"
              previewHref="/cv/lecturer"
              pdfHref="/cv/lecturer?print=1"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button className={tabCls(tab === "developer")} onClick={() => setTab("developer")}>
          Developer CV
        </button>
        <button className={tabCls(tab === "lecturer")} onClick={() => setTab("lecturer")}>
          Lecturer CV
        </button>
      </div>

      {tab === "developer" && (
        <>
          {isNew && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg max-w-3xl">
              <p className="text-amber-300 text-sm">
                No saved CV found — showing defaults. Edit and hit <strong>Save Changes</strong>, then Generate PDF.
              </p>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 max-w-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Headline" span>
                <input value={cv.headline} onChange={(e) => set("headline", e.target.value)} className={inputCls} placeholder="Full Stack Developer · Next.js · ..." />
              </Field>
              <Field label="Location / availability line" span>
                <input value={cv.locationLine} onChange={(e) => set("locationLine", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Professional summary" span>
                <textarea value={cv.summary} onChange={(e) => set("summary", e.target.value)} rows={6} className={`${inputCls} resize-y`} />
              </Field>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Technical skills <span className="text-slate-500 text-sm font-normal">(comma-separated, as shown on the CV)</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Frontend">
                  <input value={cv.skillsFrontend} onChange={(e) => set("skillsFrontend", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Backend">
                  <input value={cv.skillsBackend} onChange={(e) => set("skillsBackend", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Database">
                  <input value={cv.skillsDatabase} onChange={(e) => set("skillsDatabase", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Languages">
                  <input value={cv.skillsLanguages} onChange={(e) => set("skillsLanguages", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Tools">
                  <input value={cv.skillsTools} onChange={(e) => set("skillsTools", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Concepts">
                  <input value={cv.skillsConcepts} onChange={(e) => set("skillsConcepts", e.target.value)} className={inputCls} />
                </Field>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Education extras</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Bachelor note (under degree)">
                  <input value={cv.bachelorNote} onChange={(e) => set("bachelorNote", e.target.value)} className={inputCls} />
                </Field>
                <Field label="CGPA badge">
                  <input value={cv.cgpaText} onChange={(e) => set("cgpaText", e.target.value)} className={inputCls} />
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Activities & leadership (one per line)">
                <textarea
                  value={lines(cv.activities)}
                  onChange={(e) => setCv((prev) => ({ ...prev, activities: e.target.value.split("\n") }))}
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <Field label="Languages (one per line)">
                <textarea
                  value={lines(cv.languages)}
                  onChange={(e) => setCv((prev) => ({ ...prev, languages: e.target.value.split("\n") }))}
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>

            <p className="text-sm text-slate-500">
              Contact details live in the <Link href="/dashboard/profile" className="text-emerald-400 hover:underline">Profile</Link> section. Projects & education on the CV update automatically from the <Link href="/dashboard/projects" className="text-emerald-400 hover:underline">Projects</Link> and <Link href="/dashboard/education" className="text-emerald-400 hover:underline">Education</Link> sections.
            </p>

            <button onClick={handleSaveDeveloper} disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}

      {tab === "lecturer" && (
        <>
          {isLectNew && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg max-w-3xl">
              <p className="text-amber-300 text-sm">
                No saved Lecturer CV found — showing defaults. Edit and hit <strong>Save Changes</strong>, then Generate PDF.
              </p>
            </div>
          )}

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 max-w-3xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Title / headline" span>
                <input value={lect.headline} onChange={(e) => setLectField("headline", e.target.value)} className={inputCls} placeholder="Lecturer in Computer Science & Engineering" />
              </Field>
              <Field label="Location / credential line" span>
                <input value={lect.locationLine} onChange={(e) => setLectField("locationLine", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Career objective" span>
                <textarea value={lect.objective} onChange={(e) => setLectField("objective", e.target.value)} rows={6} className={`${inputCls} resize-y`} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Teaching areas (one per line, format: Label: items)">
                <textarea
                  value={lines(lect.teachingAreas)}
                  onChange={(e) => setLectField("teachingAreas", toLines(e.target.value))}
                  rows={6}
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <Field label="Teaching & mentoring experience (one per line, format: Role — details)">
                <textarea
                  value={lines(lect.experience)}
                  onChange={(e) => setLectField("experience", toLines(e.target.value))}
                  rows={6}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">
                  Academic projects{" "}
                  <span className="text-slate-500 text-sm font-normal">(shown in the Academic Projects section)</span>
                </h2>
                <button
                  onClick={addProject}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  + Add project
                </button>
              </div>

              <div className="space-y-4">
                {lect.projects.map((p, i) => (
                  <div key={i} className="p-4 bg-slate-900/60 border border-slate-700/60 rounded-lg space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-emerald-400">Project {i + 1}</span>
                      <button
                        onClick={() => removeProject(i)}
                        className="text-sm text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field label="Title" span>
                        <input
                          value={p.title}
                          onChange={(e) => setProject(i, { title: e.target.value })}
                          className={inputCls}
                          placeholder="RentNest — Full-Stack Rental Marketplace"
                        />
                      </Field>
                      <Field label="Links (one per line)">
                        <textarea
                          value={p.links.join("\n")}
                          onChange={(e) => setProject(i, { links: e.target.value.split("\n") })}
                          rows={3}
                          className={`${inputCls} resize-y`}
                        />
                      </Field>
                      <Field label="Stack">
                        <input
                          value={p.stack}
                          onChange={(e) => setProject(i, { stack: e.target.value })}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Description" span>
                        <textarea
                          value={p.description}
                          onChange={(e) => setProject(i, { description: e.target.value })}
                          rows={3}
                          className={`${inputCls} resize-y`}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
                {lect.projects.length === 0 && (
                  <p className="text-sm text-slate-500">No projects yet — add one to show it on the CV.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Technical skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Languages">
                  <input value={lect.skillsLanguages} onChange={(e) => setLectField("skillsLanguages", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Frameworks">
                  <input value={lect.skillsFrameworks} onChange={(e) => setLectField("skillsFrameworks", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Databases">
                  <input value={lect.skillsDatabases} onChange={(e) => setLectField("skillsDatabases", e.target.value)} className={inputCls} />
                </Field>
                <Field label="Tools">
                  <input value={lect.skillsTools} onChange={(e) => setLectField("skillsTools", e.target.value)} className={inputCls} />
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Service & leadership (one per line, format: Role — details)">
                <textarea
                  value={lines(lect.serviceLeadership)}
                  onChange={(e) => setLectField("serviceLeadership", toLines(e.target.value))}
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <Field label="Languages (one per line, format: Language — level)">
                <textarea
                  value={lines(lect.languages)}
                  onChange={(e) => setLectField("languages", toLines(e.target.value))}
                  rows={5}
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>

            <p className="text-sm text-slate-500">
              Education on the Lecturer CV updates automatically from the <Link href="/dashboard/education" className="text-emerald-400 hover:underline">Education</Link> section. Contact details live in <Link href="/dashboard/profile" className="text-emerald-400 hover:underline">Profile</Link>.
            </p>

            <button onClick={handleSaveLecturer} disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
