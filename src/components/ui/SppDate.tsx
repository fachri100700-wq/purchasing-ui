import { CalendarDays } from "lucide-react";

interface SppDateProps {
  date: string;
}

export default function SppDate({ date }: SppDateProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-500">
      <CalendarDays className="size-3.5 text-slate-400" />

      <span>
        {new Intl.DateTimeFormat("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(date))}
      </span>
    </div>
  );
}