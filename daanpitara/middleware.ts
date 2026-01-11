import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET || 'secret-key-change-me';
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  // 1. Define protected routes
  const isAdminRoute = pathname.startsWith('/dashboard/admin');
  const isNgoRoute = pathname.startsWith('/dashboard/ngo');

  if (isAdminRoute || isNgoRoute) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    try {
      const { payload } = await jwtVerify(sessionCookie, encodedKey, {
        algorithms: ['HS256'],
      });

      const role = payload.role as string;

      if (isAdminRoute && role !== 'admin') {
         return NextResponse.redirect(new URL('/signin', request.url));
      }

      if (isNgoRoute && role !== 'ngo') {
         // Maybe redirect to their own dashboard or authorized page?
         // For strictness, redirect to signin or home.
         // If an Admin tries to access NGO dashboard, strictly speaking they shouldn't, but maybe admins have access?
         // User requirement: "/dashboard/ngo -> NGO only"
         return NextResponse.redirect(new URL('/signin', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Middleware session verification failed:', error);
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
