// @ts-nocheck
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      name: "Imtius Ahmad",
      designation: "Full Stack Developer",
      tagline:
        "Passionate about building web applications that make a difference. Currently pursuing CSE at Netrokona University.",
      bio: `I'm Imtius Ahmad, a Computer Science and Engineering student at Netrokona University with a deep passion for web development and problem-solving. My programming journey started with C++ and competitive programming, which sharpened my logical thinking and algorithmic skills.

Over time, I transitioned into full-stack web development, falling in love with the MERN stack (MongoDB, Express.js, React, Node.js). I enjoy building real-world applications that solve genuine problems — from blood donation platforms to food sharing systems.

Beyond coding, I'm an avid competitive programmer on platforms like Codeforces, where I regularly solve problems to keep my problem-solving skills sharp. I also enjoy exploring new technologies, contributing to open-source projects, and learning about system design.

When I'm not coding, you'll find me reading about technology trends, exploring new frameworks, or spending time with friends. I believe in continuous learning and am always looking for new challenges to grow as a developer.`,
      email: "imtiusahmad@gmail.com",
      phone: "+8801XXXXXXXXX",
      whatsapp: "+8801XXXXXXXXX",
      resumeUrl: null,
      photoUrl: "/images/profile.jpg",
    },
  });

  const frontendCategory = await prisma.skillCategory.create({
    data: { name: "Frontend" },
  });
  const backendCategory = await prisma.skillCategory.create({
    data: { name: "Backend" },
  });
  const languagesCategory = await prisma.skillCategory.create({
    data: { name: "Programming Languages" },
  });
  const toolsCategory = await prisma.skillCategory.create({
    data: { name: "Tools & Others" },
  });

  const skillsData = [
    { name: "React.js", level: 80, categoryId: frontendCategory.id },
    { name: "Tailwind CSS", level: 85, categoryId: frontendCategory.id },
    { name: "HTML5/CSS3", level: 90, categoryId: frontendCategory.id },
    { name: "JavaScript (ES6+)", level: 78, categoryId: frontendCategory.id },
    { name: "Node.js", level: 72, categoryId: backendCategory.id },
    { name: "Express.js", level: 70, categoryId: backendCategory.id },
    { name: "MongoDB", level: 75, categoryId: backendCategory.id },
    { name: "PostgreSQL", level: 60, categoryId: backendCategory.id },
    { name: "Firebase", level: 70, categoryId: backendCategory.id },
    { name: "C++", level: 75, categoryId: languagesCategory.id },
    { name: "Java", level: 55, categoryId: languagesCategory.id },
    { name: "Python", level: 50, categoryId: languagesCategory.id },
    { name: "Git & GitHub", level: 80, categoryId: toolsCategory.id },
    { name: "Vite", level: 75, categoryId: toolsCategory.id },
    { name: "Netlify", level: 70, categoryId: toolsCategory.id },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({
      data: { ...skill, profileId: profile.id },
    });
  }

  await prisma.education.create({
    data: {
      institution: "Netrokona University",
      degree: "Bachelor of Science",
      field: "Computer Science & Engineering",
      startDate: new Date("2023-01-01"),
      endDate: null,
      description:
        "Currently pursuing BSc in CSE. Actively involved in competitive programming, web development projects, and participating in coding contests on Codeforces.",
      profileId: profile.id,
    },
  });

  const projects = [
    {
      title: "BloodDonate",
      description:
        "A modern blood donation platform connecting donors with recipients through a clean, responsive interface for life-saving activities.",
      longDescription: `BloodDonate is a comprehensive web application designed to bridge the gap between blood donors and recipients. The platform focuses on accessibility, performance, and smooth user experience to support life-saving blood donation activities.

The application features secure Firebase authentication, role-based dashboards for donors and admins, and a powerful search system to find donors by blood group, district, and upazila. The UI is built with React and enhanced with Framer Motion animations for a smooth experience.

Stripe payment integration allows users to support the cause financially, while the responsive design ensures the platform works seamlessly across all devices.`,
      imageUrl: null,
      liveUrl: "https://bloodcare-savelife.netlify.app/",
      githubUrl: "https://github.com/Imtius10/Blood-donation-client",
      techStack: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Firebase Auth",
        "MongoDB",
        "Express.js",
        "Stripe",
      ],
      challenges:
        "Integrating Stripe payment gateway securely and implementing role-based access control with Firebase Authentication were significant challenges. Managing complex state for donor search filters across multiple districts also required careful architecture.",
      improvements:
        "Future plans include adding real-time blood availability tracking, SMS notifications for urgent requests, a mobile app version, and integration with local blood banks for automated inventory management.",
      featured: true,
    },
    {
      title: "PlateShare",
      description:
        "A surplus food sharing platform where people can donate extra food, request food, and help the community reduce waste.",
      longDescription: `PlateShare is a MERN + Firebase-based platform that connects food donors with those in need, helping communities reduce food waste while fighting hunger.

The platform allows users to donate surplus food, request food when needed, and manage donations through an intuitive dashboard. Firebase handles authentication (email/password + Google sign-in), while the backend uses Node.js, Express, and MongoDB Atlas for data persistence.

Features include food request management with accept/reject workflows, image uploads via imgbb, and beautiful animations using AOS and Framer Motion. The application is fully responsive and works smoothly on all devices.`,
      imageUrl: null,
      liveUrl: "https://teal-puffpuff-841438.netlify.app/",
      githubUrl: "https://github.com/Imtius10/PlateShare",
      techStack: [
        "React",
        "Tailwind CSS",
        "DaisyUI",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase Auth",
        "Framer Motion",
      ],
      challenges:
        "Building the food request workflow with accept/reject status management and real-time updates was complex. Ensuring data consistency when multiple users interacted with the same food listing required careful handling of concurrent operations.",
      improvements:
        "Plans include adding a location-based food finder using geolocation, implementing push notifications for new food requests, adding a rating system for donors, and building an admin dashboard for analytics.",
      featured: true,
    },
    {
      title: "GreenNest",
      description:
        "An indoor plant care store SPA for plant lovers to browse plants, view care guides, and book consultations with experts.",
      longDescription: `GreenNest is a single-page web application designed for indoor plant enthusiasts. Users can browse through a curated collection of plants, view detailed care guides, and book consultations with plant care experts.

The application features a beautiful hero slider with Swiper.js, plant cards with ratings and pricing, and protected routes for authenticated users. Firebase authentication provides secure login with email/password and Google sign-in options.

The profile management section allows users to update their display name and photo, with real-time updates reflected across the application. The minimalist design with Tailwind CSS creates an elegant browsing experience.`,
      imageUrl: null,
      liveUrl: "https://endearing-dolphin-0b6714.netlify.app/",
      githubUrl: "https://github.com/Imtius10/Indoor-Plant-Care-Store",
      techStack: [
        "React",
        "Tailwind CSS",
        "Firebase Auth",
        "Swiper.js",
        "React Router v6",
        "React Hot Toast",
      ],
      challenges:
        "Implementing real-time profile updates using Firebase's updateProfile() while maintaining consistent state across components was challenging. Creating smooth SPA navigation with protected routes and proper redirects also required careful implementation.",
      improvements:
        "Future enhancements include adding a plant health diagnosis feature using image recognition, an e-commerce module for purchasing plants, a community forum for plant enthusiasts, and integration with IoT devices for automated plant care reminders.",
      featured: true,
    },
    {
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
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: { ...project, profileId: profile.id },
    });
  }

  const socialLinks = [
    { platform: "GitHub", url: "https://github.com/Imtius10" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/imtiusahmad" },
    { platform: "Facebook", url: "https://www.facebook.com/" },
    { platform: "Instagram", url: "https://www.instagram.com/imti.us/" },
  ];

  for (const link of socialLinks) {
    await prisma.socialLink.create({
      data: { ...link, profileId: profile.id },
    });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
