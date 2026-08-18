
import { ShoppingCart, FileSpreadsheet, CheckCircle, ArrowRight } from "lucide-react";
import MetricCard from "../../components/ui/MetricCard";
import SppListItem from "../../components/ui/SppListItem";

export default function LeaderPurchasingDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Leader Purchasing</h1>
          <p className="text-sm text-slate-600">Perbandingan harga (Comparison Paper) dan penerbitan Purchase Order (PO)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Comparison" value="12" icon={<FileSpreadsheet className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Perlu Terbit PO" value="5" icon={<ShoppingCart className="w-5 h-5 text-sky-500" />} />
          <MetricCard title="PO Terbit (Bulan Ini)" value="38" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-slate-900">Butuh Comparison (AUDIT_APPROVED)</h2>
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          <div className="space-y-3">
            <SppListItem 
              sppNo="SPP-2026-0165"
              purchaseType="Kebutuhan"
              statusBadge={{ text: "Tugas Comparison", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
              title="Sparepart Mesin Bubut"
              userName="Joko"
              division="Produksi"
              currentStepInfo="Assignment Purchasing (Harga)"
              amount="Rp 45.000.000"
              progressPercent={45}
            />
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-slate-900">Siap Terbit PO</h2>
            <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          
          <div className="space-y-3">
            <SppListItem 
              sppNo="SPP-2026-0130"
              purchaseType="Rutin"
              statusBadge={{ text: "Siap PO", colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200" }}
              title="Konsumsi Rapat Mingguan"
              userName="Nurul"
              division="General Affair"
              currentStepInfo="Pembuatan PO"
              amount="Rp 744.000"
              progressPercent={92}
            />
          </div>
        </div>
      </div>
    </>
  );
}
