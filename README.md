# Imtius Ahmad — Portfolio

> Full Stack Developer specializing in Next.js, TypeScript, and PostgreSQL.

[![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-two-kohl-35.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Imtius10)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/imtius10)

---

## Overview

A modern, responsive portfolio built with the Next.js App Router. Features server-side rendering, a PostgreSQL database via Prisma ORM, and a protected admin dashboard for content management.

**Live:** [portfolio-two-kohl-35.vercel.app](https://portfolio-two-kohl-35.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | PostgreSQL (Prisma Postgres) |
| **ORM** | Prisma |
| **Auth** | Cookie-based middleware |
| **Deployment** | Vercel |
| **Icons** | Lucide React |

---

## Features

- **Responsive Design** — Mobile, tablet, and desktop optimized
- **Server-Side Rendering** — Dynamic pages with Next.js server components
- **Typing Animation** — Hero section with animated text
- **Skills Visualization** — Categorized skill cards with progress indicators
- **Project Showcase** — Detail pages with tech stack, challenges, and live links
- **Admin Dashboard** — Protected route for managing portfolio content
- **Database Fallback** — Works with mock data when database is unavailable

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Imtius10/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
DASHBOARD_USERNAME="your-username"
DASHBOARD_PASSWORD="your-password"
```

---

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Admin dashboard
│   │   ├── projects/     # Project detail pages
│   │   └── resume/       # Resume page
│   ├── components/       # React components
│   ├── lib/              # Utilities, types, Prisma client
│   └── middleware.ts     # Auth middleware
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
└── public/               # Static assets
```

---

## Deployment

```bash
vercel --prod
```

---

## Author

**Imtius Ahmad**
- GitHub: [Imtius10](https://github.com/Imtius10)
- LinkedIn: [imtius10](https://linkedin.com/in/imtius10)
- Email: h.imtius10@gmail.com

---

## License

MIT