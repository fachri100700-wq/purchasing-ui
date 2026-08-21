import { useCallback, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuditApproveApi } from "../api/gudang.api";

export function useApproveAudit() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const res = await AuditApproveApi(id);

      navigate("/dashboard");

      toast.success("Spp telah berhasil di setujui");

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil detail SPP",
      );

    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, handleApprove };
}
