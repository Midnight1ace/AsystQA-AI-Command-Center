"use client";

import AgentPanel from "@/components/AgentPanel";
import BusinessTwinMap from "@/components/BusinessTwinMap";
import CascadeChain from "@/components/CascadeChain";
import ExecutiveRecommendations from "@/components/ExecutiveRecommendations";
import Header from "@/components/Header";
import ImpactDashboard from "@/components/ImpactDashboard";
import MetricCard from "@/components/MetricCard";
import RiskTimeline from "@/components/RiskTimeline";
import Sidebar from "@/components/Sidebar";
import SimulationForm from "@/components/SimulationForm";
import { metrics } from "@/data/mockData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1 px-4 py-5 md:px-6 xl:px-8">
          <Header />

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="space-y-4 xl:col-span-3">
              <SimulationForm />
              <RiskTimeline />
            </div>

            <div className="xl:col-span-6">
              <BusinessTwinMap />
            </div>

            <div className="xl:col-span-3">
              <AgentPanel />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div className="xl:col-span-8">
              <ImpactDashboard />
            </div>

            <div className="space-y-4 xl:col-span-4">
              <CascadeChain />
              <ExecutiveRecommendations />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
