def analyze_customer(request):
    metrics = request.metrics
    scenario = request.scenario

    satisfaction_drop = 0
    response_time_increase = 0

    if scenario.type == "support_surge":
        satisfaction_drop = scenario.impact_percentage * 0.25
        response_time_increase = scenario.impact_percentage * 0.1

    elif scenario.type == "engineering_resignation":
        satisfaction_drop = scenario.impact_percentage * 0.18
        response_time_increase = scenario.impact_percentage * 0.05

    elif scenario.type == "user_growth":
        satisfaction_drop = scenario.impact_percentage * 0.04
        response_time_increase = scenario.impact_percentage * 0.02

    projected_satisfaction = max(0, metrics.customer_satisfaction - satisfaction_drop)
    projected_response_time = metrics.response_time_hours + response_time_increase

    risk_score = min(100, int(100 - projected_satisfaction + projected_response_time * 3))

    if risk_score >= 75:
        risk_level = "High"
    elif risk_score >= 45:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "agent": "Customer Behavior Agent",
        "risk_score": risk_score,
        "risk_level": risk_level,
        "summary": "Customer risk was estimated from satisfaction and response time changes.",
        "key_findings": [
            f"Customer satisfaction may drop from {metrics.customer_satisfaction} to {round(projected_satisfaction, 2)}.",
            f"Response time may increase from {metrics.response_time_hours}h to {round(projected_response_time, 2)}h."
        ]
    }