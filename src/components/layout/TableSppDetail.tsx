import { formatDate } from "../../helpers/formatDate";
import type { SppDataNormal } from "../../types/ApiResponse";

interface BadgeProp {
  label?: string;
  colorClass: string;
}

interface StatusBadgeProp {
  text?: string;
  colorClass: string;
}

interface TableSppDetailProps {
  purchaseType: BadgeProp;
  priority: BadgeProp;
  sourcing: BadgeProp;
  budgetCompliance: BadgeProp;
  currentStatus: StatusBadgeProp;
  data: SppDataNormal;
}

export default function TableSppDetail({
  purchaseType,
  priority,
  sourcing,
  budgetCompliance,
  currentStatus,
  data,
}: TableSppDetailProps) {
  return (
    <section className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${purchaseType.colorClass}`}
        >
          {purchaseType.label ?? "-"}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${priority.colorClass}`}
        >
          {priority.label ?? "-"}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${sourcing.colorClass}`}
        >
          {sourcing.label ?? "-"}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${budgetCompliance.colorClass}`}
        >
          {budgetCompliance.label ?? "-"}
        </span>
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${currentStatus.colorClass}`}
        >
          {currentStatus.text ?? "-"}
        </span>
      </div>

      <h1 className="mt-4 text-lg font-bold text-slate-900">{data.sppNo}</h1>
      <p className="text-xs text-slate-400">
        Dibuat pada tanggal {formatDate(data?.createdAt)}
      </p>

      {/* TABEL BARANG */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
            <tr>
              <th className="pb-3 font-medium">Barang</th>
              <th className="pb-3 font-medium">Merek / Tipe</th>
              <th className="pb-3 font-medium">Ukuran</th>
              <th className="pb-3 font-medium">Qty</th>
              <th className="pb-3 font-medium">Keperluan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data?.sppDetails.map((sd, idx) => (
              <tr key={sd.id ?? idx} className="hover:bg-slate-50/50">
                <td className="py-3 font-medium text-slate-900">
                  {sd.productName}
                </td>
                <td className="py-3 text-slate-500">{sd.brandOrType ?? "-"}</td>
                <td className="py-3 text-slate-500">{sd.size ?? "-"}</td>
                <td className="py-3 font-semibold text-slate-900">
                  {sd.quantity} Pcs
                </td>
                <td className="py-3 text-slate-500">
                  {sd.intendedPurpose ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}