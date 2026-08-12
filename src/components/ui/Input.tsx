import React from "react";
import type { LucideIcon } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

export default function Input({ icon: Icon, label, error, className, ...props }: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-[13px] font-semibold text-slate-700">{label}</label>}
      
      <div className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-sky-400 border transition-all ${error ? 'border-rose-400 focus-within:ring-rose-400' : 'border-slate-300 hover:border-slate-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100'}`}>
        {Icon && <Icon className={`size-4 ${error ? 'text-rose-500' : 'text-slate-500'}`} />}
        
        <input
          className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-500 ${error ? 'text-rose-900' : 'text-slate-900'}`}
          {...props}
        />
      </div>
      
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
}
