"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_CV, type CvContentData } from "@/lib/cvDefaults";
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

export default function CvPage() {
  const [cv, setCv] = useState<CvContentData>(DEFAULT_CV);
  const [dbConnected, setDbConnected] = useState(true);
  const [isNew, setIsNew] = useState(false);
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
  }, []);

  const set = (key: keyof CvContentData, value: string) =>
    setCv((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
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
        setToast({ message: "CV content saved!", type: "success" });
      } else {
        setToast({ message: "Database not connected", type: "error" });
      }
    } catch {
      setToast({ message: "Database not connected", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (!dbConnected) return <NoDbMessage page="CV / Resume" />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">
          CV / <span className="text-emerald-400">Resume</span>
        </h1>
        <div className="flex gap-3">
          <Link
            href="/resume"
            target="_blank"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold rounded-lg transition-colors"
          >
            👁 Preview CV
          </Link>
          <button
            onClick={() => window.open("/resume?print=1", "_blank")}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            ⬇ Generate PDF
          </button>
        </div>
      </div>

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
              value={cv.activities.join("\n")}
              onChange={(e) => setCv((prev) => ({ ...prev, activities: e.target.value.split("\n") }))}
              rows={5}
              className={`${inputCls} resize-y`}
            />
          </Field>
          <Field label="Languages (one per line)">
            <textarea
              value={cv.languages.join("\n")}
              onChange={(e) => setCv((prev) => ({ ...prev, languages: e.target.value.split("\n") }))}
              rows={5}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </div>

        <p className="text-sm text-slate-500">
          Projects & education on the CV update automatically from the <Link href="/dashboard/projects" className="text-emerald-400 hover:underline">Projects</Link> and <Link href="/dashboard/education" className="text-emerald-400 hover:underline">Education</Link> sections.
        </p>

        <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors cursor-pointer">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
