import React from 'react';
import { render, screen } from '@testing-library/react';
import { HtmlContent } from './HtmlContent';

test('<HtmlContent/>', () => {
  render(
    <HtmlContent
      sanitizeOptions={{
        allowedClasses: { h1: ['z'] },
      }}
    >
      {`
        <div>
          <h1 class="z">X</h1>
          <p>y</p>
        </div>
      `}
    </HtmlContent>,
  );
  const x = screen.getByRole('heading');
  expect(x.textContent).toBe('X');
  expect(x.className).toBe('z');
});
