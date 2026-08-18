import React from "react";
import { Loader2, type LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  isLoading?: boolean;
}

export default function Input({
  icon: Icon,
  label,
  error,
  isLoading,
  className,
  ...props
}: InputProps) {
  return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label className="text-[13px] font-semibold text-slate-700">
            {label}
          </label>
        )}

        <div
          className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 transition-all border ${
            error
              ? "border-rose-400 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-400"
              : "border-slate-300 hover:border-slate-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100"
          } ${isLoading ? "bg-slate-50 cursor-not-allowed opacity-75" : ""}`}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin text-slate-400 shrink-0" />
          ) : (
            Icon && (
              <Icon
                className={`size-4 shrink-0 ${
                  error ? "text-rose-500" : "text-slate-500"
                }`}
              />
            )
          )}

          <input
            disabled={isLoading }
            className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed ${
              error ? "text-rose-900" : "text-slate-900"
            }`}
            {...props}
          />
        </div>

        {error && (
          <span className="text-xs text-rose-500 font-medium">{error}</span>
        )}
      </div>
    );
}
