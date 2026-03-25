import React, { useState } from "react";
import "../styles/OnboardingPage.css";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const [form, setForm] = useState({
    type: "",
    interest: "",
    goal: ""
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard", { state: form });
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">

        <div className="step-indicator">Profile Setup</div>

        <h2>Tell us about yourself</h2>
        <p className="subtitle">
          A few quick questions so we can tailor everything ET has to offer — just for you.
        </p>

        <div className="field-group">
          <div>
            <label className="field-label">Who are you?</label>
            <select
              className="field-input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="" disabled>Select your profile</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <div>
            <label className="field-label">Primary Interest</label>
            <select
              className="field-input"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
            >
              <option value="" disabled>What interests you most?</option>
              <option value="stocks">Stock Markets</option>
              <option value="news">Financial News</option>
              <option value="learning">Learning & Upskilling</option>
              <option value="wealth">Wealth Management</option>
            </select>
          </div>

          <div>
            <label className="field-label">Your Primary Goal</label>
            <select
              className="field-input"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            >
              <option value="" disabled>What do you want to achieve?</option>
              <option value="invest">Start / Grow Investments</option>
              <option value="learn">Learn About Finance</option>
              <option value="stay updated">Stay Updated on Markets</option>
              <option value="plan">Plan for the Future</option>
            </select>
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Build My Profile →
        </button>

        <div className="et-logo-small">
          <span>Economic Times · AI Concierge</span>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPage;
