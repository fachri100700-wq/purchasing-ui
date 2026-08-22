import { useCallback, useState } from "react";
import { LeaderDivisionRejectApi } from "../api/leaderDivision.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useRejectLeaderDivision() {
  const navigate = useNavigate();
  const [isRejecting, setIsRejecting] = useState(false);

  const handleReject = useCallback(
    async (id: string, rejectionReason: string) => {
      try {
        setIsRejecting(true);

        const res = await LeaderDivisionRejectApi(id, rejectionReason);

        navigate("/dashboard");
        toast.success("SPP telah berhasil ditolak");

        return res;
      } catch (error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(
          err.response?.data?.message ||
            "Terjadi kesalahan saat menolak SPP",
        );
      } finally {
        setIsRejecting(false);
      }
    },
    [navigate]
  );

  return {
    handleReject,
    isRejecting,
  };
}