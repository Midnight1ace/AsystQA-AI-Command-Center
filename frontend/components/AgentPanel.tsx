import { Brain, CheckCircle2, Loader2 } from "lucide-react";
import { agents } from "@/data/mockData";

export default function AgentPanel() {
  return (
    <section className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Brain className="text-blue-400" />
        <h3 className="text-xl font-bold">AI Agent Activity</h3>
      </div>

      <div className="space-y-4">
        {agents.map((agent, index) => (
          <div
            key={agent.name}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <h4 className="font-semibold">{agent.name}</h4>
                <p className="text-sm text-slate-400">{agent.task}</p>
              </div>

              {index === 0 ? (
                <Loader2 className="animate-spin text-blue-400" size={20} />
              ) : (
                <CheckCircle2 className="text-emerald-400" size={20} />
              )}
            </div>

            <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${agent.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}