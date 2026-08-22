import type { SppDataNormal, SppStatus } from "../types/ApiResponse";
import { formatDate } from "./formatDate";

export type StageStatus =
  | "done"
  | "current"
  | "pending"
  | "skipped"
  | "rejected";

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

  const findApproval = (role: string) =>
    data.approvals?.find(
      (approval) =>
        approval.user.role === role &&
        approval.approvalStatus === "approved",
    );

  const findReject = (role: string) =>
    data.approvals?.find(
      (approval) =>
        approval.user.role === role &&
        approval.approvalStatus === "reject",
    );

  const leaderApp = findApproval("leader_divition");
  const gudangApp = findApproval("gudang");
  const auditApp = findApproval("audit");
  const directorApp = findApproval("director");

  const leaderRej = findReject("leader_divition");
  const gudangRej = findReject("gudang");
  const auditRej = findReject("audit");
  const directorRej = findReject("director");

  const rejectedRole =
    leaderRej?.user.role ??
    gudangRej?.user.role ??
    auditRej?.user.role ??
    directorRej?.user.role;

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
        return 5;

      case "need_director_approval":
        return 5;

      case "director_approved":
        return 6;

      case "po_created":
      case "completed":
        return 6;

      case "rejected":
      
        if (rejectedRole === "leader_divition") {
          return 1;
        }

        if (rejectedRole === "gudang") {
          return 2;
        }

        if (rejectedRole === "audit") {
          return 3;
        }

        if (rejectedRole === "direksi") {
          return 5;
        }

        return 0;

      default:
        return 0;
    }
  };

  const activeIndex = getCurrentStageIndex(currentStatus);

  const getStatus = (
    stageIndex: number,
    approvalRole?: string,
  ): StageStatus => {
  
    if (
      currentStatus === "rejected" &&
      approvalRole === rejectedRole
    ) {
      return "rejected";
    }

    if (currentStatus === "rejected") {
      if (stageIndex < activeIndex) {
        return "done";
      }

      if (stageIndex > activeIndex) {
        return "skipped";
      }
    }

    if (stageIndex < activeIndex) {
      return "done";
    }

    if (stageIndex === activeIndex) {
      return "current";
    }

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
      status: getStatus(1, "leader_divition"),

      actor:
        leaderApp?.user.fullName ??
        leaderRej?.user.fullName,

      at:
        leaderApp
          ? formatDate(leaderApp.createdAt)
          : leaderRej
            ? formatDate(leaderRej.createdAt)
            : undefined,
    },

    {
      key: "gudang_approved",
      label: "Cek & Approval Gudang",
      role: "Tim Gudang",
      status: getStatus(2, "gudang"),

      actor:
        gudangApp?.user.fullName ??
        gudangRej?.user.fullName,

      at:
        gudangApp
          ? formatDate(gudangApp.createdAt)
          : gudangRej
            ? formatDate(gudangRej.createdAt)
            : undefined,
    },

    {
      key: "audit_initial_approved",
      label: "Verifikasi Awal Audit",
      role: "Tim Audit",
      status: getStatus(3, "audit"),

      actor:
        auditApp?.user.fullName ??
        auditRej?.user.fullName,

      at:
        auditApp
          ? formatDate(auditApp.createdAt)
          : auditRej
            ? formatDate(auditRej.createdAt)
            : undefined,
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
      status: getStatus(5, "director"),

      actor:
        directorApp?.user.fullName ??
        directorRej?.user.fullName,

      at:
        directorApp
          ? formatDate(directorApp.createdAt)
          : directorRej
            ? formatDate(directorRej.createdAt)
            : undefined,
    },

    {
      key: "completed",
      label: "SPP Selesai",
      role: "Sistem",
      status: getStatus(6),

      at:
        currentStatus === "completed"
          ? formatDate(data.createdAt)
          : undefined,
    },
  ];
}