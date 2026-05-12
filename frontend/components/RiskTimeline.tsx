import { AlertTriangle } from "lucide-react";
import { timeline } from "@/data/mockData";

export default function RiskTimeline() {
  return (
    <section className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <AlertTriangle className="text-yellow-400" />
        <h3 className="text-xl font-bold">Risk Timeline</h3>
      </div>

      <div className="space-y-5">
        {timeline.map((item) => (
          <div key={item.day} className="relative pl-6 border-l border-slate-700">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full" />
            <p className="text-sm text-blue-300">{item.day}</p>
            <h4 className="font-semibold mt-1">{item.title}</h4>
            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}