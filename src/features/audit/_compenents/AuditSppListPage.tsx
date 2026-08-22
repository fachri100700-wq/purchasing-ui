import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import SppListItem from "../../../components/ui/SppListItem";
import Pagination from "../../../components/ui/Pagination";
import { Search, FileText } from "lucide-react";
import { getStatusBadge, getStepInfo } from "../../../helpers/sppMapper";
import DashboardLoading from "../../../components/ui/Loading";
import PageError from "../../../components/layout/PageError";
import { useDebounce } from "../../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { useDeleteSpp } from "../../user/hooks/useDeleteSpp";
import { useGetAudit } from "../hooks/useGetAudit";

const ITEMS_PER_PAGE = 10;

export default function AuditSppListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, isError, fetchSpp } = useGetAudit({
    initialQuery: {
      page: 1,
      limit: ITEMS_PER_PAGE,
    },
  });

  const { handleDelete, isLoading: isDeleting } = useDeleteSpp({
    fetchSpp: () => {
      fetchSpp();
    },
  });

  useEffect(() => {
    fetchSpp({
      page: 1,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearchQuery || undefined,
    });
  }, [debouncedSearchQuery, fetchSpp]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return (
      <PageError
        onRetry={() => fetchSpp({ page: currentPage, limit: ITEMS_PER_PAGE })}
      />
    );
  }

  const sppList = data?.data ?? [];
  const total = data?.pagination.total ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchSpp({
      page,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearchQuery || undefined,
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className=" flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Daftar Lengkap SPP
          </h1>
          <p className="text-sm text-slate-600">
            Seluruh pengajuan SPP beserta status terkininya.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari No SPP, Judul, atau Divisi..."
            className="w-full bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* List Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1 flex flex-col">
        {/* Data List */}
        <div className="space-y-3 flex-1 mb-6">
          {sppList.length > 0 ? (
            sppList.map((spp) => {
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
              <p>Belum ada pengajuan SPP.</p>
              <Link
                to="/spp/create"
                className="mt-3 text-sm font-medium text-sky-600 hover:text-sky-700"
              >
                Ajukan SPP pertama Anda
              </Link>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          limit={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>
  );
}
