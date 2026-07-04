"use client";

import { useState, useEffect } from "react";
import { Experience } from "@/lib/types";
import { Modal, ConfirmDialog, Toast } from "@/components/dashboard/Modal";
import NoDbMessage from "@/components/dashboard/NoDbMessage";

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [dbConnected, setDbConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/experience")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) { setExperience(data); if (data.length === 0) setDbConnected(false); }
        else setDbConnected(false);
      })
      .catch(() => setDbConnected(false));
  }, []);

  if (!dbConnected) return <NoDbMessage page="Experience" />;

  const handleSave = async (formData: FormData) => {
    const data = {
      company: formData.get("company"),
      position: formData.get("position"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      description: formData.get("description"),
    };
    try {
      const url = editingExp ? `/api/experience?id=${editingExp.id}` : "/api/experience";
      const method = editingExp ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        const updated = await res.json();
        if (editingExp) setExperience(experience.map((e) => (e.id === editingExp.id ? updated : e)));
        else setExperience([updated, ...experience]);
        setShowModal(false); setEditingExp(null);
        setToast({ message: editingExp ? "Updated!" : "Added!", type: "success" });
      }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/experience?id=${id}`, { method: "DELETE" });
      if (res.ok) { setExperience(experience.filter((e) => e.id !== id)); setToast({ message: "Deleted!", type: "success" }); }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white"><span className="text-emerald-400">Experience</span></h1>
        <button onClick={() => { setEditingExp(null); setShowModal(true); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">+ Add Experience</button>
      </div>
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                <p className="text-emerald-400">{exp.company}</p>
                <p className="text-slate-500 text-sm">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </p>
                {exp.description && <p className="text-slate-400 text-sm mt-2 max-w-xl">{exp.description}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingExp(exp); setShowModal(true); }} className="px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors">Edit</button>
                <button onClick={() => setDeleteTarget(exp)} className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingExp(null); }} title={editingExp ? "Edit Experience" : "Add Experience"}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(new FormData(e.currentTarget)); }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Company</label><input name="company" defaultValue={editingExp?.company} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
            <div><label className="block text-sm text-slate-400 mb-1">Position</label><input name="position" defaultValue={editingExp?.position} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Start Date</label><input name="startDate" type="date" defaultValue={editingExp?.startDate ? new Date(editingExp.startDate).toISOString().split("T")[0] : ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">End Date</label><input name="endDate" type="date" defaultValue={editingExp?.endDate ? new Date(editingExp.endDate).toISOString().split("T")[0] : ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          </div>
          <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" defaultValue={editingExp?.description || ""} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" /></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">{editingExp ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingExp(null); }} className="px-6 py-2 border border-slate-600 text-slate-400 hover:text-white rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) handleDelete(deleteTarget.id); }} title="Delete Experience" message={`Delete "${deleteTarget?.position}"?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
