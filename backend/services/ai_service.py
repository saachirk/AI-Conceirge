import os
import base64
import io
import time
from dotenv import load_dotenv
from groq import Groq
import yfinance as yf
import matplotlib.pyplot as plt
import matplotlib

matplotlib.use("Agg")

from utils.prompts import SYSTEM_PROMPT

# Load env
load_dotenv()

# Groq setup
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# -----------------------------
# 🔹 MODE DETECTION
# -----------------------------
def detect_mode(message):
    msg = message.lower()

    if any(word in msg for word in ["graph", "chart", "plot", "visual"]):
        return "graph"

    return "text"


# -----------------------------
# 🔹 GRAPH TYPE DETECTION
# -----------------------------
def detect_graph_type(message):
    msg = message.lower()

    if "pie" in msg:
        return "pie"
    if "bar" in msg:
        return "bar"

    return "line"


# -----------------------------
# 🔹 STOCK MAP
# -----------------------------
STOCK_MAP = {
    "apple": "AAPL",
    "tesla": "TSLA",
    "google": "GOOGL",
    "amazon": "AMZN",
    "microsoft": "MSFT",
    "reliance": "RELIANCE.NS",
    "tcs": "TCS.NS",
    "infosys": "INFY.NS"
}


# -----------------------------
# 🔹 EXTRACT TICKER (NO AI NEEDED)
# -----------------------------
def extract_stock_ticker(message):
    msg = message.lower()

    for name, ticker in STOCK_MAP.items():
        if name in msg:
            return ticker

    return None


# -----------------------------
# 🔹 GRAPH GENERATION
# -----------------------------
def generate_stock_graph(ticker, graph_type="line"):
    try:
        if not ticker:
            return {
                "type": "text",
                "data": "⚠️ Please specify a stock (e.g., Apple, Tesla)"
            }

        data = yf.download(ticker, period="6y")

        if hasattr(data.columns, "levels"):
            data.columns = data.columns.get_level_values(0)

        if data.empty or "Close" not in data:
            return {
                "type": "text",
                "data": f"⚠️ No data found for {ticker}"
            }

        data = data.reset_index()
        data = data[["Date", "Close"]].dropna()

        plt.figure(figsize=(8, 4))

        if graph_type == "line":
            plt.plot(data["Date"], data["Close"])

        elif graph_type == "bar":
            sample = data.tail(10)

            x = list(range(len(sample)))
            y = sample["Close"].astype(float).tolist()
            labels = sample["Date"].dt.strftime("%b %y").tolist()

            plt.bar(x, y)
            plt.xticks(x, labels, rotation=45)

        elif graph_type == "pie":
            sample = data.tail(5)

            y = sample["Close"].astype(float).tolist()
            labels = [f"P{i}" for i in range(1, len(y)+1)]

            plt.pie(y, labels=labels, autopct="%1.1f%%")

        plt.title(f"{ticker} - {graph_type.capitalize()} Chart")
        plt.tight_layout()

        buf = io.BytesIO()
        plt.savefig(buf, format="png")
        buf.seek(0)

        image_base64 = base64.b64encode(buf.read()).decode("utf-8")

        plt.close()

        return {
            "type": "image",
            "data": image_base64
        }

    except Exception as e:
        print("GRAPH ERROR:", e)
        return {
            "type": "text",
            "data": "⚠️ Failed to generate graph"
        }


# -----------------------------
# 🔹 TEXT GENERATION (GROQ)
# -----------------------------
def generate_text(message, user_profile):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": message}
            ]
        )

        return {
            "type": "text",
            "data": response.choices[0].message.content
        }

    except Exception as e:
        print("GROQ ERROR:", e)
        return {
            "type": "text",
            "data": "⚠️ AI temporarily unavailable"
        }


# -----------------------------
# 🔹 MAIN FUNCTION
# -----------------------------
def get_ai_response(message, user_profile=None):
    if user_profile is None:
        user_profile = {}

    try:
        mode = detect_mode(message)

        if mode == "graph":
            ticker = extract_stock_ticker(message)
            graph_type = detect_graph_type(message)

            return generate_stock_graph(ticker, graph_type)

        return generate_text(message, user_profile)

    except Exception as e:
        print("MAIN ERROR:", e)
        return {
            "type": "text",
            "data": "⚠️ Something went wrong"
        }