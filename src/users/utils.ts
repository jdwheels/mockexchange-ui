import { useRef } from 'react';
import { useFetch, UseFetchOptions } from '../common/utils';
import { UserDetails } from './types';

const useUserDetailsOptions: UseFetchOptions<UserDetails | null> = {
  resultMapper: (r) => r.json().then((j: { user: UserDetails }) => j.user),
};

export function useUserDetails() {
  return useFetch<UserDetails | null>('/posts-api/auth/user', useUserDetailsOptions);
}
