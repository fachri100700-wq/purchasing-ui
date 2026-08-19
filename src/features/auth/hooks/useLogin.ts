import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginDTO } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginApi } from "../api/auth.api";
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

        navigate("/dashboard");

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
