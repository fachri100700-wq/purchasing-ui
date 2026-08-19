
import { Users, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";

export default function LeaderDivisionDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Kepala Bagian</h1>
          <p className="text-sm text-slate-600">Review dan persetujuan pengajuan SPP divisi Anda</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Approval" value="4" icon={<AlertCircle className="w-5 h-5 text-rose-500" />} />
          <MetricCard title="Total SPP Divisi" value="28" icon={<Users className="w-5 h-5 text-sky-500" />} />
          <MetricCard title="Disetujui Bulan Ini" value="15" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
          <MetricCard title="Nilai Pengadaan" value="Rp 45.2M" icon={<span className="text-slate-400 font-bold">Rp</span>} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Menunggu Persetujuan Anda (SUBMITTED)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0150"
            purchaseType="Kebutuhan"
            statusBadge={{ text: "Butuh Review", colorClass: "bg-rose-100 text-rose-700 border-rose-200" }}
            title="Pengadaan Laptop Staff Baru"
            userName="Ahmad (Staff IT)"
            division="IT Infrastructure"
            currentStepInfo="Approval Kepala Bagian"
            amount="Rp 12.000.000"
            progressPercent={10}
          />
          <SppListItem 
            sppNo="SPP-2026-0151"
            purchaseType="Rutin"
            statusBadge={{ text: "Butuh Review", colorClass: "bg-rose-100 text-rose-700 border-rose-200" }}
            title="Langganan Cloud Storage"
            userName="Budi (SysAdmin)"
            division="IT Infrastructure"
            currentStepInfo="Approval Kepala Bagian"
            amount="Rp 3.500.000"
            progressPercent={10}
          />
        </div>
      </div>
    </>
  );
}
