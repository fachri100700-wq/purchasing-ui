import { userRoles } from "../../../../../purchasing-service/src/common/enums/roles.enum";
import UserSppListPage from "../../../features/user/_compenents/UserSppListPage";
import LeaderDivisionSppListPage from "../../../features/leader_division/_compenents/LeaderDivisionSppListPage";
import GudangSppListPage from "../../../features/gudang/_compenents/GudangSppListPage";
import AuditSppListPage from "../../../features/audit/_compenents/AuditSppListPage";
import LeaderPurchasingSppListPage from "../../../features/leader_purchasing/_compenents/LeaderPurchasingSppListPage";
import LeaderAuditSppListPage from "../../../features/leader_audit/_compenents/LeaderAuditSppListPage";
import DireksiSppListPage from "../../../features/direksi/_compenents/DireksiSppListPage";
import KasirSppListPage from "../../../features/kasir/_compenents/KasirSppListPage";
import { ShieldAlert } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useSession } from "../../../features/auth/hooks/useSession";

export default function SppListPage() {
  const { user } = useSession();

  const renderSppListContent = () => {
    switch (user?.role) {
      case userRoles.USER:
        return <UserSppListPage />;
      case userRoles.LEADER_DIVISION:
        return <LeaderDivisionSppListPage />;
      case userRoles.GUDANG:
        return <GudangSppListPage />;
      case userRoles.AUDIT:
        return <AuditSppListPage />;
      case userRoles.LEADER_PURCHASING:
        return <LeaderPurchasingSppListPage />;
      case userRoles.LEADER_AUDIT:
        return <LeaderAuditSppListPage />;
      case userRoles.DIREKSI:
        return <DireksiSppListPage />;
      case userRoles.KASIR:
        return <KasirSppListPage />;
      default:
        return (
          <DashboardLayout>
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
          </DashboardLayout>
        );
    }
  };

  return renderSppListContent();
}
