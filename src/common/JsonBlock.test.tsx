import React from 'react';
import { render } from '@testing-library/react';
import pretty from 'pretty';
import JsonBlock from './JsonBlock';

test('should render blocks', () => {
  const { container } = render(<JsonBlock json={{ some: 'block' }} />);
  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
