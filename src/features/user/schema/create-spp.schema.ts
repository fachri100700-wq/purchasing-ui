import z from "zod";

// ===================== Create SPP Schema =====================

export const createSppDetailSchema = z.object({
  productName: z
    .string()
    .trim()
    .nonempty("Nama produk wajib diisi"),
  brandOrType: z
    .string()
    .trim()
    .nonempty("Brand atau tipe wajib diisi"),
  size: z
    .string()
    .trim()
    .nonempty("Ukuran wajib diisi"),
  quantity: z
    .number()
    .min(1, "Quantity minimal 1"),
  intendedPurpose: z
    .string()
    .trim()
    .nonempty("Intended purpose wajib diisi"),
});

export const createSppSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Title wajib diisi"),
  purchaseType: z
    .enum(["routine", "necessary"], {
      message: "Purchase type tidak valid",
    }),
  priority: z
    .enum(["standard", "urgent"], {
      message: "Priority tidak valid",
    }),
  sourcingType: z
    .enum(["local", "import"], {
      message: "Sourcing type tidak valid",
    }),
  budgetCompliance: z
    .enum(["within_budget", "budget_exceeded", "unbudgeted"], {
      message: "Budget compliance tidak valid",
    }),
  sppDetails: z
    .array(createSppDetailSchema)
    .nonempty("Detail SPP wajib diisi"),
});

export type CreateSppDTO = z.infer<typeof createSppSchema>;
export type CreateSppDetailDTO = z.infer<typeof createSppDetailSchema>;



