import React from "react";
import "../styles/WelcomePage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const tickerItems = [
    "ET Prime", "·", "ET Markets", "·", "Wealth Summit", "·",
    "Masterclasses", "·", "Financial Services", "·", "AI Navigator", "·",
    "ET Prime", "·", "ET Markets", "·", "Wealth Summit", "·",
    "Masterclasses", "·", "Financial Services", "·", "AI Navigator", "·",
  ];

  return (
    <div className="landing">
      <div className="main-container">

        {/* NAV */}
        <nav className="nav-bar">
          <span className="nav-logo">ET Concierge</span>
          <span className="nav-badge">Powered by AI</span>
        </nav>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker">
            {tickerItems.map((item, i) => (
              <span key={i} className={item === "·" ? "sep" : ""}>{item}</span>
            ))}
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">Your Personal Finance Guide</div>
          <h1>
            Navigate the <em>entire</em> ET ecosystem
          </h1>
          <p>
            One intelligent conversation. Personalized recommendations across ET Prime,
            Markets, Masterclasses, Wealth Summits, and financial services — all tailored to who you are.
          </p>
          <button onClick={() => navigate("/onboarding")}>
            Get Started →
          </button>
        </div>

        {/* FEATURES */}
        <div className="feature-grid">
          <div className="card">
            <h3>🧠 Smart Profiling</h3>
            <p>Understands your financial life in a single conversation</p>
          </div>
          <div className="card">
            <h3>📊 Deep Insights</h3>
            <p>Personalized recommendations across every ET product</p>
          </div>
          <div className="card">
            <h3>⚡ Instant Guidance</h3>
            <p>AI concierge active at every touchpoint</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
