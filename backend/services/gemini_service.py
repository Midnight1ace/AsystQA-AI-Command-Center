import os
import json
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def improve_with_gemini(simulation_data):
    """
    Uses Gemini to create a polished executive report.
    If Gemini fails, the backend still works using a fallback report.
    """

    if not GEMINI_API_KEY:
        return create_fallback_report(simulation_data)

    try:
        genai.configure(api_key=GEMINI_API_KEY)

        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
You are an enterprise AI strategy analyst.

Create a concise executive report for this corporate digital twin simulation.

Rules:
- Keep it professional.
- Do not use markdown.
- Do not exaggerate.
- Make it sound like a board-level business insight.
- Return ONLY valid JSON.
- Use this exact JSON structure:

{{
  "summary": "...",
  "business_impact": "...",
  "recommended_action": "...",
  "board_level_message": "..."
}}

Simulation data:
{json.dumps(simulation_data, indent=2)}
"""

        response = model.generate_content(prompt)
        text = response.text.strip()

        # Clean possible markdown formatting if Gemini returns ```json
        text = text.replace("```json", "").replace("```", "").strip()

        return json.loads(text)

    except Exception as error:
        return create_fallback_report(simulation_data, str(error))


def create_fallback_report(simulation_data, error_message=None):
    risk_level = simulation_data.get("risk_level", "Unknown")
    risk_score = simulation_data.get("overall_risk_score", "Unknown")
    scenario = simulation_data.get("scenario", "Unknown scenario")

    report = {
        "summary": f"The simulation analyzed the scenario: {scenario}. The overall business risk level is {risk_level} with a score of {risk_score}.",
        "business_impact": "The scenario may affect operational capacity, customer experience, and revenue stability depending on how quickly leadership responds.",
        "recommended_action": "Leadership should review the highest-risk areas, act on the recommendations, and monitor the situation over the next 7 to 30 days.",
        "board_level_message": "This simulation should be used as an early-warning decision support tool, not as a guaranteed prediction."
    }

    if error_message:
        report["gemini_status"] = "fallback_used"
        report["gemini_error"] = error_message

    return report