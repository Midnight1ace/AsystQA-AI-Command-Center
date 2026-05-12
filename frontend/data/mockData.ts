export const metrics = [
  {
    title: "Revenue",
    value: "$1.82M",
    change: "-11.2% simulated",
    trend: "down" as const,
    accent: "cyan" as const,
    context: "90-day forecast"
  },
  {
    title: "Churn",
    value: "18%",
    change: "+5.4 pts",
    trend: "down" as const,
    accent: "red" as const,
    context: "at-risk accounts"
  },
  {
    title: "Team Capacity",
    value: "81%",
    change: "-9.5%",
    trend: "down" as const,
    accent: "orange" as const,
    context: "support load"
  },
  {
    title: "SLA Health",
    value: "92%",
    change: "-4.7%",
    trend: "down" as const,
    accent: "blue" as const,
    context: "response target"
  },
  {
    title: "Infrastructure Load",
    value: "76%",
    change: "+15%",
    trend: "up" as const,
    accent: "cyan" as const,
    context: "safe threshold"
  },
  {
    title: "Operational Stability",
    value: "68",
    change: "medium risk",
    trend: "down" as const,
    accent: "orange" as const,
    context: "governance score"
  }
];

export const agents = [
  {
    name: "Staffing Agent",
    task: "Burnout prediction and hiring analysis",
    progress: 82,
    confidence: 91,
    insight: "Burnout risk exceeds 78% in support within 14 days.",
    state: "running" as const
  },
  {
    name: "Revenue Agent",
    task: "Forecasting churn-adjusted revenue",
    progress: 100,
    confidence: 88,
    insight: "Projected revenue decline: 11.2% over next quarter.",
    state: "complete" as const
  },
  {
    name: "Infrastructure Agent",
    task: "Testing cloud load and reliability",
    progress: 100,
    confidence: 84,
    insight: "Load exceeds safe threshold in 6 days without capacity lift.",
    state: "complete" as const
  },
  {
    name: "Customer Behavior Agent",
    task: "Simulating satisfaction and retention",
    progress: 96,
    confidence: 86,
    insight: "Complaint escalation rate rises 23% after SLA degradation.",
    state: "running" as const
  },
  {
    name: "Governance Agent",
    task: "Resolving cross-agent risk conflicts",
    progress: 72,
    confidence: 93,
    insight: "Simulation reliability is high with one infrastructure caveat.",
    state: "supervising" as const
  }
];

export const revenueData = [
  { month: "Now", baseline: 1.82, simulated: 1.82, churn: 6.8, load: 61 },
  { month: "7D", baseline: 1.9, simulated: 1.78, churn: 8.1, load: 69 },
  { month: "30D", baseline: 2.04, simulated: 1.72, churn: 11.4, load: 76 },
  { month: "60D", baseline: 2.16, simulated: 1.66, churn: 14.9, load: 82 },
  { month: "90D", baseline: 2.31, simulated: 1.58, churn: 18, load: 87 },
  { month: "1Y", baseline: 2.9, simulated: 2.18, churn: 16.1, load: 71 }
];

export const departmentImpact = [
  { department: "Support", risk: 92 },
  { department: "Success", risk: 74 },
  { department: "Infra", risk: 68 },
  { department: "Sales", risk: 48 },
  { department: "Finance", risk: 37 }
];

export const twinNodes = [
  { id: "staffing", label: "Staffing", value: "81%", x: 18, y: 34, severity: "warning" as const },
  { id: "revenue", label: "Revenue", value: "$1.82M", x: 28, y: 68, severity: "danger" as const },
  { id: "infra", label: "Infrastructure", value: "76%", x: 76, y: 34, severity: "warning" as const },
  { id: "customer", label: "Customer", value: "18%", x: 78, y: 66, severity: "danger" as const },
  { id: "logistics", label: "Logistics", value: "94%", x: 50, y: 76, severity: "stable" as const },
  { id: "governance", label: "Governance", value: "93%", x: 50, y: 28, severity: "stable" as const }
];

export const cascadeSteps = [
  { label: "Tickets +40%", detail: "Inbound support queue expands", severity: "warning" as const },
  { label: "Response Time", detail: "SLA margin compresses by 31%", severity: "warning" as const },
  { label: "Workload", detail: "Support utilization reaches 94%", severity: "danger" as const },
  { label: "Burnout", detail: "High attrition signal in 14 days", severity: "danger" as const },
  { label: "Satisfaction", detail: "CSAT drops below retention guardrail", severity: "danger" as const },
  { label: "Revenue", detail: "Quarterly forecast loses 11.2%", severity: "danger" as const }
];

export const recommendations = [
  {
    title: "Hire 8 support specialists",
    impact: "Reduces burnout risk by 24%",
    priority: "Critical"
  },
  {
    title: "Automate tier-1 workflows",
    impact: "Absorbs 18% ticket volume",
    priority: "High"
  },
  {
    title: "Increase cloud capacity by 15%",
    impact: "Keeps load below safe threshold",
    priority: "High"
  },
  {
    title: "Redistribute escalation routing",
    impact: "Protects enterprise SLA contracts",
    priority: "Medium"
  }
];

export const timeline = [
  {
    day: "Day 3",
    title: "Ticket queue starts rising",
    description: "Support backlog increases by 18% due to higher inbound demand."
  },
  {
    day: "Day 12",
    title: "SLA pressure detected",
    description: "Average response time approaches contractual SLA limits."
  },
  {
    day: "Day 30",
    title: "Churn curve steepens",
    description: "Customer behavior agent flags renewal risk in delayed accounts."
  },
  {
    day: "Day 90",
    title: "Revenue drag becomes visible",
    description: "Revenue agent projects 11.2% decline without intervention."
  }
];
