import { mockFetch } from './test/testUtils';
import { PostsResponse } from './posts/types';
import { UserDetails, UserDetailsResponse } from './users/types';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation((u: string) => {
    if (u.startsWith('/posts-api/auth/user')) {
      return mockFetch<UserDetailsResponse>({
        user: { name: 'test' },
      });
    }
    return Promise.resolve(null);
  });
});

describe('tests', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
});
