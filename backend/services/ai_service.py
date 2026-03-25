import os
from dotenv import load_dotenv
from groq import Groq
from utils.prompts import SYSTEM_PROMPT

# Load env
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

def get_ai_response(message, user_profile):
    try:
        response = client.chat.completions.create(
           model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        print("ERROR:", e)   # 👈 VERY IMPORTANT
        return "Backend error: check terminal"