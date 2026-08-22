import { api } from "../../../config/axios.config";
import type { ApiResponse, PaginatedData, SppData } from "../../../types/ApiResponse";
import type { QuerySppDTO } from "../../user/schema/query-spp.schema";

export async function GetAllLeaderPurchasingApi(
  query?: QuerySppDTO,
): Promise<PaginatedData<SppData>> {
  const res = await api.get<ApiResponse<PaginatedData<SppData>>>(
    "/api/leader-purchasing",
    {
      params: {
        page: query?.page ?? 1,
        limit: query?.limit ?? 10,
        search: query?.search,
      },
    },
  );

  return res.data.data;
}

export async function GetReviewLeaderPurchasingApi(
  query?: QuerySppDTO,
): Promise<PaginatedData<SppData>> {
  const res = await api.get<ApiResponse<PaginatedData<SppData>>>(
    "/api/leader-purchasing/review",
    {
      params: {
        page: query?.page ?? 1,
        limit: query?.limit ?? 10,
        search: query?.search,
      },
    },
  );

  return res.data.data;
}

