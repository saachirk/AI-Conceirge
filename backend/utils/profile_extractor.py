import json
import google.generativeai as genai


def extract_profile(message, current_profile):
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""
Extract user info from this message.

Message: {message}

Current Profile: {current_profile}

Return JSON with:
- goal (investing, learning, saving, etc.)
- income (low, medium, high)
- experience (beginner, intermediate, expert)

Only return JSON.
"""

    try:
        response = model.generate_content(prompt)
        text = response.text.strip()

        return json.loads(text)

    except:
        return current_profile