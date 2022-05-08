import { withCsrfToken } from '../common/utils';
import { UserDetails, UserDetailsResponse } from './types';

const baseUrl = mx.env.postsBaseUrl;

async function getUserDetails(): Promise<UserDetails | null> {
  const response = await fetch(`${baseUrl}/auth/user`);
  const body = await response.json() as UserDetailsResponse;
  return body.user;
}

async function logout() {
  return fetch(`${baseUrl}/logout`, withCsrfToken({
    method: 'POST',
  }));
}

export const userService = {
  getUserDetails,
  logout,
};
