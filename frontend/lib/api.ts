export type Employees = {
  engineering: number;
  support: number;
  sales: number;
  operations: number;
};

export type CompanyMetrics = {
  monthly_revenue: number;
  monthly_users: number;
  churn_rate: number;
  support_tickets: number;
  response_time_hours: number;
  server_load: number;
  customer_satisfaction: number;
};

export type CompanyProfile = {
  company_name: string;
  industry: string;
  employees: Employees;
  metrics: CompanyMetrics;
};

export type DemoSimulation = {
  id: string;
  name: string;
  description: string;
  type: string;
  impact_percentage: number;
  time_horizon: string;
  business_question: string;
};

export type SimulationRequest = CompanyProfile & {
  scenario: {
    type: string;
    description: string;
    impact_percentage: number;
    time_horizon: string;
  };
};

export type AgentResult = {
  agent: string;
  risk_score: number;
  risk_level: string;
  summary: string;
  key_findings: string[];
};

export type SimulationResult = {
  company_name: string;
  industry: string;
  scenario: string;
  overall_risk_score: number;
  risk_level: string;
  agents: Record<string, AgentResult>;
  cascade: string[];
  forecast: Record<string, string>;
  recommendations: string[];
  governance: {
    agent: string;
    confidence_score: number;
    summary: string;
    warnings: string[];
  };
  agent_activity: Array<{
    agent: string;
    status: string;
    confidence: number;
    risk_score: number;
    risk_level: string;
  }>;
  risk_heatmap: Array<{
    department: string;
    risk_score: number;
  }>;
  operational_metrics: {
    operational_stability: number;
    system_pressure: number;
    ai_confidence: number;
    business_resilience: number;
  };
  risk_trend: Array<{
    day: number;
    risk: number;
  }>;
  department_status: Array<{
    department: string;
    risk_level: string;
    risk_score: number;
    status: string;
  }>;
  executive_report?: {
    summary: string;
    business_impact: string;
    recommended_action: string;
    board_level_message: string;
  };
};

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (payload && typeof payload === "object" && "success" in payload) {
    if (!payload.success) {
      throw new Error(payload.message || "Backend request failed");
    }

    return payload.data;
  }

  return payload as T;
}

export function getCompanyProfile() {
  return fetchApi<CompanyProfile>("/demo/company-profile");
}

export async function getDemoSimulations() {
  const payload = await fetchApi<{ simulations: DemoSimulation[] }>("/demo/simulations");

  return payload.simulations;
}

export function runSimulation(request: SimulationRequest) {
  return fetchApi<SimulationResult>("/simulate", {
    method: "POST",
    body: JSON.stringify(request)
  });
}
