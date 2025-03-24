const fetchClient = async <T>(method: string, endpoint: string, body?: any) => {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {})
    });

    const result = await response.json();
    if (!response.ok) throw result; // Expecting JSON error structure

    return result as T;
  } catch (e: any) {
    console.error('Client API error occurred: ', e);
    //Todo: handle notification here

    // showTurNotification(
    //   'Oops, something went wrong!',
    //   'Please try again or contact IT support.',
    //   'error'
    // );
    throw e;
  }
};

export const clientApi = {
  get: <T>(endpoint: string) => fetchClient<T>('GET', endpoint, undefined),
  post: <T>(endpoint: string, body: any) => fetchClient<T>('POST', endpoint, body),
  put: <T>(endpoint: string, body: any) => fetchClient<T>('PUT', endpoint, body),
  delete: <T>(endpoint: string) => fetchClient<T>('DELETE', endpoint, undefined)
};
