from agents.staffing_agent import analyze_staffing
from agents.revenue_agent import analyze_revenue
from agents.infrastructure_agent import analyze_infrastructure
from agents.customer_agent import analyze_customer
from agents.governance_agent import analyze_governance

from orchestrator.cascade_engine import generate_cascade
from orchestrator.forecasting_engine import generate_forecast


def get_risk_level(score):
    if score >= 75:
        return "High"
    elif score >= 45:
        return "Medium"
    else:
        return "Low"


def generate_recommendations(scenario_type, overall_risk_score):
    recommendations = []

    if scenario_type == "support_surge":
        recommendations = [
            "Hire additional support specialists.",
            "Automate tier-1 support tickets.",
            "Create priority routing for urgent customers.",
            "Monitor support burnout weekly."
        ]

    elif scenario_type == "engineering_resignation":
        recommendations = [
            "Protect critical engineering knowledge.",
            "Reassign high-priority product tasks.",
            "Start urgent hiring for senior engineering roles.",
            "Reduce non-essential feature work temporarily."
        ]

    elif scenario_type == "user_growth":
        recommendations = [
            "Increase infrastructure capacity.",
            "Add autoscaling rules.",
            "Expand support coverage.",
            "Monitor server load and customer complaints daily."
        ]

    else:
        recommendations = [
            "Review operational risk areas.",
            "Monitor key business metrics.",
            "Prepare contingency plans.",
            "Run follow-up simulations."
        ]

    if overall_risk_score >= 75:
        recommendations.insert(0, "Take immediate executive action within the next 7 days.")

    return recommendations


def run_simulation(request):
    staffing_result = analyze_staffing(request)
    revenue_result = analyze_revenue(request)
    infrastructure_result = analyze_infrastructure(request)
    customer_result = analyze_customer(request)

    agent_results = {
        "staffing": staffing_result,
        "revenue": revenue_result,
        "infrastructure": infrastructure_result,
        "customer": customer_result
    }

    risk_scores = [
        staffing_result["risk_score"],
        revenue_result["risk_score"],
        infrastructure_result["risk_score"],
        customer_result["risk_score"]
    ]

    overall_risk_score = int(sum(risk_scores) / len(risk_scores))
    risk_level = get_risk_level(overall_risk_score)

    cascade = generate_cascade(request.scenario.type)
    forecast = generate_forecast(overall_risk_score)
    recommendations = generate_recommendations(request.scenario.type, overall_risk_score)
    governance = analyze_governance(agent_results, overall_risk_score)

    return {
        "company_name": request.company_name,
        "industry": request.industry,
        "scenario": request.scenario.description,
        "overall_risk_score": overall_risk_score,
        "risk_level": risk_level,
        "agents": agent_results,
        "cascade": cascade,
        "forecast": forecast,
        "recommendations": recommendations,
        "governance": governance
    }