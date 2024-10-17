import { getUserServerSession } from "@/lib/firebase/server-app";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { user } = await getUserServerSession();

  if (isAuthRoute(request.nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard/orders", request.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(request.nextUrl.pathname)) {
    if (user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Supports both a single value or an array of matches
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

function isAuthRoute(pathname: string) {
  return (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgotpassword") ||
    pathname.startsWith("/resetpassword")
  );
}

function isProtectedRoute(pathname: string) {
  return pathname.startsWith("/dashboard/settings");
}
