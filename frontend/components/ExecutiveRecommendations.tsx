import { Check, Sparkles } from "lucide-react";
import { recommendations as mockRecommendations } from "@/data/mockData";
import type { Recommendation } from "@/lib/dashboardData";

type Props = {
  recommendations?: Recommendation[];
};

export default function ExecutiveRecommendations({
  recommendations = mockRecommendations
}: Props) {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="text-cyan-200" size={20} />
          <h3 className="text-lg font-semibold">Executive Recommendations</h3>
        </div>
        <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
          {recommendations.length} actions
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-cyan-300/10 bg-slate-950/55 p-3"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-cyan-300 text-slate-950">
                <Check size={13} />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-100">{item.title}</h4>
                  <span className="rounded border border-orange-300/20 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] text-orange-200">
                    {item.priority}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
