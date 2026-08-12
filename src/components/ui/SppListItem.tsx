import React from "react";
import { ChevronRight } from "lucide-react";

interface SppListItemProps {
  sppNo: string;
  purchaseType: "Rutin" | "Kebutuhan";
  statusBadge: { text: string; colorClass: string };
  title: string;
  userName: string;
  division: string;
  currentStepInfo: string;
  amount: string;
  progressPercent: number;
}

export default function SppListItem({
  sppNo,
  purchaseType,
  statusBadge,
  title,
  userName,
  division,
  currentStepInfo,
  amount,
  progressPercent,
}: SppListItemProps) {
  
  const typeBadgeClass = purchaseType === "Rutin" 
    ? "bg-sky-100 text-sky-700 border-sky-200"
    : "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-colors cursor-pointer flex flex-col gap-3 group shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-500">{sppNo}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${typeBadgeClass}`}>
              {purchaseType}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusBadge.colorClass}`}>
              {statusBadge.text}
            </span>
          </div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">
            {userName} · {division} · Tahap: {currentStepInfo}
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="font-semibold text-slate-900">{amount}</p>
          <p className="text-[10px] text-slate-400 mt-1">{progressPercent}% progres</p>
        </div>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
        <div 
          className="bg-slate-900 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
