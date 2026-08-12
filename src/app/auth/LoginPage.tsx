import {
  Boxes,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

export default function LoginPageUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl w-full max-w-sm rounded-3xl p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white shadow-lg shadow-sky-900/10">
          <Boxes className="size-7" />
        </div>

        <h1 className="mt-5 text-xl font-semibold tracking-tight">
          Sistem Permintaan Pengadaan
        </h1>
        <p className="mt-2 text-xs text-slate-500">
          Ajukan SPP, setujui PO, dan pantau penerimaan <br /> barang dalam satu alur.
        </p>

        <form
          className="mt-6 space-y-3 text-left"
          onSubmit={(e) => e.preventDefault()}
        >

          <div className="flex items-center gap-2 rounded-xl bg-slate-100/70 px-3 py-2.5 focus-within:ring-2 focus-within:ring-sky-400">
            <Mail className="size-4 text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-100/70 px-3 py-2.5 focus-within:ring-2 focus-within:ring-sky-400">
            <Lock className="size-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Tampilkan kata sandi"
              className="focus:outline-none"
            >
              {showPassword ? (
                <Eye className="size-4 text-slate-500 hover:text-slate-700" />
              ) : (
                <EyeOff className="size-4 text-slate-500 hover:text-slate-700" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-slate-900 mt-8 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            Masuk
          </button>
        </form>

        {/* Footer info */}
        <p className="mt-6 text-xs text-slate-500">
          Hak akses dan tampilan disesuaikan secara otomatis berdasarkan peran akun Anda.
        </p>
      </div>
    </div>
  );
}