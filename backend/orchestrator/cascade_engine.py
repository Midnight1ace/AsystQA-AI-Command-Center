def generate_cascade(scenario_type):
    cascades = {
        "support_surge": [
            "Support tickets increase",
            "Response times become slower",
            "Support staff workload rises",
            "Burnout risk increases",
            "Customer satisfaction drops",
            "Churn risk increases",
            "Revenue declines"
        ],
        "engineering_resignation": [
            "Engineering capacity drops",
            "Product delivery slows down",
            "Bug fixes take longer",
            "Customer complaints increase",
            "Customer trust decreases",
            "Churn risk increases",
            "Revenue becomes unstable"
        ],
        "user_growth": [
            "User traffic increases rapidly",
            "Server load rises",
            "Support tickets increase",
            "Infrastructure costs increase",
            "Downtime risk increases",
            "Customer experience weakens",
            "Operational risk increases"
        ]
    }

    return cascades.get(
        scenario_type,
        [
            "Business condition changes",
            "Operational pressure increases",
            "Team workload rises",
            "Customer experience may decline",
            "Revenue risk may increase"
        ]
    )