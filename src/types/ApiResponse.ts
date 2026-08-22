import type { userRoles } from "../../../purchasing-service/src/common/enums/roles.enum";

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export type UserData = {
  id: string;
  fullName: string;
  email: string;
  role: userRoles;
  division: string;
};

export type LoginResponse = {
  access_token: string;
  user: UserData;
};

// ===================== SPP Types =====================

export type SppStatus =
  | "submitted"
  | "leader_divisi_approved"
  | "gudang_approved"
  | "audit_initial_approved"
  | "purchasing_comparison_submitted"
  | "audit_review_requested"
  | "need_director_approval"
  | "director_approved"
  | "po_created"
  | "completed"
  | "rejected";

export type PurchaseType = "routine" | "necessary";

export type SppPriority = "standard" | "urgent";

export type SourcingType = "local" | "import";

export type BudgetComplianceStatus =
  | "within_budget"
  | "budget_exceeded"
  | "unbudgeted";

export type ApprovalStatus = "approved" | "reject" | "pending";

export interface SppApproval {
  id: string;
  approvalStatus: ApprovalStatus;
  rejectionReason: string
  createdAt: string;
  user: UserData;
}

export interface SppDetailItem {
  id: string;
  sppId: string;
  productName: string;
  brandOrType: string | null;
  size: string | null;
  quantity: number;
  intendedPurpose: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface SppDataNormal {
  id: string;
  userId: string;
  sppNo: string;
  title: string;
  purchaseType: PurchaseType;
  status: SppStatus;
  priority: SppPriority;
  sourcingType: SourcingType;
  budgetComplianceStatus: BudgetComplianceStatus;
  createdAt: string;
  user: UserData;
  sppDetails: SppDetailItem[];
  approvals?: SppApproval[];
  comparisonPapers?: unknown[];
}

//khusus untuk getAll karena menampilkan name dan division
export type SppData = {
  id: string;
  sppNo: string;
  title: string;
  purchaseType: PurchaseType;
  status: SppStatus;
  priority: SppPriority;
  sourcingType: SourcingType;
  budgetComplianceStatus: BudgetComplianceStatus;
  createdAt?: string;
  rejectionReason?: string | null;
  name?: string,
  division?: string
};

export type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedData<T> = {
  data: T[];
  pagination: PaginationData;
};
