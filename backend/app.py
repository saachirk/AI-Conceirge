from flask import Flask
from flask_cors import CORS

from routes.chat import chat_bp
from routes.user import user_bp

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(chat_bp, url_prefix="/chat")
app.register_blueprint(user_bp, url_prefix="/user")

@app.route("/")
def home():
    return "AI Concierge Backend Running "

if __name__ == "__main__":
    app.run(debug=True)