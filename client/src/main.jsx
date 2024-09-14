import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Routes from './router/Routes.jsx';
import "./styles/index.scss";
import { Toaster } from "react-hot-toast";
import { toastOptions } from './configs/config.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Routes} />
    <Toaster toastOptions={toastOptions} />
  </StrictMode>
)
