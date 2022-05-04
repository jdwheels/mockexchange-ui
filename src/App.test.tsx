import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import React from 'react';
import App from './App';
import { userService } from './users/userService';
import SpyInstance = jest.SpyInstance;

let userDetailsSpy: SpyInstance;

jest.mock('./pages/Home', () => function () {
  return <div />;
});

beforeEach(() => {
  userDetailsSpy = jest.spyOn(userService, 'getUserDetails').mockResolvedValue({
    name: 'test',
  });
});

test('<App/>', async () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  expect(userDetailsSpy).toHaveBeenCalled();
});
