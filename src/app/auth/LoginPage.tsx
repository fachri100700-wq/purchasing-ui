import { Boxes, Mail, Lock } from "lucide-react";;
import { useLogin } from "../../features/auth/hooks/useLogin";
import Input from "../../components/ui/Input";
import PasswordInput from "../../components/ui/InputPassword";

export default function LoginPageUI() {

  const { register, handleSubmit, errors, isSubmitting } = useLogin();

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
          Ajukan SPP, setujui PO, dan pantau penerimaan <br /> barang dalam satu
          alur.
        </p>

        <form
          className="mt-6 space-y-3 text-left"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex items-center ">
            <Input
              type="email"
              placeholder="Email"
              icon={Mail}
              {...register("email")}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              isLoading={isSubmitting}
              error={errors.email?.message}
            />
          </div>

          <div className="flex items-center">
            <PasswordInput
              placeholder="Kata sandi"
              icon={Lock}
              {...register("password")}
              error={errors.password?.message}
            />
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
          Hak akses dan tampilan disesuaikan secara otomatis berdasarkan peran
          akun Anda.
        </p>
      </div>
    </div>
  );
}
