import DashboardLayout from "../../../components/layout/DashboardLayout";
import SppStage from "../../../components/layout/SppStage";
import { Printer } from "lucide-react";
import {
  budgetComplianceBadge,
  getStatusBadge,
  getStepInfo,
  priorityBadge,
  purchaseTypeBadge,
  sourcingBadge,
} from "../../../helpers/sppMapper";
import { useGetSppDetail } from "../../user/hooks/useGetSppDetail";
import DashboardLoading from "../../../components/ui/Loading";
import PageError from "../../../components/layout/PageError";
import { useParams } from "react-router-dom";
import { getSppStages } from "../../../helpers/getSppStages";
import TableSppDetail from "../../../components/layout/TableSppDetail";
import TableComparisonPaper from "../../../components/layout/TableComparisonPaper";
import { Button } from "../../../components/ui/Button";
import { handlePrint } from "../../../helpers/handlePrint";
import { useState } from "react";
import {
  ApproveConfirmModal,
  RejectConfirmModal,
} from "../../../components/ui/ConfirmModal";
import RejectionReason from "../../../components/layout/RejectionReason";
import { useApproveAudit } from "../hooks/useApproveAudit";
import { useRejectAudit } from "../hooks/useRejectAudit";

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

export default function AuditSppDetail() {
  const { id } = useParams();

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetSppDetail(id as string);

  const { isLoading: isApproving, handleApprove } = useApproveAudit();
  const { isLoading: isRejecting, handleReject } = useRejectAudit();

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

  const rejectedApproval = data.approvals
    ?.filter((approval) => approval.approvalStatus === "rejected")
    .at(-1);

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

          {rejectedApproval?.rejectionReason && (
            <RejectionReason reason={rejectedApproval.rejectionReason} />
          )}

          {/* PERBANDINGAN HARGA VENDOR */}
          <TableComparisonPaper comparisonPaper={vendorQuotes} />
        </div>

        {/* KOLOM KANAN */}
        <aside className="space-y-4">
          {/* ALUR APPROVAL LOG */}
          <SppStage progres={progres} stages={stages} />

          {/* ACTION BUTTONS */}
          <div className="border border-white/50 bg-white/60 shadow-lg shadow-sky-900/5 backdrop-blur-md rounded-2xl p-5">
            <div className="mt-4 grid gap-2">
              <Button
                variant="primary"
                label="Setujui"
                onClick={() => setIsApproveModalOpen(true)}
              />
              <Button
                variant="danger"
                label="Tolak"
                onClick={() => setIsRejectModalOpen(true)}
              />
              <Button
                variant="secondary"
                icon={<Printer className="size-4" />}
                label="Cetak Document"
                onClick={handlePrint}
              />
            </div>
          </div>
        </aside>
      </div>
      {isApproveModalOpen === true && (
        <ApproveConfirmModal
          isLoading={isApproving}
          onClose={() => setIsApproveModalOpen(false)}
          onConfirm={() => handleApprove(id as string)}
        />
      )}

      {isRejectModalOpen === true && (
        <RejectConfirmModal
          isLoading={isRejecting}
          onClose={() => setIsRejectModalOpen(false)}
          onConfirm={(reason) => handleReject(id as string, reason)}
        />
      )}
    </DashboardLayout>
  );
}
