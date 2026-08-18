import type { ApiResponse, LoginResponse, UserData } from "../../../types/ApiResponse";
import { api } from "../../../config/axios.config";
import type { LoginDTO, RegisterDTO } from "../schema/auth.schema";

export async function RegisterApi(dto: RegisterDTO): Promise<UserData> {
  const res = await api.post<ApiResponse<UserData>>("/api/auth/register", {
    fullName: dto.fullName,
    email: dto.email,
    password: dto.password,
    division: dto.division,
    role: dto.role,
  });
  return res.data.data;
}

export async function LoginApi(dto: LoginDTO): Promise<LoginResponse> {
  const res = await api.post<ApiResponse<LoginResponse>>("/api/auth/login", {
    email: dto.email,
    password: dto.password,
  });
  return res.data.data;
}

export async function LogoutApi(): Promise<null> {
    const res = await api.post<ApiResponse<null>>("/api/auth/logout");
    return res.data.data;
}

export async function SessionApi(): Promise<UserData> {
    const res = await api.get<ApiResponse<UserData>>("/api/auth/session");
    return res.data.data;
}