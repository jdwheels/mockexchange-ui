import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import { createRoot } from 'react-dom/client';
import App from './App';
import { X } from './redux/store';

declare global {
  interface Window {
    __env?: {
      title: string;
      test: number;
    }
  }
}

const Index: FC<Record<string, never>> = function () {
  return (
    <X>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </X>
  );
};

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<Index />);
}
