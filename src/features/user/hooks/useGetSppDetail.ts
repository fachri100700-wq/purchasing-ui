import { useCallback, useState } from "react";
import type { SppDetailData } from "../../../types/ApiResponse";
import { GetSppDetailApi } from "../api/spp.api";
import { toast } from "sonner";

export function useGetSppDetail() {
  const [data, setData] = useState<SppDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSppDetail = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await GetSppDetailApi(id);

      setData(res);

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat mengambil detail SPP",
      );

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, isError, fetchSppDetail };
}