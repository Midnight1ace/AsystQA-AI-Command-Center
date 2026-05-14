import { Bell, Command, Search, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col gap-6 border-b border-cyan-300/10 pb-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="/asystqa-logo.svg"
            alt="AsystQA logo"
            className="h-14 w-14 rounded-2xl bg-slate-950/80 p-2"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              AI Command Center
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
              AsystQA AI Command Center
            </h2>
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-6 text-slate-400">
          Simulate business decisions before making them across staffing,
          revenue, infrastructure, logistics, customer behavior, and governance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex min-w-64 flex-1 items-center gap-2 rounded-lg border border-cyan-300/15 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-300 md:flex-none">
          <Search size={16} className="text-cyan-200/70" />
          <input
            placeholder="Search company model..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
          />
          <Command size={15} className="text-slate-600" />
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2.5 text-sm font-medium text-emerald-200">
          <ShieldCheck size={16} />
          93% confidence
        </button>

        <button className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/15 bg-slate-950/70 text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}
