import React from "react";
import { backgroundContainer } from "./styles";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className={`${backgroundContainer} flex flex-col justify-between h-[104px]`}>
      <div className="flex justify-between items-start">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="text-slate-400">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
