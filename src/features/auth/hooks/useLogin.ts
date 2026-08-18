import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginDTO } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginApi } from "../api/auth.api";
import { userRoles } from "../../../../../purchasing-service/src/common/enums/roles.enum";
import { toast } from "sonner";

export function useLogin() {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const form = useForm<LoginDTO>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (payload: LoginDTO) => {
    try {
        const res = await LoginApi(payload)

        if(res.access_token) {
            localStorage.setItem("access_token", res.access_token);
        }

        setAuth({
            id: res.user.id,
            fullName: res.user.fullName,
            email: res.user.email,
            role: res.user.role,
            division: res.user.division,
        })

        if(res.user.role === userRoles.USER) {
            navigate("/user-dashboard");
        } else if(res.user.role === userRoles.LEADER_PURCHASING) {
            navigate("/ka-purchasing-dashboard");
        } else if(res.user.role === userRoles.LEADER_DIVISION) {
            navigate("/ka-divisi-dashboard");
        } else if(res.user.role === userRoles.LEADER_AUDIT) {
            navigate("/ka-auditor-dashboard");
        } else if(res.user.role === userRoles.GUDANG) {
            navigate("/gudang-dashboard");
        } else if(res.user.role === userRoles.DIREKSI) {
            navigate("/direksi-dashboard");
        } else if(res.user.role === userRoles.AUDIT) {
            navigate("/audit-dashboard");
        }

        return res
        
    } catch (error) {
        if (error instanceof Error) {
        form.setError('root', { message: error.message });
      }
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil session",
      );
    }
  }

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  }
}
