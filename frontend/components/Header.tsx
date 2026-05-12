import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold">Corporate Digital Twin</h2>
        <p className="text-slate-400">
          Simulate staffing, revenue, logistics, infrastructure, productivity,
          and customer behavior.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search company model..."
            className="bg-transparent outline-none text-sm"
          />
        </div>

        <button className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}