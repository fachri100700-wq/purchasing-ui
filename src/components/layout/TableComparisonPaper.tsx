import { formatIDR } from "../../helpers/formatCurrency";

interface TableComparisonPaperProps {
  comparisonPaper: any[];
}

export default function TableComparisonPaper({
  comparisonPaper,
}: TableComparisonPaperProps) {
  return (
    <section className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
      <h2 className="text-base font-semibold text-slate-900">
        Perbandingan harga vendor
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {comparisonPaper.map((v) => (
          <div
            key={v.vendor}
            className={`rounded-2xl border p-4 transition-all ${
              v.recommended
                ? "border-sky-500 bg-sky-50/80 shadow-sm"
                : "border-slate-200 bg-white/70"
            }`}
          >
            <p className="text-sm font-medium text-slate-900">{v.vendor}</p>
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
  );
}
