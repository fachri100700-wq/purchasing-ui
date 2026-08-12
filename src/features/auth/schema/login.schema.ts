import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email gak valid, bro!" }),
  password: z
    .string()
    .min(6, { message: "Kata sandi minimal 6 karakter" }),
});

export type LoginDTO = z.infer<typeof loginSchema>;

