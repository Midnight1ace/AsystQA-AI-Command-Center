import random


def generate_agent_activity(agent_results):
    activity_feed = []

    activity_templates = {
        "staffing": [
            "Analyzing workforce pressure...",
            "Reviewing employee workload balance...",
            "Calculating burnout probability...",
            "Monitoring staffing capacity..."
        ],

        "revenue": [
            "Forecasting revenue impact...",
            "Analyzing churn probability...",
            "Calculating financial risk...",
            "Reviewing revenue stability..."
        ],

        "infrastructure": [
            "Monitoring infrastructure load...",
            "Analyzing cloud scalability...",
            "Reviewing uptime reliability...",
            "Calculating operational capacity..."
        ],

        "customer": [
            "Tracking customer satisfaction trends...",
            "Analyzing support response impact...",
            "Monitoring customer churn signals...",
            "Reviewing customer behavior patterns..."
        ]
    }

    for agent_name, result in agent_results.items():
        confidence = random.randint(78, 96)

        activity_feed.append({
            "agent": result["agent"],
            "status": random.choice(activity_templates.get(agent_name, ["Processing analysis..."])),
            "confidence": confidence,
            "risk_score": result["risk_score"],
            "risk_level": result["risk_level"]
        })

    return activity_feed