from flask import Blueprint, request, jsonify
from services.ai_service import get_ai_response
from services.recommender import get_recommendations
from utils.profile_extractor import extract_profile

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    try:
        data = request.json

        message = data.get("message")
        user_profile = data.get("user_profile", {})

        if not message:
            return jsonify({"error": "Message required"}), 400

        # 🧠 Extract profile
        updated_profile = extract_profile(message, user_profile)

        # 🤖 AI response
        ai_result = get_ai_response(message, updated_profile)

        # 🎯 Recommendations
        recommendations = get_recommendations(updated_profile)

        return jsonify({
    "reply": ai_result.get("data"),
    "type": ai_result.get("type"),
    "user_profile": updated_profile,
    "recommendations": recommendations
})

    except Exception as e:
        print("CHAT ERROR:", e)
        return jsonify({"error": "Server error"}), 500