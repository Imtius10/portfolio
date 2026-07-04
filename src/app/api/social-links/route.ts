import { NextResponse } from "next/server";
import { mockProfile } from "@/lib/mockData";

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const links = await prisma.socialLink.findMany();
    return NextResponse.json(links);
  } catch {
    return NextResponse.json(mockProfile.socialLinks);
  }
}

export async function POST(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const link = await prisma.socialLink.create({
      data: {
        platform: body.platform,
        url: body.url,
        icon: body.icon,
        profileId: profile.id,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const body = await request.json();
    const link = await prisma.socialLink.update({
      where: { id: body.id },
      data: {
        platform: body.platform,
        url: body.url,
        icon: body.icon,
      },
    });
    return NextResponse.json(link);
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { prisma } = await import("@/lib/prisma");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    await prisma.socialLink.delete({ where: { id } });
    return NextResponse.json({ message: "Social link deleted" });
  } catch {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }
}
