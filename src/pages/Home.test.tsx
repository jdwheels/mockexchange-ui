import {
  getAllByTestId, getByText, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';
import { mockFetch } from '../test/testUtils';
import { PostsResponse } from '../posts/types';

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation((u: string) => {
    if (u.startsWith('/posts-api/x/y')) {
      return mockFetch<PostsResponse>({
        content: [],
      })();
    }
    return Promise.resolve(null);
  });
});

test('<Home/>', async () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

  const [heading] = await screen.findAllByRole('heading');
  expect(heading.textContent).toContain('Software Engineering');

  expect(global.fetch).toHaveBeenCalled();
});
