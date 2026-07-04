import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Try to save to database
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.contactMessage.create({
        data: {
          name: body.name,
          email: body.email,
          subject: body.subject,
          message: body.message,
        },
      });
      return NextResponse.json(
        { message: "Message sent successfully!" },
        { status: 201 }
      );
    } catch {
      // Database not available - just log it
      console.log("=== New Contact Message ===");
      console.log("Name:", body.name);
      console.log("Email:", body.email);
      console.log("Subject:", body.subject);
      console.log("Message:", body.message);
      console.log("===========================");
      return NextResponse.json(
        { message: "Message received! (Database not connected)" },
        { status: 201 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { prisma } = await import("@/lib/prisma");
    const message = await prisma.contactMessage.update({
      where: { id: body.id },
      data: { read: body.read },
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    const { prisma } = await import("@/lib/prisma");
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ message: "Message deleted" });
  } catch {
    return NextResponse.json({ error: "Database not available" }, { status: 503 });
  }
}
