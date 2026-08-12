# Purchasing Service - Entities & Enums Documentation

Dokumentasi ini berisi gabungan seluruh **Entity** dan **Enum** yang ada pada proyek `purchasing-service`.

---

## Daftar Isi

- [Enums](#enums)
  - [ApprovalStatus](#approvalstatus)
  - [BudgetCompliance](#budgetcompliance)
  - [PaymentTerms](#paymentterms)
  - [PurchaseType](#purchasetype)
  - [userRoles](#userroles)
  - [SourcingType](#sourcingtype)
  - [SppPriority](#spppriority)
  - [SppStatus](#sppstatus)
- [Entities](#entities)
  - [User](#user)
  - [ActionLog](#actionlog)
  - [Approval](#approval)
  - [Spp](#spp)
  - [SppDetail](#sppdetail)
  - [ComparisonPaper](#comparisonpaper)
  - [ComparisonPaperItem](#comparisonpaperitem)
  - [ComparisonPaperDetail](#comparisonpaperdetail)
  - [PurchaseOrder](#purchaseorder)
  - [SppPayment](#spppayment)
- [Relasi Antar Entity](#relasi-antar-entity)

---

# Enums

## ApprovalStatus

**File:** `src/common/enums/approval-status.enum.ts`

Status persetujuan (approval).

| Nilai Enum | Value |
|------------|-------|
| `PENDING`  | `'pending'` |
| `APPROVED` | `'approved'` |
| `REJECT`   | `'reject'` |

---

## BudgetCompliance

**File:** `src/common/enums/budget-compliance.enum.ts`

Status kepatuhan terhadap anggaran.

| Nilai Enum       | Value |
|------------------|-------|
| `WITHIN_BUDGET`  | `'within_budget'` |
| `BUDGET_EXCEEDED`| `'budget_exceeded'` |
| `UNBUDGETED`     | `'unbudgeted'` |

---

## PaymentTerms

**File:** `src/common/enums/payment-terms.enum.ts`

Ketentuan pembayaran.

| Nilai Enum | Value |
|------------|-------|
| `CASH`     | `'cash'` |
| `TEMPO`    | `'tempo'` |

---

## PurchaseType

**File:** `src/common/enums/purchase-type.enum.ts`

Jenis pembelian.

| Nilai Enum  | Value |
|-------------|-------|
| `ROUTINE`   | `'routine'` |
| `NECESSARY` | `'necessary'` |

---

## userRoles

**File:** `src/common/enums/roles.enum.ts`

Role / peran pengguna dalam sistem.

| Nilai Enum          | Value |
|---------------------|-------|
| `USER`              | `'user'` |
| `LEADER_DIVISION`   | `'leader_divition'` |
| `LEADER_PURCHASING` | `'leader_purchasing'` |
| `GUDANG`            | `'gudang'` |
| `AUDIT`             | `'audit'` |
| `LEADER_AUDIT`      | `'leader_audit'` |
| `DIREKSI`           | `'direksi'` |
| `KASIR`             | `'kasir'` |

---

## SourcingType

**File:** `src/common/enums/sourcing-type.enum.ts`

Jenis sumber pengadaan.

| Nilai Enum | Value |
|------------|-------|
| `LOCAL`    | `'local'` |
| `IMPORT`   | `'import'` |

---

## SppPriority

**File:** `src/common/enums/spp-priority.enum.ts`

Prioritas SPP (Surat Permintaan Pembelian).

| Nilai Enum | Value |
|------------|-------|
| `STANDARD` | `'standard'` |
| `URGENT`   | `'urgent'` |

---

## SppStatus

**File:** `src/common/enums/spp-status.enum.ts`

Status SPP (Surat Permintaan Pembelian).

| Nilai Enum                  | Value |
|-----------------------------|-------|
| `SUBMITTED`                 | `'submitted'` |
| `LEADER_DIVISI_APPROVED`    | `'leader_divisi_approved'` |
| `GUDANG_APPROVED`           | `'gudang_approved'` |
| `AUDIT_INITIAL_APPROVED`    | `'audit_initial_approved'` |
| `PURCHASING_COMPARISON_SUBMITTED` | `'purchasing_comparison_submitted'` |
| `AUDIT_REVIEW_REQUESTED`    | `'audit_review_requested'` |
| `NEED_DIRECTOR_APPROVAL`    | `'need_director_approval'` |
| `DIRECTOR_APPROVED`         | `'director_approved'` |
| `PO_CREATED`                | `'po_created'` |
| `COMPLETED`                 | `'completed'` |
| `REJECTED`                  | `'rejected'` |

---

# Entities

## User

**File:** `src/modules/auth/entities/user.entity.ts`
**Tabel:** `users`

Entitas pengguna sistem.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `full_name` | `varchar` | No | - | Nama lengkap |
| `division` | `varchar` | No | - | Divisi (indexed) |
| `email` | `varchar` | No | - | Email unik |
| `password` | `varchar` | No | - | Password (hash) |
| `role` | `enum (userRoles)` | No | `userRoles.USER` | Role pengguna (indexed) |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `OneToMany` → `Spp` (`spps`)
- `OneToMany` → `ComparisonPaper` (`comparisonPaper`)
- `OneToMany` → `SppPayment` (`payments`)
- `OneToMany` → `ActionLog` (`actionLogs`)

---

## ActionLog

**File:** `src/modules/action-log/entities/action-log.entity.ts`
**Tabel:** `action_logs`

Log aktivitas pengguna.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `user_id` | `uuid` (FK) | No | - | ID user (indexed) |
| `action_log_id` | `uuid` (FK) | No | - | ID SPP (indexed) |
| `action` | `varchar` | No | - | Aksi yang dilakukan |
| `created_at` | `timestamp` | No | - | Waktu dibuat (indexed) |

**Relasi:**
- `ManyToOne` → `User` (`user`)
- `ManyToOne` → `Spp` (`spp`)

---

## Approval

**File:** `src/modules/approval/entities/approval.entity.ts`
**Tabel:** `approvals`

Data persetujuan untuk SPP atau PO.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `spp_id` | `uuid` (FK) | No | - | ID SPP (indexed) |
| `po_id` | `uuid` (FK) | Yes | - | ID PO (indexed) |
| `approval_status` | `enum (ApprovalStatus)` | No | - | Status persetujuan |
| `rejection_reason` | `varchar` | Yes | - | Alasan penolakan |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Index:**
- `IDX_d04cd04321e4a610995b271664` — composite index (`spp_id`, `po_id`)

**Relasi:**
- `ManyToOne` → `Spp` (`spp`) — onDelete CASCADE
- `ManyToOne` → `PurchaseOrder` (`purchaseOrder`) — nullable, onDelete SET NULL

---

## Spp

**File:** `src/modules/spp/entities/spp.entity.ts`
**Tabel:** `spp`

Surat Permintaan Pembelian (SPP).

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `user_id` | `uuid` (FK) | No | - | ID user pembuat (indexed) |
| `spp_no` | `varchar` | No | - | Nomor SPP unik |
| `purchase_type` | `enum (PurchaseType)` | No | - | Jenis pembelian |
| `status` | `enum (SppStatus)` | No | - | Status SPP (indexed) |
| `priority` | `enum (SppPriority)` | No | - | Prioritas SPP (indexed) |
| `sourcing_type` | `enum (SourcingType)` | No | - | Jenis sumber pengadaan |
| `budget_compliance_status` | `enum (BudgetCompliance)` | No | - | Status kepatuhan anggaran |
| `rejection_reason` | `varchar` | Yes | - | Alasan penolakan |
| `created_at` | `timestamp` | No | - | Waktu dibuat (indexed) |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `User` (`user`)
- `OneToMany` → `SppDetail` (`sppDetails`)
- `OneToMany` → `Approval` (`approvals`)
- `OneToMany` → `ComparisonPaper` (`comparisonPapers`)
- `OneToMany` → `ActionLog` (`actionLogs`)

---

## SppDetail

**File:** `src/modules/spp/entities/spp-detail.entity.ts`
**Tabel:** `spp_details`

Detail item pada SPP.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `spp_id` | `uuid` (FK) | No | - | ID SPP (indexed) |
| `product_name` | `varchar` | No | - | Nama produk |
| `brand_or_type` | `varchar` | No | - | Merek / tipe |
| `size` | `varchar` | No | - | Ukuran |
| `quantity` | `int` | No | - | Jumlah |
| `intended_purpose` | `text` | No | - | Tujuan penggunaan |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `Spp` (`spp`)
- `OneToMany` → `ComparisonPaperItem` (`comparisonPaperItems`)

---

## ComparisonPaper

**File:** `src/modules/comparison-paper/entities/comparison-paper.entity.ts`
**Tabel:** `comparison_papers`

Dokumen perbandingan harga (bahan perbandingan).

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `spp_id` | `uuid` (FK) | No | - | ID SPP (indexed) |
| `user_id` | `uuid` (FK) | No | - | ID user purchasing (indexed) |
| `comparison_paper_no` | `varchar` | No | - | Nomor dokumen unik |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `Spp` (`spp`)
- `ManyToOne` → `User` (`user`) — user purchasing
- `OneToMany` → `ComparisonPaperItem` (`items`)

---

## ComparisonPaperItem

**File:** `src/modules/comparison-paper/entities/comparison-paper-item.entity.ts`
**Tabel:** `comparison_paper_items`

Item pada dokumen perbandingan harga.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `comparison_paper_id` | `uuid` (FK) | No | - | ID comparison paper (indexed) |
| `spp_detail_id` | `uuid` (FK) | No | - | ID SPP detail (indexed) |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `ComparisonPaper` (`comparisonPaper`)
- `ManyToOne` → `SppDetail` (`sppDetail`)
- `OneToMany` → `ComparisonPaperDetail` (`details`)

---

## ComparisonPaperDetail

**File:** `src/modules/comparison-paper/entities/comparison-paper-detail.entity.ts`
**Tabel:** `comparison_paper_details`

Detail penawaran supplier pada item perbandingan harga.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `comparison_paper_item_id` | `uuid` (FK) | No | - | ID comparison paper item (indexed) |
| `supplier_name` | `varchar` | No | - | Nama supplier |
| `brand` | `varchar` | No | - | Merek |
| `price` | `decimal(15,2)` | No | - | Harga |
| `shipping_price` | `decimal(15,2)` | No | - | Biaya pengiriman |
| `other_fees` | `decimal(15,2)` | No | - | Biaya lainnya |
| `other_fees_note` | `text` | Yes | - | Catatan biaya lainnya |
| `contact` | `varchar` | No | - | Kontak supplier |
| `payment_terms` | `enum (PaymentTerms)` | No | - | Ketentuan pembayaran |
| `due_date` | `date` | Yes | - | Tanggal jatuh tempo |
| `is_selected` | `boolean` | No | `false` | Apakah dipilih |
| `created_at` | `timestamp` | No | - | Waktu dibuat (indexed) |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `ComparisonPaperItem` (`comparisonPaperItem`)

---

## PurchaseOrder

**File:** `src/modules/purchase-order/entities/purchase-order.entity.ts`
**Tabel:** `purchase_orders`

Purchase Order (PO).

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `po_number` | `varchar` | No | - | Nomor PO |
| `vendor` | `varchar` | No | - | Vendor |
| `address` | `varchar` | No | - | Alamat |
| `amount_in_text` | `varchar` | No | - | Jumlah dalam teks |
| `description` | `text` | No | - | Deskripsi |
| `sub_total` | `decimal(15,2)` | No | - | Sub total |
| `discount` | `decimal(15,2)` | No | - | Diskon |
| `estimated` | `decimal(15,2)` | Yes | - | Estimasi |
| `total_order` | `decimal(15,2)` | No | - | Total pesanan |
| `created_at` | `timestamp` | No | - | Waktu dibuat |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `OneToMany` → `Approval` (`approvals`)
- `OneToMany` → `SppPayment` (`payments`)

---

## SppPayment

**File:** `src/modules/spp-payment/entities/spp-payment.entity.ts`
**Tabel:** `spp_payments`

Pembayaran SPP.

| Kolom | Tipe | Nullable | Default | Keterangan |
|-------|------|----------|---------|------------|
| `id` | `uuid` (PK) | No | - | Primary key |
| `user_id` | `uuid` (FK) | No | - | ID user (indexed) |
| `po_id` | `uuid` (FK) | No | - | ID PO (indexed) |
| `payment_method` | `varchar` | No | - | Metode pembayaran |
| `amount` | `decimal(15,2)` | No | - | Jumlah pembayaran |
| `receipt_number` | `varchar` | No | - | Nomor kwitansi |
| `payment_proff_url` | `varchar` | No | - | URL bukti pembayaran |
| `payment_date` | `date` | No | - | Tanggal pembayaran |
| `created_at` | `timestamp` | No | - | Waktu dibuat (indexed) |
| `updated_at` | `timestamp` | No | - | Waktu diperbarui |
| `deleted_at` | `timestamp` | Yes | - | Soft delete |

**Relasi:**
- `ManyToOne` → `User` (`user`)
- `ManyToOne` → `PurchaseOrder` (`po`)

---

# Relasi Antar Entity

Berikut diagram relasi antar entity dalam bentuk teks:

```
User
 ├── 1:N → Spp
 ├── 1:N → ComparisonPaper
 ├── 1:N → SppPayment
 └── 1:N → ActionLog

Spp
 ├── N:1 → User
 ├── 1:N → SppDetail
 ├── 1:N → Approval
 ├── 1:N → ComparisonPaper
 └── 1:N → ActionLog

SppDetail
 ├── N:1 → Spp
 └── 1:N → ComparisonPaperItem

ComparisonPaper
 ├── N:1 → Spp
 ├── N:1 → User (purchasing)
 └── 1:N → ComparisonPaperItem

ComparisonPaperItem
 ├── N:1 → ComparisonPaper
 ├── N:1 → SppDetail
 └── 1:N → ComparisonPaperDetail

ComparisonPaperDetail
 └── N:1 → ComparisonPaperItem

PurchaseOrder
 ├── 1:N → Approval
 └── 1:N → SppPayment

Approval
 ├── N:1 → Spp (onDelete CASCADE)
 └── N:1 → PurchaseOrder (nullable, onDelete SET NULL)

SppPayment
 ├── N:1 → User
 └── N:1 → PurchaseOrder

ActionLog
 ├── N:1 → User
 └── N:1 → Spp
```

---

## Ringkasan Alur Proses

1. **User** membuat **SPP** beserta **SppDetail**.
2. **SPP** diproses melalui alur approval: Leader Division → Gudang → Audit.
3. Setelah audit approve, **Leader Purchasing** membuat **ComparisonPaper** yang berisi **ComparisonPaperItem** (terkait SppDetail) dan **ComparisonPaperDetail** (penawaran supplier).
4. **Leader Audit** melakukan verifikasi harga. Jika ada barang yang lebih murah, SPP dikembalikan ke purchasing untuk crosscheck (loop). Jika tidak, lanjut ke tahap berikutnya.
5. Jika total harga > 900rb, perlu **approval Direksi**.
6. Setelah disetujui, dibuat **PurchaseOrder (PO)**.
7. Setiap tahap (SPP, PO) memerlukan **Approval** dari user terkait.
8. Setelah PO disetujui, dilakukan **SppPayment** sebagai pembayaran.
9. Semua aktivitas pengguna dicatat pada **ActionLog**.