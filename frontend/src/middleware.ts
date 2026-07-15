import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JWTPayload {
  sub: string;
  email: string;
  role: "student" | "admin";
  firstName: string;
  lastName: string;
  isVerified: boolean;
  iat: number;
  exp: number;
}

function parseJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // Edge runtime compatible base64 decode
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const jsonPayload = new TextDecoder().decode(bytes);
    return JSON.parse(jsonPayload) as JWTPayload;
  } catch {
    return null;
  }
}

function isExpired(payload: JWTPayload): boolean {
  return payload.exp * 1000 < Date.now();
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check protected routes
  const isStudentRoute =
    pathname.startsWith("/student") ||
    pathname.startsWith("/(dashboard)/student");
  const isAdminRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/(dashboard)/admin");

  if (!isStudentRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // Read token from cookie
  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("access_token")?.value;

  // No token — redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const payload = parseJWT(token);

  // Invalid or expired token
  if (!payload || isExpired(payload)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    loginUrl.searchParams.set("expired", "true");
    const response = NextResponse.redirect(loginUrl);
    // Clear invalid cookies
    response.cookies.delete("auth_token");
    response.cookies.delete("token");
    response.cookies.delete("access_token");
    return response;
  }

  // Admin route — require admin role
  if (isAdminRoute && payload.role !== "admin") {
    // Redirect non-admin users to student dashboard
    return NextResponse.redirect(new URL("/student", request.url));
  }

  // Student route — admin can also access (optional: restrict if needed)
  // If you want to restrict admins from student routes, uncomment:
  // if (isStudentRoute && payload.role !== "student") {
  //   return NextResponse.redirect(new URL("/admin", request.url));
  // }

  // Attach user info to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.sub);
  requestHeaders.set("x-user-email", payload.email);
  requestHeaders.set("x-user-role", payload.role);
  requestHeaders.set("x-user-name", `${payload.firstName} ${payload.lastName}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/(dashboard)/student/:path*",
    "/(dashboard)/admin/:path*",
  ],
};
