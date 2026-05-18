"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import {
  departmentImpact as mockDepartmentImpact,
  revenueData as mockRevenueData
} from "@/data/mockData";
import type { DepartmentImpact, RevenuePoint } from "@/lib/dashboardData";

const tooltipStyle = {
  background: "#030814",
  border: "1px solid rgba(117, 186, 255, 0.2)",
  borderRadius: "8px",
  color: "#f7fbff"
};

type Props = {
  revenueData?: RevenuePoint[];
  departmentImpact?: DepartmentImpact[];
};

export default function ImpactDashboard({
  revenueData = mockRevenueData,
  departmentImpact = mockDepartmentImpact
}: Props) {
  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      <div className="glass rounded-lg p-5 xl:col-span-2">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Forecast</h3>
            <p className="text-sm text-slate-400">
              Baseline revenue vs. simulated support surge and churn pressure.
            </p>
          </div>
          <div className="hidden items-center gap-4 text-xs text-slate-400 md:flex">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Baseline
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Simulated
            </span>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="simulated"
                stroke="#26d9ff"
                strokeWidth={3}
                dot={{ r: 3, fill: "#26d9ff", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-lg p-5">
        <h3 className="text-lg font-semibold">Department Strain</h3>
        <p className="mb-4 text-sm text-slate-400">
          Burnout, SLA, and productivity pressure by function.
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentImpact} margin={{ left: -22, right: 4, top: 8, bottom: 0 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="department" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="risk" fill="#2f7dff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-lg p-5 xl:col-span-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Customer Churn Curve</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Customer behavior agent predicts churn acceleration after response
              time breaches and complaint escalation.
            </p>
          </div>

          <div className="h-48 lg:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -18, right: 12, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="churn-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff4d61" stopOpacity={0.42} />
                    <stop offset="100%" stopColor="#ff4d61" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="churn"
                  stroke="#ff4d61"
                  fill="url(#churn-gradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
