"use client";

import { useState, useEffect } from "react";

interface Stats {
  projects: number;
  skills: number;
  messages: number;
}

interface Profile {
  name: string;
  designation: string;
  email: string;
  socialLinksCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ projects: 0, skills: 0, messages: 0 });
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, skillsRes, messagesRes, profileRes] = await Promise.all([
          fetch("/api/projects").then((r) => r.json()).catch(() => []),
          fetch("/api/skills").then((r) => r.json()).catch(() => []),
          fetch("/api/contact").then((r) => r.json()).catch(() => []),
          fetch("/api/profile").then((r) => r.json()).catch(() => null),
        ]);
        setStats({
          projects: Array.isArray(projectsRes) ? projectsRes.length : 0,
          skills: Array.isArray(skillsRes) ? skillsRes.length : 0,
          messages: Array.isArray(messagesRes) ? messagesRes.length : 0,
        });
        if (profileRes && profileRes.name) {
          setProfile({
            name: profileRes.name,
            designation: profileRes.designation,
            email: profileRes.email,
            socialLinksCount: profileRes.socialLinks?.length || 0,
          });
        }
      } catch {
        // Use defaults
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Dashboard <span className="text-emerald-400">Overview</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="text-3xl mb-2">🚀</div>
          <p className="text-3xl font-bold text-white">{stats.projects}</p>
          <p className="text-slate-400 text-sm">Total Projects</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="text-3xl mb-2">💡</div>
          <p className="text-3xl font-bold text-white">{stats.skills}</p>
          <p className="text-slate-400 text-sm">Skills</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="text-3xl mb-2">✉️</div>
          <p className="text-3xl font-bold text-white">{stats.messages}</p>
          <p className="text-slate-400 text-sm">Contact Messages</p>
        </div>
      </div>

      {profile ? (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Profile Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-slate-500 text-sm">Name</p>
              <p className="text-white">{profile.name}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Designation</p>
              <p className="text-white">{profile.designation}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Email</p>
              <p className="text-white">{profile.email}</p>
            </div>
            <div>
              <p className="text-slate-500 text-sm">Social Links</p>
              <p className="text-white">{profile.socialLinksCount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Database Not Connected</h2>
          <p className="text-slate-400">
            Connect to PostgreSQL to manage your portfolio data from the dashboard.
            Currently showing mock data on the main site.
          </p>
          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
            <p className="text-sm text-emerald-400 font-mono">
              npx prisma db push && npx prisma db seed
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
