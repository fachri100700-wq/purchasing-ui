import { useForm } from "react-hook-form";
import { createSppSchema, type CreateSppFormValues } from "../schema/create-spp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSppApi } from "../api/spp.api";
import { toast } from "sonner";

interface UseCreateSppOptions {
  onSuccess?: () => void;
}

export function useCreateSpp(options?: UseCreateSppOptions) {
  const form = useForm<CreateSppFormValues>({
    resolver: zodResolver(createSppSchema),
    defaultValues: {
      title: "",
      purchaseType: "",
      priority: "",
      sourcingType: "",
      budgetCompliance: "",
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

  const onSubmit = async (payload: CreateSppFormValues) => {
    const parsed = createSppSchema.parse(payload);

    try {
      const res = await CreateSppApi(parsed);

      toast.success("SPP berhasil dibuat");

      options?.onSuccess?.();

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
    control: form.control,
  };
}