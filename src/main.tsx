import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/RootLayout";
import LoginPage from "./app/auth/LoginPage";
import SppListPage from "./app/spp/SppListPage";
import SppCreatePage from "./app/spp/SppCreatePage";
import UserDashboard from "./app/dashboard/UserDashboard";
import LeaderPurchasingDashboard from "./app/dashboard/LeaderPurchasingDashboard";
import LeaderDivisionDashboard from "./app/dashboard/LeaderDivisionDashboard";
import LeaderAuditDashboard from "./app/dashboard/LeaderAuditDashboard";
import GudangDashboard from "./app/dashboard/GudangDashboard";
import DireksiDashboard from "./app/dashboard/DireksiDashboard";
import AuditDashboard from "./app/dashboard/AuditDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/user-dashboard", element: <UserDashboard /> },
      {
        path: "/ka-purchasing-dashboard",
        element: <LeaderPurchasingDashboard />,
      },
      { path: "/ka-divisi-dashboard", element: <LeaderDivisionDashboard /> },
      { path: "/ka-auditor-dashboard", element: <LeaderAuditDashboard /> },
      { path: "/gudang-dashboard", element: <GudangDashboard /> },
      { path: "/direksi-dashboard", element: <DireksiDashboard /> },
      { path: "/audit-dashboard", element: <AuditDashboard /> },
      { path: "/spp", element: <SppListPage /> },
      { path: "/spp/create", element: <SppCreatePage /> },
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
