import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import { createRoot } from 'react-dom/client';
import App from './App';

const Index: FC<Record<string, never>> = function () {
  console.log(mx.env);
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<Index />);
}
