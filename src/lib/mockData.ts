import { ProfileData } from "@/lib/types";

export const mockProfile: ProfileData = {
  id: "mock-1",
  name: "Imtius Ahmad",
  designation: "Full Stack Developer",
  tagline:
    "Building modern web apps with Next.js, TypeScript, and PostgreSQL. Currently pursuing CSE at Netrokona University.",
  bio: `I'm Imtius Ahmad, a full-stack developer and Computer Science student at Netrokona University. I specialize in building modern web applications using Next.js, TypeScript, PostgreSQL, and the MERN stack.

My programming journey started with C++ and competitive programming on Codeforces, which gave me a strong foundation in algorithms and data structures. That problem-solving mindset carries into everything I build — from designing database schemas to architecting API routes.

I'm currently working with Next.js App Router, server components, Prisma ORM, and PostgreSQL to build production-ready applications. I enjoy the full cycle of shipping software: designing the data model, writing typed backend logic, crafting responsive UIs, and deploying to production.

When I'm not coding, you'll find me solving algorithmic problems, exploring new frameworks, or reading about system design. I believe in continuous learning and am always looking for new challenges to grow as a developer.`,
  email: "h.imtius10@gmail.com",
  phone: "+8801614742777",
  whatsapp: "+8801614742777",
  resumeUrl: null,
  photoUrl: "/images/profile.jpg",
  socialLinks: [
    { id: "sl-1", platform: "GitHub", url: "https://github.com/Imtius10", icon: null },
    { id: "sl-2", platform: "LinkedIn", url: "https://www.linkedin.com/in/imtius10/", icon: null },
    { id: "sl-3", platform: "Facebook", url: "https://www.facebook.com/", icon: null },
    { id: "sl-4", platform: "Instagram", url: "https://www.instagram.com/imti.us/", icon: null },
    { id: "sl-5", platform: "Twitter", url: "https://x.com/imtius__ahmad", icon: null },
  ],
  skills: [
    // Frontend
    { id: "sk-1", name: "React.js", level: 80, icon: null, category: { id: "cat-1", name: "Frontend" } },
    { id: "sk-1b", name: "Next.js", level: 82, icon: null, category: { id: "cat-1", name: "Frontend" } },
    { id: "sk-2", name: "Tailwind CSS", level: 85, icon: null, category: { id: "cat-1", name: "Frontend" } },
    { id: "sk-3", name: "HTML5/CSS3", level: 90, icon: null, category: { id: "cat-1", name: "Frontend" } },
    { id: "sk-4", name: "JavaScript (ES6+)", level: 78, icon: null, category: { id: "cat-1", name: "Frontend" } },
    // Backend
    { id: "sk-5", name: "Node.js", level: 72, icon: null, category: { id: "cat-2", name: "Backend" } },
    { id: "sk-6", name: "Express.js", level: 70, icon: null, category: { id: "cat-2", name: "Backend" } },
    { id: "sk-7", name: "MongoDB", level: 75, icon: null, category: { id: "cat-2", name: "Backend" } },
    { id: "sk-8", name: "PostgreSQL", level: 78, icon: null, category: { id: "cat-2", name: "Backend" } },
    { id: "sk-8b", name: "Prisma ORM", level: 80, icon: null, category: { id: "cat-2", name: "Backend" } },
    { id: "sk-9", name: "Firebase", level: 70, icon: null, category: { id: "cat-2", name: "Backend" } },
    // Programming Languages
    { id: "sk-10", name: "TypeScript", level: 78, icon: null, category: { id: "cat-3", name: "Programming Languages" } },
    { id: "sk-10b", name: "C++", level: 75, icon: null, category: { id: "cat-3", name: "Programming Languages" } },
    { id: "sk-11", name: "Java", level: 55, icon: null, category: { id: "cat-3", name: "Programming Languages" } },
    { id: "sk-12", name: "Python", level: 50, icon: null, category: { id: "cat-3", name: "Programming Languages" } },
    // Tools & Others
    { id: "sk-13", name: "Git & GitHub", level: 80, icon: null, category: { id: "cat-4", name: "Tools & Others" } },
    { id: "sk-14", name: "Vite", level: 75, icon: null, category: { id: "cat-4", name: "Tools & Others" } },
    { id: "sk-15", name: "Netlify", level: 70, icon: null, category: { id: "cat-4", name: "Tools & Others" } },
    // Leadership & Organization
    { id: "sk-16", name: "Event Management", level: 80, icon: null, category: { id: "cat-5", name: "Leadership & Organization" } },
    { id: "sk-17", name: "Team Coordination", level: 85, icon: null, category: { id: "cat-5", name: "Leadership & Organization" } },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Netrokona University",
      degree: "Bachelor of Science",
      field: "Computer Science & Engineering",
      startDate: new Date("2020-01-01"),
      endDate: null,
      description:
        "Currently pursuing BSc in CSE (2020-21 session). CGPA 3.55/4.00. Actively involved in competitive programming, full-stack web development with Next.js and PostgreSQL.",
    },
    {
      id: "edu-2",
      institution: "Bogura Government College",
      degree: "Higher Secondary Certificate (HSC)",
      field: "Science",
      startDate: new Date("2018-01-01"),
      endDate: new Date("2020-01-01"),
      description:
        "Completed HSC with GPA 5.00/5.00 from Rajshahi Board.",
    },
    {
      id: "edu-3",
      institution: "Mustafabia Alia Madrasha",
      degree: "Secondary School Certificate (SSC) / Dakhil",
      field: "Science",
      startDate: new Date("2016-01-01"),
      endDate: new Date("2018-01-01"),
      description:
        "Completed SSC/Dakhil with GPA 5.00/5.00 from Madrasha Board.",
    },
  ],
  experience: [],
  projects: [
    {
      id: "proj-1",
      title: "BloodDonate",
      description:
        "A modern blood donation platform connecting donors with recipients through a clean, responsive interface for life-saving activities.",
      longDescription: `BloodDonate is a comprehensive web application designed to bridge the gap between blood donors and recipients. The platform focuses on accessibility, performance, and smooth user experience to support life-saving blood donation activities.

The application features secure Firebase authentication, role-based dashboards for donors and admins, and a powerful search system to find donors by blood group, district, and upazila. The UI is built with React and enhanced with Framer Motion animations for a smooth experience.

Stripe payment integration allows users to support the cause financially, while the responsive design ensures the platform works seamlessly across all devices.`,
      imageUrl: null,
      liveUrl: "https://bloodcare-savelife.netlify.app/",
      githubUrl: "https://github.com/Imtius10/Blood-donation-client",
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Firebase Auth", "MongoDB", "Express.js", "Stripe"],
      challenges:
        "Integrating Stripe payment gateway securely and implementing role-based access control with Firebase Authentication were significant challenges. Managing complex state for donor search filters across multiple districts also required careful architecture.",
      improvements:
        "Future plans include adding real-time blood availability tracking, SMS notifications for urgent requests, a mobile app version, and integration with local blood banks for automated inventory management.",
      featured: true,
      images: [],
    },
    {
      id: "proj-2",
      title: "PlateShare",
      description:
        "A surplus food sharing platform where people can donate extra food, request food, and help the community reduce waste.",
      longDescription: `PlateShare is a MERN + Firebase-based platform that connects food donors with those in need, helping communities reduce food waste while fighting hunger.

The platform allows users to donate surplus food, request food when needed, and manage donations through an intuitive dashboard. Firebase handles authentication (email/password + Google sign-in), while the backend uses Node.js, Express, and MongoDB Atlas for data persistence.

Features include food request management with accept/reject workflows, image uploads via imgbb, and beautiful animations using AOS and Framer Motion. The application is fully responsive and works smoothly on all devices.`,
      imageUrl: null,
      liveUrl: "https://teal-puffpuff-841438.netlify.app/",
      githubUrl: "https://github.com/Imtius10/PlateShare",
      techStack: ["React", "Tailwind CSS", "DaisyUI", "Node.js", "Express.js", "MongoDB", "Firebase Auth", "Framer Motion"],
      challenges:
        "Building the food request workflow with accept/reject status management and real-time updates was complex. Ensuring data consistency when multiple users interacted with the same food listing required careful handling of concurrent operations.",
      improvements:
        "Plans include adding a location-based food finder using geolocation, implementing push notifications for new food requests, adding a rating system for donors, and building an admin dashboard for analytics.",
      featured: true,
      images: [],
    },
    {
      id: "proj-3",
      title: "GreenNest",
      description:
        "An indoor plant care store SPA for plant lovers to browse plants, view care guides, and book consultations with experts.",
      longDescription: `GreenNest is a single-page web application designed for indoor plant enthusiasts. Users can browse through a curated collection of plants, view detailed care guides, and book consultations with plant care experts.

The application features a beautiful hero slider with Swiper.js, plant cards with ratings and pricing, and protected routes for authenticated users. Firebase authentication provides secure login with email/password and Google sign-in options.

The profile management section allows users to update their display name and photo, with real-time updates reflected across the application. The minimalist design with Tailwind CSS creates an elegant browsing experience.`,
      imageUrl: null,
      liveUrl: "https://endearing-dolphin-0b6714.netlify.app/",
      githubUrl: "https://github.com/Imtius10/Indoor-Plant-Care-Store",
      techStack: ["React", "Tailwind CSS", "Firebase Auth", "Swiper.js", "React Router v6", "React Hot Toast"],
      challenges:
        "Implementing real-time profile updates using Firebase's updateProfile() while maintaining consistent state across components was challenging. Creating smooth SPA navigation with protected routes and proper redirects also required careful implementation.",
      improvements:
        "Future enhancements include adding a plant health diagnosis feature using image recognition, an e-commerce module for purchasing plants, a community forum for plant enthusiasts, and integration with IoT devices for automated plant care reminders.",
      featured: true,
      images: [],
    },
    {
      id: "proj-4",
      title: "WayToCP",
      description:
        "A collection of competitive programming solutions in C++, showcasing algorithmic problem-solving skills on Codeforces.",
      longDescription: `WayToCP is a repository containing solutions to various competitive programming problems from Codeforces and other online judges. The solutions are written in C++ and cover a wide range of algorithmic topics including data structures, dynamic programming, greedy algorithms, and more.

The repository demonstrates strong problem-solving abilities and understanding of algorithms and data structures. Each solution is well-organized by problem number for easy reference and learning.`,
      imageUrl: null,
      liveUrl: null,
      githubUrl: "https://github.com/Imtius10/WayToCP",
      techStack: ["C++", "STL", "Competitive Programming"],
      challenges:
        "Solving problems within strict time and memory limits requires deep understanding of algorithm optimization. Some problems demanded creative approaches and combination of multiple algorithmic techniques.",
      improvements:
        "Continuously adding solutions for new problems. Plans include adding detailed explanations and complexity analysis for each solution, and creating a companion blog with tutorials on common CP patterns.",
      featured: false,
      images: [],
    },
  ],
};
