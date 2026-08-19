import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { backgroundContainer } from "../../components/ui/styles";

interface Row {
  name: string;
  brand: string,
  size: string,
  qty: number;
  unit: string;
}

export default function SppCreatePage() {

  const [rows, setRows] = useState<Row[]>([{ name: "", brand: "", size: "", qty: 1, unit: "pcs" }]);

  const update = (i: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const [formData, setFormData] = useState({
    title: "",
    division: "",
    purchaseType: "",
    amount: "",
    description: "",
  });


  return (
    <DashboardLayout>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Permintaan Pembelian</h1>
        <p className="text-sm text-slate-600">Lengkapi formulir di bawah ini untuk mengajukan permohonan pengadaan barang.</p>
      </div>

      {/* Form Container */}
      <div className="">
        <form
          className="grid gap-6 lg:grid-cols-[1.6fr_1fr]"
        >
          <div className="space-y-6">
            <section className={backgroundContainer}>
              <h2 className="text-base font-semibold">Informasi pengajuan</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Select
                  label="Tipe Pembelian"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  options={[
                    { label: "Rutin", value: "opsi_1" },
                    { label: "Khusus", value: "opsi_2" }
                  ]}
                  required
                />
                <Select
                  label="Status"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  options={[
                    { label: "Biasa", value: "opsi_1" },
                    { label: "Mendesak", value: "opsi_2" }
                  ]}
                  required
                />
                <Select
                  label="Pembelian"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  options={[
                    { label: "Lokal", value: "opsi_1" },
                    { label: "Import", value: "opsi_2" }
                  ]}
                  required
                />
                <Select
                  label="Kesesuaian Anggaran"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  options={[
                    { label: "Tidak Termasuk List Budget", value: "opsi_1" },
                    { label: "Pengajuan Melebihi Budget", value: "opsi_2" },
                    { label: "Sesuai Budget", value: "opsi_3" }
                  ]}
                  required
                />
              </div>

            </section>

            <section className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Rincian barang</h2>
                <button
                  type="button"
                  onClick={() => setRows((p) => [...p, { name: "", brand: "", size: "", qty: 1, unit: "pcs" }])}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs hover:bg-sky-100"
                >
                  <Plus className="size-3.5" /> Tambah item
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {rows.map((r, i) => (
                  <div key={i} className="grid gap-2 sm:grid-cols-[1fr_80px_90px_130px_36px] ">
                    <Input
                      label="Nama barang"
                      placeholder="Contoh: Laptop"
                    />
                    <Input
                      label="Merek"
                      placeholder="Asus"
                    />
                    <Input
                      label="Ukuran"
                      placeholder="14 Inch"
                    />
                    <Input
                      label="Jumlah"
                      type="number"
                      min={1}
                      value={r.qty}
                      onChange={(e) => update(i, { qty: Number(e.target.value) })}
                    />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[13px] opacity-0 select-none">Hapus</span> {/* Invisible spacer */}
                      <button
                        type="button"
                        aria-label="Hapus item"
                        onClick={() => setRows((p) => p.filter((_, idx) => idx !== i))}
                        className="flex h-[42px] items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
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
                className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Kirim ke Kepala Bagian
              </button>
              <Link
                to="/spp"
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
                  "Approval PO oleh semua divisi"
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
