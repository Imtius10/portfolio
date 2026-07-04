"use client";

import { useState, useEffect } from "react";
import { SocialLink } from "@/lib/types";
import { Modal, ConfirmDialog, Toast } from "@/components/dashboard/Modal";

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SocialLink | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetch("/api/social-links")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setLinks(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (formData: FormData) => {
    const data = {
      id: editing?.id,
      platform: formData.get("platform"),
      url: formData.get("url"),
      icon: formData.get("icon"),
    };

    try {
      const method = editing ? "PUT" : "POST";
      const res = await fetch("/api/social-links", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updated = await res.json();
        if (editing) {
          setLinks(links.map((l) => (l.id === editing.id ? updated : l)));
        } else {
          setLinks([...links, updated]);
        }
        setShowModal(false);
        setEditing(null);
        setToast({ message: editing ? "Updated!" : "Added!", type: "success" });
      }
    } catch {
      setToast({ message: "Failed", type: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/social-links?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
        setToast({ message: "Deleted!", type: "success" });
      }
    } catch {
      setToast({ message: "Failed", type: "error" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-emerald-400">Social Links</span>
        </h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
        >
          + Add Link
        </button>
      </div>

      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center justify-between"
          >
            <div>
              <p className="text-white font-medium">{link.platform}</p>
              <p className="text-slate-400 text-sm">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(link);
                  setShowModal(true);
                }}
                className="text-emerald-400 hover:text-emerald-300 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => setDeleteTarget(link)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditing(null);
        }}
        title={editing ? "Edit Link" : "Add Link"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(new FormData(e.currentTarget));
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Platform
            </label>
            <select
              name="platform"
              defaultValue={editing?.platform}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              required
            >
              <option value="">Select...</option>
              <option value="GitHub">GitHub</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">URL</label>
            <input
              name="url"
              defaultValue={editing?.url}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400"
              placeholder="https://..."
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
            >
              {editing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditing(null);
              }}
              className="px-6 py-2 border border-slate-600 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget.id);
        }}
        title="Delete Link"
        message={`Remove ${deleteTarget?.platform}?`}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
