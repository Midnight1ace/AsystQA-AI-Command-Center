import {
  agents as mockAgents,
  cascadeSteps as mockCascadeSteps,
  departmentImpact as mockDepartmentImpact,
  metrics as mockMetrics,
  recommendations as mockRecommendations,
  revenueData as mockRevenueData,
  timeline as mockTimeline,
  twinNodes as mockTwinNodes
} from "@/data/mockData";
import type { CompanyProfile, DemoSimulation, SimulationRequest, SimulationResult } from "@/lib/api";

export type Metric = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  accent: "cyan" | "blue" | "orange" | "red";
  context: string;
};

export type AgentActivity = {
  name: string;
  task: string;
  progress: number;
  confidence: number;
  insight: string;
  state: "running" | "complete" | "supervising";
};

export type RevenuePoint = {
  month: string;
  baseline: number;
  simulated: number;
  churn: number;
  load: number;
};

export type DepartmentImpact = {
  department: string;
  risk: number;
};

export type TwinNode = {
  id: string;
  label: string;
  value: string;
  x: number;
  y: number;
  severity: "stable" | "warning" | "danger";
};

export type CascadeStep = {
  label: string;
  detail: string;
  severity: "stable" | "warning" | "danger";
};

export type Recommendation = {
  title: string;
  impact: string;
  priority: string;
};

export type TimelineItem = {
  day: string;
  title: string;
  description: string;
};

export type DashboardData = {
  metrics: Metric[];
  agents: AgentActivity[];
  revenueData: RevenuePoint[];
  departmentImpact: DepartmentImpact[];
  twinNodes: TwinNode[];
  cascadeSteps: CascadeStep[];
  recommendations: Recommendation[];
  timeline: TimelineItem[];
  confidence: number;
  companyName: string;
  scenario: string;
};

export const fallbackDashboardData: DashboardData = {
  metrics: mockMetrics,
  agents: mockAgents,
  revenueData: mockRevenueData,
  departmentImpact: mockDepartmentImpact,
  twinNodes: mockTwinNodes,
  cascadeSteps: mockCascadeSteps,
  recommendations: mockRecommendations,
  timeline: mockTimeline,
  confidence: 93,
  companyName: "AsystQA AI Command Center",
  scenario: "Support tickets increase by 40%"
};

const fallbackProfile: CompanyProfile = {
  company_name: "NovaCloud SaaS",
  industry: "Enterprise SaaS",
  employees: {
    engineering: 35,
    support: 18,
    sales: 12,
    operations: 8
  },
  metrics: {
    monthly_revenue: 250000,
    monthly_users: 40000,
    churn_rate: 5.5,
    support_tickets: 1200,
    response_time_hours: 6,
    server_load: 68,
    customer_satisfaction: 82
  }
};

export const defaultScenario: DemoSimulation = {
  id: "support_surge",
  name: "Support Surge",
  description: "Support tickets increase by 40%",
  type: "support_surge",
  impact_percentage: 40,
  time_horizon: "90_days",
  business_question: "What happens if support tickets increase by 40%?"
};

export function buildSimulationRequest(
  profile: CompanyProfile | null,
  scenario: DemoSimulation,
  impactPercentage = scenario.impact_percentage,
  timeHorizon = scenario.time_horizon,
  description = scenario.description
): SimulationRequest {
  const company = profile ?? fallbackProfile;

  return {
    ...company,
    scenario: {
      type: scenario.type,
      description,
      impact_percentage: impactPercentage,
      time_horizon: timeHorizon
    }
  };
}

export function createDashboardData(
  result: SimulationResult,
  profile: CompanyProfile | null
): DashboardData {
  const company = profile ?? fallbackProfile;
  const staffingRisk = result.agents.staffing?.risk_score ?? result.overall_risk_score;
  const revenueRisk = result.agents.revenue?.risk_score ?? result.overall_risk_score;
  const infrastructureRisk =
    result.agents.infrastructure?.risk_score ?? result.overall_risk_score;
  const customerRisk = result.agents.customer?.risk_score ?? result.overall_risk_score;
  const confidence =
    result.governance?.confidence_score ?? result.operational_metrics?.ai_confidence ?? 90;
  const stability =
    result.operational_metrics?.operational_stability ?? Math.max(0, 100 - result.overall_risk_score);
  const estimatedRevenue = company.metrics.monthly_revenue * (1 - revenueRisk * 0.0025);
  const estimatedChurn = company.metrics.churn_rate + revenueRisk * 0.08;

  return {
    metrics: [
      {
        title: "Revenue",
        value: formatCurrency(estimatedRevenue),
        change: `${formatPercentDelta(estimatedRevenue, company.metrics.monthly_revenue)} simulated`,
        trend: "down",
        accent: "cyan",
        context: result.risk_level
      },
      {
        title: "Churn",
        value: `${round(estimatedChurn)}%`,
        change: `+${round(estimatedChurn - company.metrics.churn_rate)} pts`,
        trend: "down",
        accent: revenueRisk >= 75 ? "red" : "orange",
        context: "forecast risk"
      },
      {
        title: "Team Capacity",
        value: `${Math.min(100, staffingRisk)}%`,
        change: riskLabel(staffingRisk),
        trend: "down",
        accent: staffingRisk >= 75 ? "red" : "orange",
        context: "staffing pressure"
      },
      {
        title: "SLA Health",
        value: `${Math.max(0, 100 - customerRisk)}%`,
        change: riskLabel(customerRisk),
        trend: "down",
        accent: customerRisk >= 75 ? "red" : "blue",
        context: "customer response"
      },
      {
        title: "Infrastructure Load",
        value: `${Math.min(100, infrastructureRisk)}%`,
        change: riskLabel(infrastructureRisk),
        trend: "up",
        accent: infrastructureRisk >= 75 ? "red" : "cyan",
        context: "safe threshold"
      },
      {
        title: "Operational Stability",
        value: `${stability}`,
        change: riskLabel(result.overall_risk_score),
        trend: "down",
        accent: result.overall_risk_score >= 75 ? "red" : "orange",
        context: "governance score"
      }
    ],
    agents: createAgents(result),
    revenueData: createRevenueData(result, company),
    departmentImpact: createDepartmentImpact(result),
    twinNodes: createTwinNodes(result, confidence, stability),
    cascadeSteps: createCascadeSteps(result),
    recommendations: createRecommendations(result),
    timeline: createTimeline(result),
    confidence,
    companyName: result.company_name || company.company_name,
    scenario: result.scenario
  };
}

function createAgents(result: SimulationResult): DashboardData["agents"] {
  const agentActivity = result.agent_activity ?? [];
  const agentEntries: AgentActivity[] = agentActivity.map((activity) => {
    const key = Object.keys(result.agents).find(
      (agentKey) => result.agents[agentKey]?.agent === activity.agent
    );
    const detail = key ? result.agents[key] : undefined;

    return {
      name: activity.agent,
      task: activity.status,
      progress: Math.min(100, Math.max(55, activity.risk_score)),
      confidence: activity.confidence,
      insight: detail?.key_findings?.[0] ?? detail?.summary ?? riskLabel(activity.risk_score),
      state: activity.risk_score >= 75 ? ("running" as const) : ("complete" as const)
    };
  });

  if (result.governance) {
    agentEntries.push({
      name: result.governance.agent,
      task: "Resolving cross-agent risk confidence",
      progress: result.governance.confidence_score,
      confidence: result.governance.confidence_score,
      insight: result.governance.summary,
      state: "supervising" as const
    });
  }

  return agentEntries.length ? agentEntries : mockAgents;
}

function createRevenueData(
  result: SimulationResult,
  company: CompanyProfile
): DashboardData["revenueData"] {
  const trend = result.risk_trend?.length
    ? [{ day: 0, risk: Math.max(0, result.overall_risk_score - 8) }, ...result.risk_trend]
    : [];
  const baseRevenue = company.metrics.monthly_revenue / 1000000;
  const labels: Record<number, string> = {
    0: "Now",
    7: "7D",
    30: "30D",
    90: "90D",
    365: "1Y"
  };

  if (!trend.length) {
    return mockRevenueData;
  }

  return trend.map((point, index) => {
    const baseline = baseRevenue * (1 + index * 0.045);
    const simulated = baseline * (1 - point.risk * 0.0028);

    return {
      month: labels[point.day] ?? `${point.day}D`,
      baseline: round(baseline),
      simulated: round(simulated),
      churn: round(company.metrics.churn_rate + point.risk * 0.08),
      load: Math.min(100, Math.round(company.metrics.server_load + point.risk * 0.12))
    };
  });
}

function createDepartmentImpact(result: SimulationResult): DashboardData["departmentImpact"] {
  const heatmap = result.risk_heatmap ?? [];

  if (!heatmap.length) {
    return mockDepartmentImpact;
  }

  return heatmap.map((item) => ({
    department: item.department.replace("Infrastructure", "Infra"),
    risk: item.risk_score
  }));
}

function createTwinNodes(
  result: SimulationResult,
  confidence: number,
  stability: number
): DashboardData["twinNodes"] {
  return [
    {
      id: "staffing",
      label: "Staffing",
      value: `${result.agents.staffing?.risk_score ?? result.overall_risk_score}%`,
      x: 18,
      y: 34,
      severity: severityFor(result.agents.staffing?.risk_score ?? result.overall_risk_score)
    },
    {
      id: "revenue",
      label: "Revenue",
      value: `${result.agents.revenue?.risk_score ?? result.overall_risk_score}%`,
      x: 28,
      y: 68,
      severity: severityFor(result.agents.revenue?.risk_score ?? result.overall_risk_score)
    },
    {
      id: "infra",
      label: "Infrastructure",
      value: `${result.agents.infrastructure?.risk_score ?? result.overall_risk_score}%`,
      x: 76,
      y: 34,
      severity: severityFor(result.agents.infrastructure?.risk_score ?? result.overall_risk_score)
    },
    {
      id: "customer",
      label: "Customer",
      value: `${result.agents.customer?.risk_score ?? result.overall_risk_score}%`,
      x: 78,
      y: 66,
      severity: severityFor(result.agents.customer?.risk_score ?? result.overall_risk_score)
    },
    {
      id: "logistics",
      label: "Resilience",
      value: `${result.operational_metrics?.business_resilience ?? stability}%`,
      x: 50,
      y: 76,
      severity: severityFor(100 - (result.operational_metrics?.business_resilience ?? stability))
    },
    {
      id: "governance",
      label: "Governance",
      value: `${confidence}%`,
      x: 50,
      y: 28,
      severity: confidence >= 80 ? "stable" : "warning"
    }
  ];
}

function createCascadeSteps(result: SimulationResult): DashboardData["cascadeSteps"] {
  if (!result.cascade?.length) {
    return mockCascadeSteps;
  }

  return result.cascade.map((item, index) => ({
    label: item,
    detail:
      index === result.cascade.length - 1
        ? `Overall risk score reaches ${result.overall_risk_score}.`
        : `Triggers: ${result.cascade[index + 1]}.`,
    severity: index > result.cascade.length / 2 ? ("danger" as const) : ("warning" as const)
  }));
}

function createRecommendations(result: SimulationResult): DashboardData["recommendations"] {
  if (!result.recommendations?.length) {
    return mockRecommendations;
  }

  return result.recommendations.map((title, index) => ({
    title,
    impact:
      index === 0 && result.executive_report?.recommended_action
        ? result.executive_report.recommended_action
        : `Targets ${result.risk_level.toLowerCase()} risk exposure.`,
    priority: index === 0 && result.overall_risk_score >= 75 ? "Critical" : index < 2 ? "High" : "Medium"
  }));
}

function createTimeline(result: SimulationResult): DashboardData["timeline"] {
  const forecast = result.forecast ?? {};
  const entries = [
    ["7_days", "Day 7"],
    ["30_days", "Day 30"],
    ["90_days", "Day 90"],
    ["1_year", "1 Year"]
  ] as const;
  const timeline = entries
    .filter(([key]) => Boolean(forecast[key]))
    .map(([key, day]) => ({
      day,
      title: titleForForecastKey(key),
      description: forecast[key]
    }));

  return timeline.length ? timeline : mockTimeline;
}

function formatCurrency(value: number) {
  if (value >= 1000000) {
    return `$${round(value / 1000000)}M`;
  }

  if (value >= 1000) {
    return `$${Math.round(value / 1000)}K`;
  }

  return `$${Math.round(value)}`;
}

function formatPercentDelta(value: number, baseline: number) {
  const delta = ((value - baseline) / baseline) * 100;

  return `${delta >= 0 ? "+" : ""}${round(delta)}%`;
}

function round(value: number) {
  return Math.round(value * 10) / 10;
}

function riskLabel(score: number) {
  if (score >= 75) {
    return "high risk";
  }

  if (score >= 45) {
    return "medium risk";
  }

  return "low risk";
}

function severityFor(score: number): "stable" | "warning" | "danger" {
  if (score >= 75) {
    return "danger";
  }

  if (score >= 45) {
    return "warning";
  }

  return "stable";
}

function titleForForecastKey(key: string) {
  const titles: Record<string, string> = {
    "7_days": "Early signal",
    "30_days": "Department pressure",
    "90_days": "Business impact",
    "1_year": "Long-range stability"
  };

  return titles[key] ?? "Forecast";
}
