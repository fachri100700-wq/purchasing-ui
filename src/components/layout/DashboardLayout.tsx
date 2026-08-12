import React from "react";
import { Boxes, LayoutDashboard, FileText, Receipt, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRoleLabel: string;
  userEmail: string;
}

export default function DashboardLayout({ children, userRoleLabel, userEmail }: DashboardLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 lg:p-6 flex gap-6 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between shadow-lg hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2 mt-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
              <Boxes className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block leading-tight">Pengadaan</span>
              <span className="text-[10px] text-slate-500 block leading-tight">SPP Workflow</span>
            </div>
          </div>

          <nav className="space-y-2">
            <a href="#" className="bg-slate-900 text-white rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 shadow-md">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </a>
            <a href="#" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all">
              <FileText className="w-4 h-4" />
              SPP
            </a>
            <a href="#" className="text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all">
              <Receipt className="w-4 h-4" />
              Resi
            </a>
          </nav>
        </div>

        <div className="mt-8">
          <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-100">
            <p className="text-sm font-semibold text-slate-900">{userRoleLabel}</p>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
          <button 
            onClick={() => navigate("/")} 
            className="w-full text-slate-500 hover:text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-all hover:bg-slate-100"
          >
            <LogOut className="w-4 h-4" />
            Keluar
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
