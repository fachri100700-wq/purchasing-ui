import { StageIcon } from "../../helpers/StageIcon";
import type { SppStage } from "../../helpers/getSppStages";

interface SppStageProps {
  progres: { step: string; progress: number };
  stages: SppStage[];
}

export default function SppStage({ progres, stages }: SppStageProps) {
  return (
    <div className="border border-white/60 bg-white/70 shadow-xl shadow-sky-900/10 backdrop-blur-xl rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Alur approval
        </h2>
        <span className="text-xs font-semibold text-slate-400">
          {progres.progress}%
        </span>
      </div>

      <div className="mt-4 space-y-1">
        {stages.map((st, i) => (
          <div key={st.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <StageIcon status={st.status} />
              {i < stages.length - 1 ? (
                <span className="my-1 w-px flex-1 bg-slate-200" />
              ) : null}
            </div>
            <div className="pb-3">
              <p
                className={`text-sm ${
                  st.status === "pending" || st.status === "skipped"
                    ? "text-slate-400"
                    : "font-medium text-slate-900"
                }`}
              >
                {st.label}
              </p>
              <p className="text-xs text-slate-500">
                {st.actor ?? st.role}
                {st.at ? ` · ${st.at}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
