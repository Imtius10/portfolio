import { ProfileData } from "@/lib/types";
import {
  Code,
  Database,
  Server,
  Globe,
  Layers,
  Terminal,
} from "lucide-react";

interface AboutProps {
  profile: ProfileData;
}

const techStack = [
  { name: "Next.js", icon: <Globe className="w-4 h-4" /> },
  { name: "TypeScript", icon: <Terminal className="w-4 h-4" /> },
  { name: "React", icon: <Code className="w-4 h-4" /> },
  { name: "Node.js", icon: <Server className="w-4 h-4" /> },
  { name: "PostgreSQL", icon: <Database className="w-4 h-4" /> },
  { name: "Prisma ORM", icon: <Layers className="w-4 h-4" /> },
];

export default function About({ profile }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 bg-slate-800/50 light:bg-slate-100/50 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            About <span className="text-emerald-400 light:text-emerald-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Card */}
        <div className="bg-white/5 light:bg-white/70 backdrop-blur-md rounded-2xl border border-white/10 light:border-slate-200 shadow-xl shadow-black/10 overflow-hidden">
          {/* Top Section: Photo + Bio */}
          <div className="grid md:grid-cols-3 gap-0">
            {/* Left: Photo + Quick Stats */}
            <div className="md:col-span-1 p-8 bg-white/5 light:bg-slate-50 border-b md:border-b-0 md:border-r border-white/10 light:border-slate-200">
              <div className="flex flex-col items-center text-center">
                {/* Profile Photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-400/30 mb-6">
                  <img
                    src={profile.photoUrl || "/images/profile.jpg"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Title */}
                <h3 className="text-xl font-bold text-white light:text-slate-800 mb-1">
                  {profile.name}
                </h3>
                <p className="text-emerald-400 light:text-emerald-600 text-sm font-medium mb-6">
                  {profile.designation}
                </p>

                {/* Quick Stats */}
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-white/10 light:border-slate-200">
                    <span className="text-slate-400 light:text-slate-500 text-sm">Projects</span>
                    <span className="text-white light:text-slate-800 font-semibold text-sm">3+</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10 light:border-slate-200">
                    <span className="text-slate-400 light:text-slate-500 text-sm">CGPA</span>
                    <span className="text-white light:text-slate-800 font-semibold text-sm">3.55/4.00</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/10 light:border-slate-200">
                    <span className="text-slate-400 light:text-slate-500 text-sm">Experience</span>
                    <span className="text-white light:text-slate-800 font-semibold text-sm">Fresher</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-400 light:text-slate-500 text-sm">Status</span>
                    <span className="text-emerald-400 light:text-emerald-600 font-semibold text-sm">Open to Work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bio */}
            <div className="md:col-span-2 p-8">
              <p className="text-emerald-400 light:text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
                Who I Am
              </p>
              <div className="space-y-4 text-slate-300 light:text-slate-600 leading-relaxed">
                <p>
                  I&apos;m a <span className="text-white light:text-slate-800 font-semibold">Full Stack Developer</span> with
                  a focus on building clean, scalable web applications using{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">Next.js</span>,{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">TypeScript</span>, and{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">PostgreSQL</span>.
                </p>
                <p>
                  I&apos;ve shipped <span className="text-white light:text-slate-800 font-semibold">3+ production projects</span>{" "}
                  including a blood donation platform with Stripe payments and a food sharing system with real-time
                  workflows. I handle the full development cycle — from database design and API development to
                  responsive UI and deployment.
                </p>
                <p>
                  My foundation in <span className="text-white light:text-slate-800 font-semibold">competitive programming</span>{" "}
                  on Codeforces gives me strong problem-solving skills that I apply to software architecture and
                  system design.
                </p>
                <p>
                  I&apos;m seeking{" "}
                  <span className="text-white light:text-slate-800 font-semibold">internship or junior full-stack roles</span>{" "}
                  where I can contribute to meaningful projects and grow alongside experienced engineers.
                </p>
              </div>

              {/* Tech Stack Tags */}
              <div className="mt-8">
                <p className="text-slate-400 light:text-slate-500 text-sm font-medium mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 light:text-emerald-600 text-sm"
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}