export interface CvContentData {
  id?: string;
  headline: string;
  locationLine: string;
  summary: string;
  skillsFrontend: string;
  skillsBackend: string;
  skillsDatabase: string;
  skillsLanguages: string;
  skillsTools: string;
  skillsConcepts: string;
  bachelorNote: string;
  cgpaText: string;
  activities: string[];
  languages: string[];
  updatedAt?: string;
}

// Default CV content — mirrors the resume page. Used as the form starting
// point and as the fallback when the database is unavailable.
export const DEFAULT_CV: CvContentData = {
  headline: "Full Stack Developer · Next.js · TypeScript · PostgreSQL",
  locationLine:
    "Bogura, Bangladesh · Available for full-time · Remote / On-site · Open to relocation",
  summary:
    "Results-driven Full-Stack Developer with hands-on experience designing, building, and deploying production-grade web applications using Next.js 15, React 19, TypeScript, PostgreSQL, and Prisma. Developed five end-to-end projects, including RentNest, a role-based rental marketplace with JWT authentication, Stripe payment processing, and advanced search and filtering. Skilled in RESTful API design, relational database modeling, application debugging, responsive UI development, and automated test case authoring. Proficient across the full software development lifecycle — from data schema design and backend integration to continuous deployment on Vercel.",
  skillsFrontend:
    "React, Next.js 15, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query",
  skillsBackend:
    "Node.js, Express 5, REST API, JWT (access+refresh), Stripe Checkout",
  skillsDatabase: "PostgreSQL (Neon), Prisma 7, MongoDB, Firebase",
  skillsLanguages: "TypeScript, JavaScript (ES6+), C++, Python, Java",
  skillsTools: "Git/GitHub, Vercel, Netlify, Vite, VS Code, Linux",
  skillsConcepts: "DSA, OOP, REST API, Testing, Debugging, Responsive Design",
  bachelorNote:
    "Exams completed — awaiting final result. Coursework: DSA, OOP, Operating Systems, Networks, DBMS, Compiler, AI/ML.",
  cgpaText: "CGPA 3.55 / 4.00",
  activities: [
    "University Tour Manager — Logistics, budgeting & coordination for 70+ students & faculty",
    "Event Organizer — Planned departmental tech events & academic programs at Netrokona University",
    "Mentor — Guided juniors on DSA, debugging & course projects; daily algorithm practice",
  ],
  languages: [
    "Bangla — Native",
    "English — Professional",
    "Hindi — Conversational",
    "Urdu — Basic",
  ],
};
