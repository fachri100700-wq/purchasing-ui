import React, { useEffect, useRef, useState } from "react";
import { type LucideIcon, ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  options: Option[];

  value?: string;
  onChange?: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function Select({
  icon: Icon,
  label,
  error,
  options,
  value = "",
  onChange,
  placeholder = "Pilih opsi",
  disabled = false,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const handleSelect = (selectedValue: string) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={`relative flex flex-col gap-1.5 ${className}`}
    >
      {label && (
        <label className="text-[13px] font-semibold text-slate-700">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex w-full items-center gap-2 rounded-xl border bg-white
          px-3 py-2.5 text-left text-sm transition-all
          disabled:cursor-not-allowed disabled:opacity-60
          ${
            error
              ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
              : "border-slate-300 hover:border-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          }
        `}
      >
        {Icon && (
          <Icon
            className={`size-4 shrink-0 ${
              error ? "text-rose-500" : "text-slate-500"
            }`}
          />
        )}

        <span
          className={`flex-1 truncate ${
            selectedOption
              ? "text-slate-900"
              : "text-slate-400"
          }`}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          className={`size-4 shrink-0 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div
          className="
            absolute top-full z-50 mt-2 w-full overflow-hidden
            rounded-xl border border-slate-200 bg-white
            py-1 shadow-lg shadow-slate-900/10
          "
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  flex w-full items-center justify-between px-3 py-2.5
                  text-left text-sm transition-colors
                  ${
                    isSelected
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                {option.label}

                {isSelected && (
                  <Check className="size-4 text-sky-600" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <span className="text-xs font-medium text-rose-500">
          {error}
        </span>
      )}
    </div>
  );
}