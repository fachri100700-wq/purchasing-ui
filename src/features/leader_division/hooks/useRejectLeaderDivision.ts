import { useCallback, useState } from "react";
import {  LeaderDivisionRejectApi } from "../api/leaderDivision.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useRejectLeaderDivision() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleReject = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const res = await LeaderDivisionRejectApi(id);

      navigate("/dashboard")

      toast.success("Spp telah berhasil di tolak")

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

  return { isLoading, handleReject };
}
