import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        socialLinks: true,
        skills: { include: { category: true } },
        education: true,
        experience: true,
        projects: { include: { images: true } },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: {
        name: body.name,
        designation: body.designation,
        tagline: body.tagline,
        bio: body.bio,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        resumeUrl: body.resumeUrl,
        photoUrl: body.photoUrl,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
