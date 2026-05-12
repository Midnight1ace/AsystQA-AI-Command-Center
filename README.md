# AsystQA AI Command Center

AsystQA AI Command Center is a frontend demo for an enterprise AI digital twin platform. It presents a living simulation of a company, showing how operational changes can cascade across staffing, revenue, infrastructure, logistics, customer behavior, and governance.

The project is currently frontend-only and is designed for a hackathon-style product demo.

## Core Idea

The application answers one question:

> What happens to the business if one important condition changes?

Instead of behaving like a chatbot or static analytics dashboard, the interface feels like an operational command center. A user can enter a scenario, adjust impact intensity, and review simulated consequences through agent activity, system maps, forecasts, timelines, and executive recommendations.

## Demo Features

- Enterprise command-center dashboard
- Company health metric cards
- Simulation input panel with scenario presets
- Central business twin system map
- Multi-agent activity panel
- Cascading consequence chain
- Predictive timeline
- Forecast charts using Recharts
- Executive recommendation panel
- Dark enterprise visual style with cyan, blue, orange, and red risk states

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React icons

## Project Structure

```text
frontend/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    AgentPanel.tsx
    BusinessTwinMap.tsx
    CascadeChain.tsx
    ExecutiveRecommendations.tsx
    Header.tsx
    ImpactDashboard.tsx
    MetricCard.tsx
    RiskTimeline.tsx
    Sidebar.tsx
    SimulationForm.tsx
  data/
    mockData.ts
```

## Getting Started

Install dependencies:

```bash
cd frontend
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

## Hackathon Scope

This demo intentionally focuses on frontend product storytelling. It does not include real ERP integrations, production simulations, real cloud telemetry, or backend AI orchestration yet.

The goal is to make the product identity clear:

> A living AI simulation of a business.

