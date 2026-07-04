import type { Experience as ExperienceType } from "@/lib/types";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="experience" className="py-20 bg-slate-900 light:bg-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            Work <span className="text-emerald-400 light:text-emerald-600">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        {experience.length === 0 && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/5 light:bg-white/70 backdrop-blur-md rounded-2xl p-12 border border-white/10 light:border-slate-200">
              <Briefcase className="w-12 h-12 text-emerald-400 light:text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white light:text-slate-800 mb-2">
                Open to Opportunities
              </h3>
              <p className="text-slate-400 light:text-slate-500">
                I&apos;m a fresh graduate seeking my first role. Ready to bring my skills and passion to a dynamic team.
              </p>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-6">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-emerald-400/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {exp.position}
                  </h3>
                  <p className="text-emerald-400 mb-2">{exp.company}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
