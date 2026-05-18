import { ArrowDown, GitBranch, Zap } from "lucide-react";
import { cascadeSteps as mockCascadeSteps } from "@/data/mockData";
import type { CascadeStep } from "@/lib/dashboardData";

const severityClasses = {
  warning: "border-orange-300/25 bg-orange-400/10 text-orange-100",
  danger: "border-red-300/25 bg-red-400/10 text-red-100",
  stable: "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
};

type Props = {
  cascadeSteps?: CascadeStep[];
};

export default function CascadeChain({ cascadeSteps = mockCascadeSteps }: Props) {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitBranch className="text-orange-200" size={20} />
          <h3 className="text-lg font-semibold">Cascade Chain</h3>
        </div>
        <Zap size={18} className="text-red-300" />
      </div>

      <div className="space-y-2">
        {cascadeSteps.map((step, index) => (
          <div key={step.label}>
            <div className={`rounded-lg border p-3 ${severityClasses[step.severity]}`}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{step.label}</p>
                <span className="text-xs text-slate-400">0{index + 1}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-400">{step.detail}</p>
            </div>
            {index < cascadeSteps.length - 1 ? (
              <div className="grid h-5 place-items-center text-slate-600">
                <ArrowDown size={14} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
