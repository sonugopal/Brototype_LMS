import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const url = new URL(req.url, "http://localhost:3000");

  const publicRoutes = ['/sign-up', '/sign-in', '/forgot-pass'];

  if (publicRoutes.includes(url.pathname)) {
    return 
  }
}