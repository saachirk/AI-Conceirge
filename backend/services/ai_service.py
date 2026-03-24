from utils.prompts import SYSTEM_PROMPT

def get_ai_response(message, user_profile):
    experience = user_profile.get("experience", "beginner")
    goal = user_profile.get("goal", "saving")

    # Simple AI logic (replace later with real API)
    if "invest" in message.lower():
        if experience == "beginner":
            return "You can start with SIP in mutual funds. It’s safe and beginner-friendly."
        else:
            return "You can explore stocks, ETFs, and diversified portfolios."

    if "save" in message.lower():
        return "You should maintain an emergency fund and start a savings plan."

    return f"{SYSTEM_PROMPT} Based on your profile ({experience}, {goal}), I suggest exploring ET tools."