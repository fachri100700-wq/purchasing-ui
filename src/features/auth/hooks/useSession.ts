import { useEffect, useState } from "react";
import useAuthStore from "../../../stores/useAuthStore";
import { SessionApi } from "../api/auth.api";
import { toast } from "sonner";

export function useSession() {
  const { user, setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSession = async () => {
    try {
      setIsLoading(true);

      const res = await SessionApi();

      setAuth(res);

      return res;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          "Terjadi kesalahan saat mengambil session",
      );

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleSession();
  }, []);

  return { user, isLoading, isError, handleSession };
}
