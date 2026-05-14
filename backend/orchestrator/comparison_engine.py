def compare_simulations(simulation_a, simulation_b):
    risk_a = simulation_a["overall_risk_score"]
    risk_b = simulation_b["overall_risk_score"]

    safer_simulation = (
        simulation_a["scenario"]
        if risk_a < risk_b
        else simulation_b["scenario"]
    )

    risk_difference = abs(risk_a - risk_b)

    return {
        "scenario_a": {
            "name": simulation_a["scenario"],
            "risk_score": risk_a,
            "risk_level": simulation_a["risk_level"]
        },

        "scenario_b": {
            "name": simulation_b["scenario"],
            "risk_score": risk_b,
            "risk_level": simulation_b["risk_level"]
        },

        "comparison_summary": {
            "safer_scenario": safer_simulation,
            "risk_difference": risk_difference,
            "executive_conclusion": (
                f"The scenario '{safer_simulation}' appears operationally safer "
                f"based on current simulation analysis."
            )
        }
    }