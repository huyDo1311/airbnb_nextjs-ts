import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const privatePaths = ['/manage']
const unAuthPaths = ['/signin']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const isAuth = Boolean(request.cookies.get('userToken')?.value);
  if(privatePaths.some(path => pathname.startsWith(path)) && !isAuth){
    return NextResponse.redirect(new URL('/', request.url));
  }
  if(unAuthPaths.some(path => pathname.startsWith(path)) && isAuth){
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/manage/:path*','/signin']
}
