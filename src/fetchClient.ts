// const BASE_URL_API = 'http://localhost:3000';

// // a promise resolved after a given delay
// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   });
// }

// // To have autocompletion and avoid mistypes
// type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// function request<T>(
//   url: string,
//   method: RequestMethod = 'GET',
//   data: any = null, // we can send any data to the server
// ): Promise<T> {
//   const options: RequestInit = { method };

//   if (data) {
//     // We add body and Content-Type only for the requests with data
//     options.body = JSON.stringify(data);
//     options.headers = {
//       'Content-Type': 'application/json; charset=UTF-8',
//     };
//   }

//   // for a demo purpose we emulate a delay to see if Loaders work
//   return wait(300)
//     .then(() => fetch(BASE_URL_API + url, options))
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       }

//       throw new Error('Error');
//     });
// }

// export const client = {
//   get: <T>(url: string) => request<T>(url),
//   post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
//   patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
//   delete: (url: string) => request(url, 'DELETE'),
// };

const BASE_URL_API = 'http://localhost:3001';

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
