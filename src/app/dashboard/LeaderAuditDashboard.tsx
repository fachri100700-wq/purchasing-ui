import { Scale, CheckSquare, RefreshCcw, ArrowRight } from "lucide-react";
import MetricCard from "../../components/ui/MetricCard";
import SppListItem from "../../components/ui/SppListItem";

export default function LeaderAuditDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Leader Audit</h1>
          <p className="text-sm text-slate-600">Verifikasi hasil perbandingan harga (Comparison Paper)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Verifikasi Harga" value="7" icon={<Scale className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Dikembalikan (Crosscheck)" value="2" icon={<RefreshCcw className="w-5 h-5 text-rose-500" />} />
          <MetricCard title="Harga Disetujui" value="31" icon={<CheckSquare className="w-5 h-5 text-emerald-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Antrean Verifikasi (COMPARISON_SUBMITTED)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0170"
            purchaseType="Rutin"
            statusBadge={{ text: "Verifikasi Harga", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
            title="Pengadaan Tinta Printer"
            userName="Dina"
            division="HRD"
            currentStepInfo="Assignment Leader Audit"
            amount="Rp 2.100.000"
            progressPercent={55}
          />
        </div>
      </div>
    </>
  );
}
