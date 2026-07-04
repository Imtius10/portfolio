import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DASHBOARD_USERNAME = process.env.DASHBOARD_USERNAME || "imtius";
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "imtius2024";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === DASHBOARD_USERNAME && password === DASHBOARD_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("dashboard-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}