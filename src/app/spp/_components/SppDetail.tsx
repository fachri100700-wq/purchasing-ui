import { userRoles } from "../../../../../purchasing-service/src/common/enums/roles.enum";
import { ShieldAlert } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useSession } from "../../../features/auth/hooks/useSession";
import UserSppDetail from "../../../features/user/_compenents/UserSppDetail";
import LeaderDivisionSppDetail from "../../../features/leader_division/_compenents/LeaderDivisionSppDetail";
import GudangSppDetail from "../../../features/gudang/_compenents/GudangSppDetail";
import AuditSppDetail from "../../../features/audit/_compenents/AuditSppDetail";
import LeaderPurchasingSppDetail from "../../../features/leader_purchasing/_compenents/LeaderPurchasingSppDetail";
import LeaderAuditSppDetail from "../../../features/leader_audit/_compenents/LeaderAuditSppDetail";
import DireksiSppDetail from "../../../features/direksi/_compenents/DireksiSppDetail";

export default function SppListPage() {
  const { user } = useSession();

  const renderSppListContent = () => {
    switch (user?.role) {
      case userRoles.USER:
        return <UserSppDetail />;
      case userRoles.LEADER_DIVISION:
        return <LeaderDivisionSppDetail />;
      case userRoles.GUDANG:
        return <GudangSppDetail />;
      case userRoles.AUDIT:
        return <AuditSppDetail />;
      case userRoles.LEADER_PURCHASING:
        return <LeaderPurchasingSppDetail />;
      case userRoles.LEADER_AUDIT:
        return <LeaderAuditSppDetail />;
      case userRoles.DIREKSI:
        return <DireksiSppDetail />;
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
