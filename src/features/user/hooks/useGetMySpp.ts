import { useCallback, useEffect, useState } from "react";
import type { PaginatedData, SppData } from "../../../types/ApiResponse";
import { GetMySppApi } from "../api/spp.api";

import { toast } from "sonner";
import type { QuerySppDTO } from "../schema/query-spp.schema";

export function useGetMySpp() {
  const [data, setData] = useState<PaginatedData<SppData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSpp = useCallback(async (query?: QuerySppDTO) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await GetMySppApi(query);

      setData(res);

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat mengambil data SPP",
      );

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSpp();
  }, [fetchSpp]);

  return { data, isLoading, isError, fetchSpp };
}