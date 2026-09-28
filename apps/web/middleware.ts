import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Actual cookie name
  const token = request.cookies.get("accessToken")?.value;

  // No access token
  if (!token) {
    return NextResponse.redirect(
      new URL("/register", request.url)
    );
  }

  try {
    // Decode JWT payload
    const parts = token.split(".");

    if (parts.length !== 3) {
      return NextResponse.redirect(
        new URL("/register", request.url)
      );
    }

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8")
    );

    const role = payload.role;

    // =====================================================
    // ADMIN DASHBOARD
    // Only ADMIN can access these routes
    // =====================================================

    if (pathname.startsWith("/dashboard/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(
          new URL("/register", request.url)
        );
      }
    }

    // =====================================================
    // PUBLISHER ROUTE
    // =====================================================

    if (pathname.startsWith("/register/publisher")) {
      if (role !== "PUBLISHER") {
        return NextResponse.redirect(
          new URL("/register", request.url)
        );
      }
    }

    // =====================================================
    // ADVERTISER ROUTE
    // =====================================================

    if (pathname.startsWith("/register/advertiser")) {
      if (role !== "ADVERTISER") {
        return NextResponse.redirect(
          new URL("/register", request.url)
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid access token:", error);

    return NextResponse.redirect(
      new URL("/register", request.url)
    );
  }
}

export const config = {
  matcher: [
    "/dashboard/admin/:path*",
    "/register/publisher/:path*",
    "/register/advertiser/:path*",
  ],
};