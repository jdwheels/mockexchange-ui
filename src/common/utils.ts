import { useEffect, useState } from 'react';

export const pluralize = function (count: number, singular: string, plural?: string) {
  return `${count !== 1 ? plural || `${singular}s` : singular}`;
};

export function getCookie(cookieName: string): string {
  const cookies: Record<string, string> = {};
  console.log(document.cookie);
  document.cookie.split(';').reduce((acc, curr) => {
    const [name, value] = curr.split('=');
    acc[name] = value;
    return acc;
  }, cookies);
  return cookies[cookieName];
}

export function withCsrfToken(init: RequestInit) {
  return {
    ...init,
    headers: {
      ...init.headers,
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
    },
  };
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

export function useAsync<T, A>(
  f: (args: A) => Promise<T>,
  args: A,
  initialValue: T | null,
  exec = true,
): [T | null | undefined, (t: T | undefined) => void, boolean, string] {
  const [result, setResult] = useState<T | null | undefined>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (exec) {
      f(args)
        .then((r) => setResult(r))
        .catch((e: Error) => {
          console.error(e);
          setError(e.message);
        })
        .finally(() => setLoading(false));
    }
  }, [f, args, exec]);
  return [result, setResult, loading, error];
}
