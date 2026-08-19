export const SPP_STATUS = {
  SUBMITTED: "submitted",
  LEADER_DIVISI_APPROVED: "leader_divisi_approved",
  GUDANG_APPROVED: "gudang_approved",
  AUDIT_INITIAL_APPROVED: "audit_initial_approved",
  PURCHASING_COMPARISON_SUBMITTED: "purchasing_comparison_submitted",
  AUDIT_REVIEW_REQUESTED: "audit_review_requested",
  NEED_DIRECTOR_APPROVAL: "need_director_approval",
  DIRECTOR_APPROVED: "director_approved",
  PO_CREATED: "po_created",
  COMPLETED: "completed",
  REJECTED: "rejected",
} as const;

export const PURCHASE_TYPE = {
  ROUTINE: "routine",
  NECESSARY: "necessary",
} as const;

export const SPP_PRIORITY = {
  STANDARD: "standard",
  URGENT: "urgent",
} as const;

export const SOURCING_TYPE = {
  LOCAL: "local",
  IMPORT: "import",
} as const;

export const BUDGET_COMPLIANCE = {
  WITHIN_BUDGET: "within_budget",
  BUDGET_EXCEEDED: "budget_exceeded",
  UNBUDGETED: "unbudgeted",
} as const;