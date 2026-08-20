import { useCallback, useEffect, useState } from "react";
import type { SppDataNormal } from "../../../types/ApiResponse";
import { GetSppDetailApi } from "../api/spp.api";
import { toast } from "sonner";

export function useGetSppDetail(id: string) {
  const [data, setData] = useState<SppDataNormal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSppDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await GetSppDetailApi(id);

      setData(res);

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil detail SPP",
      );

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSppDetail();
  }, [fetchSppDetail]);

  return { data, isLoading, isError, fetchSppDetail };
}
