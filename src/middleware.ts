// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Prevent redirect loop for /construction itself
  if (url.pathname === "/construction") {
    return NextResponse.next();
  }

  // Redirect all other paths to /construction
  url.pathname = "/construction";
  return NextResponse.redirect(url);
}

// Apply to all routes except Next.js internals and /construction
export const config = {
  matcher: ["/((?!_next|favicon.ico|construction).*)"],
};