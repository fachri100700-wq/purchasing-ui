import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateSppApi } from "../api/spp.api";
import { toast } from "sonner";
import { updateSppSchema, type UpdateSppDTO } from "../schema/update-spp.schema";

export function useUpdateSpp() {
  const form = useForm<UpdateSppDTO>({
    resolver: zodResolver(updateSppSchema),
    defaultValues: {
      title: "",
      purchaseType: undefined,
      priority: undefined,
      sourcingType: undefined,
      budgetCompliance: undefined,
      sppDetails: [],
    },
  });

  const onSubmit = async (id: string, payload: UpdateSppDTO) => {
    try {
      const res = await UpdateSppApi(id, payload);

      toast.success("SPP berhasil diupdate");

      return res;
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
      }
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat mengupdate SPP",
      );
    }
  };

  const handleSubmit = (id: string) => form.handleSubmit((payload) => onSubmit(id, payload));

  return {
    register: form.register,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    reset: form.reset,
  };
}