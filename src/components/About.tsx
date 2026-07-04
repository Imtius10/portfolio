import { ProfileData } from "@/lib/types";
import { Code, Lightbulb, Users, Zap } from "lucide-react";

interface AboutProps {
  profile: ProfileData;
}

const highlights = [
  {
    icon: <Code className="w-5 h-5" />,
    label: "Clean Code",
    desc: "Readable, maintainable, well-structured",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    label: "Problem Solver",
    desc: "Competitive programming on Codeforces",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Team Player",
    desc: "Collaborative, communicative, adaptable",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Fast Learner",
    desc: "Pick up new tech quickly and effectively",
  },
];

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-slate-800/50 light:bg-slate-100/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            About <span className="text-emerald-400 light:text-emerald-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Bio - glass card */}
            <div className="lg:col-span-3 bg-white/5 light:bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/10 light:border-slate-200 shadow-xl shadow-black/10">
              <p className="text-emerald-400 light:text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4">
                Who I Am
              </p>
              <div className="space-y-4 text-slate-300 light:text-slate-600 leading-relaxed">
                <p>
                  I&apos;m <span className="text-white light:text-slate-800 font-semibold">{profile.name}</span>, a
                  full-stack developer and Computer Science student at Netrokona University.
                  I specialize in{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">Next.js</span>,{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">TypeScript</span>, and{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">PostgreSQL</span> — building
                  production-ready applications with clean, typed code.
                </p>
                <p>
                  I&apos;ve shipped <span className="text-emerald-400 light:text-emerald-600 font-medium">3+ real-world
                  projects</span> including a blood donation platform with Stripe payments and a
                  food sharing system with real-time workflows. I also compete on{" "}
                  <span className="text-emerald-400 light:text-emerald-600 font-medium">Codeforces</span>, which keeps
                  my algorithmic thinking sharp.
                </p>
                <p>
                  I&apos;m currently looking for{" "}
                  <span className="text-white light:text-slate-800 font-semibold">internship or junior full-stack
                  roles</span> where I can work with modern stacks like Next.js and PostgreSQL
                  while continuing to grow as an engineer.
                </p>
              </div>
            </div>

            {/* Highlights - glass cards */}
            <div className="lg:col-span-2 space-y-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white/5 light:bg-white/70 backdrop-blur-md rounded-xl p-5 border border-white/10 light:border-slate-200 hover:border-emerald-400/30 transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-emerald-400 light:text-emerald-600 border border-emerald-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white light:text-slate-800 font-semibold text-sm">
                      {item.label}
                    </h4>
                    <p className="text-slate-400 light:text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
