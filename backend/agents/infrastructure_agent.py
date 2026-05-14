def analyze_infrastructure(request):
    metrics = request.metrics
    scenario = request.scenario

    projected_load = metrics.server_load

    if scenario.type == "user_growth":
        projected_load += scenario.impact_percentage * 0.18

    elif scenario.type == "support_surge":
        projected_load += scenario.impact_percentage * 0.05

    elif scenario.type == "engineering_resignation":
        projected_load += scenario.impact_percentage * 0.03

    projected_load = min(150, projected_load)
    risk_score = min(100, int(projected_load))

    if risk_score >= 80:
        risk_level = "High"
    elif risk_score >= 55:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "agent": "Infrastructure Agent",
        "risk_score": risk_score,
        "risk_level": risk_level,
        "summary": "Infrastructure risk was estimated from server load and scenario pressure.",
        "key_findings": [
            f"Server load may rise from {metrics.server_load}% to {round(projected_load, 2)}%.",
            f"Infrastructure risk level is {risk_level}."
        ]
    }