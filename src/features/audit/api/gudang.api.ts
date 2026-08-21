import { api } from "../../../config/axios.config";
import type {
  ApiResponse,
  PaginatedData,
  SppData,
  SppDataNormal,
} from "../../../types/ApiResponse";
import type { QuerySppDTO } from "../../user/schema/query-spp.schema";

export async function GetAuditApi(
  query?: QuerySppDTO,
): Promise<PaginatedData<SppData>> {
  const res = await api.get<ApiResponse<PaginatedData<SppData>>>(
    "/api/audit",
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

export async function AuditApproveApi(id: string): Promise<SppDataNormal> {
  const res = await api.patch<ApiResponse<SppDataNormal>>(`/api/audit/approve/${id}`)

  return res.data.data
}

export async function AuditRejectApi(id: string): Promise<SppDataNormal> {
  const res = await api.patch<ApiResponse<SppDataNormal>>(`/api/audit/reject/${id}`)

  return res.data.data
}
