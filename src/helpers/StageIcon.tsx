import { Check, Circle, Minus, X } from "lucide-react";
import type { StageStatus } from "./getSppStages";

export function StageIcon({ status }: { status: StageStatus }) {
  const base =
    "flex size-7 shrink-0 items-center justify-center rounded-full ring-1";
  if (status === "done")
    return (
      <span className={`${base} bg-slate-900 text-white ring-slate-900`}>
        <Check className="size-3.5" />
      </span>
    );
  if (status === "current")
    return (
      <span className={`${base} bg-sky-500/20 text-sky-600 ring-sky-500/50`}>
        <Circle className="size-2.5 fill-current" />
      </span>
    );
  if (status === "skipped")
    return (
      <span className={`${base} bg-sky-100 text-slate-500 ring-slate-200`}>
        <Minus className="size-3.5" />
      </span>
    );
  if (status === "rejected")
    return (
      <span className={`${base} bg-rose-500/15 text-rose-600 ring-rose-500/40`}>
        <X className="size-3.5" />
      </span>
    );
  return (
    <span className={`${base} bg-white text-slate-500 ring-slate-200`}>
      <Circle className="size-2.5" />
    </span>
  );
}