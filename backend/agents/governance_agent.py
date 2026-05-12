def analyze_governance(agent_results, overall_risk_score):
    risk_scores = [
        agent_results["staffing"]["risk_score"],
        agent_results["revenue"]["risk_score"],
        agent_results["infrastructure"]["risk_score"],
        agent_results["customer"]["risk_score"]
    ]

    score_gap = max(risk_scores) - min(risk_scores)

    confidence_score = 90 - int(score_gap * 0.25)

    if overall_risk_score >= 75:
        confidence_score += 3

    confidence_score = max(50, min(95, confidence_score))

    return {
        "agent": "Governance Agent",
        "confidence_score": confidence_score,
        "summary": "Governance agent reviewed agent agreement, risk consistency, and simulation reliability.",
        "warnings": [
            "This is a simulated business prediction, not a guaranteed outcome.",
            "Real enterprise data integrations would improve accuracy.",
            "Human review is recommended before making major business decisions."
        ]
    }