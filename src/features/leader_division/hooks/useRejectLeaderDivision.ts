import { useCallback } from "react";
import { LeaderDivisionRejectApi } from "../api/leaderDivision.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { rejectSchema, type RejectDTO } from "../schema/reject.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useRejectLeaderDivision() {
  const navigate = useNavigate();

  const form = useForm<RejectDTO>({
    resolver: zodResolver(rejectSchema),
    defaultValues: {
      rejectionReason: "",
    },
  });

  const onSubmit = useCallback(
    async (id: string, data?: RejectDTO) => {
      try {
        const res = await LeaderDivisionRejectApi(id, data?.rejectionReason);

        navigate("/dashboard");
        toast.success("SPP telah berhasil ditolak");

        return res;
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(
          err.response?.data?.message ||
            "Terjadi kesalahan saat menolak SPP",
        );
      }
    },
    [navigate]
  );

  const handleReject = (id: string) => {
    return form.handleSubmit((data) => onSubmit(id, data))();
  };

  return {
    register: form.register,
    handleSubmit: handleReject,
    errors: form.formState.errors,
    isRejecting: form.formState.isSubmitting,
  };
}