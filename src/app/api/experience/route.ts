import { NextResponse } from "next/server";
import { mockProfile } from "@/lib/mockData";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const experience = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(experience);
  } catch {
    return NextResponse.json(mockProfile.experience);
  }
}

export async function POST(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const profile = await prisma.profile.findFirst();
    if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const exp = await prisma.experience.create({
      data: {
        company: body.company,
        position: body.position,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
        profileId: profile.id,
      },
    });
    return NextResponse.json(exp, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const exp = await prisma.experience.update({
      where: { id: body.id },
      data: {
        company: body.company,
        position: body.position,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        description: body.description,
      },
    });
    return NextResponse.json(exp);
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ message: "Experience deleted" });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}
