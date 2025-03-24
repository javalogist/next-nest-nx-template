export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  stackTrace?: string | null;

  constructor(
    success: boolean,
    message: string,
    data?: T | null,
    stackTrace?: string | null
  ) {
    this.success = success;
    this.message = message;
    this.data = data || null;
    this.stackTrace = stackTrace;
  }

  static success<T>(
    data: T,
    message = 'Request processed successfully'
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data);
  }

  static error(
    message = 'No information available but the server responded properly',
    stackTrace: string | null = null,
    data: any = null
  ): ApiResponse<null> {
    return new ApiResponse<null>(false, message, data, stackTrace);
  }
}

export class SuccessResponse<T> {
  data: T;
  message?: string;

  constructor(data: T, message?: string) {
    this.data = data;
    this.message = message || 'Request processed successfully';
  }
}

export class ErrorResponse<T> {
  stackTrace?: string | null;
  message: string;
  data?: T | null;

  constructor(
    message = 'No information available but the server responded properly',
    stackTrace:string|null = null,
    data = null
  ) {
    this.message = message;
    this.data = data;
    this.stackTrace = stackTrace;
  }
}
