"use client";

import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function SimulationForm() {
  const [scenario, setScenario] = useState(
    "Support tickets increase by 40% over the next 30 days."
  );

  return (
    <section className="glass rounded-3xl p-6">
      <div className="mb-5">
        <h3 className="text-xl font-bold">Run Business Simulation</h3>
        <p className="text-slate-400 text-sm">
          Ask the digital twin what would happen under a business change,
          failure, or growth event.
        </p>
      </div>

      <textarea
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        className="w-full min-h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 outline-none text-slate-100"
        placeholder="Example: What happens if customer support tickets increase by 40%?"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <select className="bg-slate-950 border border-slate-800 rounded-2xl p-3 outline-none">
          <option>30-day simulation</option>
          <option>90-day simulation</option>
          <option>12-month simulation</option>
        </select>

        <select className="bg-slate-950 border border-slate-800 rounded-2xl p-3 outline-none">
          <option>Medium confidence</option>
          <option>High confidence</option>
          <option>Experimental</option>
        </select>

        <select className="bg-slate-950 border border-slate-800 rounded-2xl p-3 outline-none">
          <option>Enterprise SaaS</option>
          <option>Logistics Company</option>
          <option>Retail Business</option>
        </select>
      </div>

      <div className="flex gap-3 mt-5">
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 font-semibold">
          <Play size={18} />
          Run Simulation
        </button>

        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700">
          <RotateCcw size={18} />
          Reset
        </button>
      </div>
    </section>
  );
}