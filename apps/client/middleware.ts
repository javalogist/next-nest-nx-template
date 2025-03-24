import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // ✅ Get token from cookies
  const token = request.cookies.get('access_token')?.value;

  // 🎯 Get the current path from the request
  const path = request.nextUrl.pathname;
  if (
    path.startsWith('/_next/') || // Next.js static files
    path.startsWith('/api/') || // API routes
    path.endsWith('.ico') || // Favicon
    path.endsWith('.png') || // Images
    path.endsWith('.jpg') || // Images
    path.endsWith('.css') || // CSS
    path.endsWith('.js') // JS files
  ) {
    return NextResponse.next();
  }

  // ❗️ If token exists, modify the request and proceed
  if (token) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${token}`);

    // ✅ Forward modified request with token
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }

  // 🚨 Redirect to base route if no token and not already on the base route
  if (!token && request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ Proceed with the original request if on base route or no token
  return NextResponse.next();
}
