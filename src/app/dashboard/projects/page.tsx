"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/types";
import { Modal, ConfirmDialog, Toast } from "@/components/dashboard/Modal";
import NoDbMessage from "@/components/dashboard/NoDbMessage";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dbConnected, setDbConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
          if (data.length === 0) setDbConnected(false);
        } else {
          setDbConnected(false);
        }
      })
      .catch(() => setDbConnected(false));
  }, []);

  if (!dbConnected) return <NoDbMessage page="Projects" />;

  const handleSave = async (formData: FormData) => {
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      longDescription: formData.get("longDescription"),
      imageUrl: formData.get("imageUrl"),
      liveUrl: formData.get("liveUrl"),
      githubUrl: formData.get("githubUrl"),
      techStack: (formData.get("techStack") as string).split(",").map((s) => s.trim()).filter(Boolean),
      challenges: formData.get("challenges"),
      improvements: formData.get("improvements"),
      featured: formData.get("featured") === "on",
    };
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        const updated = await res.json();
        if (editingProject) setProjects(projects.map((p) => (p.id === editingProject.id ? updated : p)));
        else setProjects([updated, ...projects]);
        setShowModal(false);
        setEditingProject(null);
        setToast({ message: editingProject ? "Updated!" : "Created!", type: "success" });
      }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) { setProjects(projects.filter((p) => p.id !== id)); setToast({ message: "Deleted!", type: "success" }); }
    } catch { setToast({ message: "Failed", type: "error" }); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white"><span className="text-emerald-400">Projects</span></h1>
        <button onClick={() => { setEditingProject(null); setShowModal(true); }} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">+ Add Project</button>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  {project.featured && <span className="px-2 py-0.5 bg-emerald-600/20 text-emerald-400 text-xs rounded">Featured</span>}
                </div>
                <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (<span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">{tech}</span>))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => { setEditingProject(project); setShowModal(true); }} className="px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors">Edit</button>
                <button onClick={() => setDeleteTarget(project)} className="px-3 py-1.5 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setEditingProject(null); }} title={editingProject ? "Edit Project" : "Add Project"}>
        <form onSubmit={(e) => { e.preventDefault(); handleSave(new FormData(e.currentTarget)); }} className="space-y-4">
          <div><label className="block text-sm text-slate-400 mb-1">Title</label><input name="title" defaultValue={editingProject?.title} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Description</label><textarea name="description" defaultValue={editingProject?.description} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" required /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Full Description</label><textarea name="longDescription" defaultValue={editingProject?.longDescription || ""} rows={5} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-400 mb-1">Live URL</label><input name="liveUrl" defaultValue={editingProject?.liveUrl || ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
            <div><label className="block text-sm text-slate-400 mb-1">GitHub URL</label><input name="githubUrl" defaultValue={editingProject?.githubUrl || ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          </div>
          <div><label className="block text-sm text-slate-400 mb-1">Tech Stack (comma-separated)</label><input name="techStack" defaultValue={editingProject?.techStack.join(", ")} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Image URL</label><input name="imageUrl" defaultValue={editingProject?.imageUrl || ""} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Challenges</label><textarea name="challenges" defaultValue={editingProject?.challenges || ""} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Improvements</label><textarea name="improvements" defaultValue={editingProject?.improvements || ""} rows={3} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" /></div>
          <div className="flex items-center gap-2"><input type="checkbox" name="featured" defaultChecked={editingProject?.featured} className="w-4 h-4 accent-emerald-500" /><label className="text-sm text-slate-400">Featured</label></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors">{editingProject ? "Update" : "Create"}</button>
            <button type="button" onClick={() => { setShowModal(false); setEditingProject(null); }} className="px-6 py-2 border border-slate-600 text-slate-400 hover:text-white rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => { if (deleteTarget) handleDelete(deleteTarget.id); }} title="Delete Project" message={`Delete "${deleteTarget?.title}"?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
