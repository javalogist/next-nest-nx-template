import { ApiResponse } from '@shared/common';
import { getTokenFromCookies } from '../server/actions/cookie-util';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const GLOBAL_PREFIX = process.env.NEXT_PUBLIC_GLOBAL_PREFIX || 'api';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || '';

const fetchServer = async <T>(
  method: string,
  endpoint: string,
  isProxy: boolean,
  body?: any
) => {
  const isInternalCall = isProxy || endpoint.startsWith('/external') || false;
  const apiUrl = isInternalCall
    ? `/${GLOBAL_PREFIX}/${endpoint}`
    : `${BASE_URL}/${GLOBAL_PREFIX}/${API_VERSION} / ${endpoint}`;
  try {
    const token =
      !isInternalCall && typeof window === 'undefined'
        ? await getTokenFromCookies()
        : undefined;

    console.log('Token:', token || 'No token needed for internal calls');

    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) throw await response.json();

    return (await response.json()) as T;
  } catch (error: any) {
    if (!(error instanceof ApiResponse)) {
      throw ApiResponse.error(
        error.message || 'No valid message for the error',
        null,
        error.name,
        error.stack
      );
    }
    throw error;
  }
};

// Server API methods
export const apiClient = {
  get: async <T>(endpoint: string, isProxy = false) =>
    fetchServer<T>('GET', endpoint, isProxy),
  post: async <T>(endpoint: string, body: any, isProxy = false) =>
    fetchServer<T>('POST', endpoint, isProxy, body),
  put: async <T>(endpoint: string, body: any, isProxy = false) =>
    fetchServer<T>('PUT', endpoint, isProxy, body),
  delete: async <T>(endpoint: string, isProxy = false) =>
    fetchServer<T>('DELETE', endpoint, isProxy),
};
