import DashboardLayout from "../../components/layout/DashboardLayout";
import SppStage from "../../components/layout/SppStage";
import { Printer} from "lucide-react";
import {
  budgetComplianceBadge,
  getStatusBadge,
  getStepInfo,
  priorityBadge,
  purchaseTypeBadge,
  sourcingBadge,
} from "../../helpers/sppMapper";
import { useGetSppDetail } from "../../features/user/hooks/useGetSppDetail";
import DashboardLoading from "../../components/layout/Loading";
import PageError from "../../components/layout/PageError";
import { useParams } from "react-router-dom";
import { getSppStages } from "../../helpers/getSppStages";
import TableSppDetail from "../../components/layout/TableSppDetail";

const vendorQuotes = [
  {
    vendor: "CV Mitra Teknik Jaya",
    price: 9310000,
    lead: "3 hari",
    rating: 4.8,
    recommended: true,
  },
  {
    vendor: "PT Andalan Sparepart",
    price: 9750000,
    lead: "2 hari",
    rating: 4.5,
    recommended: false,
  },
  {
    vendor: "UD Karya Mandiri",
    price: 8990000,
    lead: "7 hari",
    rating: 4.1,
    recommended: false,
  },
];

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);



// ==========================================
// 4. MAIN PAGE COMPONENT
// ==========================================
export default function SppDetailPage() {

  const { id } = useParams();

  const { data, isLoading, isError } = useGetSppDetail(id as string);

  if (isLoading || !data) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <PageError />;
  }

  const purchaseType = purchaseTypeBadge(data?.purchaseType);
  const priority = priorityBadge(data?.priority);
  const sourcing = sourcingBadge(data?.sourcingType);
  const budgetCompliance = budgetComplianceBadge(data?.budgetComplianceStatus);
  const currentStatus = getStatusBadge(data?.status);
  const progres = getStepInfo(data?.status);

  const stages = getSppStages(data);

  return (
    <DashboardLayout>
      {/* Header Utama Page */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {data?.title}
          </h1>
          <p className="text-sm text-slate-500">
            {data?.user.fullName} · {data?.user.division}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/dashboard"
            className="rounded-full border border-slate-200 bg-white px-5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
          >
            Kembali
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* KOLOM KIRI */}
        <div className="space-y-6">
          <TableSppDetail
          purchaseType={purchaseType}
          priority={priority}
          sourcing={sourcing}
          budgetCompliance={budgetCompliance}
          currentStatus={currentStatus}
          data={data}
          />

          {/* PERBANDINGAN HARGA VENDOR */}
          <section className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
            <h2 className="text-base font-semibold text-slate-900">
              Perbandingan harga vendor
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {vendorQuotes.map((v) => (
                <div
                  key={v.vendor}
                  className={`rounded-2xl border p-4 transition-all ${
                    v.recommended
                      ? "border-sky-500 bg-sky-50/80 shadow-sm"
                      : "border-slate-200 bg-white/70"
                  }`}
                >
                  <p className="text-sm font-medium text-slate-900">
                    {v.vendor}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {formatIDR(v.price)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Lead time {v.lead} · Rating {v.rating}
                  </p>
                  {v.recommended ? (
                    <p className="mt-2 text-xs font-medium text-sky-700">
                      Direkomendasikan purchasing
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* KOLOM KANAN */}
        <aside className="space-y-4">
          {/* ALUR APPROVAL LOG */}
          <SppStage
          progres={progres}
          stages={stages}
          />

          {/* ACTION BUTTONS */}
          <div className="border border-white/50 bg-white/60 shadow-lg shadow-sky-900/5 backdrop-blur-md rounded-2xl p-5">
            <div className="mt-4 grid gap-2">
              {/* <button
                type="button"
                onClick={() =>
                  toast.success("Disetujui", { description: "Selesai" })
                }
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                Setujui
              </button>
              <button
                type="button"
                onClick={() => toast.error("Pengajuan ditolak")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all disabled:opacity-50"
              >
                Tolak
              </button> */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all"
              >
                <Printer className="size-4" /> Cetak dokumen
              </button>
            </div>
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}
