import { NextRequest } from 'next/server';
import { startUserSession } from '@shared/client-async';

export async function POST(request: NextRequest) {
  return startUserSession(request);
}
