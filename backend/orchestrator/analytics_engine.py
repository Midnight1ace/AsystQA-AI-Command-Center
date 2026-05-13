import random


def generate_heatmap(agent_results):
    return [
        {
            "department": "Staffing",
            "risk_score": agent_results["staffing"]["risk_score"]
        },
        {
            "department": "Revenue",
            "risk_score": agent_results["revenue"]["risk_score"]
        },
        {
            "department": "Infrastructure",
            "risk_score": agent_results["infrastructure"]["risk_score"]
        },
        {
            "department": "Customer",
            "risk_score": agent_results["customer"]["risk_score"]
        }
    ]


def generate_operational_metrics(overall_risk_score):
    stability_score = max(5, 100 - overall_risk_score)

    return {
        "operational_stability": stability_score,
        "system_pressure": min(100, overall_risk_score + random.randint(3, 12)),
        "ai_confidence": random.randint(82, 96),
        "business_resilience": max(10, stability_score - random.randint(2, 10))
    }


def generate_risk_trend(overall_risk_score):
    base = overall_risk_score

    return [
        {
            "day": 7,
            "risk": min(100, base - random.randint(3, 8))
        },
        {
            "day": 30,
            "risk": min(100, base + random.randint(2, 6))
        },
        {
            "day": 90,
            "risk": min(100, base + random.randint(8, 18))
        },
        {
            "day": 365,
            "risk": min(100, base + random.randint(10, 25))
        }
    ]


def generate_department_status(agent_results):
    statuses = []

    for key, result in agent_results.items():
        statuses.append({
            "department": result["agent"],
            "risk_level": result["risk_level"],
            "risk_score": result["risk_score"],
            "status": (
                "Critical Monitoring Required"
                if result["risk_score"] >= 75
                else "Stable Monitoring"
            )
        })

    return statuses