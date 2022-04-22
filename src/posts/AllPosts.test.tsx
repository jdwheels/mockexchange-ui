import { render, screen } from '@testing-library/react';
import React from 'react';
import { AllPosts } from './AllPosts';

it('works', async () => {
  render(<AllPosts />);
  const headings = await screen.findAllByRole('heading');
  expect(headings[0].textContent).toContain('All Posts');
});
