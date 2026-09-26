import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FIELDS = [
  "headline",
  "locationLine",
  "summary",
  "skillsFrontend",
  "skillsBackend",
  "skillsDatabase",
  "skillsLanguages",
  "skillsTools",
  "skillsConcepts",
  "bachelorNote",
  "cgpaText",
  "activities",
  "languages",
] as const;

function pick(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const f of FIELDS) {
    if (body[f] !== undefined) data[f] = body[f];
  }
  if (!Array.isArray(data.activities)) delete data.activities;
  if (!Array.isArray(data.languages)) delete data.languages;
  return data;
}

export async function GET() {
  try {
    const cv = await prisma.cvContent.findFirst();
    if (!cv) {
      return NextResponse.json({ error: "CV content not found" }, { status: 404 });
    }
    return NextResponse.json(cv);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch CV content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = pick(body);
    const existing = await prisma.cvContent.findFirst();

    const saved = existing
      ? await prisma.cvContent.update({ where: { id: existing.id }, data })
      : await prisma.cvContent.create({ data });

    return NextResponse.json(saved);
  } catch {
    return NextResponse.json(
      { error: "Failed to save CV content" },
      { status: 500 }
    );
  }
}
