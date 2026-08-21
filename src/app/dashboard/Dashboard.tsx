import { userRoles } from "../../../../purchasing-service/src/common/enums/roles.enum";
import UserDashboard from "../../features/user/_compenents/UserDashboard";
import LeaderDivisionDashboard from "../../features/leader_division/_compenents/LeaderDivisionDashboard";
import GudangDashboard from "../../features/gudang/_compenents/GudangDashboard";
import AuditDashboard from "../../features/audit/_compenents/AuditDashboard";
import LeaderPurchasingDashboard from "../../features/leader_purchasing/_compenents/LeaderPurchasingDashboard";
import LeaderAuditDashboard from "../../features/leader_audit/_compenents/LeaderAuditDashboard";
import DireksiDashboard from "../../features/direksi/_compenents/DireksiDashboard";
import KasirDashboard from "../../features/kasir/_compenents/KasirDashboard";
import { ShieldAlert } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useSession } from "../../features/auth/hooks/useSession";

export default function DashboardPage() {
  const { user } = useSession();

  const renderDashboardContent = () => {
    switch (user?.role) {
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
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Akses Ditolak
            </h2>
            <p>
              Role pengguna tidak valid atau tidak memiliki akses ke halaman
              ini.
            </p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboardContent()}
    </DashboardLayout>
  );
}
