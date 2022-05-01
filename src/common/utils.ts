import { useEffect, useState } from 'react';

export const pluralize = function (count: number, singular: string, plural?: string) {
  return `${count > 1 ? plural || `${singular}s` : singular}`;
};

export function getCookie(cookieName: string): string {
  const cookies: Record<string, string> = {};
  document.cookie.split(';').reduce((acc, curr) => {
    const [name, value] = curr.split('=');
    acc[name] = value;
    return acc;
  }, cookies);
  return cookies[cookieName];
}

export function logout(): Promise<Response> {
  return fetch('/posts-api/logout', {
    method: 'POST',
    headers: {
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  });
}

function handleResponse<T>(response: Response, f: (response: Response) => Promise<T>) {
  if (response.ok) {
    return f(response);
  }
  return response.text().then(() => {
    throw new Error(`${response.status}: ${response.statusText}`);
  });
}

export function handleNullResponse(response: Response) {
  return handleResponse(response, () => Promise.resolve(null));
}

export interface UseFetchOptions<T> {
  init?: RequestInit
  resultMapper?: (r: Response) => Promise<T>,
  initialValue?: T | undefined
}

const defaultMapper = <T>(r: Response) => r.json() as Promise<T>;

export function useFetch<T>(uri: string, options: UseFetchOptions<T> = {}, exec = true)
  : [T | undefined, (t: T | undefined) => void, boolean, string] {
  const { init, initialValue, resultMapper = defaultMapper } = options;
  const [result, setResult] = useState<T | undefined>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (exec) {
      fetch(uri, init)
        .then((r) => handleResponse(r, resultMapper))
        .then(setResult)
        .catch((e: Error) => {
          console.error(e);
          setError(e.message);
        })
        .finally(() => setLoading(false));
    }
  }, [uri, init, resultMapper, exec]);
  return [result, setResult, loading, error];
}
