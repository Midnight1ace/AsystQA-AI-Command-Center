import { Brain, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { agents } from "@/data/mockData";

const stateStyles = {
  running: "text-cyan-200",
  complete: "text-emerald-200",
  supervising: "text-orange-200"
};

export default function AgentPanel() {
  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Brain className="text-cyan-200" size={20} />
          <h3 className="text-lg font-semibold">Agent Activity</h3>
        </div>
        <span className="text-xs uppercase tracking-[0.16em] text-slate-500">Multi-Agent</span>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-lg border border-cyan-300/10 bg-slate-950/55 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-100">{agent.name}</h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">{agent.task}</p>
              </div>

              {agent.state === "complete" ? (
                <CheckCircle2 className="shrink-0 text-emerald-300" size={18} />
              ) : agent.state === "supervising" ? (
                <ShieldCheck className="shrink-0 text-orange-300" size={18} />
              ) : (
                <Loader2 className="shrink-0 animate-spin text-cyan-300" size={18} />
              )}
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                style={{ width: `${agent.progress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs leading-5 text-slate-400">{agent.insight}</p>
              <span className={`shrink-0 text-xs font-semibold ${stateStyles[agent.state]}`}>
                {agent.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
