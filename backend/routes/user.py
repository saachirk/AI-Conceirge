from flask import Blueprint, request, jsonify

user_bp = Blueprint("user", __name__)

users = {}

@user_bp.route("/save", methods=["POST"])
def save_user():
    data = request.json
    user_id = data.get("user_id")

    users[user_id] = data

    return jsonify({
        "status": "saved",
        "user": users[user_id]
    })