import z from "zod";

export const updateSppDetailSchema = z.object({
  productName: z
    .string()
    .trim()
    .nonempty("Nama produk wajib diisi")
    .optional(),
  brandOrType: z
    .string()
    .trim()
    .nonempty("Brand atau tipe wajib diisi")
    .optional(),
  size: z
    .string()
    .trim()
    .nonempty("Ukuran wajib diisi")
    .optional(),
  quantity: z
    .number()
    .min(1, "Quantity minimal 1")
    .optional(),
  intendedPurpose: z
    .string()
    .trim()
    .nonempty("Intended purpose wajib diisi")
    .optional(),
});

export const updateSppSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title wajib diisi")
    .optional(),
  purchaseType: z
    .enum(["routine", "necessary"], {
      message: "Purchase type tidak valid",
    })
    .optional(),
  priority: z
    .enum(["standard", "urgent"], {
      message: "Priority tidak valid",
    })
    .optional(),
  sourcingType: z
    .enum(["local", "import"], {
      message: "Sourcing type tidak valid",
    })
    .optional(),
  budgetCompliance: z
    .enum(["within_budget", "budget_exceeded", "unbudgeted"], {
      message: "Budget compliance tidak valid",
    })
    .optional(),
  sppDetails: z
    .array(updateSppDetailSchema)
    .optional(),
});

export type UpdateSppDTO = z.infer<typeof updateSppSchema>;
export type UpdateSppDetailDTO = z.infer<typeof updateSppDetailSchema>;