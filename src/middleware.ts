import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Writes that must stay reachable without a dashboard session
const PUBLIC_WRITES = new Set(["/api/contact", "/api/auth/login", "/api/auth/logout"]);
const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("dashboard-auth");
  const pathname = request.nextUrl.pathname;
  const authed = authCookie?.value === "authenticated";

  // Allow login page and auth API routes
  if (pathname === "/dashboard/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Everything else under /api that mutates content needs a dashboard session
  if (
    pathname.startsWith("/api/") &&
    MUTATING.has(request.method) &&
    !PUBLIC_WRITES.has(pathname)
  ) {
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (authed) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/auth/:path*", "/api/:path*"],
};
