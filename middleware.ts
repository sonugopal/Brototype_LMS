import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('oursitejwt');
  const url = new URL(req.url, "http://localhost:3000");

  const publicRoutes = ['/sign-up', '/sign-in', '/forgot-pass'];

  if (verify && publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect('http://localhost:3000/');
  }
}