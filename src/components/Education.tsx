import type { Education as EducationType } from "@/lib/types";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <section id="education" className="py-20 bg-slate-800/50 light:bg-slate-100/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            Educational <span className="text-emerald-400 light:text-emerald-600">Qualification</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-slate-900/50 light:bg-white/70 rounded-xl p-6 border border-slate-700/50 light:border-slate-200 hover:border-emerald-400/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400 light:text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white light:text-slate-800 mb-1">
                    {edu.degree}
                    {edu.field && (
                      <span className="text-emerald-400 light:text-emerald-600">
                        {" "}
                        in {edu.field}
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-400 light:text-slate-500 mb-2">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 light:text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-slate-300 light:text-slate-600 text-sm leading-relaxed">
                      {edu.description}
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
