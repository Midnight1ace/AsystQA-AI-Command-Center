def analyze_revenue(request):
    metrics = request.metrics
    scenario = request.scenario

    base_churn = metrics.churn_rate
    revenue = metrics.monthly_revenue

    churn_increase = 0

    if scenario.type == "support_surge":
        churn_increase = scenario.impact_percentage * 0.08

    elif scenario.type == "engineering_resignation":
        churn_increase = scenario.impact_percentage * 0.05

    elif scenario.type == "user_growth":
        churn_increase = scenario.impact_percentage * 0.015

    projected_churn = base_churn + churn_increase
    estimated_revenue_loss = revenue * (projected_churn / 100)

    risk_score = min(100, int(projected_churn * 8))

    if risk_score >= 75:
        risk_level = "High"
    elif risk_score >= 45:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "agent": "Revenue Agent",
        "risk_score": risk_score,
        "risk_level": risk_level,
        "summary": "Revenue risk was estimated using churn pressure and monthly revenue.",
        "key_findings": [
            f"Projected churn may rise from {round(base_churn, 2)}% to {round(projected_churn, 2)}%.",
            f"Estimated monthly revenue at risk is ${round(estimated_revenue_loss, 2)}."
        ]
    }