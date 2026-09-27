export interface LecturerProject {
  title: string;
  links: string[];
  description: string;
  stack: string;
}

export interface LecturerCvData {
  id?: string;
  headline: string;
  locationLine: string;
  objective: string;
  teachingAreas: string[];
  experience: string[];
  projects: LecturerProject[];
  skillsLanguages: string;
  skillsFrameworks: string;
  skillsDatabases: string;
  skillsTools: string;
  serviceLeadership: string[];
  languages: string[];
  updatedAt?: string;
}

// Default Lecturer CV content — the starting point for the dashboard editor
// and the fallback whenever the database is unavailable.
export const DEFAULT_LECTURER_CV: LecturerCvData = {
  headline: "Lecturer in Computer Science & Engineering",
  locationLine:
    "Dhaka, Bangladesh · BSc CSE (Netrokona University, CGPA 3.55/4.00 — exams completed, awaiting final result)",
  objective:
    "Dedicated and academically accomplished final-semester BSc graduate in Computer Science & Engineering (CGPA: 3.55/4.00; final examinations completed, awaiting results). Seeking a lecturer position to apply a solid academic background in programming, data structures and algorithms, operating systems, computer networks, and database management systems toward fostering student development and academic success. Experienced in peer tutoring, mentoring, and delivering clear, example-driven instruction grounded in project-based pedagogy. Committed to advancing academic excellence, meaningful student engagement, and applied research within a higher-education institution.",
  teachingAreas: [
    "Programming: C, C++, Java, Python, JavaScript, TypeScript",
    "Core CS: Data Structures, Algorithms, OS, Networks, DBMS",
    "Theory: Automata Theory, Compiler Design, Complexity Analysis",
    "Applied: OOP, Software Engineering, AI/ML, Cryptography",
    "Web: REST API Design, DB Modeling (Prisma/PostgreSQL), Auth & Payments",
    "Pedagogy: Project-based learning, Curriculum Development, Student Assessment, Research",
  ],
  experience: [
    "Peer Tutor (Netrokona University) — Guided juniors in DSA, C/C++ labs and exam preparation; simplified recursion, DP and graph topics with visual examples.",
    "Problem-Solving Mentor — Coached classmates on DP, greedy & graphs; ran hands-on debugging sessions and complexity analysis walkthroughs.",
    "Project Guide — Assisted 10+ course projects (requirements, schema design, API & UI review) and introduced version control & testing habits.",
  ],
  projects: [
    {
      title: "RentNest — Full-Stack Rental Marketplace",
      links: ["https://github.com/Imtius10/Rentora", "https://rentora-ecru.vercel.app"],
      description:
        "Software engineering case study: Prisma + PostgreSQL schema, JWT (httpOnly cookies) auth, Stripe Checkout + webhooks, role-based dashboards (Tenant/Landlord/Admin), Vercel deploy. Ideal for teaching DB design, REST, auth & payments.",
      stack: "Next.js 15, React 19, TypeScript, Prisma 7, PostgreSQL, Stripe, TanStack Query",
    },
    {
      title: "WayToCP — Algorithm Practice Repository",
      links: ["https://github.com/Imtius10/WayToCP"],
      description:
        "C++ collection for DP, greedy, graphs & data structures; used as peer-teaching material for complexity analysis and problem decomposition.",
      stack: "",
    },
    {
      title: "BloodDonate / PlateShare — MERN Case Studies",
      links: [
        "https://bloodcare-savelife.netlify.app/",
        "https://teal-puffpuff-841438.netlify.app/",
      ],
      description:
        "Illustrate OOP, workflow design and real-time data management — used to teach MVC, Firebase auth and responsive UI patterns.",
      stack: "",
    },
  ],
  skillsLanguages: "C, C++, Java, Python, JS/TS",
  skillsFrameworks: "React, Next.js, Node, Express",
  skillsDatabases: "PostgreSQL, MongoDB, Prisma ORM",
  skillsTools: "Git, GitHub, Vercel, Linux",
  serviceLeadership: [
    "Tour Manager — Logistics & budgeting for 70+ students & faculty",
    "Event Organizer — Tech events & academic programs, Netrokona Univ.",
    "Mentor — Daily DSA practice, debugging workshops",
  ],
  languages: [
    "Bangla — Native",
    "English — Professional",
    "Hindi — Conversational",
    "Urdu — Basic",
  ],
};
