import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutApi } from "../api/auth.api";
import useAuthStore from "../../../stores/useAuthStore";
import { toast } from "sonner";

export function useLogout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      await LogoutApi();

      localStorage.removeItem("access_token");
      clearAuth();
      navigate("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat logout",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogout, isLoading };
}
