"use client";

import { useState, useEffect } from "react";
import { SkillWithCategory as Skill } from "@/lib/types";
import { Modal, ConfirmDialog, Toast } from "@/components/dashboard/Modal";
import NoDbMessage from "@/components/dashboard/NoDbMessage";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [dbConnected, setDbConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    Promise.all([fetch("/api/skills").then((r) => r.json()).catch(() => []), fetch("/api/skills/categories").then((r) => r.json()).catch(() => [])])
      .then(([skillsData, catsData]) => {
        if (Array.isArray(skillsData)) setSkills(skillsData);
        else setDbConnected(false);
        if (Array.isArray(catsData)) setCategories(catsData);
      })
      .catch(() => setDbConnected(false));
  }, []);

  if (!dbConnected) return <NoDbMessage page="Skills" />;

  const handleSave = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      level: Number(formData.get("level")),
      categoryId: formData.get("categoryId") || null,
    };
    try {
      const res = await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        const newSkill = await res.json();
        setSkills([...skills, newSkill]);
        setShowModal(false);
        setToast({ message: "Added!", type: "success" });
      }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/skills", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (res.ok) { setSkills(skills.filter((s) => s.id !== id)); setToast({ message: "Deleted!", type: "success" }); }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white"><span className="text-emerald-400">Skills</span></h1>
        <button onClick={() => { setEditingSkill(null); setShowModal(true); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">+ Add Skill</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{skill.name}</span>
              <div className="flex gap-1">
                <button onClick={() => { setEditingSkill(skill); setShowModal(true); }} className="text-slate-500 hover:text-emerald-400 text-xs">Edit</button>
                <button onClick={() => setDeleteTarget(skill)} className="text-slate-500 hover:text-red-400 text-xs">Del</button>
              </div>
            </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${skill.level}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-1">{skill.level}%</p>
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingSkill(null); }} title={editingSkill ? "Edit Skill" : "Add Skill"}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(new FormData(e.currentTarget)); }} className="space-y-4">
          <div><label className="block text-sm text-slate-400 mb-1">Name</label><input name="name" defaultValue={editingSkill?.name} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Level (0-100)</label><input name="level" type="number" min="0" max="100" defaultValue={editingSkill?.level || 80} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Category</label><select name="categoryId" defaultValue={editingSkill?.category?.id} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"><option value="">None</option>{categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}</select></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">{editingSkill ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingSkill(null); }} className="px-6 py-2 border border-slate-600 text-slate-400 hover:text-white rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) handleDelete(deleteTarget.id); }} title="Delete Skill" message={`Delete "${deleteTarget?.name}"?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
