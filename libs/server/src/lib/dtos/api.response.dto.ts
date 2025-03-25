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
    message: string,
    data: any = null,
    stackTrace: string | null = null
  ): ApiResponse<null> {
    return new ApiResponse<null>(false, message, data, stackTrace);
  }
}


