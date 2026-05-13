DEMO_COMPANY_PROFILE = {
    "company_name": "NovaCloud SaaS",
    "industry": "Enterprise SaaS",
    "employees": {
        "engineering": 35,
        "support": 18,
        "sales": 12,
        "operations": 8
    },
    "metrics": {
        "monthly_revenue": 250000,
        "monthly_users": 40000,
        "churn_rate": 5.5,
        "support_tickets": 1200,
        "response_time_hours": 6,
        "server_load": 68,
        "customer_satisfaction": 82
    }
}


DEMO_SIMULATIONS = [
    {
        "id": "support_surge",
        "name": "Support Surge",
        "description": "Support tickets increase by 40%",
        "type": "support_surge",
        "impact_percentage": 40,
        "time_horizon": "90_days",
        "business_question": "What happens if support tickets increase by 40%?"
    },
    {
        "id": "engineering_resignation",
        "name": "Engineering Resignation",
        "description": "20% of engineers resign",
        "type": "engineering_resignation",
        "impact_percentage": 20,
        "time_horizon": "90_days",
        "business_question": "What happens if 20% of engineers resign?"
    },
    {
        "id": "user_growth",
        "name": "User Growth Explosion",
        "description": "Users grow by 300%",
        "type": "user_growth",
        "impact_percentage": 300,
        "time_horizon": "90_days",
        "business_question": "What happens if users grow by 300%?"
    }
]