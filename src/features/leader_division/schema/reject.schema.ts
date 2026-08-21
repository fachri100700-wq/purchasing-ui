import z from "zod";

export const rejectSchema = z.object({
    rejectionReason: z.string().optional()
})

export type RejectDTO = z.infer<typeof rejectSchema>