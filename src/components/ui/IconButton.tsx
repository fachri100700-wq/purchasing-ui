import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type IconButtonSize = "sm" | "md";

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  ariaLabel: string;
  size?: IconButtonSize;
  isDeleting?: boolean;
}

export default function IconButton({
  children,
  ariaLabel,
  disabled = false,
  size = "md",
  isDeleting = false,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-[42px] w-[42px]",
  };

  const iconSizeClass = {
    sm: "size-3.5",
    md: "size-4",
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled || isDeleting} // 🟢 Auto-disable kalau lagi deleting
      className={`
        flex items-center justify-center
        rounded-xl border border-slate-200
        bg-white text-slate-500
        transition-colors
        hover:border-rose-200
        hover:bg-rose-50
        hover:text-rose-600
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${sizeClass[size]}
        ${className}
      `}
      {...props}
    >
      {isDeleting ? (
        <Loader2 className={`animate-spin text-rose-500 ${iconSizeClass[size]}`} />
      ) : (
        children
      )}
    </button>
  );
}