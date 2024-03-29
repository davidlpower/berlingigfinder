import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, } from 'react-router-dom';
import './index.css';

import Root, { loader as rootLoader} from './routes/root';
import ErrorPage from './error-page';
import Gig from './routes/gig';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: 'gigs/:gigId',
        element: <Gig />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
