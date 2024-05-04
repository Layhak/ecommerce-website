import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // console.log('========| Middleware Running |========');
  // console.log('=> Request URL: ', request.url);
  // console.log('=> Request Method: ', request.method);
  const cookies = request.cookies;
  const session = cookies.get('authjs.session-token');
  // console.log('=> Session: ', session);

  // Check if the user is trying to access /login or /register
  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register'
  ) {
    // If there is a session, redirect them away from /login or /register
    if (session) {
      return NextResponse.redirect(new URL('/', request.url).toString()); // Redirect to home page or another appropriate page
    }
  }
  if (request.nextUrl.pathname === '/my-shop') {
    // If there is no session, redirect them away from /my-shop
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url).toString());
    }
  }
  // // Existing logic to redirect unauthenticated users
  // if (!session) {
  //   return NextResponse.redirect(new URL('/', request.url).toString());
  // }

  // Continue processing the request if the user is authenticated and not trying to access /login or /register
  return NextResponse.next();
}

// multiple middleware
export const config = {
  matchers: ['/my-shop', '/login', '/register'],
};
