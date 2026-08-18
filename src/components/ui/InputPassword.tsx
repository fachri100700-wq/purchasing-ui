import { useState } from "react";
import { Eye, EyeOff, Lock, type LucideIcon } from "lucide-react";
import Input, { type InputProps } from "./Input";

interface PasswordInputProps extends Omit<InputProps, "type"> {
  icon?: LucideIcon;
}

export default function PasswordInput({
  icon: Icon = Lock,
  label,
  error,
  isLoading,
  disabled,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        label={label}
        icon={Icon}
        error={error}
        isLoading={isLoading}
        disabled={disabled}
      />

      {/* Button toggle eye */}
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={isLoading || disabled}
        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        className={`absolute right-3 focus:outline-none text-slate-400 hover:text-slate-600 transition-colors disabled:pointer-events-none ${
          label ? "top-[38px]" : "top-[12px]"
        }`}
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  );
}