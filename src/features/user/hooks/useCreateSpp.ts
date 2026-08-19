import { useForm } from "react-hook-form";
import { createSppSchema, type CreateSppDTO } from "../schema/create-spp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSppApi } from "../api/spp.api";
import { toast } from "sonner";

export function useCreateSpp() {
  const form = useForm<CreateSppDTO>({
    resolver: zodResolver(createSppSchema),
    defaultValues: {
      title: "",
      purchaseType: "routine",
      priority: "standard",
      sourcingType: "local",
      budgetCompliance: "within_budget",
      sppDetails: [
        {
          productName: "",
          brandOrType: "",
          size: "",
          quantity: 1,
          intendedPurpose: "",
        },
      ],
    },
  });

  const onSubmit = async (payload: CreateSppDTO) => {
    try {
      const res = await CreateSppApi(payload);

      toast.success("SPP berhasil dibuat");

      return res;
    } catch (error) {
      if (error instanceof Error) {
        form.setError("root", { message: error.message });
      }
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan saat membuat SPP",
      );
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    reset: form.reset,
  };
}