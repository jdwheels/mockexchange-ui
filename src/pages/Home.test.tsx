import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import { postsService } from '../posts/postsService';
import SpyInstance = jest.SpyInstance;

let getQuestionsSpy: SpyInstance;

beforeEach(() => {
  getQuestionsSpy = jest.spyOn(postsService, 'getQuestions').mockResolvedValue([]);
});

test('<Home/>', async () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

  const [heading] = await screen.findAllByRole('heading');
  expect(heading.textContent).toContain('Software Engineering');

  expect(getQuestionsSpy).toHaveBeenCalled();
});
