import { NextResponse } from "next/server";

// Demo accounts are browser sessions, not server authorization. Account pages
// handle their own session UX; the middleware only sets basic response headers.
export function middleware() {
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
