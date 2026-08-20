import { Trash2 } from "lucide-react";
import type { PurchaseType } from "../../types/ApiResponse";
import IconButton from "./IconButton";
import SppDate from "./SppDate";

interface SppListItemProps {
  sppNo: string;
  purchaseType: PurchaseType;
  statusBadge: {
    text: string;
    colorClass: string;
  };
  title: string;
  userName: string;
  division: string;
  currentStepInfo: string;
  progressPercent: number;
  date: string;
  isDeleting?: boolean;
  handleDelete?: () => void;
}

export default function SppListItem({
  sppNo,
  purchaseType,
  statusBadge,
  title,
  userName,
  division,
  currentStepInfo,
  progressPercent,
  date,
  isDeleting,
  handleDelete,
}: SppListItemProps) {
  const typeLabel = purchaseType === "routine" ? "Rutin" : "Kebutuhan";

  const typeBadgeClass =
    purchaseType === "routine"
      ? "bg-sky-100 text-sky-700 border-sky-200"
      : "bg-amber-100 text-amber-700 border-amber-200";

  return (
    <div className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">{sppNo}</span>

            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${typeBadgeClass}`}
            >
              {typeLabel}
            </span>

            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusBadge.colorClass}`}
            >
              {statusBadge.text}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          <p className="mt-1 text-xs text-slate-500">
            {userName} · {division} · Tahap: {currentStepInfo}
          </p>

          <div className="mt-2">
            <SppDate date={date} />
          </div>
        </div>

        <div className="flex flex-col items-end text-right">
          <IconButton
            ariaLabel="Hapus item"
            size="sm"
            onClick={handleDelete}
            isDeleting={isDeleting}
          >
            <Trash2 className="size-4" />
          </IconButton>

          <p className="mt-11 text-[10px] text-slate-400">
            {progressPercent}% progres
          </p>
        </div>
      </div>

      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-500"
          style={{
            width: `${progressPercent}%`,
          }}
        />
      </div>
    </div>
  );
}
