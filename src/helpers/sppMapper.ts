import type {
  BudgetComplianceStatus,
  PurchaseType,
  SourcingType,
  SppPriority,
  SppStatus,
} from "../types/ApiResponse";
import { SPP_STATUS } from "../types/sppEnums";

export const getStatusBadge = (status?: SppStatus) => {
  switch (status) {
    case SPP_STATUS.SUBMITTED:
    case SPP_STATUS.LEADER_DIVISI_APPROVED:
    case SPP_STATUS.GUDANG_APPROVED:
      return {
        text: "Menunggu Approval",
        colorClass: "bg-sky-100 text-sky-700 border-sky-200",
      };
    case SPP_STATUS.AUDIT_INITIAL_APPROVED:
    case SPP_STATUS.PURCHASING_COMPARISON_SUBMITTED:
    case SPP_STATUS.AUDIT_REVIEW_REQUESTED:
    case SPP_STATUS.NEED_DIRECTOR_APPROVAL:
      return {
        text: "Sedang Diproses",
        colorClass: "bg-amber-100 text-amber-700 border-amber-200",
      };
    case SPP_STATUS.DIRECTOR_APPROVED:
    case SPP_STATUS.PO_CREATED:
    case SPP_STATUS.COMPLETED:
      return {
        text: "Selesai",
        colorClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
      };
    case SPP_STATUS.REJECTED:
      return {
        text: "Ditolak",
        colorClass: "bg-rose-100 text-rose-700 border-rose-200",
      };
    default:
      return {
        text: "Diproses",
        colorClass: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
};

export const getStepInfo = (
  status?: SppStatus,
): { step: string; progress: number } => {
  switch (status) {
    case SPP_STATUS.SUBMITTED:
      return { step: "Approval Kepala Bagian", progress: 15 };
    case SPP_STATUS.LEADER_DIVISI_APPROVED:
      return { step: "Approval Gudang", progress: 30 };
    case SPP_STATUS.GUDANG_APPROVED:
      return { step: "Verifikasi Audit", progress: 45 };
    case SPP_STATUS.AUDIT_INITIAL_APPROVED:
      return { step: "Perbandingan Harga", progress: 60 };
    case SPP_STATUS.PURCHASING_COMPARISON_SUBMITTED:
      return { step: "Verifikasi Kepala Audit", progress: 70 };
    case SPP_STATUS.AUDIT_REVIEW_REQUESTED:
      return { step: "Verifikasi Kepala Audit", progress: 75 };
    case SPP_STATUS.NEED_DIRECTOR_APPROVAL:
      return { step: "Approval Direktur", progress: 85 };
    case SPP_STATUS.DIRECTOR_APPROVED:
      return { step: "Pembuatan PO", progress: 90 };
    case SPP_STATUS.PO_CREATED:
      return { step: "Proses Pembelian", progress: 95 };
    case SPP_STATUS.COMPLETED:
      return { step: "Selesai Penuh", progress: 100 };
    case SPP_STATUS.REJECTED:
      return { step: "Ditolak", progress: 0 };
    default:
      return { step: "Diproses", progress: 10 };
  }
};

export function purchaseTypeBadge(type?: PurchaseType) {
  switch (type) {
    case "routine":
      return {
        label: "Rutin",
        colorClass: "bg-sky-100 font-medium text-sky-700",
      };
    case "necessary":
      return {
        label: "Kebutuhan",
        colorClass: "bg-amber-100 font-medium text-amber-700",
      };
    default:
      return {
        label: type,
        colorClass: "bg-slate-100 font-medium text-slate-700",
      };
  }
}
export function priorityBadge(priority?: SppPriority) {
  switch (priority) {
    case "urgent":
      return {
        label: "Mendesak",
        colorClass: "bg-amber-100 font-medium text-amber-700",
      };
    case "standard":
      return {
        label: "Biasa",
        colorClass: "bg-slate-100 font-medium text-slate-600",
      };
    default:
      return {
        label: priority,
        colorClass: "bg-slate-100 font-medium text-slate-600",
      };
  }
}

export function sourcingBadge(sourcing?: SourcingType) {
  switch (sourcing) {
    case "import":
      return {
        label: "Import",
        colorClass: "bg-sky-100 font-medium text-sky-700",
      };
    case "local":
      return {
        label: "Lokal",
        colorClass: "bg-indigo-100 font-medium text-indigo-700",
      };
    default:
      return {
        label: sourcing,
        colorClass: "bg-slate-100 font-medium text-slate-600",
      };
  }
}

export function budgetComplianceBadge(type?: BudgetComplianceStatus) {
  switch (type) {
    case "budget_exceeded":
      return {
        label: "Pengajuan Melebihi Budget",
        colorClass: "bg-rose-100 font-medium text-rose-700",
      };
    case "within_budget":
      return {
        label: "Sesuai Budget",
        colorClass: "bg-emerald-100 font-medium text-emerald-700",
      };
    case "unbudgeted":
      return {
        label: "Tidak Termasuk List Budget",
        colorClass: "bg-slate-100 font-medium text-slate-600",
      };
    default:
      return {
        label: type,
        colorClass: "bg-slate-100 font-medium text-slate-600",
      };
  }
}
