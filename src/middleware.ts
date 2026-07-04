import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("dashboard-auth");
  const pathname = request.nextUrl.pathname;

  // Allow login page and auth API routes
  if (pathname === "/dashboard/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (authCookie?.value === "authenticated") {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/:path*"],
};