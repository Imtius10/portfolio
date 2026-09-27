import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FIELDS = [
  "headline",
  "locationLine",
  "objective",
  "teachingAreas",
  "experience",
  "projects",
  "skillsLanguages",
  "skillsFrameworks",
  "skillsDatabases",
  "skillsTools",
  "serviceLeadership",
  "languages",
] as const;

const ARRAY_FIELDS = [
  "teachingAreas",
  "experience",
  "serviceLeadership",
  "languages",
] as const;

function pick(body: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const f of FIELDS) {
    if (body[f] !== undefined) data[f] = body[f];
  }
  for (const f of ARRAY_FIELDS) {
    if (!Array.isArray(data[f])) delete data[f];
  }
  if (!Array.isArray(data.projects)) delete data.projects;
  return data;
}

export async function GET() {
  try {
    const cv = await prisma.lecturerCvContent.findFirst();
    if (!cv) {
      return NextResponse.json({ error: "Lecturer CV content not found" }, { status: 404 });
    }
    return NextResponse.json(cv);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch lecturer CV content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = pick(body);
    const existing = await prisma.lecturerCvContent.findFirst();

    const saved = existing
      ? await prisma.lecturerCvContent.update({ where: { id: existing.id }, data })
      : await prisma.lecturerCvContent.create({ data });

    return NextResponse.json(saved);
  } catch {
    return NextResponse.json(
      { error: "Failed to save lecturer CV content" },
      { status: 500 }
    );
  }
}
