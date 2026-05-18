import { AlertTriangle } from "lucide-react";
import { timeline as mockTimeline } from "@/data/mockData";
import type { TimelineItem } from "@/lib/dashboardData";

type Props = {
  timeline?: TimelineItem[];
};

export default function RiskTimeline({ timeline = mockTimeline }: Props) {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="text-orange-300" size={20} />
        <h3 className="text-lg font-semibold">Predictive Timeline</h3>
      </div>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={item.day} className="relative pl-6">
            <div className="absolute bottom-0 left-1.5 top-5 w-px bg-cyan-300/12" />
            <div
              className={`absolute left-0 top-1 h-3 w-3 rounded-full border ${
                index > 1
                  ? "border-red-300 bg-red-300 shadow-[0_0_16px_rgba(255,77,97,0.65)]"
                  : "border-cyan-300 bg-cyan-300 shadow-[0_0_14px_rgba(38,217,255,0.65)]"
              }`}
            />
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{item.day}</p>
            <h4 className="mt-1 text-sm font-semibold text-slate-100">{item.title}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
