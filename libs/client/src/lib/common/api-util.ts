import { clearNotifications, notify } from '../client/mantine-notify';
import { ApiResponse } from '@shared/common';

export async function processApi<T>(
  api: (controller: AbortController | null) => Promise<ApiResponse<T>>,
  allowCancellation = false,
  errorMessage = 'Something went wrong while serving you. Please try again!',
  autoHideAlert = true
): Promise<ApiResponse<T> | null> {
  try {
    let controller: AbortController | null | undefined = null;
    if (allowCancellation) {
      controller = new AbortController();
    }
    notify({
      id: 'apiCaller',
      title: 'Processing...',
      message: 'Please wait while we serve your request',
      type: 'loading',
    });
    return await api(controller);
  } catch (error: any) {
    console.log('Api issue occurred: ', error);
    clearNotifications();
    notify({
      id: 'apiIssue',
      title: 'Sorry...',
      message: errorMessage,
      type: 'error',
      autoClose: autoHideAlert ? 3000 : false,
    });
    return null;
  }
}

export function invokeIfNotNull<T>(
  obj: T | null | undefined,
  callback: (arg: T) => void
): void {
  if (obj !== null && obj !== undefined) {
    callback(obj);
  }
}
