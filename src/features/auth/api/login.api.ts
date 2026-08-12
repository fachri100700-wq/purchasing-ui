import type { ApiResponse } from "../../../types/ApiResponse";
import { api } from "../../../utils/axios.utils";
import type { LoginDTO } from "../schema/login.schema";

export async function LoginApi(dto: LoginDTO) {
    try {
        const res = await api.post<ApiResponse<LoginDTO>>("/api/auth/login", {
            email: dto.email,
            password: dto.password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}