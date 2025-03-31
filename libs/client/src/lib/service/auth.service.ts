import { ApiResponse } from '@shared/common';
import { ApiEndpoints } from '../util/api-endpoints';
import { HealthCheckData } from '../models';
import { apiClient } from '../config';

export const login = async (body: { email: string; password: string }) =>
  await apiClient.post<ApiResponse<string>>(ApiEndpoints.login, body);

export const register = async (body: {
  name: string;
  email: string;
  password: string;
  roles: string[];
}) => await apiClient.post<ApiResponse<string>>(ApiEndpoints.register, body);

export const checkSystemHealth = async () => await apiClient.get<ApiResponse<HealthCheckData>>(ApiEndpoints.health);

