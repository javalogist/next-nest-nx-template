import { ApiError } from '../models/api-error.model';
import { getTokenFromCookies } from '@shared/client-async';
import { NextApiResponse } from '@shared/util';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const GLOBAL_PREFIX = process.env.NEXT_PUBLIC_GLOBAL_PREFIX || 'api';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || '';

const fetchServer = async <T>(method: string, endpoint: string, isProxy: boolean, body?: any) => {
  const isInternalCall = isProxy || endpoint.startsWith('/external') || false;
  const apiUrl = isInternalCall ? `${BASE_URL}/${GLOBAL_PREFIX}/${API_VERSION} / ${endpoint}` : `/${GLOBAL_PREFIX}/${endpoint}`;
  try {
    const token = await getTokenFromCookies();
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? {
          Authorization:
            `Bearer ${token}`
        } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });


    if (!response.ok)
      throw await response.json();

    return (await response.json()) as T;
  } catch (error: any) {
    if (!(error instanceof NextApiResponse)) {
      error = NextApiResponse(
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
