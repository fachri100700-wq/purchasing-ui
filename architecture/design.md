# 🎨 Design System & UI Specification Guidelines

Dokumen ini adalah panduan desain dan instruksi styling WAJIB untuk aplikasi Pengadaan. 
Semua komponen UI baru atau modifikasi halaman HARUS mematuhi token dan pola desain di bawah ini agar 100% konsisten dengan desain Lovable.

---

## 🟢 1. Tech Stack & Core Foundations

- **Styling Paradigm:** Pure Tailwind CSS (Gunakan Utility Classes & Arbitrary Values Tailwind).
- **CSS Policy:** STRICTLY NO CUSTOM CSS FILES. Tidak boleh membuat class CSS manual di `styles.css` atau `.module.css`.
- **Icons:** Lucide React (`lucide-react`)
- **Theme Theme:** Soft Sky Blue / Modern Clean Enterprise SaaS.

---

## 🎨 2. Color Palette & Design Tokens

### 🌐 Global Page Background
- **Main App Background:** `bg-[#7dd3fc]` atau `bg-sky-300` (Sky Blue Gradient / Solid Soft Background).

### ⚪ Cards & Surface Container
- **Card Background:** `bg-white` atau `bg-white/90` (Soft White dengan sedikit transparansi).
- **Card Radius:** `rounded-2xl` atau `rounded-3xl` (Rounded halus dan modern).
- **Card Shadow:** `shadow-xl shadow-sky-900/5` atau `shadow-lg border border-white/50`.

### 🖤 Neutral & Text Colors
- **Primary Text:** `text-slate-900` / `text-slate-800` (Sangat kontras & mudah dibaca).
- **Secondary Text / Label:** `text-slate-500` / `text-slate-600`.
- **Muted Text / Hint:** `text-slate-400`.
- **Input Border / Line:** `border-slate-200` atau `border-sky-100`.

### 🟦 Accent & Interactive Colors
- **Dark Primary (Buttons & Active Navigation):** `bg-[#0f172a]` (`bg-slate-900`) hover: `hover:bg-slate-800`.
- **Active Selection Card (Radio/Option):** `bg-sky-100 border-2 border-sky-400 text-slate-900`.
- **Unselected Option Card:** `bg-white border border-slate-200 hover:border-slate-300`.
- **Soft Accent Container (Metric Cards):** `bg-sky-100/70` atau `bg-sky-50`.

### 🏷️ Status Badges (Pill Styling)
- **Rutin:** `bg-sky-100 text-sky-700 font-medium text-xs px-2.5 py-0.5 rounded-full border border-sky-200`
- **Kebutuhan:** `bg-amber-100 text-amber-700 font-medium text-xs px-2.5 py-0.5 rounded-full border border-amber-200`
- **Berjalan:** `bg-sky-100 text-sky-700 font-medium text-xs px-2.5 py-0.5 rounded-full border border-sky-200`
- **Selesai:** `bg-emerald-100 text-emerald-700 font-medium text-xs px-2.5 py-0.5 rounded-full border border-emerald-200`

---

## 🔤 3. Typography Rules

- **Font Family:** `font-sans` (Inter / Plus Jakarta Sans).
- **Main Heading (H1 - Page Title):** `text-2xl font-bold text-slate-900 tracking-tight`
- **Sub-heading / Section Title:** `text-base font-semibold text-slate-800`
- **Metric Card Value:** `text-2xl font-bold text-slate-900`
- **Body Regular:** `text-sm text-slate-700`
- **Caption / Sub-text:** `text-xs text-slate-500`

---

## 📐 4. Component Patterns & Rules

### 🔹 1. Page Shell / Layout Structure
- **Root Container:** `min-h-screen bg-[#7dd3fc] p-4 lg:p-6 flex gap-6`
- **Sidebar Container:** `w-64 bg-white/90 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between shadow-lg`
- **Main Content Area:** `flex-1 flex flex-col gap-6 overflow-y-auto`

### 🔹 2. Sidebar Navigation Items
- **Active Nav Item:** `bg-slate-900 text-white rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 shadow-md`
- **Inactive Nav Item:** `text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-3 transition-all`

### 🔹 3. Primary Button
```tsx
<button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-50">
  Kirim ke Kepala Bagian
</button>
```

### 🔹 4. Form Inputs (Teks, Dropdown, Date)
- **Base Input:** `bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm w-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all`
- **Label Input:** `text-sm font-medium text-slate-700 mb-1.5 block`

### 🔹 5. Progress Bar (List SPP di Dashboard)
- **Container / Track:** `w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3`
- **Indicator / Fill:** `bg-slate-900 h-full rounded-full`