import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import {
  dashboardRoutes,
  frontAuthRoutes,
} from "./lib/routes/navigationRoutes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname === frontAuthRoutes.signIn()) {
    return NextResponse.redirect(
      new URL(dashboardRoutes.dashboard(), request.url),
    );
  }

  if (!token && pathname?.startsWith(dashboardRoutes.dashboard())) {
    return NextResponse.redirect(
      new URL(frontAuthRoutes.signIn(), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/dashboard/:path*"],
};
