import { useState, useMemo } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SppListItem from "../../components/ui/SppListItem";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

// Tipe data untuk mock SPP
interface SppData {
  id: string;
  sppNo: string;
  purchaseType: "Rutin" | "Kebutuhan";
  statusBadge: { text: string; colorClass: string };
  title: string;
  userName: string;
  division: string;
  currentStepInfo: string;
  amount: string;
  progressPercent: number;
}

// Generate Mock Data sebanyak 35 item
const generateMockData = (): SppData[] => {
  const data: SppData[] = [];
  const divisions = ["IT Infrastructure", "Operasional", "General Affair", "Warehouse", "Produksi", "HRD", "Keuangan"];
  const types: ("Rutin" | "Kebutuhan")[] = ["Rutin", "Kebutuhan"];
  const statuses = [
    { text: "Menunggu Approval", colorClass: "bg-sky-100 text-sky-700 border-sky-200" },
    { text: "Perlu Cek Stok", colorClass: "bg-amber-100 text-amber-700 border-amber-200" },
    { text: "Sedang Diproses", colorClass: "bg-amber-100 text-amber-700 border-amber-200" },
    { text: "Verifikasi Harga", colorClass: "bg-sky-100 text-sky-700 border-sky-200" },
    { text: "Selesai", colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { text: "Ditolak", colorClass: "bg-rose-100 text-rose-700 border-rose-200" },
  ];

  for (let i = 1; i <= 35; i++) {
    const randomDiv = divisions[Math.floor(Math.random() * divisions.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const amountVal = Math.floor(Math.random() * 50) + 1; // 1 to 50 million
    const amountStr = `Rp ${amountVal}.${Math.floor(Math.random() * 900 + 100)}.000`;
    
    data.push({
      id: `spp-${i}`,
      sppNo: `SPP-2026-${(i).toString().padStart(4, '0')}`,
      purchaseType: randomType,
      statusBadge: randomStatus,
      title: `Pengadaan Barang Kebutuhan ${i}`,
      userName: `User ${i}`,
      division: randomDiv,
      currentStepInfo: `Tahap Ke-${Math.floor(Math.random() * 8) + 1}`,
      amount: amountStr,
      progressPercent: Math.floor(Math.random() * 100),
    });
  }
  return data;
};

const mockSppList = generateMockData();
const ITEMS_PER_PAGE = 10;

export default function SppListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fungsi filtering berdasarkan pencarian
  const filteredData = useMemo(() => {
    return mockSppList.filter(spp => 
      spp.sppNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spp.division.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Kalkulasi Pagination
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

 

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
          {currentData.length > 0 ? (
            currentData.map(spp => (
              <SppListItem
                key={spp.id}
                sppNo={spp.sppNo}
                purchaseType={spp.purchaseType}
                statusBadge={spp.statusBadge}
                title={spp.title}
                userName={spp.userName}
                division={spp.division}
                currentStepInfo={spp.currentStepInfo}
                amount={spp.amount}
                progressPercent={spp.progressPercent}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-slate-500">
              <Search className="w-10 h-10 mb-2 opacity-20" />
              <p>Tidak ada data SPP yang ditemukan.</p>
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
