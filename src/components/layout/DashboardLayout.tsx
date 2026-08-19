import React from "react";
import {
  Boxes,
  LayoutDashboard,
  FileText,
  LogOut,
  Loader2,
} from "lucide-react";
import { NavLink } from "react-router-dom"; // 1. Ubah Link jadi NavLink
import { backgroundContainer } from "../ui/styles";
import { useLogout } from "../../features/auth/hooks/useLogout";
import DashboardLoading from "./Loading";
import PageError from "./PageError";
import { useSession } from "../../features/auth/hooks/useSession";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { handleLogout, isLoading } = useLogout();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all ${
      isActive
        ? "bg-slate-900 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const { user, isLoading: isSessionLoading, isError, handleSession: refetch } = useSession();

  if (isSessionLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <PageError onRetry={refetch} />;
  }
  return (
    <div className="min-h-screen p-4 lg:p-6 flex gap-6 w-full">
      {/* Sidebar */}
      <aside
        className={`w-64 flex flex-col justify-between hidden md:flex ${backgroundContainer}`}
      >
        <div>
          <div className="flex items-center gap-3 mb-8 px-2 mt-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-tight">
                Pengadaan
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight">
                SPP Workflow
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            {/* 3. Pake NavLink dengan dynamic className */}
            <NavLink to="/dashboard" className={navLinkStyle}>
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </NavLink>

            <NavLink to="/spp/list" className={navLinkStyle}>
              <FileText className="w-4 h-4" />
              SPP
            </NavLink>
          </nav>
        </div>

        <div className="mt-8">
          <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
            <p className="text-sm font-semibold text-slate-900">
              {user?.fullName}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 rounded-xl px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Keluar...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col gap-6 overflow-y-auto pb-1 px-1">
        {children}
      </main>
    </div>
  );
}
