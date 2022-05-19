import { withCsrfToken } from '../common/utils';
import { UserDetails, UserDetailsResponse } from './types';

const baseUrl = `${mx.env.loginBaseUrl}`;

const baseOptions: RequestInit = {
  credentials: 'include',
};

async function getUserDetails(): Promise<UserDetails | null> {
  const response = await fetch(`${baseUrl}/user/x`, {
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
  });
  const body = await response.json() as UserDetailsResponse;
  return body.user;
}

async function logout() {
  return fetch(`${baseUrl}/logout`, withCsrfToken({
    ...baseOptions,
    method: 'POST',
  }));
}

export const userService = {
  getUserDetails,
  logout,
};
