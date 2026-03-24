from flask import Blueprint, request, jsonify
from services.ai_service import get_ai_response
from services.recommender import get_recommendations

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message")
    user_profile = data.get("user_profile", {})

    # Get AI response
    ai_reply = get_ai_response(message, user_profile)

    # Get recommendations
    recommendations = get_recommendations(user_profile)

    return jsonify({
        "reply": ai_reply,
        "recommendations": recommendations
    })