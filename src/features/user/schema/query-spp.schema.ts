import z from "zod";

export const querySppSchema = z.object({
  page: z
    .number()
    .min(1, "Page minimal 1")
    .optional(),
  limit: z
    .number()
    .min(1, "Limit minimal 1")
    .max(100, "Limit maksimal 100")
    .optional(),
  search: z
    .string()
    .trim()
    .optional(),
});

export type QuerySppDTO = z.infer<typeof querySppSchema>;