"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

import { revenueData, departmentImpact } from "@/data/mockData";

export default function ImpactDashboard() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="glass rounded-3xl p-6">
        <h3 className="text-xl font-bold mb-1">Revenue Forecast</h3>
        <p className="text-sm text-slate-400 mb-5">
          Predicted revenue impact after simulated support load increase.
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: "12px"
                }}
              />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#64748b"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="simulated"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-3xl p-6">
        <h3 className="text-xl font-bold mb-1">Department Stress</h3>
        <p className="text-sm text-slate-400 mb-5">
          Burnout, SLA pressure, and operational strain by department.
        </p>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departmentImpact}>
              <XAxis dataKey="department" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#020617",
                  border: "1px solid #1e293b",
                  borderRadius: "12px"
                }}
              />
              <Bar dataKey="risk" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="xl:col-span-2 glass rounded-3xl p-6">
        <h3 className="text-xl font-bold mb-4">AI Simulation Result</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-red-950/40 border border-red-900">
            <p className="text-sm text-red-300">Burnout Risk</p>
            <h4 className="text-3xl font-bold mt-2">High</h4>
            <p className="text-sm text-slate-400 mt-2">
              Support team overload likely within 18 days.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-yellow-950/40 border border-yellow-900">
            <p className="text-sm text-yellow-300">SLA Failure Risk</p>
            <h4 className="text-3xl font-bold mt-2">67%</h4>
            <p className="text-sm text-slate-400 mt-2">
              Response time may exceed contract limits.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-900">
            <p className="text-sm text-blue-300">Hiring Need</p>
            <h4 className="text-3xl font-bold mt-2">+8</h4>
            <p className="text-sm text-slate-400 mt-2">
              Recommended additional support specialists.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}