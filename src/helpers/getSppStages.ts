import type { SppDataNormal, SppStatus } from "../types/ApiResponse"; // Sesuaikan path interface lu
import { formatDate } from "./formatDate";

export type StageStatus = "done" | "current" | "pending" | "skipped" | "rejected";

export interface SppStage {
  key: string;
  label: string;
  role: string;
  status: StageStatus;
  actor?: string;
  at?: string;
}

export function getSppStages(data: SppDataNormal): SppStage[] {
  const currentStatus = data.status;
  const isRejected = currentStatus === "rejected";

  const findApproval = (role: string) =>
    data.approvals?.find((a) => a.user.role === role && a.approvalStatus === "approved");

  const leaderApp = findApproval("leader_divition");
  const gudangApp = findApproval("gudang");
  const auditApp = findApproval("audit");
  const directorApp = findApproval("director");

  // Map status backend ke index tahap yang SEDANG BERJALAN (Current)
  const getCurrentStageIndex = (status: SppStatus): number => {
    switch (status) {
      case "submitted":
        return 1; 
      case "leader_divisi_approved":
        return 2; 
      case "gudang_approved":
        return 3;
      case "audit_initial_approved":
        return 4; 
      case "purchasing_comparison_submitted":
        return 5; 
      case "audit_review_requested":
        return 6; 
      case "need_director_approval":
      case "director_approved":
        return 7;
      case "po_created":
      case "completed":
        return 8;
      default:
        return 0;
    }
  };

  const activeIndex = getCurrentStageIndex(currentStatus);

  const getStatus = (stageIndex: number): StageStatus => {
    if (isRejected) {
      if (stageIndex < activeIndex) return "done";
      if (stageIndex === activeIndex) return "rejected";
      return "skipped";
    }

    if (stageIndex < activeIndex) return "done";       
    if (stageIndex === activeIndex) return "current";   
    return "pending";                                  
  };

  return [
    {
      key: "submitted",
      label: "Pengajuan SPP",
      role: "Pemohon",
      status: getStatus(0),
      actor: data.user.fullName,
      at: formatDate(data.createdAt),
    },
    {
      key: "leader_divisi_approved",
      label: "Approval Leader Divisi",
      role: "Leader Divisi",
      status: getStatus(1),
      actor: leaderApp?.user.fullName,
      at: leaderApp ? formatDate(leaderApp.createdAt) : undefined,
    },
    {
      key: "gudang_approved",
      label: "Cek & Approval Gudang",
      role: "Tim Gudang",
      status: getStatus(2),
      actor: gudangApp?.user.fullName,
      at: gudangApp ? formatDate(gudangApp.createdAt) : undefined,
    },
    {
      key: "audit_initial_approved",
      label: "Verifikasi Awal Audit",
      role: "Tim Audit",
      status: getStatus(3),
      actor: auditApp?.user.fullName,
      at: auditApp ? formatDate(auditApp.createdAt) : undefined,
    },
    {
      key: "purchasing_comparison_submitted",
      label: "Upload Berkas Perbandingan",
      role: "Tim Purchasing",
      status: getStatus(4),
    },
    {
      key: "need_director_approval",
      label: "Persetujuan Direksi",
      role: "Direktur",
      status: getStatus(5),
      actor: directorApp?.user.fullName,
      at: directorApp ? formatDate(directorApp.createdAt) : undefined,
    },
    {
      key: "completed",
      label: "SPP Selesai",
      role: "Sistem",
      status: getStatus(6),
      at: currentStatus === "completed" ? formatDate(data.createdAt) : undefined,
    },
  ];
}