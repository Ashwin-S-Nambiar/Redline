import { NextResponse } from 'next/server';
import { COOKIE, verify } from './lib/session';

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  const session = await verify(request.cookies.get(COOKIE)?.value);
  if (session) return NextResponse.next();
  const url = new URL('/admin/login', request.url);
  if (pathname !== '/admin') url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
