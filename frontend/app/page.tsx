"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import SimulationForm from "@/components/SimulationForm";
import AgentPanel from "@/components/AgentPanel";
import ImpactDashboard from "@/components/ImpactDashboard";
import RiskTimeline from "@/components/RiskTimeline";
import { metrics } from "@/data/mockData";

export default function HomePage() {
  return (
    <main className="min-h-screen flex bg-[#050816] text-white">
      <Sidebar />

      <section className="flex-1 p-6 space-y-6">
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <SimulationForm />
            <ImpactDashboard />
          </div>

          <div className="space-y-6">
            <AgentPanel />
            <RiskTimeline />
          </div>
        </div>
      </section>
    </main>
  );
}