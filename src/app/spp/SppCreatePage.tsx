import { useFieldArray, Controller } from "react-hook-form";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { backgroundContainer } from "../../components/ui/styles";
import { useCreateSpp } from "../../features/user/hooks/useCreateSpp";
import IconButton from "../../components/ui/IconButton";

export default function SppCreatePage() {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isSubmitting, control } =
    useCreateSpp({
      onSuccess: () => navigate("/dashboard"),
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sppDetails",
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Permintaan Pembelian
        </h1>
        <p className="text-sm text-slate-600">
          Lengkapi formulir di bawah ini untuk mengajukan permohonan pengadaan
          barang.
        </p>
      </div>

      {/* Form Container */}
      <div className="">
        <form
          className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <section className={backgroundContainer}>
              <h2 className="text-base font-semibold">Informasi pengajuan</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  label="Perihal SPP"
                  placeholder="Contoh: Pengadaan ATK Bulanan Divisi Operasional"
                  error={errors.title?.message}
                  {...register("title")}
                />
                <Controller
                  name="purchaseType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Tipe Pembelian"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.purchaseType?.message}
                      options={[
                        { label: "Rutin", value: "routine" },
                        { label: "Kebutuhan", value: "necessary" },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Prioritas"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.priority?.message}
                      options={[
                        { label: "Biasa", value: "standard" },
                        { label: "Mendesak", value: "urgent" },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="sourcingType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Pembelian"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.sourcingType?.message}
                      options={[
                        { label: "Lokal", value: "local" },
                        { label: "Import", value: "import" },
                      ]}
                    />
                  )}
                />

                <Controller
                  name="budgetCompliance"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Kesesuaian Anggaran"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.budgetCompliance?.message}
                      options={[
                        {
                          label: "Tidak Termasuk List Budget",
                          value: "unbudgeted",
                        },
                        {
                          label: "Pengajuan Melebihi Budget",
                          value: "budget_exceeded",
                        },
                        {
                          label: "Sesuai Budget",
                          value: "within_budget",
                        },
                      ]}
                    />
                  )}
                />
              </div>
            </section>

            <section className={backgroundContainer}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Rincian barang</h2>
                <button
                  type="button"
                  onClick={() =>
                    append({
                      productName: "",
                      brandOrType: "",
                      size: "",
                      quantity: 1,
                      intendedPurpose: "",
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-sky-100"
                >
                  <Plus className="size-3.5" /> Tambah item
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {fields.map((field, i) => (
                  <div key={field.id} className={backgroundContainer}>
                    <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_120px_auto]">
                      <Input
                        label="Nama barang"
                        placeholder="Contoh: Laptop"
                        error={errors.sppDetails?.[i]?.productName?.message}
                        {...register(`sppDetails.${i}.productName`)}
                      />

                      <Input
                        label="Merek"
                        placeholder="Asus"
                        error={errors.sppDetails?.[i]?.brandOrType?.message}
                        {...register(`sppDetails.${i}.brandOrType`)}
                      />

                      <Input
                        label="Ukuran"
                        placeholder="14 Inch"
                        error={errors.sppDetails?.[i]?.size?.message}
                        {...register(`sppDetails.${i}.size`)}
                      />

                      <Input
                        label="Jumlah"
                        type="number"
                        min={1}
                        error={errors.sppDetails?.[i]?.quantity?.message}
                        {...register(`sppDetails.${i}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />

                      <div className="flex items-end">
                        <IconButton
                          ariaLabel="Hapus item"
                          onClick={() => remove(i)}
                          disabled={fields.length === 1}
                        >
                          <Trash2 className="size-4" />
                        </IconButton>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Input
                        label="Tujuan Penggunaan"
                        placeholder="Contoh: Digunakan untuk operasional divisi"
                        error={errors.sppDetails?.[i]?.intendedPurpose?.message}
                        {...register(`sppDetails.${i}.intendedPurpose`)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim ke Kepala Bagian"}
              </button>
              <Link
                to="/dashboard"
                className="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm hover:bg-sky-100"
              >
                Batal
              </Link>
            </div>

            <div className="border border-white/50 bg-white/60 shadow-lg shadow-sky-900/5 backdrop-blur-md rounded-2xl p-5 text-sm">
              <p className="font-medium">Alur setelah dikirim</p>
              <ol className="mt-3 space-y-2 text-xs text-slate-500">
                {[
                  "Approval Kepala Bagian",
                  "Approval Gudang (cek stok)",
                  "Verifikasi Audit",
                  "Assignment anggota Purchasing → perbandingan harga",
                  "Assignment anggota verifikasi oleh Kepala Audit",
                  "Cek nominal → PO / approval Direktur",
                  "Approval PO oleh semua divisi",
                ].map((t, i) => (
                  <li key={t} className="flex gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[10px] font-medium text-slate-900">
                      {i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </form>
      </div>
    </DashboardLayout>
  );
}
