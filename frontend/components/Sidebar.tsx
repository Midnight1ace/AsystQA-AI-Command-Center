import {
  Activity,
  BarChart3,
  Brain,
  Building2,
  FileText,
  Gauge,
  Landmark,
  Route,
  Server,
  Settings,
  ShieldCheck,
  Truck,
  Users
} from "lucide-react";

const items = [
  { label: "Digital Twin", icon: Building2 },
  { label: "Simulation", icon: Activity },
  { label: "Staffing", icon: Users },
  { label: "Revenue", icon: Landmark },
  { label: "Infrastructure", icon: Server },
  { label: "Logistics", icon: Truck },
  { label: "Customer Behavior", icon: Route },
  { label: "AI Agents", icon: Brain },
  { label: "Reports", icon: FileText },
  { label: "Governance", icon: ShieldCheck },
  { label: "Settings", icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 min-h-screen shrink-0 border-r border-cyan-300/10 bg-[#030814]/92 px-4 py-5 flex-col justify-between">
      <div>
        <div className="mb-7 border-b border-cyan-300/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-400/10 text-cyan-200">
              <Gauge size={22} />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-wide">AsystQA AI</h1>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/60">
                Enterprise OS
              </p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  index === 0
                    ? "border border-cyan-300/30 bg-cyan-300/12 text-cyan-100 shadow-[0_0_24px_rgba(38,217,255,0.12)]"
                    : "border border-transparent text-slate-400 hover:border-cyan-300/15 hover:bg-slate-900/80 hover:text-slate-100"
                }`}
              >
                <Icon
                  size={17}
                  className={index === 0 ? "text-cyan-200" : "text-slate-500 group-hover:text-cyan-200"}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="rounded-lg border border-emerald-300/20 bg-emerald-400/8 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
            Model Status
          </p>
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(54,240,163,0.9)]" />
        </div>
        <p className="text-sm font-semibold text-emerald-200">Live Twin Active</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          6 agents supervising 41 operational dependencies.
        </p>
      </div>
    </aside>
  );
}
