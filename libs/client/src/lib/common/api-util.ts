import { clearNotification, clearAllNotifications, notify, updateNotify } from '../client/mantine-notify';
import { ApiResponse } from '@shared/common';
//
// export async function processApi<T>(
//   api: (controller: AbortController | null) => Promise<ApiResponse<T>>,
//   allowCancellation = false,
//   errorMessage = 'Something went wrong while serving you. Please try again!',
//   autoHideAlert = true
// ): Promise<ApiResponse<T> | null> {
//   try {
//     let controller: AbortController | null | undefined = null;
//     if (allowCancellation) {
//       controller = new AbortController();
//     }
//     notify({
//       id: 'apiCaller',
//       title: 'Processing...',
//       message: 'Please wait while we serve your request',
//       type: 'loading'
//     });
//     return await api(controller);
//   } catch (error: any) {
//     console.log('Api issue occurred: ', error);
//     notify({
//       id: 'apiIssue',
//       title: 'Sorry...',
//       message: errorMessage,
//       type: 'error',
//       autoClose: autoHideAlert ? 3000 : false
//     });
//     return null;
//   } finally {
//     clearAllNotifications();
//   }
// }
//
// export function invokeIfNotNull<T>(
//   obj: T | null | undefined,
//   callback: (arg: T) => void
// ): void {
//   if (obj !== null && obj !== undefined) {
//     callback(obj);
//   }
// }


//******************************* Testing Code *****************************************************


//------------------------------------******************************************************-------------------------

// let activeFlowNotificationId: string | null = null;
//
// export async function withApiHandler<T>(
//   operation: () => Promise<T>,
//   options?: {
//     loadingMessage?: string;
//     successMessage?: string;
//     errorMessage?: string;
//     updateNotification?: boolean;
//   }
// ): Promise<T | null> {
//   const notificationId = options?.updateNotification && activeFlowNotificationId
//     ? activeFlowNotificationId
//     : `api-${Date.now()}`;
//
//   try {
//     notify({
//       id: notificationId,
//       title: options?.loadingMessage || 'Processing...',
//       message: "",
//       type: 'loading',
//       autoClose: false
//     });
//
//     const result = await operation();
//
//     if (options?.successMessage) {
//       notify({
//         id: notificationId,
//         title: 'Success',
//         message: options.successMessage,
//         type: 'success',
//         autoClose: 3000
//       });
//     } else {
//       clearNotification(notificationId);
//     }
//
//     return result;
//   } catch (error) {
//     notify({
//       id: notificationId,
//       title: 'Error',
//       message: options?.errorMessage || 'Operation failed',
//       type: 'error',
//       autoClose: 5000
//     });
//     return null;
//   }
// }
//
// export async function executeSequentially<T>(operations: {
//   [key: string]: (prevResults?: Record<string, T|null>) => Promise<T>;
// }, flowOptions?: {
//   flowName?: string;
// }): Promise<Record<string, T | null>> {
//   const results: Record<string, T | null> = {};
//   activeFlowNotificationId = `flow-${Date.now()}`;
//
//   try {
//     // Initial flow notification
//     notify({
//       id: activeFlowNotificationId,
//       title: flowOptions?.flowName || 'Processing',
//       message: 'Starting...',
//       type: 'loading',
//       autoClose: false
//     });
//
//     for (const [name, operation] of Object.entries(operations)) {
//       // Update flow progress
//       notify({
//         id: activeFlowNotificationId,
//         title: flowOptions?.flowName || 'Processing',
//         message: `Working on: ${name}`,
//         type: 'loading',
//         autoClose: false
//       });
//
//       results[name] = await withApiHandler(
//         () => operation(results),
//         {
//           loadingMessage: `Processing ${name}`,
//           updateNotification: true // Reuse the flow notification
//         }
//       );
//
//       if (!results[name]) break;
//     }
//
//     // Final flow status
//     if (Object.values(results).every(Boolean)) {
//       notify({
//         id: activeFlowNotificationId,
//         title: 'Completed',
//         message: 'All steps finished successfully',
//         type: 'success',
//         autoClose: 3000
//       });
//     }
//
//     return results;
//   } catch (error) {
//     notify({
//       id: activeFlowNotificationId,
//       title: 'Processing failed',
//       message: 'Could not complete all steps',
//       type: 'error',
//       autoClose: 5000
//     });
//     return results;
//   } finally {
//     activeFlowNotificationId = null;
//   }
// }


export async function withApiHandler<T>(
  operation: () => Promise<ApiResponse<T>>,
  options?: {
    loadingMessage?: string;
    successMessage?: string | ((result: ApiResponse<T>) => string);
    businessErrorMessage?: string | ((result: ApiResponse<T>) => string);
    httpErrorMessage?: string | ((error: any) => string);
  }
): Promise<ApiResponse<T> | null> {
  const notificationId = `api-${Date.now()}`;

  // Show initial loading notification
  notify({
    id: notificationId,
    title: 'Please wait',
    message: options?.loadingMessage || 'Processing...',
    type: 'loading'
  });

  try {
    const result = await operation();

    if (result.success) {
      // Scenario 1: Successful operation
      const message = resolveMessage(
        result.message,                          // Backend message
        options?.successMessage,                 // User override
        'Operation completed successfully'       // Fallback
      );

      updateNotify({
        id: notificationId,
        title: 'Success',
        message: typeof message === 'function' ? message(result) : message,
        type: 'success'
      });
      return result;
    } else {
      // Scenario 2: Business logic failure
      const message = resolveMessage(
        result.message || result.error,          // Backend message
        options?.businessErrorMessage,           // User override
        'Operation failed validation'            // Fallback
      );

      updateNotify({
        id: notificationId,
        title: 'Error',
        message: typeof message === 'function' ? message(result) : message,
        type: 'error'
      });
      return null;
    }
  } catch (error) {
    // Scenario 3: HTTP/Network failure
    const message = options?.httpErrorMessage
      ? (typeof options.httpErrorMessage === 'function'
        ? options.httpErrorMessage(error)
        : options.httpErrorMessage)
      : 'Something went wrong. Please try again.';

    updateNotify({
      id: notificationId,
      title: 'Error',
      message,
      type: 'error'
    });
    return null;
  }
}

// Enhanced message resolver with type safety
function resolveMessage<T>(
  backendMessage: string | undefined,
  userOverride: string | ((result: T) => string) | undefined,
  fallback: string
): string | ((result: T) => string) {
  // Return user function if provided (let caller execute it with full context)
  if (typeof userOverride === 'function') return userOverride;

  // Return backend message if available
  if (backendMessage) return backendMessage;

  // Return user string override if provided
  if (typeof userOverride === 'string') return userOverride;

  // Final fallback
  return fallback;
}

export async function executeSequentially<T>(
  operations: {
    [key: string]: (prevResults?: Record<string, T | null>) => Promise<ApiResponse<T> | void>;
  },
  flowOptions?: {
    flowName?: string;
    finalSuccessMessage?: string;
  }
): Promise<Record<string, T | null>> {
  const notificationId = `flow-${Date.now()}`;
  const results: Record<string, T | null> = {};

  try {
    // Show SINGLE flow notification
    notify({
      id: notificationId,
      title: flowOptions?.flowName || 'Processing workflow',
      message: 'Starting operations...',
      type: 'loading'
    });

    for (const [name, operation] of Object.entries(operations)) {
      // Update progress
      updateNotify({
        id: notificationId,
        title: flowOptions?.flowName || 'Processing',
        message: `Executing: ${name}`,
        type: 'loading'
      });

      try {
        const stepResult = await operation(results);

        // Handle void operations (like server actions that don't return anything)
        if (stepResult === undefined) {
          // Consider void operations as successful by default
          results[name] = null;
          continue;
        }

        // Handle ApiResponse operations
        if (!stepResult.success) {
          updateNotify({
            id: notificationId,
            title: 'Workflow failed',
            message: stepResult.message || `Failed at step: ${name}`,
            type: 'error'
          });
          return results;
        }

        results[name] = stepResult.data || null;
      } catch (error) {
        // Handle thrown errors from void operations
        updateNotify({
          id: notificationId,
          title: 'Workflow failed',
          message: (error instanceof Error ? error.message : `Failed at step: ${name}`),
          type: 'error'
        });
        return results;
      }
    }

    // Final success
    updateNotify({
      id: notificationId,
      title: 'Success',
      message: flowOptions?.finalSuccessMessage || 'All operations completed',
      type: 'success'
    });

    return results;
  } catch (error) {
    // Catch any unhandled errors in the main flow
    updateNotify({
      id: notificationId,
      title: 'Workflow error',
      message: (error as Error).message || 'Unexpected workflow failure',
      type: 'error'
    });
    return results;
  }
}
