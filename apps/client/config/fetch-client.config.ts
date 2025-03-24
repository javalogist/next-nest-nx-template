import { ApiError } from '../models/api-error.model';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Get the token from cookies
const getTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value || '';
};

const fetchServer = async <T>(method: string, endpoint: string, isProxy: boolean, body?: any) => {
  const apiUrl = isProxy ? `${BASE_URL}/${endpoint}` : `/api/${endpoint}`;
  try {
    const token = await getTokenFromCookies();
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });


    // Check if response is valid before parsing JSON
    if (!response.ok) {
      let errorMessage = 'API Error';
      let errorDetails = {};

      try {
        const errorResponse = await response.json();
        errorMessage = errorResponse.message || errorMessage;
        errorDetails = errorResponse;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.log('Catching error');
        // If response is not JSON, use default error message
      }

      console.log('Comes here');
      throw new ApiError(errorMessage, response.status, errorDetails);
    }

    return (await response.json()) as T;
  } catch (error: any) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(
        'Unexpected server error',
        500,
        { message: error.message }
      );
    }

    throw error;
  }
};

// Server API methods
export const serverApi = {
  get: async <T>(endpoint: string, isProxy = false) => fetchServer<T>('GET', endpoint, isProxy),
  post: async <T>(endpoint: string, body: any, isProxy = false) => fetchServer<T>('POST', endpoint, isProxy, body),
  put: async <T>(endpoint: string, body: any, isProxy = false) => fetchServer<T>('PUT', endpoint, isProxy, body),
  delete: async <T>(endpoint: string, isProxy = false) => fetchServer<T>('DELETE', endpoint, isProxy)
};
