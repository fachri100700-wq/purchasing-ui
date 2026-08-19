import { Banknote, FileSignature, CheckCircle, ArrowRight } from "lucide-react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";

export default function KasirDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Kasir</h1>
          <p className="text-sm text-slate-600">Manajemen pembayaran (SppPayment) untuk PO yang telah disetujui</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Pembayaran" value="6" icon={<FileSignature className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Total Dibayarkan (Bulan Ini)" value="41" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
          <MetricCard title="Total Nilai (Bulan Ini)" value="Rp 120M" icon={<Banknote className="w-5 h-5 text-sky-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Antrean Pembayaran (PO_APPROVED / COMPLETED)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0112"
            purchaseType="Rutin"
            statusBadge={{ text: "Menunggu Pembayaran", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
            title="Langganan Internet Kantor"
            userName="Budi"
            division="IT Infrastructure"
            currentStepInfo="Pembuatan SppPayment"
            amount="Rp 5.500.000"
            progressPercent={100}
          />
        </div>
      </div>
    </>
  );
}
