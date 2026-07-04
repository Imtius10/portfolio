import { NextResponse } from "next/server";
import { mockProfile } from "@/lib/mockData";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const education = await prisma.education.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(education);
  } catch {
    return NextResponse.json(mockProfile.education);
  }
}

export async function POST(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const profile = await prisma.profile.findFirst();
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const edu = await prisma.education.create({
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
        profileId: profile.id,
      },
    });
    return NextResponse.json(edu, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const edu = await prisma.education.update({
      where: { id: body.id },
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
      },
    });
    return NextResponse.json(edu);
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await prisma.education.delete({ where: { id } });
    return NextResponse.json({ message: "Education deleted" });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}
