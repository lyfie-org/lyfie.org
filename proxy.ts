import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STATIC_FILE_PATTERN = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    STATIC_FILE_PATTERN.test(pathname)
  ) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = "/";

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: "/:path*"
};
