import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import {
  dashboardRoutes,
  frontAuthRoutes,
} from "./lib/routes/navigationRoutes";
import { routing } from "./app/i18n/routing";

const intlMiddleware = createMiddleware(routing);

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

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Everything else goes through next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
