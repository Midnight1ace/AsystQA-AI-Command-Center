def generate_forecast(overall_risk_score):
    if overall_risk_score >= 75:
        return {
            "7_days": "Early warning signs appear across operations.",
            "30_days": "Pressure becomes visible across teams and customer experience.",
            "90_days": "Revenue, churn, and staffing consequences become serious.",
            "1_year": "Long-term business stability may be affected if no action is taken."
        }

    elif overall_risk_score >= 45:
        return {
            "7_days": "Small operational pressure appears.",
            "30_days": "Some departments may need extra monitoring.",
            "90_days": "Moderate business impact is possible.",
            "1_year": "The company remains stable if early action is taken."
        }

    else:
        return {
            "7_days": "Business remains stable.",
            "30_days": "No major operational collapse expected.",
            "90_days": "Low business risk if current performance continues.",
            "1_year": "Company stability remains strong."
        }