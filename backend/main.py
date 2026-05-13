from orchestrator.comparison_engine import compare_simulations
from data.demo_data import DEMO_COMPANY_PROFILE, DEMO_SIMULATIONS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    SimulationRequest,
    ScenarioComparisonRequest

)
from orchestrator.simulation_engine import run_simulation

app = FastAPI(
    title="TwinOps AI Backend",
    description="AI Corporate Digital Twin Simulation Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "TwinOps AI backend is running",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TwinOps AI"
    }
@app.get("/demo/company-profile")
def demo_company_profile():
    return DEMO_COMPANY_PROFILE


@app.get("/demo/simulations")
def demo_simulations():
    return {
        "simulations": DEMO_SIMULATIONS
    }


@app.get("/demo-scenarios")
def demo_scenarios():
    return {
        "scenarios": [
            {
                "name": "Support Surge",
                "description": "Support tickets increase by 40%",
                "type": "support_surge",
                "impact_percentage": 40
            },
            {
                "name": "Engineer Resignation",
                "description": "20% of engineers resign",
                "type": "engineering_resignation",
                "impact_percentage": 20
            },
            {
                "name": "User Growth Explosion",
                "description": "Users grow by 300%",
                "type": "user_growth",
                "impact_percentage": 300
            }
        ]
    }
@app.post("/simulate")
def simulate(request: SimulationRequest):
    result = run_simulation(request)
    return result
    
@app.post("/compare-scenarios")
def compare_scenarios(request: ScenarioComparisonRequest):

    simulation_a = run_simulation(request.simulation_a)
    simulation_b = run_simulation(request.simulation_b)

    comparison = compare_simulations(
        simulation_a,
        simulation_b
    )

    return comparison