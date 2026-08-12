# PRD - Purchasing Service (SPP Flow)

Product Requirements Document untuk aplikasi `purchasing-service` yang mengelola alur **Surat Permintaan Pembelian (SPP)** hingga **Purchase Order (PO)**.

---

## Daftar Isi

- [Ringkasan Produk](#ringkasan-produk)
- [Role Pengguna](#role-pengguna)
- [Alur Proses SPP](#alur-proses-spp)
  - [Flowchart (Teks)](#flowchart-teks)
  - [Penjelasan Detail Setiap Step](#penjelasan-detail-setiap-step)
- [Aturan Bisnis](#aturan-bisnis)
- [Status SPP](#status-spp)
- [Alur Approval PO](#alur-approval-po)

---

## Ringkasan Produk

Aplikasi ini adalah sistem internal untuk mengelola proses pengadaan barang melalui SPP (Surat Permintaan Pembelian). Alur dimulai dari pengajuan SPP oleh user, melalui proses review dan approval berjenjang, perbandingan harga, hingga pembuatan Purchase Order (PO) dan penyelesaian SPP.

---

## Role Pengguna

| Role | Kode | Tanggung Jawab |
|------|------|----------------|
| **User** | `user` | Mengisi dan mengajukan form SPP |
| **Kepala Bagian / Leader Division** | `leader_divition` | Review dan approve SPP |
| **Gudang** | `gudang` | Review dan auto approve SPP |
| **Audit** | `audit` | Verifikasi dan approve SPP |
| **Leader Purchasing** | `leader_purchasing` | Melakukan perbandingan harga (comparison paper) |
| **Leader Audit** | `leader_audit` | Verifikasi hasil perbandingan harga, crosscheck |
| **Direksi** | `direksi` | Approve SPP dengan total > 900rb |
| **Kasir** | `kasir` | Melakukan pembayaran (SppPayment) |

---

## Alur Proses SPP

### Flowchart (Teks)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER mengisi form SPP                                    │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. KEPALA BAGIAN review & approve SPP                       │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. GUDANG review & auto approve SPP                         │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. AUDIT verifikasi & approve SPP                           │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. LEADER PURCHASING melakukan perbandingan harga           │
│    (membuat Comparison Paper)                               │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. LEADER AUDIT verifikasi hasil perbandingan harga         │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
              ┌────────────┴────────────┐
              ▼                         ▼
   Ada barang lebih murah?     Tidak ada barang lebih murah
              │                         │
              ▼                         │
┌─────────────────────────────┐         │
│ 7. Dikembalikan ke PURCHASE │         │
│    untuk crosscheck         │         │
└─────────────┬───────────────┘         │
              ▼                         │
   Purchase menemukan harga             │
   lebih murah?                         │
   ┌───────┴───────┐                    │
   ▼               ▼                    │
  Ya (kembali     Tidak                 │
  ke Audit)       (approve)             │
   │               │                    │
   └───────┬───────┘                    │
           ▼                            │
           └────────────┬───────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. CHECK AMOUNT (total harga SPP)                           │
└──────────────┬──────────────────────────────┬───────────────┘
               ▼                              ▼
      Total > 900rb                    Total ≤ 900rb
               │                              │
               ▼                              │
┌─────────────────────────────┐              │
│ Approve DIREKSI             │              │
└─────────────┬───────────────┘              │
              ▼                              │
              └──────────────┬───────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│ 9. PEMBUATAN PO (Purchase Order)                            │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 10. SEMUA ROLES diminta approval dari PO tersebut           │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│ 11. SPP SELESAI & VPS dibuat (masih manual)                 │
└─────────────────────────────────────────────────────────────┘
```

---

### Penjelasan Detail Setiap Step

#### Step 1 — User Mengisi Form SPP

- **Aktor:** User
- **Deskripsi:** User mengisi form SPP yang berisi:
  - Jenis pembelian (`purchase_type`)
  - Prioritas (`priority`)
  - Jenis sumber pengadaan (`sourcing_type`)
  - Detail item SPP (nama produk, merek/tipe, ukuran, quantity, tujuan penggunaan)
- **Output:** SPP dengan status `SUBMITTED`

#### Step 2 — Kepala Bagian Review & Approve

- **Aktor:** Leader Division (`leader_divition`)
- **Deskripsi:** Kepala bagian melakukan review terhadap SPP yang diajukan. Jika disetujui, SPP lanjut ke tahap berikutnya. Jika ditolak, SPP dikembalikan ke user dengan alasan penolakan.
- **Output:** SPP dengan status `LEADER_DIVISI_APPROVED` atau `REJECTED`

#### Step 3 — Gudang Review & Auto Approve

- **Aktor:** Gudang
- **Deskripsi:** Gudang melakukan review ketersediaan barang. Proses ini bersifat **auto approve** — gudang hanya memverifikasi dan menyetujui tanpa perlu persetujuan tambahan.
- **Output:** SPP dengan status `GUDANG_APPROVED`

#### Step 4 — Audit Verifikasi & Approve

- **Aktor:** Audit
- **Deskripsi:** Tim audit melakukan verifikasi terhadap SPP (kelengkapan dokumen, kepatuhan anggaran, dll). Jika disetujui, SPP lanjut ke tahap perbandingan harga.
- **Output:** SPP dengan status `AUDIT_INITIAL_APPROVED`

#### Step 5 — Leader Purchasing Melakukan Perbandingan Harga

- **Aktor:** Leader Purchasing (`leader_purchasing`)
- **Deskripsi:** Leader purchasing membuat **Comparison Paper** yang berisi perbandingan harga dari beberapa supplier untuk setiap item SPP.
- **Output:** SPP dengan status `PURCHASING_COMPARISON_SUBMITTED`

#### Step 6 — Leader Audit Verifikasi Hasil Perbandingan Harga

- **Aktor:** Leader Audit (`leader_audit`)
- **Deskripsi:** Leader audit memverifikasi hasil perbandingan harga yang dibuat oleh purchasing. Tujuannya memastikan harga yang dipilih adalah yang paling wajar dan tidak ada penawaran yang lebih murah.
- **Output:** SPP dengan status `AUDIT_REVIEW_REQUESTED`

#### Step 7 — Crosscheck Harga (Loop)

- **Aktor:** Leader Audit & Leader Purchasing
- **Deskripsi:**
  - Jika **audit menemukan barang yang lebih murah** dari yang dipilih purchasing, SPP **dikembalikan ke purchasing** untuk crosscheck.
  - Purchasing dapat melakukan crosscheck ulang. Jika **purchasing menemukan harga yang lebih murah** dari temuan audit, SPP **dikembalikan kembali ke audit**.
  - Proses ini berulang (loop) hingga salah satu pihak tidak menemukan harga yang lebih murah.
  - Jika **tidak ada harga yang lebih murah** ditemukan, SPP di-approve dan lanjut ke step berikutnya.
- **Output:** SPP di-approve oleh leader audit

#### Step 8 — Check Amount (Total Harga)

- **Deskripsi:** Sistem melakukan pengecekan terhadap total harga SPP:
  - Jika **total > Rp 900.000** → SPP memerlukan **approval dari Direksi** (`NEED_DIRECTOR_APPROVAL` → `DIRECTOR_APPROVED`)
  - Jika **total ≤ Rp 900.000** → SPP langsung lanjut ke tahap pembuatan PO

#### Step 9 — Pembuatan PO (Purchase Order)

- **Aktor:** Leader Purchasing
- **Deskripsi:** Purchase Order (PO) dibuat berdasarkan SPP yang telah disetujui. PO berisi detail vendor, item, harga, diskon, dan total pesanan.
- **Output:** SPP dengan status `PO_CREATED`

#### Step 10 — Approval PO oleh Semua Roles

- **Aktor:** Semua roles (User, Leader Division, Gudang, Audit, Leader Purchasing, Leader Audit, Direksi, Kasir)
- **Deskripsi:** Setelah PO dibuat, **semua roles** akan diminta untuk memberikan approval terhadap PO tersebut. PO baru dianggap sah setelah semua roles menyetujui.

#### Step 11 — SPP Selesai & VPS Dibuat

- **Deskripsi:** Setelah PO disetujui, SPP dinyatakan **selesai** (`COMPLETED`). Selanjutnya dilakukan pembuatan **VPS (Virtual Private Server)** — namun proses ini **masih dilakukan secara manual** di luar sistem.

---

## Aturan Bisnis

| No | Aturan |
|----|--------|
| 1 | SPP harus melalui approval berjenjang: Kepala Bagian → Gudang → Audit |
| 2 | Approval Gudang bersifat **auto approve** (hanya review, tanpa persetujuan tambahan) |
| 3 | Perbandingan harga dilakukan oleh **Leader Purchasing** dan diverifikasi oleh **Leader Audit** |
| 4 | Jika ditemukan harga lebih murah, SPP dikembalikan untuk crosscheck (loop antara purchasing dan audit) |
| 5 | Total SPP **> Rp 900.000** memerlukan **approval Direksi** |
| 6 | Total SPP **≤ Rp 900.000** tidak memerlukan approval Direksi |
| 7 | PO yang dibuat harus di-approve oleh **semua roles** |
| 8 | Pembuatan VPS dilakukan **secara manual** di luar sistem |

---

## Status SPP

| Status | Keterangan |
|--------|------------|
| `SUBMITTED` | SPP diajukan oleh user |
| `LEADER_DIVISI_APPROVED` | SPP disetujui oleh kepala bagian |
| `GUDANG_APPROVED` | SPP disetujui oleh gudang (auto approve) |
| `AUDIT_INITIAL_APPROVED` | SPP disetujui oleh audit |
| `PURCHASING_COMPARISON_SUBMITTED` | Perbandingan harga dibuat oleh purchasing |
| `AUDIT_REVIEW_REQUESTED` | Perbandingan harga sedang diverifikasi oleh leader audit |
| `NEED_DIRECTOR_APPROVAL` | SPP memerlukan approval direksi (total > 900rb) |
| `DIRECTOR_APPROVED` | SPP disetujui oleh direksi |
| `PO_CREATED` | PO telah dibuat |
| `COMPLETED` | SPP selesai (PO disetujui semua roles) |
| `REJECTED` | SPP ditolak |

---

## Alur Approval PO

Setelah PO dibuat, **semua roles** memberikan approval secara berurutan:

```
PO Created
    │
    ▼
User ──► Leader Division ──► Gudang ──► Audit
    │
    ▼
Leader Purchasing ──► Leader Audit ──► Direksi ──► Kasir
    │
    ▼
PO Approved → SPP COMPLETED → VPS dibuat (manual)
```

> **Catatan:** Jika salah satu roles menolak PO, maka PO ditolak dan SPP dikembalikan ke tahap pembuatan PO untuk diperbaiki.

---

## Entity Terkait

| Entity | Tabel | Deskripsi |
|--------|-------|-----------|
| `Spp` | `spp` | Surat Permintaan Pembelian |
| `SppDetail` | `spp_details` | Detail item pada SPP |
| `ComparisonPaper` | `comparison_papers` | Dokumen perbandingan harga |
| `ComparisonPaperItem` | `comparison_paper_items` | Item pada comparison paper |
| `ComparisonPaperDetail` | `comparison_paper_details` | Detail penawaran supplier |
| `PurchaseOrder` | `purchase_orders` | Purchase Order |
| `Approval` | `approvals` | Data persetujuan SPP/PO |
| `SppPayment` | `spp_payments` | Pembayaran SPP |
| `ActionLog` | `action_logs` | Log aktivitas pengguna |
| `User` | `users` | Pengguna sistem |

> Detail lengkap setiap entity dan enum dapat dilihat pada file **`erd.md`**.