import { useNavigate, useLocation } from "react-router-dom";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userProfile = location.state || {};

  return (
    <div className="dashboard">

      {/* TOP BAR */}
      <div className="dashboard-topbar">
        <span className="topbar-logo">ET Concierge</span>
        <span className="topbar-status">Live Markets</span>
      </div>

      {/* MARKET STRIP */}
      <div className="market-strip">
        <div className="market-item">
          <span className="label">SENSEX</span>
          <span className="value">74,339</span>
          <span className="change">+0.42%</span>
        </div>
        <div className="market-item">
          <span className="label">NIFTY</span>
          <span className="value">22,519</span>
          <span className="change">+0.38%</span>
        </div>
        <div className="market-item">
          <span className="label">USD/INR</span>
          <span className="value">83.42</span>
          <span className="change down">−0.05%</span>
        </div>
        <div className="market-item">
          <span className="label">GOLD</span>
          <span className="value">₹71,240</span>
          <span className="change">+0.21%</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Hi 👋 <span>{userProfile.type || "User"}</span></h1>
        <p>Your personalized financial dashboard — curated by AI</p>
      </div>

      {/* RECOMMENDED */}
      <div className="section-title">Recommended For You</div>

      <div className="cards-grid">

        {userProfile.goal === "invest" && (
          <div className="card">
            <span className="card-icon">💰</span>
            <h3>Start SIP</h3>
            <p>Build wealth systematically with monthly investments</p>
            <span className="card-tag">ET Markets</span>
          </div>
        )}

        {userProfile.interest === "stocks" && (
          <div className="card">
            <span className="card-icon">📊</span>
            <h3>ET Markets</h3>
            <p>Real-time tracking, analysis and alerts on your watchlist</p>
            <span className="card-tag">Markets</span>
          </div>
        )}

        <div className="card">
          <span className="card-icon">📈</span>
          <h3>ET Prime</h3>
          <p>Premium insights and in-depth analysis for smarter decisions</p>
          <span className="card-tag">Premium</span>
        </div>

        <div className="card">
          <span className="card-icon">🎓</span>
          <h3>Masterclasses</h3>
          <p>Learn from India's top financial experts and fund managers</p>
          <span className="card-tag">Learning</span>
        </div>

        <div className="card">
          <span className="card-icon">🏆</span>
          <h3>Wealth Summit</h3>
          <p>Exclusive access to ET's flagship wealth management events</p>
          <span className="card-tag">Events</span>
        </div>

      </div>

      {/* CTA */}
      <div className="button-group">
        <button
          className="primary-btn"
          onClick={() => navigate("/chat", { state: userProfile })}
        >
          Open AI Navigator →
        </button>
      </div>

    </div>
  );
};

export default DashboardPage;
