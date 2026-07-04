"use client";

import { ProfileData } from "@/lib/types";
import TypeWriter from "./TypeWriter";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "./SocialIcons";

interface HeroProps {
  profile: ProfileData;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  twitter: <TwitterIcon />,
};

const typingWords = [
  "Full Stack Developer",
  "Next.js & TypeScript",
  "PostgreSQL Expert",
  "Open to Opportunities",
];

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 light:from-slate-50 light:via-white light:to-slate-50 pt-16 relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/8 light:bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/8 light:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-emerald-400/5 light:bg-emerald-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 light:bg-purple-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Available badge - glass */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 light:bg-white/70 backdrop-blur-md border border-white/10 light:border-slate-200 rounded-full mb-6 animate-fade-in-up opacity-0 shadow-lg shadow-black/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-emerald-400 light:text-emerald-600 text-sm font-medium">
                Available for hire
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white light:text-slate-800 mb-4 animate-fade-in-up opacity-0 delay-100">
              Hi, I&apos;m{" "}
              <span className="text-emerald-400 light:text-emerald-600">{profile.name}</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-300 light:text-slate-600 mb-6 animate-fade-in-up opacity-0 delay-200">
              I&apos;m a{" "}
              <TypeWriter words={typingWords} />
            </h2>
            <p className="text-lg text-slate-400 light:text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up opacity-0 delay-300">
              I build modern full-stack apps with{" "}
              <span className="text-emerald-400 light:text-emerald-600 font-medium">Next.js</span>,{" "}
              <span className="text-emerald-400 light:text-emerald-600 font-medium">TypeScript</span>, and{" "}
              <span className="text-emerald-400 light:text-emerald-600 font-medium">PostgreSQL</span>.
              Clean architecture, typed code, production-ready.
            </p>

            {/* Quick Stats - glass cards */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up opacity-0 delay-350">
              <div className="px-5 py-3 bg-white/5 light:bg-white/70 backdrop-blur-md border border-white/10 light:border-slate-200 rounded-xl text-center shadow-lg shadow-black/10">
                <p className="text-2xl font-bold text-emerald-400 light:text-emerald-600">3+</p>
                <p className="text-xs text-slate-400 light:text-slate-500">Projects Shipped</p>
              </div>
              <div className="px-5 py-3 bg-white/5 light:bg-white/70 backdrop-blur-md border border-white/10 light:border-slate-200 rounded-xl text-center shadow-lg shadow-black/10">
                <p className="text-2xl font-bold text-emerald-400 light:text-emerald-600">15+</p>
                <p className="text-xs text-slate-400 light:text-slate-500">Technologies</p>
              </div>
              <div className="px-5 py-3 bg-white/5 light:bg-white/70 backdrop-blur-md border border-white/10 light:border-slate-200 rounded-xl text-center shadow-lg shadow-black/10">
                <p className="text-2xl font-bold text-emerald-400 light:text-emerald-600">CP</p>
                <p className="text-xs text-slate-400 light:text-slate-500">Codeforces</p>
              </div>
            </div>

            {/* Action Buttons - glass */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-up opacity-0 delay-400">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/80 hover:bg-emerald-400/80 backdrop-blur-sm text-white font-semibold rounded-xl border border-emerald-400/20 transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                <Mail className="w-5 h-5" />
                Hire Me
              </a>
              {profile.resumeUrl ? (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 light:bg-white/70 hover:bg-white/10 light:hover:bg-white/90 backdrop-blur-sm border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-800 font-semibold rounded-xl transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </a>
              ) : (
                <a
                  href="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 light:bg-white/70 hover:bg-white/10 light:hover:bg-white/90 backdrop-blur-sm border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-800 font-semibold rounded-xl transition-all duration-200"
                >
                  <FileText className="w-5 h-5" />
                  View Resume
                </a>
              )}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 light:bg-white/70 hover:bg-white/10 light:hover:bg-white/90 backdrop-blur-sm border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-600 hover:text-white light:hover:text-slate-800 font-semibold rounded-xl transition-all duration-200"
              >
                <ExternalLink className="w-5 h-5" />
                View Projects
              </a>
            </div>

            {/* Social Links - glass */}
            <div className="flex gap-3 justify-center lg:justify-start animate-fade-in-up opacity-0 delay-500">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 light:bg-white/70 backdrop-blur-md hover:bg-emerald-500/20 border border-white/10 light:border-slate-200 hover:border-emerald-400/30 rounded-xl text-slate-400 light:text-slate-600 hover:text-emerald-400 light:hover:text-emerald-600 transition-all duration-200 shadow-lg shadow-black/10"
                  aria-label={link.platform}
                >
                  {socialIcons[link.platform.toLowerCase()] || (
                    <ExternalLink className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Photo - glass frame */}
          <div className="flex-shrink-0 animate-fade-in-right opacity-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-white/20 light:border-slate-200 shadow-2xl shadow-emerald-500/10 animate-pulse-glow bg-white/5 light:bg-white/70 backdrop-blur-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profile.photoUrl || ""}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".fallback-avatar")) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "fallback-avatar w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center";
                      fallback.innerHTML = `<span class="text-6xl font-bold text-white">${profile.name.charAt(0)}</span>`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
