"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Building2, Server, ShieldCheck, Truck, Users } from "lucide-react";
import { twinNodes as mockTwinNodes } from "@/data/mockData";
import type { TwinNode } from "@/lib/dashboardData";

const icons = {
  staffing: Users,
  revenue: Building2,
  infra: Server,
  customer: Activity,
  logistics: Truck,
  governance: ShieldCheck
};

const severityStyles = {
  stable: "border-emerald-300/40 bg-emerald-300/12 text-emerald-100 shadow-[0_0_22px_rgba(54,240,163,0.18)]",
  warning: "border-orange-300/45 bg-orange-400/12 text-orange-100 shadow-[0_0_24px_rgba(255,159,67,0.18)]",
  danger: "border-red-300/45 bg-red-400/12 text-red-100 shadow-[0_0_26px_rgba(255,77,97,0.2)]"
};

type Props = {
  twinNodes?: TwinNode[];
  scenario?: string;
};

export default function BusinessTwinMap({
  twinNodes = mockTwinNodes,
  scenario = "the simulated support surge"
}: Props) {
  return (
    <section className="glass panel-grid scanline relative min-h-[31rem] overflow-hidden rounded-lg p-5">
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Business Twin Visualization</h3>
          <p className="text-sm text-slate-400">
            Live operational dependencies reacting to {scenario.toLowerCase()}.
          </p>
        </div>
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-cyan-100">
          Live Systems
        </div>
      </div>

      <div className="absolute inset-0 top-20">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="link-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#26d9ff" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#2f7dff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#ff4d61" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path d="M50 50 L18 34 M50 50 L28 68 M50 50 L76 34 M50 50 L78 66 M50 50 L50 28 M50 50 L50 76" stroke="url(#link-gradient)" strokeWidth="0.42" />
          <path d="M18 34 C28 25 39 24 50 28 C63 24 72 27 76 34" stroke="#26d9ff" strokeOpacity="0.22" strokeWidth="0.32" fill="none" />
          <path d="M28 68 C37 82 64 82 78 66" stroke="#ff4d61" strokeOpacity="0.28" strokeWidth="0.34" fill="none" />
        </svg>
      </div>

      <motion.div
        className="absolute left-1/2 top-[52%] z-20 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/35 bg-[#06182f]/95 shadow-[0_0_60px_rgba(38,217,255,0.25)]"
        animate={{ scale: [1, 1.035, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-3 rounded-full border border-cyan-300/20" />
        <Brain className="text-cyan-100" size={32} />
        <span className="absolute bottom-7 text-xs uppercase tracking-[0.18em] text-cyan-100/80">
          Twin Core
        </span>
      </motion.div>

      {twinNodes.map((node) => {
        const Icon = icons[node.id as keyof typeof icons];

        return (
          <div
            key={node.id}
            className={`absolute z-20 w-32 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-3 py-2 md:w-36 ${severityStyles[node.severity]}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="flex items-center gap-2">
              <Icon size={16} />
              <span className="text-xs font-medium uppercase tracking-[0.14em]">{node.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold leading-none">{node.value}</p>
          </div>
        );
      })}

      <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 border-t border-cyan-300/10 pt-4 text-xs text-slate-400 md:grid-cols-3">
        <div>
          <span className="text-cyan-200">41</span> dependency links monitored
        </div>
        <div>
          <span className="text-orange-200">14 days</span> to staffing stress peak
        </div>
        <div>
          <span className="text-red-200">11.2%</span> projected revenue drag
        </div>
      </div>
    </section>
  );
}
