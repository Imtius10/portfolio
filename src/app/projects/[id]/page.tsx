import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { mockProfile } from "@/lib/mockData";

export const dynamic = "force-dynamic";

async function getProject(id: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (project) return project;
  } catch {
    // Database not available
  }

  // Fallback to mock data
  return mockProfile.projects.find((p) => p.id === id) || null;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-700/50 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {project.imageUrl && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-slate-700/50">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Action Links */}
        <div className="flex flex-wrap gap-4 mb-8">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-600/25"
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 font-semibold rounded-lg transition-all duration-200"
            >
              <GithubIcon className="w-5 h-5" />
              GitHub Repository
            </a>
          )}
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-emerald-600/10 text-emerald-400 rounded-lg border border-emerald-400/20 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            About This Project
          </h2>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            {(project.longDescription || project.description)
              .split("\n")
              .map((paragraph, i) => (
                <p key={i} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {project.challenges && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold text-white">
                Challenges Faced
              </h2>
            </div>
            <div className="bg-amber-500/5 rounded-xl p-6 border border-amber-500/20">
              <p className="text-slate-300 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          </div>
        )}

        {project.improvements && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">
                Future Improvements
              </h2>
            </div>
            <div className="bg-blue-500/5 rounded-xl p-6 border border-blue-500/20">
              <p className="text-slate-300 leading-relaxed">
                {project.improvements}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
