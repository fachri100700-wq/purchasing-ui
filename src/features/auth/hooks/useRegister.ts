import { useForm } from "react-hook-form";
import { registerSchema, type RegisterDTO } from "../schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterApi } from "../api/auth.api";

export function useRegister() {

  const form = useForm<RegisterDTO>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      division: "",
      role: "",
    },
  });

  const onSubmit = async (payload: RegisterDTO) => {
    try {
        const res = await RegisterApi(payload)

        return res
    } catch (error) {
        if (error instanceof Error) {
        form.setError('root', { message: error.message });
      }
    }
  }

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  }
}
