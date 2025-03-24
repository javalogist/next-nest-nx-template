import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { ApiError } from '../../../models/api-error.model';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';



// Set token in cookies
const setTokenInCookies = async (token: string) => {
  const decoded = jwtDecode<{ exp: number }>(token);
  const expiresAt = decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds

  if (!expiresAt || expiresAt <= Date.now()) {
    throw new ApiError('Invalid or expired token', 401);
  }

  const remainingDuration = expiresAt - Date.now(); // ✅ Store remaining duration instead
  const maxAge = Math.floor(remainingDuration / 1000); // Convert to seconds
  const secureCookie = process.env.SECURE_COOKIE === 'true';
  const cookieStore = await cookies();


  // Store the access token
  cookieStore.set('access_token', token, {
    path: '/',
    httpOnly: true,
    secure: secureCookie, // should be true in production
    sameSite: 'strict',
    maxAge
  });

  // Store remaining session duration (instead of absolute timestamp)
  cookieStore.set('session_duration', remainingDuration.toString(), {
    path: '/',
    httpOnly: true,
    secure: secureCookie,
    sameSite: 'strict',
    maxAge
  });

};

export async function GET(request: NextRequest) {
  try {
    // ✅ Parse the request body correctly
    const body = await request.json();
    const { token } = body;

    // ❗️ Check if token is present
    if (!token) redirect('/');

    // 🍪 Create a response with the 'Set-Cookie' header
    const response = new NextResponse('Token stored successfully!');
    await setTokenInCookies(token);
    return response;
  } catch (error: any) {
    console.error('Error parsing request body:', error);
    if (error.status === 401)
      redirect('/');

    return NextResponse.json(
      { message: error.message, status: error.status, details: error.details },
      { status: error.status }
    );
  }
}

