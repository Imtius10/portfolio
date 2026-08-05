"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  Code,
  Database,
  Server,
  Brain,
  Network,
  Shield,
  Cpu,
  Users,
  Award,
  Globe,
  Download,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Teaching", href: "#teaching" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const teachingAreas = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Programming Languages",
    items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    text: "text-blue-400",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Data Structures & Algorithms",
    items: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP", "Greedy"],
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Core Computer Science",
    items: ["Operating Systems", "Computer Networks", "DBMS", "Compiler Design"],
    color: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/30",
    text: "text-purple-400",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Artificial Intelligence",
    items: ["Machine Learning", "AI Fundamentals", "NLP Basics", "Neural Networks"],
    color: "from-rose-500/20 to-pink-500/20",
    border: "border-rose-500/30",
    text: "text-rose-400",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Theory of Computation",
    items: ["Automata Theory", "Formal Languages", "Computability", "Complexity"],
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    text: "text-amber-400",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security & Telecommunications",
    items: ["Cryptography", "Network Security", "Wireless Comms", "4G/5G Protocols"],
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
    text: "text-red-400",
  },
];

const researchInterests = [
  "Algorithm Design & Complexity Analysis",
  "Machine Learning Applications in Education",
  "Competitive Programming Pedagogy",
  "Software Engineering Best Practices",
  "Computer Science Education Research",
  "Data Structures Visualization",
];

const projects = [
  {
    title: "WayToCP",
    description:
      "Competitive programming solutions repository with 100+ problems covering DP, Greedy, Graph Algorithms, and advanced Data Structures in C++. Used as a teaching resource for peer mentoring.",
    tech: "C++, STL, Algorithm Design",
    link: "https://github.com/Imtius10/WayToCP",
  },
  {
    title: "BloodDonate",
    description:
      "Full-stack blood donation platform demonstrating software engineering principles: requirements analysis, database design, API development, authentication, and responsive UI.",
    tech: "React, Node.js, MongoDB, Firebase, Stripe",
    link: "https://bloodcare-savelife.netlify.app/",
  },
  {
    title: "PlateShare",
    description:
      "Food sharing application showcasing object-oriented design, real-time data management, and user workflow implementation. Used as a case study in software design courses.",
    tech: "React, Express.js, MongoDB, Firebase",
    link: "https://teal-puffpuff-841438.netlify.app/",
  },
];

export default function LecturerPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-blue-400">
              Imtius<span className="text-slate-400 font-normal">.academic</span>
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-blue-400 hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cv/lecturer"
                className="ml-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-400/80 text-white text-sm font-semibold rounded-lg border border-blue-400/20 transition-all"
              >
                Download CV
              </Link>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-white/5 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cv/lecturer"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-blue-400 hover:bg-white/5 transition-all"
              >
                Download CV
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-400/8 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8 animate-fade-in-up opacity-0">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-blue-400 text-sm font-medium">Seeking Lecturer Position</span>
          </div>

          <div className="mb-10 animate-fade-in-up opacity-0 delay-100">
            <div className="relative inline-block">
              <div className="w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-full overflow-hidden border-4 border-blue-400/40 shadow-2xl shadow-blue-500/30 animate-pulse-glow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile.jpg"
                  alt="Imtius Ahmad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl -z-10 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold shadow-lg shadow-blue-500/30">
                Available for Hire
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 animate-fade-in-up opacity-0 delay-200">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Imtius Ahmad</span>
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-300 mb-6 animate-fade-in-up opacity-0 delay-300">
            Aspiring Lecturer in Computer Science
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up opacity-0 delay-400">
            Recent BSc CSE graduate passionate about teaching{" "}
            <span className="text-blue-400 font-medium">Programming</span>,{" "}
            <span className="text-blue-400 font-medium">Data Structures</span>, and{" "}
            <span className="text-blue-400 font-medium">Algorithms</span>.
            Seeking a lecturer position to make CS accessible and engaging for all students.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <div className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-center hover:bg-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 animate-fade-in-up opacity-0 delay-200">
              <p className="text-3xl font-bold text-blue-400">3.55</p>
              <p className="text-xs text-slate-400">CGPA / 4.00</p>
            </div>
            <div className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-center hover:bg-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 animate-fade-in-up opacity-0 delay-300">
              <p className="text-3xl font-bold text-blue-400">14</p>
              <p className="text-xs text-slate-400">Teaching Areas</p>
            </div>
            <div className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-center hover:bg-blue-500/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 animate-fade-in-up opacity-0 delay-400">
              <p className="text-3xl font-bold text-blue-400">100+</p>
              <p className="text-xs text-slate-400">CP Solutions</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up opacity-0 delay-500">
            <a
              href="#teaching"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              View Teaching Areas
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-slate-300 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </div>

          <div className="flex gap-3 justify-center animate-fade-in-up opacity-0 delay-500">
            <a
              href="mailto:h.imtius10@gmail.com"
              className="p-3.5 bg-white/5 backdrop-blur-md hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/imtius10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/5 backdrop-blur-md hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Imtius10"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 bg-white/5 backdrop-blur-md hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <a
              href="/images/profile.jpg"
              download="Imtius-Ahmad.jpg"
              className="p-3.5 bg-white/5 backdrop-blur-md hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/30 rounded-xl text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>

          <a
            href="#about"
            className="inline-block mt-14 text-slate-400 hover:text-blue-400 transition-colors animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Left */}
              <div className="md:col-span-1 p-8 bg-white/5 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400/30 mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/profile.jpg"
                      alt="Imtius Ahmad"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Imtius Ahmad</h3>
                  <p className="text-blue-400 text-sm font-medium mb-6">Aspiring Lecturer, CSE</p>

                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 text-sm">Degree</span>
                      <span className="text-white font-semibold text-sm">BSc CSE</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 text-sm">CGPA</span>
                      <span className="text-white font-semibold text-sm">3.55/4.00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 text-sm">University</span>
                      <span className="text-white font-semibold text-sm">Netrokona (2021&ndash;)</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 text-sm">SSC/Dakhil</span>
                      <span className="text-white font-semibold text-sm">GPA 5.00 (2018)</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-slate-400 text-xs">Madrasah Board</span>
                      <span className="text-white font-semibold text-xs">Bogura</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-slate-400 text-sm">Status</span>
                      <span className="text-blue-400 font-semibold text-sm">Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="md:col-span-2 p-8">
                <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
                  Who I Am
                </p>
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    I&apos;m a <span className="text-white font-semibold">Computer Science graduate</span> with
                    a deep passion for teaching and mentoring. With a CGPA of 3.55/4.00 from Netrokona University,
                    I&apos;ve built a strong foundation in core CS subjects including programming, algorithms, and
                    system design.
                  </p>
                  <p>
                    My experience in <span className="text-white font-semibold">competitive programming</span> on
                    Codeforces has sharpened my problem-solving abilities, which I love sharing with students through
                    simplified explanations and practical examples.
                  </p>
                  <p>
                    I believe in <span className="text-blue-400 font-medium">project-based learning</span> — helping
                    students understand concepts by building real applications. I&apos;ve mentored peers in DSA,
                    programming fundamentals, and software development best practices.
                  </p>
                  <p>
                    I&apos;m seeking a <span className="text-white font-semibold">lecturer position</span> where I can
                    contribute to academic excellence while continuing to grow as an educator and researcher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Areas */}
      <section id="teaching" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Teaching <span className="text-blue-400">Areas</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Subjects I can teach with confidence and passion
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingAreas.map((area, index) => (
              <div
                key={area.title}
                className={`bg-gradient-to-br ${area.color} rounded-2xl p-6 border ${area.border} backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-fade-in-up opacity-0`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mb-4 ${area.text}`}>{area.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-3">{area.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {area.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${area.text} bg-white/5`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section id="research" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Research <span className="text-blue-400">Interests</span>
            </h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {researchInterests.map((interest) => (
              <div
                key={interest}
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-slate-300">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Projects */}
      <section id="projects" className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Academic <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Projects demonstrating software engineering principles and algorithmic expertise
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all duration-300"
              >
                <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <p className="text-blue-400 text-xs font-medium mb-4">{project.tech}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                >
                  View Project &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-slate-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Get in <span className="text-blue-400">Touch</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Looking for a lecturer position? Let&apos;s connect.
            </p>
            <div className="w-20 h-1 bg-blue-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-slate-400 text-sm">h.imtius10@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-slate-400 text-sm">+8801614742777</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">University</p>
                  <p className="text-slate-400 text-sm">Netrokona University, Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <a
                href="mailto:h.imtius10@gmail.com"
                className="block p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all text-center"
              >
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-white font-semibold">Send an Email</p>
                <p className="text-slate-400 text-sm mt-1">h.imtius10@gmail.com</p>
              </a>

              <a
                href="/cv/lecturer"
                className="block p-6 bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-500/30 hover:bg-blue-500/20 transition-all text-center"
              >
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <p className="text-white font-semibold">Download Full CV</p>
                <p className="text-slate-400 text-sm mt-1">PDF format, print-ready</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Imtius Ahmad. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
