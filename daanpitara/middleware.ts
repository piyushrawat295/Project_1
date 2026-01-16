import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // 1. Define protected routes
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  // const isNgoRoute = pathname.startsWith('/dashboard/ngo-profile');
  const isCallerRoute = pathname.startsWith('/caller/dashboard'); // Assuming requirement mentioned checking this

  if (isAdminRoute || isCallerRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    const role = token.role;

    if (isAdminRoute && role !== 'admin') {
       return NextResponse.redirect(new URL('/', request.url)); // Or unauthorized page
    }


    
    if (isCallerRoute && role !== 'caller_agent') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/caller/dashboard/:path*'],
};
