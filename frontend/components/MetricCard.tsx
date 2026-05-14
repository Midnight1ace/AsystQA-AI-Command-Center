"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  accent: "cyan" | "blue" | "orange" | "red";
  context: string;
};

const accentClasses = {
  cyan: "from-cyan-300/28 to-cyan-300/0 text-cyan-200",
  blue: "from-blue-400/28 to-blue-400/0 text-blue-200",
  orange: "from-orange-400/30 to-orange-400/0 text-orange-200",
  red: "from-red-400/30 to-red-400/0 text-red-200"
};

export default function MetricCard({
  title,
  value,
  change,
  trend,
  accent,
  context
}: Props) {
  const positive = trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass relative min-h-32 overflow-hidden rounded-lg p-4"
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accentClasses[accent]}`} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-semibold leading-none text-white">{value}</h3>
        </div>
        <div className={`rounded-md bg-gradient-to-b p-2 ${accentClasses[accent]}`}>
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <span className="text-slate-500">{context}</span>
        <span className={positive ? "text-emerald-300" : "text-orange-300"}>{change}</span>
      </div>
    </motion.div>
  );
}
