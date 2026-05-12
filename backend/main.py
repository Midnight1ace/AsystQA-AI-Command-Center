from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import SimulationRequest
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
    