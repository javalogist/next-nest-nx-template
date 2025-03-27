// libs/shared-libs/src/lib/models/api-response.model.ts

// ✅ Define the ApiResponse class
export interface NextApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  error?: any | null;
}



