import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Use a dummy URL at build time so `next build` doesn't crash when
  // DATABASE_URL isn't set. No connection is made until the first query,
  // and all callers handle DB errors (falling back to mock data).
  const connectionString =
    process.env.DATABASE_URL ?? "postgresql://localhost:5432/portfolio_build";
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
