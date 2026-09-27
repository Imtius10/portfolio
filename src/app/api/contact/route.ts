import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const AUTH_COOKIE = "dashboard-auth";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function isDashboardAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "authenticated";
}

function field(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function notifyByEmail(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_NOTIFY_FROM || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: input.email,
        subject: `[Portfolio contact] ${input.subject || "New message"} — ${input.name}`,
        text: `From: ${input.name} <${input.email}>\nSubject: ${input.subject}\n\n${input.message}\n\n---\nReply directly to this email to reach ${input.name}.`,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("Contact email failed:", res.status, await res.text());
    }
    return res.ok;
  } catch (error) {
    console.error("Contact email failed:", error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = field(body.name, 120);
    const email = field(body.email, 254);
    const subject = field(body.subject, 200);
    const message = field(body.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let saved = false;
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.contactMessage.create({
        data: { name, email, subject, message },
      });
      saved = true;
    } catch (error) {
      console.error("Contact message could not be stored:", error);
    }

    const emailed = await notifyByEmail({ name, email, subject, message });

    if (saved || emailed) {
      return NextResponse.json({ message: "Message sent successfully!" }, { status: 201 });
    }

    console.log("=== Contact message lost ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("============================");

    return NextResponse.json(
      { error: "Your message could not be delivered. Please email h.imtius10@gmail.com instead." },
      { status: 503 }
    );
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
  if (!(await isDashboardAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
