import { apiClient } from './api-client';
import { ApiResponse } from '@shared/common';
import { ApiEndpoints } from './api-endpoints';

export const login = async (body: { email: string; password: string }) =>
  await apiClient.post<ApiResponse<string>>(ApiEndpoints.login, body);

export const register = async (body: {
  name: string;
  email: string;
  password: string;
  roles: string[];
}) => await apiClient.post<ApiResponse<string>>(ApiEndpoints.register, body);

export const setSession = async (body: { token: string }) =>
  await apiClient.post<ApiResponse<string>>(ApiEndpoints.session, body);
