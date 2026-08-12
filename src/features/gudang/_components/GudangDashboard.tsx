import React from "react";
import MetricCard from "../../../components/ui/MetricCard";
import SppListItem from "../../../components/ui/SppListItem";
import { Package, Inbox, CheckCircle, ArrowRight } from "lucide-react";

export default function GudangDashboard() {
  return (
    <>
      {/* Header & Metrics */}
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Gudang</h1>
          <p className="text-sm text-slate-600">Pengecekan stok untuk auto-approve pengajuan SPP</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Menunggu Cek Stok" value="5" icon={<Inbox className="w-5 h-5 text-amber-500" />} />
          <MetricCard title="Auto-Approved" value="24" icon={<CheckCircle className="w-5 h-5 text-emerald-500" />} />
          <MetricCard title="Total SPP Diproses" value="132" icon={<Package className="w-5 h-5 text-sky-500" />} />
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white/50 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-bold text-slate-900">Antrean Pengecekan (LEADER_DIVISI_APPROVED)</h2>
          <a href="#" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            Lihat semua <ArrowRight className="w-3 h-3" />
          </a>
        </div>
        
        <div className="space-y-3">
          <SppListItem 
            sppNo="SPP-2026-0155"
            purchaseType="Rutin"
            statusBadge={{ text: "Perlu Cek Stok", colorClass: "bg-amber-100 text-amber-700 border-amber-200" }}
            title="Kertas HVS A4 100 Rim"
            userName="Siti (GA)"
            division="General Affair"
            currentStepInfo="Approval Gudang (Cek Stok)"
            amount="Rp 4.500.000"
            progressPercent={25}
          />
        </div>
      </div>
    </>
  );
}
