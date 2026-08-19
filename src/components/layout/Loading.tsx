import { LoaderCircle } from "lucide-react";
import { backgroundContainer } from "../ui/styles";

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div
        className={`${backgroundContainer} flex w-full max-w-md flex-col items-center justify-center gap-4 py-12`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100/80 shadow-sm">
          <LoaderCircle className="h-7 w-7 animate-spin text-sky-600" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Memuat dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sedang menyiapkan data untuk Anda...
          </p>
        </div>
      </div>
    </div>
  );
}