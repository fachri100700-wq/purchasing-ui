import { BadgeCheck, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";

export default function DireksiDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Direksi</h1>
          <p className="text-sm text-slate-600">Approval tingkat akhir untuk SPP dengan nominal lebih dari Rp 900.000</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Approval" value="4" icon={<AlertTriangle className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Disetujui Bulan Ini" value="18" icon={<BadgeCheck className="w-5 h-5 text-sky-500" />} />
          <MetricCard title="Total SPP Selesai" value="142" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
          <MetricCard title="Total Nilai Disetujui" value="Rp 49M" icon={<span className="text-slate-400 font-bold">Rp</span>} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Menunggu Persetujuan Anda (NEED_DIRECTOR_APPROVAL)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0139"
            purchaseType="Kebutuhan"
            statusBadge={{ text: "Perlu Approval Direktur", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
            title="Sparepart Conveyor Line 3"
            userName="Dimas Prakoso"
            division="Produksi"
            currentStepInfo="Approval Seluruh Divisi (Harga > 900k)"
            amount="Rp 9.310.000"
            progressPercent={71}
          />
        </div>
      </div>
    </>
  );
}
