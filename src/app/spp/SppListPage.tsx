import { useState} from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SppListItem from "../../components/ui/SppListItem";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useGetMySpp } from "../../features/user/hooks/useGetMySpp";
import { getStatusBadge, getStepInfo } from "../../helpers/sppMapper";
import DashboardLoading from "../../components/layout/Loading";
import PageError from "../../components/layout/PageError";
import { Link } from "react-router-dom";


export default function SppListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {data, isLoading, isError, fetchSpp} = useGetMySpp()
 
   if (isLoading) {
      return <DashboardLoading />;
    }
  
    if (isError) {
      return <PageError onRetry={() => fetchSpp({ limit: 5 })} />;
    }

  const sppList = data?.data ?? []

  return (
    <DashboardLayout>
      
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daftar Lengkap SPP</h1>
          <p className="text-sm text-slate-600">Seluruh pengajuan SPP beserta status terkininya.</p>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* List Container */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1 flex flex-col">
        
        {/* Data List */}
        <div className="space-y-3 flex-1 mb-6">
          {sppList?.length > 0 ? (
            sppList?.slice(0, 5).map((spp) => {
              const statusBadge = getStatusBadge(spp.status);
              const stepInfo = getStepInfo(spp.status);

              return (
                <SppListItem
                  key={spp.id}
                  sppNo={spp.sppNo}
                  purchaseType={spp.purchaseType}
                  statusBadge={statusBadge}
                  title={spp.title}
                  userName={spp?.name ?? "-"}
                  division={spp?.division ?? "-"}
                  currentStepInfo={stepInfo.step}
                  amount="-"
                  progressPercent={stepInfo.progress}
                />
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <p className="text-sm text-slate-500">
              Menampilkan <span className="font-medium text-slate-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> hingga <span className="font-medium text-slate-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> dari <span className="font-medium text-slate-900">{filteredData.length}</span> entri
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page 
                        ? "bg-slate-900 text-white shadow-sm" 
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </DashboardLayout>
  );
}
