"use client";

import { useState } from "react";
import { Play, RotateCcw, SlidersHorizontal } from "lucide-react";

const scenarios = [
  "Support tickets increase by 40%",
  "Users grow by 300%",
  "20% of engineers resign",
  "Cloud region fails"
];

export default function SimulationForm() {
  const [scenario, setScenario] = useState(
    "What happens if support tickets increase by 40% over the next 30 days?"
  );
  const [scale, setScale] = useState(40);

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
        {scenarios.map((item) => (
          <button
            key={item}
            onClick={() => setScenario(`What happens if ${item.toLowerCase()}?`)}
            className="rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-left text-sm text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <select className="rounded-lg border border-cyan-300/15 bg-slate-950/80 p-3 text-sm outline-none">
          <option>30 Days</option>
          <option>90 Days</option>
          <option>1 Year</option>
        </select>

        <select className="rounded-lg border border-cyan-300/15 bg-slate-950/80 p-3 text-sm outline-none">
          <option>Enterprise SaaS</option>
          <option>Logistics</option>
          <option>Retail</option>
        </select>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          <Play size={16} />
          Run Simulation
        </button>

        <button
          onClick={() => {
            setScenario("What happens if support tickets increase by 40% over the next 30 days?");
            setScale(40);
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
