import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../pages/app/App';
import Preview from '../pages/preview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/visualization-layout',
    element: <App />,
  },
  {
    path: '/visualization-layout/preview',
    element: <Preview />,
  },
]);

export default router;
