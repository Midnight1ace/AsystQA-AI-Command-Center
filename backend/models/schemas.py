from pydantic import BaseModel


class Employees(BaseModel):
    engineering: int
    support: int
    sales: int
    operations: int


class Metrics(BaseModel):
    monthly_revenue: float
    monthly_users: int
    churn_rate: float
    support_tickets: int
    response_time_hours: float
    server_load: float
    customer_satisfaction: float


class Scenario(BaseModel):
    type: str
    description: str
    impact_percentage: float
    time_horizon: str


class SimulationRequest(BaseModel):
    company_name: str
    industry: str
    employees: Employees
    metrics: Metrics
    scenario: Scenario
    
class ScenarioComparisonRequest(BaseModel):
    simulation_a: SimulationRequest
    simulation_b: SimulationRequest