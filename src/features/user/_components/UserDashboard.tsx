import React from "react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";
import { FileText, Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function UserDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Pemohon</h1>
            <p className="text-sm text-slate-600">Pantau status pengajuan SPP Anda</p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 px-5 rounded-xl transition-all shadow-md active:scale-[0.99]">
            Ajukan SPP Baru
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Pengajuan" value="12" icon={<FileText className="w-5 h-5" />} />
          <MetricCard title="Sedang Diproses" value="3" icon={<Clock className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Selesai (Bulan Ini)" value="8" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
          <MetricCard title="Ditolak" value="1" icon={<ArrowRight className="w-5 h-5 text-rose-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Pengajuan Terbaru Anda</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0141"
            purchaseType="Rutin"
            statusBadge={{ text: "Menunggu Approval", colorClass: "bg-sky-100 text-sky-700 border-sky-200" }}
            title="Pengadaan ATK Bulanan"
            userName="User Pemohon"
            division="Operasional"
            currentStepInfo="Approval Kepala Bagian"
            amount="Rp 1.955.000"
            progressPercent={15}
          />
          <SppListItem 
            sppNo="SPP-2026-0142"
            purchaseType="Kebutuhan"
            statusBadge={{ text: "Sedang Diproses", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
            title="Penggantian Unit AC Ruang Server"
            userName="User Pemohon"
            division="IT Infrastructure"
            currentStepInfo="Approval Direktur"
            amount="Rp 16.600.000"
            progressPercent={70}
          />
          <SppListItem 
            sppNo="SPP-2026-0126"
            purchaseType="Kebutuhan"
            statusBadge={{ text: "Selesai", colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200" }}
            title="Seragam Safety Tim Gudang"
            userName="User Pemohon"
            division="Warehouse"
            currentStepInfo="Selesai Penuh"
            amount="Rp 20.400.000"
            progressPercent={100}
          />
        </div>
      </div>
    </>
  );
}
