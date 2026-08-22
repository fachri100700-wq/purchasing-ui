import { AlertTriangle, MessageSquareWarning } from "lucide-react";

interface RejectionReasonProps {
  reason: string;
}

export default function RejectionReason({
  reason,
}: RejectionReasonProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-rose-200 bg-white/70 shadow-lg shadow-rose-900/5 backdrop-blur-md">
      <div className="flex items-center gap-3 border-b border-rose-100 bg-rose-50/80 px-5 py-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <AlertTriangle className="size-5" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-rose-900">
            Pengajuan Ditolak
          </h3>

          <p className="mt-0.5 text-xs text-rose-600">
            Pengajuan ini memerlukan perbaikan sebelum dapat diajukan kembali.
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-3">
          <MessageSquareWarning className="mt-0.5 size-4 shrink-0 text-rose-500" />

          <div>
            <p className="mb-1 text-xs font-semibold text-slate-500">
              Alasan Penolakan
            </p>

            <p className="text-sm leading-6 text-slate-700">
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}