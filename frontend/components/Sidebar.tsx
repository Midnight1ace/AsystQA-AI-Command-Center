import {
  Building2,
  Activity,
  Users,
  Truck,
  Server,
  Brain,
  Settings
} from "lucide-react";

const items = [
  { label: "Digital Twin", icon: Building2 },
  { label: "Simulation", icon: Activity },
  { label: "Staffing", icon: Users },
  { label: "Logistics", icon: Truck },
  { label: "Infrastructure", icon: Server },
  { label: "AI Agents", icon: Brain },
  { label: "Settings", icon: Settings }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 min-h-screen glass p-5 flex-col justify-between">
      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold">TwinOps AI</h1>
          <p className="text-sm text-slate-400">
            Enterprise Digital Twin
          </p>
        </div>

        <nav className="space-y-2">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <p className="text-sm text-slate-400">Simulation Status</p>
        <p className="font-semibold text-emerald-400">Live Model Active</p>
      </div>
    </aside>
  );
}