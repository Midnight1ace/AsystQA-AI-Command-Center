"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, RotateCcw, SlidersHorizontal } from "lucide-react";
import type { DemoSimulation } from "@/lib/api";
import { defaultScenario } from "@/lib/dashboardData";

type Props = {
  scenarios?: DemoSimulation[];
  isRunning?: boolean;
  onRun?: (input: {
    scenario: DemoSimulation;
    description: string;
    impactPercentage: number;
    timeHorizon: string;
  }) => void | Promise<void>;
};

const timeHorizons = [
  { label: "30 Days", value: "30_days" },
  { label: "90 Days", value: "90_days" },
  { label: "1 Year", value: "1_year" }
];

export default function SimulationForm({
  scenarios = [defaultScenario],
  isRunning = false,
  onRun
}: Props) {
  const scenarioOptions = useMemo(
    () => (scenarios.length ? scenarios : [defaultScenario]),
    [scenarios]
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarioOptions[0].id);
  const [scenario, setScenario] = useState(scenarioOptions[0].business_question);
  const [scale, setScale] = useState(scenarioOptions[0].impact_percentage);
  const [timeHorizon, setTimeHorizon] = useState(scenarioOptions[0].time_horizon);

  const selectedScenario =
    scenarioOptions.find((item) => item.id === selectedScenarioId) ?? scenarioOptions[0];

  useEffect(() => {
    const firstScenario = scenarioOptions[0];

    setSelectedScenarioId(firstScenario.id);
    setScenario(firstScenario.business_question);
    setScale(firstScenario.impact_percentage);
    setTimeHorizon(firstScenario.time_horizon);
  }, [scenarioOptions]);

  return (
    <section className="glass rounded-lg p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Simulation Input</h3>
          <p className="text-sm text-slate-400">
            Change one business variable and watch the twin react.
          </p>
        </div>
        <SlidersHorizontal className="text-cyan-200" size={20} />
      </div>

      <textarea
        value={scenario}
        onChange={(event) => setScenario(event.target.value)}
        className="min-h-28 w-full resize-none rounded-lg border border-cyan-300/15 bg-slate-950/80 p-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/45"
        placeholder="Example: What happens if users grow by 300%?"
      />

      <div className="mt-4 grid gap-3">
        <label className="text-xs uppercase tracking-[0.16em] text-slate-500">
          Shock Intensity
        </label>
        <div className="flex items-center gap-3">
          <input
            aria-label="Shock intensity"
            type="range"
            min="5"
            max="100"
            value={scale}
            onChange={(event) => setScale(Number(event.target.value))}
            className="h-2 w-full accent-cyan-300"
          />
          <span className="w-12 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-center text-sm text-cyan-100">
            {scale}%
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2">
        {scenarioOptions.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedScenarioId(item.id);
              setScenario(item.business_question);
              setScale(item.impact_percentage);
              setTimeHorizon(item.time_horizon);
            }}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
              selectedScenarioId === item.id
                ? "border-cyan-300/45 bg-cyan-300/10 text-cyan-100"
                : "border-slate-700/70 bg-slate-950/60 text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100"
            }`}
          >
            {item.description}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <select
          value={timeHorizon}
          onChange={(event) => setTimeHorizon(event.target.value)}
          className="rounded-lg border border-cyan-300/15 bg-slate-950/80 p-3 text-sm outline-none"
        >
          {timeHorizons.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select className="rounded-lg border border-cyan-300/15 bg-slate-950/80 p-3 text-sm outline-none">
          <option>Enterprise SaaS</option>
          <option>Logistics</option>
          <option>Retail</option>
        </select>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          disabled={isRunning}
          onClick={() =>
            onRun?.({
              scenario: selectedScenario,
              description: scenario,
              impactPercentage: scale,
              timeHorizon
            })
          }
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Play size={16} />
          {isRunning ? "Running..." : "Run Simulation"}
        </button>

        <button
          onClick={() => {
            setSelectedScenarioId(scenarioOptions[0].id);
            setScenario(scenarioOptions[0].business_question);
            setScale(scenarioOptions[0].impact_percentage);
            setTimeHorizon(scenarioOptions[0].time_horizon);
          }}
          className="grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/15 bg-slate-950/70 text-slate-300 transition hover:text-cyan-100"
          aria-label="Reset simulation"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </section>
  );
}
