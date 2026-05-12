def analyze_staffing(request):
    employees = request.employees
    metrics = request.metrics
    scenario = request.scenario

    support_pressure = metrics.support_tickets / max(employees.support, 1)
    risk_score = min(100, int(support_pressure * 1.2))

    if scenario.type == "support_surge":
        risk_score += int(scenario.impact_percentage * 0.6)

    if scenario.type == "engineering_resignation":
        risk_score += int(scenario.impact_percentage * 1.1)

    risk_score = min(100, risk_score)

    if risk_score >= 75:
        risk_level = "High"
    elif risk_score >= 45:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return {
        "agent": "Staffing Agent",
        "risk_score": risk_score,
        "risk_level": risk_level,
        "summary": "Staffing pressure was analyzed based on team size, workload, and scenario impact.",
        "key_findings": [
            f"Support pressure is about {round(support_pressure, 2)} tickets per support employee.",
            f"Staffing risk level is {risk_level}."
        ]
    }