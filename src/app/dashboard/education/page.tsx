"use client";

import { useState, useEffect } from "react";
import { Education } from "@/lib/types";
import { Modal, ConfirmDialog, Toast } from "@/components/dashboard/Modal";
import NoDbMessage from "@/components/dashboard/NoDbMessage";

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [dbConnected, setDbConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Education | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/education")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) { setEducation(data); if (data.length === 0) setDbConnected(false); }
        else setDbConnected(false);
      })
      .catch(() => setDbConnected(false));
  }, []);

  if (!dbConnected) return <NoDbMessage page="Education" />;

  const handleSave = async (formData: FormData) => {
    const data = {
      institution: formData.get("institution"),
      degree: formData.get("degree"),
      field: formData.get("field"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
    };
    try {
      const url = editingEdu ? `/api/education?id=${editingEdu.id}` : "/api/education";
      const method = editingEdu ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        const updated = await res.json();
        if (editingEdu) setEducation(education.map((e) => (e.id === editingEdu.id ? updated : e)));
        else setEducation([updated, ...education]);
        setShowModal(false); setEditingEdu(null);
        setToast({ message: editingEdu ? "Updated!" : "Added!", type: "success" });
      }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/education?id=${id}`, { method: "DELETE" });
      if (res.ok) { setEducation(education.filter((e) => e.id !== id)); setToast({ message: "Deleted!", type: "success" }); }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white"><span className="text-emerald-400">Education</span></h1>
        <button onClick={() => { setEditingEdu(null); setShowModal(true); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">+ Add Education</button>
      </div>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{edu.institution}</h3>
                <p className="text-emerald-400">{edu.degree} {edu.field && `- ${edu.field}`}</p>
                <p className="text-slate-500 text-sm">
                  {new Date(edu.startDate).getFullYear()} - {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"}
                </p>
                {edu.description && <p className="text-slate-400 text-sm mt-2 max-w-xl">{edu.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingEdu(edu); setShowModal(true); }} className="px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors">Edit</button>
                <button onClick={() => setDeleteTarget(edu)} className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingEdu(null); }} title={editingEdu ? "Edit Education" : "Add Education"}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(new FormData(e.currentTarget)); }} className="space-y-4">
          <div><label className="block text-sm text-slate-400 mb-1">Institution</label><input name="institution" defaultValue={editingEdu?.institution} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Degree</label><input name="degree" defaultValue={editingEdu?.degree} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Field of Study</label><input name="field" defaultValue={editingEdu?.field || ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Start Date</label><input name="startDate" type="date" defaultValue={editingEdu?.startDate ? new Date(editingEdu.startDate).toISOString().split("T")[0] : ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">End Date</label><input name="endDate" type="date" defaultValue={editingEdu?.endDate ? new Date(editingEdu.endDate).toISOString().split("T")[0] : ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          </div>
          <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" defaultValue={editingEdu?.description || ""} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" /></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">{editingEdu ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingEdu(null); }} className="px-6 py-2 border border-slate-600 text-slate-400 hover:text-white rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) handleDelete(deleteTarget.id); }} title="Delete Education" message={`Delete "${deleteTarget?.institution}"?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
