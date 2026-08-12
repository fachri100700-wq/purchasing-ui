import React from "react";
import { type LucideIcon, ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export default function Select({ icon: Icon, label, error, className, options, ...props }: SelectProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-[13px] font-semibold text-slate-700">{label}</label>}
      
      <div className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 focus-within:ring-2 focus-within:ring-sky-400 border transition-all ${error ? 'border-rose-400 focus-within:ring-rose-400' : 'border-slate-300 hover:border-slate-400 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100'} relative`}>
        {Icon && <Icon className={`size-4 ${error ? 'text-rose-500' : 'text-slate-500'}`} />}
        
        <select
          className={`w-full bg-transparent text-sm outline-none appearance-none cursor-pointer ${error ? 'text-rose-900' : 'text-slate-900'} ${!props.value ? 'text-slate-500' : ''}`}
          {...props}
        >
          <option value="" disabled>Pilih opsi</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} className="text-slate-900">{opt.label}</option>
          ))}
        </select>
        
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDown className="size-4 text-slate-400" />
        </div>
      </div>
      
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
}
