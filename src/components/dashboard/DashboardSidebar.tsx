"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Projects", href: "/dashboard/projects", icon: "🚀" },
  { label: "Skills", href: "/dashboard/skills", icon: "💡" },
  { label: "Education", href: "/dashboard/education", icon: "🎓" },
  { label: "Experience", href: "/dashboard/experience", icon: "💼" },
  { label: "Social Links", href: "/dashboard/social-links", icon: "🔗" },
  { label: "Messages", href: "/dashboard/messages", icon: "✉️" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700/50 min-h-screen p-4">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xl font-bold text-emerald-400 hover:text-emerald-300"
        >
          Portfolio
        </Link>
        <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-400/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-4 border-t border-slate-700/50">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
        >
          <span className="text-lg">🌐</span>
          View Portfolio
        </Link>
      </div>
    </aside>
  );
}
