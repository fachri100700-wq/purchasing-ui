import React from "react";
import type { LucideIcon } from "lucide-react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

export default function Textarea({ icon: Icon, label, error, className, ...props }: TextareaProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      
      <div className={`flex items-start gap-2 rounded-xl bg-slate-100/70 px-3 py-2.5 focus-within:ring-2 focus-within:ring-sky-400 border transition-all ${error ? 'border-rose-400 focus-within:ring-rose-400' : 'border-transparent'}`}>
        {Icon && <Icon className={`size-4 mt-0.5 ${error ? 'text-rose-500' : 'text-slate-500'}`} />}
        
        <textarea
          className={`w-full bg-transparent text-sm outline-none placeholder:text-slate-500 min-h-[100px] resize-y ${error ? 'text-rose-900' : 'text-slate-900'}`}
          {...props}
        />
      </div>
      
      {error && <span className="text-xs text-rose-500 font-medium">{error}</span>}
    </div>
  );
}
