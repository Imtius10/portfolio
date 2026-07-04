"use client";

import { useState, useEffect } from "react";
import { Toast } from "@/components/dashboard/Modal";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{
    name: string;
    designation: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    whatsapp: string;
    resumeUrl: string;
    photoUrl: string;
  } | null>(null);
  const [dbConnected, setDbConnected] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => {
        if (!r.ok) throw new Error("No DB");
        return r.json();
      })
      .then((data) => {
        if (data && data.name) {
          setProfile({
            name: data.name || "",
            designation: data.designation || "",
            tagline: data.tagline || "",
            bio: data.bio || "",
            email: data.email || "",
            phone: data.phone || "",
            whatsapp: data.whatsapp || "",
            resumeUrl: data.resumeUrl || "",
            photoUrl: data.photoUrl || "",
          });
        } else {
          setDbConnected(false);
        }
      })
      .catch(() => setDbConnected(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          designation: formData.get("designation"),
          tagline: formData.get("tagline"),
          bio: formData.get("bio"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          whatsapp: formData.get("whatsapp"),
          resumeUrl: formData.get("resumeUrl"),
          photoUrl: formData.get("photoUrl"),
        }),
      });
      if (res.ok) {
        setToast({ message: "Profile updated!", type: "success" });
      } else {
        setToast({ message: "Database not connected", type: "error" });
      }
    } catch {
      setToast({ message: "Database not connected", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (!dbConnected) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-white mb-8">
          Edit <span className="text-emerald-400">Profile</span>
        </h1>
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 max-w-2xl">
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🗄️</div>
            <h2 className="text-xl font-semibold text-white mb-2">Database Not Connected</h2>
            <p className="text-slate-400 mb-4">
              Connect to PostgreSQL to edit your profile from the dashboard.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4 text-left">
              <p className="text-sm text-slate-500 mb-2">Steps:</p>
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                <li>Set up a PostgreSQL database (Supabase, Railway, or local)</li>
                <li>Update <code className="text-emerald-400">.env</code> with your DATABASE_URL</li>
                <li>Run <code className="text-emerald-400">npx prisma db push</code></li>
                <li>Run <code className="text-emerald-400">npx prisma db seed</code></li>
                <li>Restart the dev server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Edit <span className="text-emerald-400">Profile</span>
      </h1>
      <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            <input name="name" defaultValue={profile?.name} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Designation</label>
            <input name="designation" defaultValue={profile?.designation} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-1">Tagline</label>
            <input name="tagline" defaultValue={profile?.tagline} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-1">Bio</label>
            <textarea name="bio" defaultValue={profile?.bio} rows={8} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 resize-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
            <input name="email" type="email" defaultValue={profile?.email} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Phone</label>
            <input name="phone" defaultValue={profile?.phone} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">WhatsApp</label>
            <input name="whatsapp" defaultValue={profile?.whatsapp} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Resume URL</label>
            <input name="resumeUrl" defaultValue={profile?.resumeUrl} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-400 mb-1">Photo URL</label>
            <input name="photoUrl" defaultValue={profile?.photoUrl} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400" placeholder="https://... or /images/profile.jpg" />
          </div>
        </div>
        <button type="submit" disabled={saving} className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
