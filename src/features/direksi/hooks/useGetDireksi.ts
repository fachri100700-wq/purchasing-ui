import { useCallback, useEffect, useState } from "react";
import type { PaginatedData, SppData } from "../../../types/ApiResponse";
import type { QuerySppDTO } from "../../user/schema/query-spp.schema";

import { toast } from "sonner";
import { GetDireksiApi } from "../api/direksi.api";

interface UseGetLeaderDivisionOptions {
  initialQuery?: QuerySppDTO;
}

export function useGetDireksi(options?: UseGetLeaderDivisionOptions) {
  const [data, setData] = useState<PaginatedData<SppData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchSpp = useCallback(async (query?: QuerySppDTO) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const res = await GetDireksiApi(query);

      setData(res);

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil data SPP",
      );

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSpp(options?.initialQuery);
  }, [
    fetchSpp,
    options?.initialQuery?.page,
    options?.initialQuery?.limit,
    options?.initialQuery?.search,
  ]);

  return { data, isLoading, isError, fetchSpp };
}
