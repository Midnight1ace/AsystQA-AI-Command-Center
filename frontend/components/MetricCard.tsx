import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export default function MetricCard({ title, value, change, trend }: Props) {
  const positive = trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-3xl p-5"
    >
      <p className="text-sm text-slate-400">{title}</p>

      <div className="flex items-end justify-between mt-4">
        <h3 className="text-3xl font-bold">{value}</h3>

        <div
          className={`flex items-center gap-1 text-sm ${
            positive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {change}
        </div>
      </div>
    </motion.div>
  );
}
