
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Root from './components/layout/RootLayout';
import LoginPage from './app/auth/LoginPage';
import DashboardPage from './app/dashboard/DashboardPage';
import SppListPage from './app/spp/SppListPage';
import SppCreatePage from './app/spp/SppCreatePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <LoginPage /> },
      {path: '/dashboard', element: <DashboardPage />},
      {path: '/spp', element: <SppListPage />},
      {path: '/spp/create', element: <SppCreatePage />}
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #b7d9f5 0%, #dbe9f8 45%, #fbfcff 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  </StrictMode>,
);
