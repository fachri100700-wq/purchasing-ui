import { useCallback, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { DireksiApproveApi } from "../api/direksi.api";

export function useApproveDireksi() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const res = await DireksiApproveApi(id);

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
  }, [navigate]);

  return { isLoading, handleApprove };
}
