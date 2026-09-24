// @ts-nocheck
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const createdAtByTitle: Record<string, Date> = {
  WayToCP: new Date("2023-01-01"),
  GreenNest: new Date("2023-06-01"),
  PlateShare: new Date("2023-11-01"),
  BloodDonate: new Date("2024-03-01"),
  RentNest: new Date("2026-09-20"),
};

const rentNest = {
  title: "RentNest",
  description:
    "Full-stack rental property marketplace for Bangladesh — browse verified listings, submit rental requests, and manage approvals & payments in one seamless platform.",
  longDescription: `RentNest (Rentora) is a full-stack rental property marketplace for Bangladesh. Browse verified listings, submit rental requests, and manage approvals & payments — all from one seamless platform.

Frontend: Next.js 15 (App Router), React 19, Tailwind CSS 4, shadcn/ui, TanStack Query — with auto-scrolling category explorer, testimonial carousel, and blazing-fast cached UI. Backend: Node.js, Express 5, TypeScript 7, Prisma 7 (PrismaPg adapter) • PostgreSQL (Neon) • JWT (access + refresh, httpOnly cookies) • Stripe Checkout • deployed on Vercel (frontend + serverless backend).

Highlights by role:
• Tenant — Browse & search listings, submit rental requests, pay via Stripe once approved, track payment history with live status, rate your rental.
• Landlord — Publish & manage listings (create / edit / archive / delete), approve or reject tenants in one click, track rent & reviews, see every renter and history.
• Admin — Platform-wide analytics (users, properties & requests), ban/unban users & reassign roles, watch every listing, request and payment.

Search & filter by location, price range and property type (apartment · studio · house · condo · penthouse · villa · more). Rich property detail pages with category visuals & landlord info. Repository layout: Module_4_Frontend (Next.js) + Module_4 (Express + Prisma).

Demo accounts — Admin: admin@rentnest.com / admin123 · Landlord: imtius1@example.com / 12345678 · Tenant: tanvir@tenant.com / 123456.
Live: rentora-ecru.vercel.app · API: rent-nest-api-seven.vercel.app · GitHub: github.com/Imtius10/Rentora`,
  imageUrl: null,
  liveUrl: "https://rentora-ecru.vercel.app",
  githubUrl: "https://github.com/Imtius10/Rentora",
  techStack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "Tailwind CSS 4",
    "shadcn/ui",
    "Express 5",
    "Prisma 7",
    "PostgreSQL",
    "Stripe",
    "Vercel",
    "TanStack Query",
    "JWT",
  ],
  challenges:
    "Designing role-based flows (tenant / landlord / admin) with JWT access + refresh tokens (httpOnly cookies) and secure route protection, while keeping auth cookies same-origin via Next.js rewrites (/api/* proxy → rent-nest-api-seven.vercel.app). Implementing Stripe Checkout + webhook verification, and building advanced search/filter (location, price range, property type) with Prisma + TanStack Query caching without over-fetching.",
  improvements:
    "Add real-time notifications for request updates, richer analytics dashboards, saved-search alerts, and automated rent reminders. Expand image optimization (Next Image), add E2E tests for checkout/webhook, and improve accessibility & lighthouse scores.",
  featured: true,
  createdAt: createdAtByTitle.RentNest,
};

async function main() {
  const profile = await prisma.profile.findFirst();
  if (!profile) {
    console.log("No profile found — skipping project ensure");
    return;
  }

  const existing = await prisma.project.findMany({ select: { id: true, title: true } });
  const byTitle = new Map(existing.map((p) => [p.title, p.id]));

  if (!byTitle.has("RentNest")) {
    await prisma.project.create({
      data: { ...rentNest, profileId: profile.id },
    });
    console.log("Created RentNest project");
  } else {
    console.log("RentNest already exists");
  }

  const all = await prisma.project.findMany({ select: { id: true, title: true } });
  for (const p of all) {
    const createdAt = createdAtByTitle[p.title];
    if (createdAt) {
      await prisma.project.update({
        where: { id: p.id },
        data: { createdAt },
      });
    }
  }
  console.log("Project createdAt ordering ensured (latest first)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
