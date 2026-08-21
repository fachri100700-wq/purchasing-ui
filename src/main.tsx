import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/RootLayout";
import LoginPage from "./app/auth/LoginPage";
import DashboardPage from "./app/dashboard/Dashboard";
import SppCreatePage from "./app/spp/_components/SppCreatePage";
import SppListPage from "./app/spp/_components/SppListPage";
import SppDetailPage from "./app/spp/_components/SppDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/spp/create", element: <SppCreatePage /> },
      { path: "/spp/list", element: <SppListPage /> },
      { path: "/spp/detail/:id", element: <SppDetailPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
);
