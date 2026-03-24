import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect Admin Routes
  if (pathname.startsWith('/admin')) {
    const role = (token as any)?.role;
    if (!token || !['admin', 'editor', 'viewer'].includes(role)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Protect Checkout & Profile Routes
  if (pathname.startsWith('/checkout') || pathname.startsWith('/profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/profile/:path*'],
};
