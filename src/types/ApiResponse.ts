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

export type SppDetailData = {
  id: string;
  sppId: string;
  productName: string;
  brandOrType: string;
  size: string;
  quantity: number;
  intendedPurpose: string;
  createdAt: string;
  updatedAt: string;
};

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
  sppDetails?: SppDetailData[];
  rejectionReason?: string | null;
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
