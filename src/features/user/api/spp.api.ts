import type { ApiResponse, PaginatedData, SppData, SppDataNormal } from "../../../types/ApiResponse";
import { api } from "../../../config/axios.config";
import type { CreateSppDTO } from "../schema/create-spp.schema";
import type { QuerySppDTO } from "../schema/query-spp.schema";
import type { UpdateSppDTO } from "../schema/update-spp.schema";


export async function CreateSppApi(dto: CreateSppDTO): Promise<SppDataNormal> {
  const res = await api.post<ApiResponse<SppDataNormal>>("/api/spp", {
    title: dto.title,
    purchaseType: dto.purchaseType,
    priority: dto.priority,
    sourcingType: dto.sourcingType,
    budgetCompliance: dto.budgetCompliance,
    sppDetails: dto.sppDetails,
  });
  return res.data.data;
}

export async function GetMySppApi(
  query?: QuerySppDTO,
): Promise<PaginatedData<SppData>> {
  const res = await api.get<ApiResponse<PaginatedData<SppData>>>("/api/spp/me", {
    params: {
      page: query?.page ?? 1,
      limit: query?.limit ?? 10,
      search: query?.search,
    },
  });
  return res.data.data;
}

export async function GetSppDetailApi(id: string): Promise<SppDataNormal> {
  const res = await api.get<ApiResponse<SppDataNormal>>(`/api/spp/${id}`);

  return res.data.data;
}

export async function UpdateSppApi(
  id: string,
  dto: UpdateSppDTO,
): Promise<SppDataNormal> {
  const res = await api.patch<ApiResponse<SppDataNormal>>(`/api/spp/${id}`, dto);
  return res.data.data;
}

export async function DeleteSppApi(id: string): Promise<null> {
  const res = await api.delete<ApiResponse<null>>(`/api/spp/${id}`);
  return res.data.data;
}