"use client";

import { useCallback, useEffect, useState } from "react";
import CommandCenterViews, { MobileTabRail } from "@/components/CommandCenterViews";
import Header from "@/components/Header";
import Sidebar, { type TabId } from "@/components/Sidebar";
import {
  buildSimulationRequest,
  createDashboardData,
  defaultScenario,
  fallbackDashboardData
} from "@/lib/dashboardData";
import {
  getCompanyProfile,
  getDemoSimulations,
  runSimulation,
  type CompanyProfile,
  type DemoSimulation
} from "@/lib/api";

type BackendStatus = "connected" | "offline" | "loading";

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState(fallbackDashboardData);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [scenarios, setScenarios] = useState<DemoSimulation[]>([defaultScenario]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>("loading");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("digital-twin");

  const executeSimulation = useCallback(
    async ({
      profile,
      scenario,
      description,
      impactPercentage,
      timeHorizon
    }: {
      profile?: CompanyProfile | null;
      scenario: DemoSimulation;
      description?: string;
      impactPercentage?: number;
      timeHorizon?: string;
    }) => {
      const activeProfile = profile ?? companyProfile;
      const request = buildSimulationRequest(
        activeProfile,
        scenario,
        impactPercentage,
        timeHorizon,
        description
      );
      const result = await runSimulation(request);

      setDashboardData(createDashboardData(result, activeProfile));
      setBackendStatus("connected");
      setError(null);
    },
    [companyProfile]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadBackendData() {
      setBackendStatus("loading");
      setIsRunning(true);

      try {
        const [profile, demoScenarios] = await Promise.all([
          getCompanyProfile(),
          getDemoSimulations()
        ]);
        const nextScenarios = demoScenarios.length ? demoScenarios : [defaultScenario];

        if (cancelled) {
          return;
        }

        setCompanyProfile(profile);
        setScenarios(nextScenarios);

        const request = buildSimulationRequest(profile, nextScenarios[0]);
        const result = await runSimulation(request);

        if (cancelled) {
          return;
        }

        setDashboardData(createDashboardData(result, profile));
        setBackendStatus("connected");
        setError(null);
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setBackendStatus("offline");
        setError(loadError instanceof Error ? loadError.message : "Unable to reach backend");
      } finally {
        if (!cancelled) {
          setIsRunning(false);
        }
      }
    }

    loadBackendData();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white">
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <section className="min-w-0 flex-1 px-4 py-5 md:px-6 xl:px-8">
          <Header
            companyName={dashboardData.companyName}
            confidence={dashboardData.confidence}
            backendStatus={backendStatus}
          />

          {error ? (
            <div className="mt-4 rounded-lg border border-orange-300/20 bg-orange-400/10 px-4 py-3 text-sm text-orange-100">
              Backend offline: showing the built-in demo snapshot.
            </div>
          ) : null}

          <div className="mt-5">
            <MobileTabRail activeTab={activeTab} onTabChange={setActiveTab} />
            <CommandCenterViews
              activeTab={activeTab}
              dashboardData={dashboardData}
              scenarios={scenarios}
              isRunning={isRunning}
              onRunSimulation={async ({ scenario, description, impactPercentage, timeHorizon }) => {
                setIsRunning(true);

                try {
                  await executeSimulation({
                    scenario,
                    description,
                    impactPercentage,
                    timeHorizon
                  });
                } catch (simulationError) {
                  setBackendStatus("offline");
                  setError(
                    simulationError instanceof Error
                      ? simulationError.message
                      : "Unable to run simulation"
                  );
                } finally {
                  setIsRunning(false);
                }
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
