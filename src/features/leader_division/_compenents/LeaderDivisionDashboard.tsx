import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";
import { FileText, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { backgroundContainer } from "../../../components/ui/styles";
import DashboardLoading from "../../../components/ui/Loading";
import PageError from "../../../components/layout/PageError";
import { getStatusBadge, getStepInfo } from "../../../helpers/sppMapper";
import { useGetLeaderDivision } from "../hooks/useGetLeaderDivision";
import { useDeleteSpp } from "../../user/hooks/useDeleteSpp";

export default function LeaderDivisionDashboard() {
  const { data, isLoading, isError, fetchSpp } = useGetLeaderDivision({
    initialQuery: { limit: 5 },
  });

   const { handleDelete, isLoading: isDeleting } = useDeleteSpp({
      fetchSpp: () => {
        fetchSpp();
      },
    });

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <PageError onRetry={() => fetchSpp({ limit: 5 })} />;
  }

  const sppList = data?.data ?? [];

  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="flex justify-between items-end mb-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard Pemohon
            </h1>
            <p className="text-sm text-slate-600">
              Pantau status pengajuan SPP Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Pengajuan"
            value={"0"}
            icon={<FileText className="w-5 h-5" />}
          />
          <MetricCard
            title="Sedang Diproses"
            value={"0"}
            icon={<Clock className="w-5 h-5 text-amber-500" />}
          />
          <MetricCard
            title="Selesai"
            value={"0"}
            icon={<CheckCircle className="w-5 h-5 text-emerald-500" />}
          />
          <MetricCard
            title="Ditolak"
            value={"0"}
            icon={<ArrowRight className="w-5 h-5 text-rose-500" />}
          />
        </div>
      </div>

      {/* List Section */}
      <div className={backgroundContainer}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">
            Pengajuan Terbaru Anda
          </h2>
          <Link
            to="/spp"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            Lihat semua <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {sppList?.length > 0 ? (
            sppList?.slice(0, 5).map((spp) => {
              const statusBadge = getStatusBadge(spp.status);
              const stepInfo = getStepInfo(spp.status);

              return (
                <Link to={`/spp/detail/${spp.id}`}>
                  <SppListItem
                    key={spp.id}
                    sppNo={spp.sppNo}
                    purchaseType={spp.purchaseType}
                    statusBadge={statusBadge}
                    title={spp.title}
                    userName={spp.name ?? "-"}
                    division={spp.division ?? "-"}
                    currentStepInfo={stepInfo.step}
                    progressPercent={stepInfo.progress}
                    date={spp.createdAt ?? "-"}
                    isDeleting={isDeleting}
                    handleDelete={() => handleDelete(spp.id)}
                  />
                </Link>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <FileText className="w-10 h-10 mb-2 opacity-20" />
              <p>Belum ada pengajuan SPP</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
