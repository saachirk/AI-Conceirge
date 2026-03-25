import React from "react";
import "../styles/WelcomePage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <div className="main-container">

        {/* TOP */}
        <div className="hero">
          <h1>AI Concierge</h1>
          <p>Your personal guide to finance & smart decisions</p>
          <button onClick={() => navigate("/onboarding")}>
            Get Started →
          </button>
        </div>

        {/* FEATURES */}
        <div className="feature-grid">
          <div className="card">
            <h3>🧠 Smart Profiling</h3>
            <p>Understands you in seconds</p>
          </div>

          <div className="card">
            <h3>📊 Insights</h3>
            <p>Personalized recommendations</p>
          </div>

          <div className="card">
            <h3>⚡ Fast</h3>
            <p>Instant AI guidance</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LandingPage;