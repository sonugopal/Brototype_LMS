import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const url = new URL(req.url, process.env.BASE_URL);
  const session = req.cookies.get('next-auth.session-token')
  const publicRoutes = ['/sign-up', '/sign-in', '/forgot-pass'];

  if (session && publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(`${process.env.BASE_URL}/`)
  }
}