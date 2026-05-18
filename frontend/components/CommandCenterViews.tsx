"use client";

import {
  CheckCircle2,
  Cloud,
  Database,
  Download,
  FileText,
  Globe2,
  Lock,
  Settings,
  SlidersHorizontal,
  Zap
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import AgentPanel from "@/components/AgentPanel";
import BusinessTwinMap from "@/components/BusinessTwinMap";
import CascadeChain from "@/components/CascadeChain";
import ExecutiveRecommendations from "@/components/ExecutiveRecommendations";
import ImpactDashboard from "@/components/ImpactDashboard";
import MetricCard from "@/components/MetricCard";
import RiskTimeline from "@/components/RiskTimeline";
import SimulationForm from "@/components/SimulationForm";
import type { DemoSimulation } from "@/lib/api";
import type { DashboardData } from "@/lib/dashboardData";
import type { TabId } from "@/components/Sidebar";

type RunSimulationInput = {
  scenario: DemoSimulation;
  description: string;
  impactPercentage: number;
  timeHorizon: string;
};

type Props = {
  activeTab: TabId;
  dashboardData: DashboardData;
  scenarios: DemoSimulation[];
  isRunning: boolean;
  onRunSimulation: (input: RunSimulationInput) => Promise<void>;
};

const tooltipStyle = {
  background: "#030814",
  border: "1px solid rgba(117, 186, 255, 0.2)",
  borderRadius: "8px",
  color: "#f7fbff"
};

const sentimentData = [
  { day: "D1", positive: 82, neutral: 12, negative: 6 },
  { day: "D7", positive: 78, neutral: 13, negative: 9 },
  { day: "D15", positive: 74, neutral: 14, negative: 12 },
  { day: "D30", positive: 68, neutral: 17, negative: 15 },
  { day: "D45", positive: 72, neutral: 15, negative: 13 },
  { day: "D60", positive: 65, neutral: 18, negative: 17 }
];

const staffingData = [
  { week: "W1", support: 72, engineering: 58, sales: 46 },
  { week: "W2", support: 78, engineering: 61, sales: 49 },
  { week: "W3", support: 86, engineering: 64, sales: 50 },
  { week: "W4", support: 94, engineering: 68, sales: 53 },
  { week: "W5", support: 88, engineering: 66, sales: 52 }
];

const logisticsData = [
  { month: "Jan", optimized: 44, actual: 58 },
  { month: "Feb", optimized: 43, actual: 55 },
  { month: "Mar", optimized: 39, actual: 51 },
  { month: "Apr", optimized: 37, actual: 46 },
  { month: "May", optimized: 34, actual: 42 },
  { month: "Jun", optimized: 31, actual: 39 }
];

const infrastructureData = [
  { hour: "00", cpu: 48, memory: 59, network: 42 },
  { hour: "04", cpu: 54, memory: 63, network: 48 },
  { hour: "08", cpu: 68, memory: 72, network: 61 },
  { hour: "12", cpu: 76, memory: 78, network: 69 },
  { hour: "16", cpu: 71, memory: 74, network: 66 },
  { hour: "20", cpu: 62, memory: 68, network: 55 }
];

const pieColors = ["#26d9ff", "#36f0a3", "#ff9f43", "#ff4d61"];

export default function CommandCenterViews({
  activeTab,
  dashboardData,
  scenarios,
  isRunning,
  onRunSimulation
}: Props) {
  switch (activeTab) {
    case "simulation":
      return (
        <SimulationView
          dashboardData={dashboardData}
          scenarios={scenarios}
          isRunning={isRunning}
          onRunSimulation={onRunSimulation}
        />
      );
    case "staffing":
      return <StaffingView />;
    case "revenue":
      return <RevenueView dashboardData={dashboardData} />;
    case "logistics":
      return <LogisticsView />;
    case "infrastructure":
      return <InfrastructureView />;
    case "customer-behavior":
      return <CustomerBehaviorView dashboardData={dashboardData} />;
    case "ai-agents":
      return <AIAgentsView dashboardData={dashboardData} />;
    case "reports":
      return <ReportsView />;
    case "settings":
      return <SettingsView />;
    case "digital-twin":
    default:
      return <DigitalTwinView dashboardData={dashboardData} />;
  }
}

export function MobileTabRail({
  activeTab,
  onTabChange
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  const tabs: Array<{ id: TabId; label: string }> = [
    { id: "digital-twin", label: "Twin" },
    { id: "simulation", label: "Simulation" },
    { id: "staffing", label: "Staffing" },
    { id: "revenue", label: "Revenue" },
    { id: "logistics", label: "Logistics" },
    { id: "infrastructure", label: "Infra" },
    { id: "customer-behavior", label: "Customers" },
    { id: "ai-agents", label: "Agents" },
    { id: "reports", label: "Reports" },
    { id: "settings", label: "Settings" }
  ];

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto border-b border-cyan-300/10 pb-3 lg:hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`shrink-0 rounded-lg border px-3 py-2 text-sm transition ${
            activeTab === tab.id
              ? "border-cyan-300/40 bg-cyan-300/12 text-cyan-100"
              : "border-slate-700/70 bg-slate-950/70 text-slate-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function DigitalTwinView({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <div>
      <ViewHeader
        eyebrow="1. Digital Twin Dashboard"
        title="Corporate Digital Twin Overview"
        description="Real-time business map of system health, performance, and cascading risk."
      />

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
        {dashboardData.metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <BusinessTwinMap twinNodes={dashboardData.twinNodes} scenario={dashboardData.scenario} />
        </div>
        <div className="space-y-4 xl:col-span-5">
          <ImpactDashboard
            revenueData={dashboardData.revenueData}
            departmentImpact={dashboardData.departmentImpact}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <CascadeChain cascadeSteps={dashboardData.cascadeSteps} />
        </div>
        <div className="xl:col-span-7">
          <ExecutiveRecommendations recommendations={dashboardData.recommendations} />
        </div>
      </div>
    </div>
  );
}

function SimulationView({
  dashboardData,
  scenarios,
  isRunning,
  onRunSimulation
}: {
  dashboardData: DashboardData;
  scenarios: DemoSimulation[];
  isRunning: boolean;
  onRunSimulation: (input: RunSimulationInput) => Promise<void>;
}) {
  return (
    <div>
      <ViewHeader
        eyebrow="2. Simulation Engine"
        title="Simulation Engine"
        description="Run advanced what-if scenarios and observe impact across the operating model."
      />

      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-4">
          <SimulationForm scenarios={scenarios} isRunning={isRunning} onRun={onRunSimulation} />
          <ScenarioLibrary />
        </div>

        <div className="space-y-4 xl:col-span-8">
          <Panel title="Active Simulation" action={`${dashboardData.confidence}% confidence`}>
            <div className="grid gap-4 md:grid-cols-3">
              <StatPill label="Scenario" value={dashboardData.scenario} tone="cyan" />
              <StatPill label="Status" value={isRunning ? "Running" : "Ready"} tone="green" />
              <StatPill label="Estimated drag" value="-11.2%" tone="orange" />
            </div>
          </Panel>

          <Panel title="Simulation Timeline" action="Baseline vs simulated">
            <ChartFrame height="h-72">
              <LineChart data={dashboardData.revenueData} margin={{ left: -18, right: 12, top: 8 }}>
                <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="simulated" stroke="#26d9ff" strokeWidth={3} />
                <Line type="monotone" dataKey="churn" stroke="#ff4d61" strokeWidth={2} />
              </LineChart>
            </ChartFrame>
          </Panel>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <RiskTimeline timeline={dashboardData.timeline} />
        </div>
        <div className="xl:col-span-8">
          <CascadeChain cascadeSteps={dashboardData.cascadeSteps} />
        </div>
      </div>
    </div>
  );
}

function StaffingView() {
  return (
    <div>
      <ViewHeader
        eyebrow="3. Staffing"
        title="Staffing Intelligence"
        description="Track team utilization, burnout, capacity, and hiring needs."
      />
      <StatGrid
        stats={[
          ["Team utilization", "81.4%", "+6.1%", "cyan"],
          ["Burnout risk", "82%", "+18 pts", "red"],
          ["Open positions", "12", "4 critical", "blue"],
          ["Turnover risk", "18.6%", "+3.1%", "orange"]
        ]}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Workforce Capacity Over Time" className="xl:col-span-7">
          <ChartFrame height="h-80">
            <LineChart data={staffingData} margin={{ left: -18, right: 12, top: 8 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="support" stroke="#26d9ff" strokeWidth={3} />
              <Line type="monotone" dataKey="engineering" stroke="#ff9f43" strokeWidth={2} />
              <Line type="monotone" dataKey="sales" stroke="#36f0a3" strokeWidth={2} />
            </LineChart>
          </ChartFrame>
        </Panel>
        <Panel title="Burnout Heatmap" className="xl:col-span-5">
          <Heatmap rows={["Support", "Engineering", "Sales", "Operations", "Finance"]} />
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ListPanel
          title="Hiring Recommendations"
          items={[
            ["8 Support Specialists", "Urgent"],
            ["2 SRE Engineers", "High"],
            ["3 Customer Success Leads", "Medium"]
          ]}
        />
        <Panel title="Skill Gap Analysis">
          <ProgressRows rows={[["Customer support", 88], ["Automation", 72], ["DevOps", 64], ["Data analysis", 58]]} />
        </Panel>
      </div>
    </div>
  );
}

function RevenueView({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <div>
      <ViewHeader
        eyebrow="4. Revenue"
        title="Revenue Intelligence"
        description="Track revenue performance, forecasting, and risk factors."
      />
      <StatGrid
        stats={[
          ["Monthly revenue", "$1.82M", "-11.2%", "cyan"],
          ["Revenue forecast", "$5.73M", "+4.2%", "green"],
          ["Churn impact", "-$142K", "high", "red"],
          ["Payment risk", "76.3%", "-2.4%", "orange"]
        ]}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Revenue Forecast" action="Baseline vs simulated" className="xl:col-span-8">
          <ChartFrame height="h-80">
            <AreaChart data={dashboardData.revenueData} margin={{ left: -18, right: 12, top: 8 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#26d9ff" stopOpacity={0.38} />
                  <stop offset="100%" stopColor="#26d9ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="simulated" stroke="#26d9ff" fill="url(#revenueFill)" strokeWidth={3} />
              <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={2} dot={false} />
            </AreaChart>
          </ChartFrame>
        </Panel>
        <Panel title="Revenue By Segment" className="xl:col-span-4">
          <Donut value={68} label="Enterprise" />
          <ProgressRows rows={[["Enterprise", 58], ["SMB", 28], ["Mid-market", 14]]} />
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ListPanel
          title="Top Revenue Risks"
          items={[
            ["Churn increase", "High"],
            ["SLA degradation", "High"],
            ["Support overload", "Medium"]
          ]}
        />
        <ListPanel
          title="Revenue Waterfall"
          items={[
            ["Baseline", "$1.82M"],
            ["Churn loss", "-$142K"],
            ["Expansion", "+$96K"],
            ["Projected", "$1.77M"]
          ]}
        />
      </div>
    </div>
  );
}

function LogisticsView() {
  return (
    <div>
      <ViewHeader
        eyebrow="5. Logistics"
        title="Logistics Intelligence"
        description="Monitor supply chain, delivery, and operational logistics."
      />
      <StatGrid
        stats={[
          ["On-time delivery", "94.2%", "+1.7%", "green"],
          ["Logistics cost", "$320K", "-6.4%", "cyan"],
          ["Supply risk", "35%", "medium", "orange"],
          ["Inventory health", "86%", "+4.6%", "blue"]
        ]}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Supply Chain Flow" className="xl:col-span-7">
          <RouteMap />
        </Panel>
        <Panel title="Bottleneck Analysis" className="xl:col-span-5">
          <ProgressRows rows={[["Warehouse A", 86], ["Port delay", 64], ["Transport", 38], ["Customs", 52]]} />
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Panel title="Logistics Cost Trend">
          <ChartFrame height="h-64">
            <LineChart data={logisticsData} margin={{ left: -18, right: 12, top: 8 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="actual" stroke="#ff9f43" strokeWidth={2} />
              <Line type="monotone" dataKey="optimized" stroke="#26d9ff" strokeWidth={3} />
            </LineChart>
          </ChartFrame>
        </Panel>
        <Panel title="Inventory Distribution">
          <Donut value={62} label="In stock" />
          <ProgressRows rows={[["In stock", 62], ["In transit", 24], ["Backorder", 14]]} />
        </Panel>
      </div>
    </div>
  );
}

function InfrastructureView() {
  return (
    <div>
      <ViewHeader
        eyebrow="6. Infrastructure"
        title="Infrastructure Intelligence"
        description="Real-time monitoring of system performance and reliability."
      />
      <StatGrid
        stats={[
          ["System uptime", "99.96%", "+0.01%", "green"],
          ["Avg response", "412ms", "-18ms", "cyan"],
          ["Server load", "63%", "normal", "blue"],
          ["Error rate", "0.12%", "-0.03%", "orange"]
        ]}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Infrastructure Map" className="xl:col-span-7">
          <NodeMap />
        </Panel>
        <Panel title="Resource Utilization" className="xl:col-span-5">
          <ProgressRows rows={[["CPU", 63], ["Memory", 58], ["Storage", 72], ["Network", 48]]} />
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ListPanel
          title="Incident Timeline"
          items={[
            ["Database latency detected", "14:50"],
            ["Auto-scaling triggered", "14:10"],
            ["Load balancer recovered", "14:02"],
            ["System stable", "13:21"]
          ]}
        />
        <Panel title="Capacity Planning">
          <ChartFrame height="h-64">
            <LineChart data={infrastructureData} margin={{ left: -18, right: 12, top: 8 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="cpu" stroke="#26d9ff" strokeWidth={3} />
              <Line type="monotone" dataKey="memory" stroke="#36f0a3" strokeWidth={2} />
              <Line type="monotone" dataKey="network" stroke="#ff9f43" strokeWidth={2} />
            </LineChart>
          </ChartFrame>
        </Panel>
      </div>
    </div>
  );
}

function CustomerBehaviorView({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <div>
      <ViewHeader
        eyebrow="7. Customer Behavior"
        title="Customer Behavior Intelligence"
        description="Understand customer sentiment, churn drivers, and satisfaction."
      />
      <StatGrid
        stats={[
          ["Customer satisfaction", "3.8 / 5", "-0.4", "orange"],
          ["Churn probability", "6.82%", "+1.1%", "red"],
          ["NPS score", "42", "-8", "blue"],
          ["Active users", "128K", "+3.5%", "green"]
        ]}
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Sentiment Trend" className="xl:col-span-7">
          <ChartFrame height="h-80">
            <LineChart data={sentimentData} margin={{ left: -18, right: 12, top: 8 }}>
              <CartesianGrid stroke="rgba(117, 186, 255, 0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="positive" stroke="#36f0a3" strokeWidth={2} />
              <Line type="monotone" dataKey="neutral" stroke="#26d9ff" strokeWidth={2} />
              <Line type="monotone" dataKey="negative" stroke="#ff4d61" strokeWidth={3} />
            </LineChart>
          </ChartFrame>
        </Panel>
        <Panel title="Top Churn Drivers" className="xl:col-span-5">
          <ProgressRows rows={[["Poor support", 42], ["Slow response", 28], ["Feature gaps", 18], ["Price", 12]]} />
        </Panel>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ListPanel
          title="Customer Segments At Risk"
          items={[
            ["Enterprise", "High"],
            ["Mid-market", "Medium"],
            ["SMB", "Low"]
          ]}
        />
        <Panel title="Churn Projection">
          <Donut value={Math.round(Number(dashboardData.metrics[1]?.value.replace("%", "")) || 7)} label="High risk" />
        </Panel>
      </div>
    </div>
  );
}

function AIAgentsView({ dashboardData }: { dashboardData: DashboardData }) {
  return (
    <div>
      <ViewHeader
        eyebrow="8. AI Agents"
        title="AI Agent Matrix"
        description="Autonomous agents working to optimize your business."
      />
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Panel title="Agent Matrix" action="6 active" className="xl:col-span-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <tr>
                  <th className="py-3">Agent</th>
                  <th>Status</th>
                  <th>Current task</th>
                  <th>Progress</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-300/10">
                {dashboardData.agents.map((agent) => (
                  <tr key={agent.name}>
                    <td className="py-3 font-medium text-slate-100">{agent.name}</td>
                    <td className="text-emerald-300">Active</td>
                    <td className="text-slate-400">{agent.task}</td>
                    <td className="text-cyan-200">{agent.progress}%</td>
                    <td className="text-slate-100">{agent.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <div className="xl:col-span-4">
          <AgentPanel agents={dashboardData.agents} />
        </div>
      </div>
      <div className="mt-4">
        <ListPanel
          title="Agent Communication Feed"
          items={[
            ["Staffing Agent", "Burnout probability exceeds 82% in Support."],
            ["Revenue Agent", "Churn exposure increased after SLA pressure."],
            ["Infrastructure Agent", "Auto-scaling recommendation queued."],
            ["Governance Agent", "Confidence score stable at high reliability."]
          ]}
        />
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div>
      <ViewHeader
        eyebrow="9. Reports"
        title="Reports & Analytics"
        description="Access detailed reports and export insights."
      />
      <div className="mt-5 flex flex-wrap gap-2">
        {["Executive Summary", "Financial Reports", "Operational Reports", "Risk Reports", "Custom Reports"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-lg border px-4 py-2 text-sm ${
                index === 0
                  ? "border-cyan-300/35 bg-cyan-300/12 text-cyan-100"
                  : "border-slate-700/70 bg-slate-950/70 text-slate-400"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel title="Executive Summary" icon={<FileText size={18} />}>
          <p className="text-sm leading-6 text-slate-400">
            Overall business health is stable with elevated support and churn risk. Revenue
            growth is on track if staffing constraints are resolved this quarter.
          </p>
          <button className="mt-5 flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
            <Download size={16} />
            Download PDF
          </button>
        </Panel>
        <ListPanel
          title="Key Insights"
          items={[
            ["Revenue expected to grow", "8.4% this month"],
            ["Burnout risk is high", "Support department"],
            ["SLA adherence may drop", "Below target"],
            ["Hiring specialists", "Could reduce risk 36%"]
          ]}
        />
        <ListPanel
          title="Report Schedule"
          items={[
            ["Weekly report", "Every Monday"],
            ["Monthly report", "1st of each month"],
            ["Risk digest", "Every Friday"]
          ]}
        />
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div>
      <ViewHeader
        eyebrow="10. Settings"
        title="Settings & Configuration"
        description="Manage system configurations and preferences."
      />
      <div className="mt-5 flex flex-wrap gap-2">
        {["General", "Integrations", "Users & Access", "Notifications", "Security", "Simulation Settings"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-lg border px-4 py-2 text-sm ${
                index === 0
                  ? "border-cyan-300/35 bg-cyan-300/12 text-cyan-100"
                  : "border-slate-700/70 bg-slate-950/70 text-slate-400"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel title="General Settings" icon={<Settings size={18} />}>
          <SettingsField label="Business name" value="Aster Enterprise" />
          <SettingsField label="Default time range" value="30 days" />
          <SettingsField label="Currency" value="USD ($)" />
          <SettingsField label="Business model" value="Enterprise SaaS" />
          <button className="mt-5 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950">
            Save Changes
          </button>
        </Panel>
        <Panel title="Simulation Preferences" icon={<SlidersHorizontal size={18} />}>
          <ToggleRow label="Auto-run simulations" checked />
          <ToggleRow label="High accuracy mode" checked />
          <ToggleRow label="Include external data" checked />
          <ToggleRow label="Real-time updates" checked />
        </Panel>
        <Panel title="Data Sources" icon={<Database size={18} />}>
          <SourceRow icon={<Cloud size={16} />} name="Salesforce" />
          <SourceRow icon={<Zap size={16} />} name="Jira" />
          <SourceRow icon={<Globe2 size={16} />} name="Google Cloud" />
          <SourceRow icon={<Lock size={16} />} name="Datadog" />
          <button className="mt-5 rounded-lg border border-cyan-300/20 bg-slate-950/70 px-4 py-2 text-sm text-cyan-100">
            Manage Integrations
          </button>
        </Panel>
      </div>
    </div>
  );
}

function ViewHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
        <CheckCircle2 size={16} />
        Live data
      </div>
    </div>
  );
}

function Panel({
  title,
  action,
  icon,
  className = "",
  children
}: {
  title: string;
  action?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`glass rounded-lg p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {icon ? <span className="text-cyan-200">{icon}</span> : null}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        {action ? (
          <span className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100">
            {action}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ChartFrame({ height, children }: { height: string; children: React.ReactElement }) {
  return (
    <div className={height}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function StatGrid({
  stats
}: {
  stats: Array<[label: string, value: string, detail: string, tone: string]>;
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, detail, tone]) => (
        <StatPill key={label} label={label} value={value} detail={detail} tone={tone} />
      ))}
    </div>
  );
}

function StatPill({
  label,
  value,
  detail,
  tone
}: {
  label: string;
  value: string;
  detail?: string;
  tone: string;
}) {
  const toneClasses: Record<string, string> = {
    cyan: "text-cyan-200 border-cyan-300/20 bg-cyan-300/8",
    green: "text-emerald-200 border-emerald-300/20 bg-emerald-400/8",
    orange: "text-orange-200 border-orange-300/20 bg-orange-400/8",
    red: "text-red-200 border-red-300/20 bg-red-400/8",
    blue: "text-blue-200 border-blue-300/20 bg-blue-400/8"
  };

  return (
    <div className={`rounded-lg border p-4 ${toneClasses[tone] ?? toneClasses.cyan}`}>
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <h3 className="text-3xl font-semibold leading-none text-white">{value}</h3>
        {detail ? <span className="text-sm font-medium">{detail}</span> : null}
      </div>
    </div>
  );
}

function ScenarioLibrary() {
  return (
    <Panel title="Scenario Library">
      <div className="flex flex-wrap gap-2">
        {["Traffic Surge", "Employee Resignation", "Cloud Outage", "Recession", "Supplier Delay", "Cyber Attack", "PR Crisis", "Product Failure"].map(
          (item) => (
            <button
              key={item}
              type="button"
              className="rounded-lg border border-cyan-300/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-100"
            >
              {item}
            </button>
          )
        )}
      </div>
    </Panel>
  );
}

function Heatmap({ rows }: { rows: string[] }) {
  return (
    <div className="grid gap-3">
      {rows.map((row, rowIndex) => (
        <div key={row} className="grid grid-cols-[6rem_1fr] items-center gap-3">
          <span className="text-sm text-slate-400">{row}</span>
          <div className="grid grid-cols-5 gap-1">
            {[0, 1, 2, 3, 4].map((column) => {
              const intensity = (rowIndex + column) % 5;
              const colors = [
                "bg-cyan-300/20",
                "bg-emerald-300/25",
                "bg-orange-300/30",
                "bg-orange-400/45",
                "bg-red-400/60"
              ];
              return <span key={column} className={`h-10 rounded-md ${colors[intensity]}`} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressRows({ rows }: { rows: Array<[label: string, value: number]> }) {
  return (
    <div className="space-y-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="mb-2 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-300">{label}</span>
            <span className="text-cyan-200">{value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListPanel({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <Panel title={title}>
      <div className="space-y-3">
        {items.map(([label, value]) => (
          <div
            key={`${label}-${value}`}
            className="flex items-center justify-between gap-4 rounded-lg border border-cyan-300/10 bg-slate-950/55 px-3 py-3"
          >
            <span className="text-sm text-slate-200">{label}</span>
            <span className="text-sm font-semibold text-cyan-200">{value}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Donut({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center justify-center py-2">
      <div
        className="grid h-44 w-44 place-items-center rounded-full"
        style={{
          background: `conic-gradient(#26d9ff 0 ${clamped}%, #ff4d61 ${clamped}% 82%, rgba(100,116,139,0.35) 82% 100%)`
        }}
      >
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[#06101f] text-center">
          <div>
            <p className="text-3xl font-semibold text-white">{clamped}%</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteMap() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-lg border border-cyan-300/10 bg-slate-950/60 panel-grid">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path d="M11 34 C25 14 38 25 48 18 S72 11 88 25" fill="none" stroke="#26d9ff" strokeOpacity="0.62" strokeWidth="0.7" />
        <path d="M19 44 C34 35 42 43 57 31 S76 33 91 43" fill="none" stroke="#36f0a3" strokeOpacity="0.55" strokeWidth="0.6" />
        <path d="M28 16 C37 28 47 37 69 22" fill="none" stroke="#ff9f43" strokeOpacity="0.55" strokeWidth="0.6" />
      </svg>
      {[
        [15, 57, "Hub"],
        [36, 34, "Port"],
        [50, 27, "DC"],
        [71, 20, "Cloud"],
        [86, 42, "Retail"]
      ].map(([x, y, label]) => (
        <div
          key={label}
          className="absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/12 text-[10px] font-semibold text-cyan-100"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function NodeMap() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-lg border border-cyan-300/10 bg-slate-950/60 panel-grid">
      {Array.from({ length: 26 }).map((_, index) => {
        const left = 8 + ((index * 17) % 84);
        const top = 12 + ((index * 23) % 72);
        const hot = index % 8 === 0;

        return (
          <span
            key={index}
            className={`absolute h-3 w-3 rounded-full ${
              hot
                ? "bg-orange-300 shadow-[0_0_16px_rgba(255,159,67,0.9)]"
                : "bg-emerald-300 shadow-[0_0_14px_rgba(54,240,163,0.75)]"
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        );
      })}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-cyan-300/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
        <span>41 services monitored</span>
        <span className="text-emerald-300">All regions online</span>
      </div>
    </div>
  );
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <label className="mt-3 block">
      <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <input
        value={value}
        readOnly
        className="mt-2 w-full rounded-lg border border-cyan-300/15 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none"
      />
    </label>
  );
}

function ToggleRow({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-cyan-300/10 py-3 last:border-b-0">
      <span className="text-sm text-slate-300">{label}</span>
      <span
        className={`relative h-6 w-11 rounded-full border ${
          checked ? "border-cyan-300/35 bg-cyan-300/35" : "border-slate-700 bg-slate-900"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </div>
  );
}

function SourceRow({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-cyan-300/10 py-3 last:border-b-0">
      <span className="flex items-center gap-2 text-sm text-slate-200">
        <span className="text-cyan-200">{icon}</span>
        {name}
      </span>
      <span className="text-sm text-emerald-300">Connected</span>
    </div>
  );
}
