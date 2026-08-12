import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 flex flex-col justify-between h-[104px]">
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-slate-400">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
