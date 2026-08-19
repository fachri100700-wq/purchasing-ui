import { useState } from "react";
import { DeleteSppApi } from "../api/spp.api";
import { toast } from "sonner";

export function useDeleteSpp() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);

      const res = await DeleteSppApi(id);

      toast.success("SPP berhasil dihapus");

      return res;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat menghapus SPP",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDelete, isLoading };
}