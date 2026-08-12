import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { userRoles } from "../../../../purchasing-service/src/common/enums/roles.enum";
import UserDashboard from "../../features/user/_components/UserDashboard";
import LeaderDivisionDashboard from "../../features/leader_divition/_components/LeaderDivisionDashboard";
import GudangDashboard from "../../features/gudang/_components/GudangDashboard";
import AuditDashboard from "../../features/audit/_components/AuditDashboard";
import LeaderPurchasingDashboard from "../../features/leader_purchasing/_components/LeaderPurchasingDashboard";
import LeaderAuditDashboard from "../../features/leader_audit/_components/LeaderAuditDashboard";
import DireksiDashboard from "../../features/direksi/_components/DireksiDashboard";
import KasirDashboard from "../../features/kasir/_components/KasirDashboard";
import { ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  // MOCK STATE: Ganti value ini untuk menguji dashboard role lain.
  // Contoh: userRoles.USER, userRoles.LEADER_DIVISION, dsb.
  const [currentUserRole, setCurrentUserRole] = useState<userRoles>(userRoles.USER);
  const [userEmail, setUserEmail] = useState("user@pengadaan.co.id");

  // Helper untuk mendapatkan label role yang rapi
  const getRoleLabel = (role: userRoles) => {
    switch (role) {
      case userRoles.USER: return "User Pemohon";
      case userRoles.LEADER_DIVISION: return "Kepala Bagian";
      case userRoles.GUDANG: return "Gudang";
      case userRoles.AUDIT: return "Audit";
      case userRoles.LEADER_PURCHASING: return "Leader Purchasing";
      case userRoles.LEADER_AUDIT: return "Leader Audit";
      case userRoles.DIREKSI: return "Direksi";
      case userRoles.KASIR: return "Kasir";
      default: return "Unknown Role";
    }
  };

  const renderDashboardContent = () => {
    switch (currentUserRole) {
      case userRoles.USER:
        return <UserDashboard />;
      case userRoles.LEADER_DIVISION:
        return <LeaderDivisionDashboard />;
      case userRoles.GUDANG:
        return <GudangDashboard />;
      case userRoles.AUDIT:
        return <AuditDashboard />;
      case userRoles.LEADER_PURCHASING:
        return <LeaderPurchasingDashboard />;
      case userRoles.LEADER_AUDIT:
        return <LeaderAuditDashboard />;
      case userRoles.DIREKSI:
        return <DireksiDashboard />;
      case userRoles.KASIR:
        return <KasirDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 bg-white/50 backdrop-blur-sm rounded-2xl border border-white p-10">
            <ShieldAlert className="w-12 h-12 mb-4 text-red-400" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
            <p>Role pengguna tidak valid atau tidak memiliki akses ke halaman ini.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout userRoleLabel={getRoleLabel(currentUserRole)} userEmail={userEmail}>
      {/* Dev Tools: Role Switcher (Hanya untuk keperluan testing UI) */}
      <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur p-2 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500">Test Role:</span>
        <select 
          className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 outline-none cursor-pointer"
          value={currentUserRole}
          onChange={(e) => setCurrentUserRole(e.target.value as userRoles)}
        >
          {Object.values(userRoles).map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      {renderDashboardContent()}
    </DashboardLayout>
  );
}
