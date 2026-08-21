import {
  CheckCircle2,
  Loader2,
  X,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { backgroundContainer } from "../../components/ui/styles";
import { useState } from "react";

interface ApproveConfirmModalProps {
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface RejectConfirmModalProps {
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function ApproveConfirmModal({
  isLoading = false,
  onClose,
  onConfirm,
}: ApproveConfirmModalProps) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-md ${backgroundContainer} animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
        </button>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="size-8" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Setujui Pengajuan?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Pastikan seluruh data pada pengajuan SPP sudah sesuai sebelum
            memberikan persetujuan.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Ya, Setujui
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function RejectConfirmModal({
  isLoading = false,
  onClose,
  onConfirm,
}: RejectConfirmModalProps) {
  const [reason, setReason] = useState("");


  const handleConfirm = () => {
    if (!reason.trim()) return;

    onConfirm(reason.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-md ${backgroundContainer} animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="size-4" />
        </button>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600">
            <XCircle className="size-8" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Tolak Pengajuan?</h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Jelaskan alasan penolakan agar pengajuan dapat diperbaiki sebelum
            diajukan kembali.
          </p>
        </div>

        {/* Reason */}
        <div className="mt-6">
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <AlertTriangle className="size-4 text-rose-500" />
            Alasan Penolakan
          </label>

          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isLoading}
            placeholder="Contoh: Harga barang belum sesuai dengan anggaran..."
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-1.5 text-xs text-slate-400">
            Alasan penolakan wajib diisi.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-7 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading || !reason.trim()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <XCircle className="size-4" />
                Ya, Tolak
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
