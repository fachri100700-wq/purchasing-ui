import z from "zod";
import { userRoles } from "../../../../../purchasing-service/src/common/enums/roles.enum";

export const loginSchema = z.object({
  email: z.email("Format email tidak valid").nonempty("Email wajib diisi"),
  password: z.string().min(6, { message: "Kata sandi minimal 6 karakter" }).nonempty("Password wajib diisi"),
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .nonempty('Nama lengkap wajib diisi'),

  email: z
    .email('Format email tidak valid')
    .trim()
    .toLowerCase()
    .nonempty('Email wajib diisi'),
    
  password: z
    .string()
    .nonempty('Password wajib diisi')
    .min(6, 'Password minimal 6 karakter'),

  division: z
    .string()
    .trim()
    .nonempty('Divisi wajib diisi'),

  role: z
  .enum(userRoles as unknown as [string, ...string[]], {
    message: 'Role tidak valid',
  })
})

export type RegisterDTO = z.infer<typeof registerSchema>;