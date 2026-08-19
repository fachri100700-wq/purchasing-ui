import z from "zod";

// ===================== Create SPP Schema =====================

export const createSppDetailSchema = z.object({
  productName: z.string().trim().min(1, "Nama produk wajib diisi"),
  brandOrType: z.string().trim().min(1, "Brand atau tipe wajib diisi"),
  size: z.string().trim().min(1, "Ukuran wajib diisi"),
  quantity: z.number().min(1, "Quantity minimal 1"),
  intendedPurpose: z.string().trim().min(1, "Intended purpose wajib diisi"),
});

export const createSppSchema = z.object({
  title: z.string().trim().min(1, "Title wajib diisi"),
  purchaseType: z
    .string()
    .refine(
      (val) => val === "routine" || val === "necessary",
      "Tipe pembelian wajib diisi",
    ),
  priority: z
    .string()
    .refine(
      (val) => val === "standard" || val === "urgent",
      "Prioritas wajib diisi",
    ),
  sourcingType: z
    .string()
    .refine(
      (val) => val === "local" || val === "import",
      "Pembelian wajib diisi",
    ),
  budgetCompliance: z
    .string()
    .refine(
      (val) =>
        val === "within_budget" ||
        val === "budget_exceeded" ||
        val === "unbudgeted",
      "Kesesuaian anggaran wajib diisi",
    ),
  sppDetails: z.array(createSppDetailSchema).min(1, "Detail SPP wajib diisi"),
});

// Output setelah validasi (union literal, dikirim ke API)
export type CreateSppDTO = z.output<typeof createSppSchema>;
export type CreateSppDetailDTO = z.output<typeof createSppDetailSchema>;

// Input form (nilai awal termasuk string kosong untuk field select)
export type CreateSppFormValues = z.input<typeof createSppSchema>;
export type CreateSppDetailFormValues = z.input<typeof createSppDetailSchema>;
