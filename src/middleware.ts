import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/utils";

const managePaths = ["/manage"];
const userPaths = ["/Dashboard"];
const privatePaths = [...managePaths];
const unAuthPaths = ["/signin"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userToken = request.cookies.get("userToken")?.value;
  const isAuth = Boolean(request.cookies.get("userToken")?.value);
  if (privatePaths.some((path) => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuth) {
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { role } = decodeToken(userToken ?? "");

    // Restrict USER role from accessing managePaths
    if (
      role === "USER" &&
      managePaths.some((path) => pathname.startsWith(path))
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Restrict non-USER roles from accessing userPaths
  } else if (!isAuth && userPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/manage/:path*", "/:path*"],
};
