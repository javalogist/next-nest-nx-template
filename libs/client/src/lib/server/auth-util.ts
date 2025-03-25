import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { setTokenInCookies } from './token-util';

export const startUserSession = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) redirect('/');

    await setTokenInCookies(token);
    return NextResponse.json({ message: 'Token set successfully.' });
  } catch (error: any) {
    console.error('Error parsing request body:', error);
    if (error.status === 401) redirect('/');
    return NextResponse.json(
      { message: error.message, status: error.status, details: error.details },
      { status: error.status }
    );
  }
};
