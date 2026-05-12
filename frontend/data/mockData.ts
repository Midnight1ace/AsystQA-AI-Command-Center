export const metrics = [
  {
    title: "Monthly Revenue",
    value: "$1.82M",
    change: "+8.4%",
    trend: "up" as const
  },
  {
    title: "Customer Churn",
    value: "6.8%",
    change: "+2.1%",
    trend: "down" as const
  },
  {
    title: "Team Capacity",
    value: "81%",
    change: "-9.5%",
    trend: "down" as const
  },
  {
    title: "SLA Health",
    value: "92%",
    change: "-4.7%",
    trend: "down" as const
  }
];

export const agents = [
  {
    name: "Staffing Agent",
    task: "Predicting burnout and hiring gaps",
    progress: 82
  },
  {
    name: "Revenue Agent",
    task: "Estimating revenue and churn impact",
    progress: 100
  },
  {
    name: "Logistics Agent",
    task: "Checking operational bottlenecks",
    progress: 100
  },
  {
    name: "Customer Agent",
    task: "Simulating customer behavior changes",
    progress: 100
  },
  {
    name: "Infrastructure Agent",
    task: "Forecasting platform load pressure",
    progress: 100
  }
];

export const revenueData = [
  { month: "Jan", baseline: 1.2, simulated: 1.2 },
  { month: "Feb", baseline: 1.35, simulated: 1.31 },
  { month: "Mar", baseline: 1.5, simulated: 1.41 },
  { month: "Apr", baseline: 1.7, simulated: 1.48 },
  { month: "May", baseline: 1.9, simulated: 1.51 },
  { month: "Jun", baseline: 2.1, simulated: 1.56 }
];

export const departmentImpact = [
  { department: "Support", risk: 92 },
  { department: "Sales", risk: 48 },
  { department: "Ops", risk: 61 },
  { department: "Infra", risk: 54 },
  { department: "Finance", risk: 37 }
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
    day: "Day 18",
    title: "Burnout threshold crossed",
    description: "Staffing Agent predicts high burnout risk in support team."
  },
  {
    day: "Day 27",
    title: "Revenue impact appears",
    description: "Customer churn risk begins affecting renewal forecast."
  }
];