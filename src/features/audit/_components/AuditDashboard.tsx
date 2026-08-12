import React from "react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";
import { Search, AlertCircle, FileCheck, ArrowRight } from "lucide-react";

export default function AuditDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Audit</h1>
          <p className="text-sm text-slate-600">Verifikasi kelengkapan dokumen dan anggaran pengajuan SPP</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Perlu Verifikasi" value="8" icon={<AlertCircle className="w-5 h-5 text-rose-500" />} />
          <MetricCard title="Sedang Dicek" value="3" icon={<Search className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Terverifikasi (Bulan Ini)" value="45" icon={<FileCheck className="w-5 h-5 text-emerald-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Antrean Verifikasi (GUDANG_APPROVED)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0160"
            purchaseType="Kebutuhan"
            statusBadge={{ text: "Perlu Audit", colorClass: "bg-rose-100 text-rose-700 border-rose-200" }}
            title="Sewa Kendaraan Proyek"
            userName="Agus (Tim Proyek)"
            division="Operasional"
            currentStepInfo="Verifikasi Audit"
            amount="Rp 8.500.000"
            progressPercent={35}
          />
        </div>
      </div>
    </>
  );
}
