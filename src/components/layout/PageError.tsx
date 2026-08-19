import { AlertTriangle, RefreshCw } from "lucide-react";
import { backgroundContainer } from "../../components/ui/styles";

interface DashboardErrorProps {
  onRetry?: () => void;
}

export default function PageError({
  onRetry,
}: DashboardErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div
        className={`${backgroundContainer} flex w-full max-w-md flex-col items-center justify-center gap-5 py-12 text-center`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 shadow-sm">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Gagal memuat dashboard
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Terjadi masalah saat mengambil data pengguna. Silakan coba lagi.
          </p>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Coba lagi
          </button>
        )}
      </div>
    </div>
  );
}