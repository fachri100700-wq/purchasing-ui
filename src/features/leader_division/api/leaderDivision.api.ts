import { api } from "../../../config/axios.config";
import type {
  ApiResponse,
  PaginatedData,
  SppData,
  SppDataNormal,
} from "../../../types/ApiResponse";
import type { QuerySppDTO } from "../../user/schema/query-spp.schema";

export async function GetLeaderDivisionApi(
  query?: QuerySppDTO,
): Promise<PaginatedData<SppData>> {
  const res = await api.get<ApiResponse<PaginatedData<SppData>>>(
    "/api/leader-division",
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

export async function LeaderDivisionApproveApi(
  id: string,
): Promise<SppDataNormal> {
  const res = await api.patch<ApiResponse<SppDataNormal>>(
    `/api/leader-division/approve/${id}`,
  );

  return res.data.data;
}

export async function LeaderDivisionRejectApi(
  id: string,
  rejectionReason?: string,
): Promise<SppDataNormal> {
  const res = await api.patch<ApiResponse<SppDataNormal>>(
    `/api/leader-division/reject/${id}`,
    { rejectionReason: rejectionReason },
  );

  return res.data.data;
}
