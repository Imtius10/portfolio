import type { Project } from "@/lib/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectsProps {
  projects: Project[];
  showAll?: boolean;
}

export default function Projects({ projects, showAll = false }: ProjectsProps) {
  const displayProjects = showAll ? projects : projects.slice(0, 3);
  const hasMore = projects.length > 3;

  return (
    <section id="projects" className="py-20 bg-slate-800/50 light:bg-slate-100/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white light:text-slate-800 mb-4">
            My <span className="text-emerald-400 light:text-emerald-600">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-400 light:bg-emerald-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 light:bg-white/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 light:border-slate-200 hover:border-emerald-400/20 transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden">
                {project.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-white/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-600 text-white text-xs font-semibold rounded">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white light:text-slate-800 mb-2 group-hover:text-emerald-400 light:group-hover:text-emerald-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 light:text-slate-500 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-slate-800 light:bg-slate-100 text-emerald-400 light:text-emerald-600 text-xs rounded-md border border-slate-700 light:border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 bg-slate-800 light:bg-slate-100 text-slate-400 light:text-slate-500 text-xs rounded-md border border-slate-700 light:border-slate-200">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 light:text-slate-500 hover:text-emerald-400 light:hover:text-emerald-600 transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 light:text-slate-500 hover:text-emerald-400 light:hover:text-emerald-600 transition-colors"
                      aria-label="GitHub repository"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {hasMore && !showAll && (
          <div className="text-center mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-emerald-400 light:border-emerald-600 text-emerald-400 light:text-emerald-600 hover:bg-emerald-400 hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              View All Projects
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
