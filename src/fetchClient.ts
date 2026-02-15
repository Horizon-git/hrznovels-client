const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// A promise resolved after a given delay
function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// To have autocompletion and avoid mistypes
type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

let accessToken: string | null = null;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  token?: string | null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // If a token is passed or exists globally, add it to the headers
  if (token) {
    options.headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
    };
  }

  // Emulate a delay to test loaders
  return wait(100)
    .then(() => fetch(BASE_URL_API + url, options))
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Error');
    });
}

// Client methods with optional token parameter
export const client = {
  get: <T>(url: string, token?: string | null) => request<T>(url, 'GET', null, token),
  post: <T>(url: string, data: any, token?: string | null) => request<T>(url, 'POST', data, token),
  patch: <T>(url: string, data: any, token?: string | null) => request<T>(url, 'PATCH', data, token),
  delete: (url: string, token?: string | null) => request(url, 'DELETE', null, token),
};
