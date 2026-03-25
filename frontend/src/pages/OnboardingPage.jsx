import React, { useState, useEffect } from "react";
import "../styles/OnboardingPage.css";
import { useNavigate } from "react-router-dom";

const questions = [
  "Hi! 👋 Are you a student or working?",
  "What are you interested in? (stocks / news / learning)",
  "What is your goal? (learn / invest / stay updated)"
];

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: questions[0], sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      if (step + 1 < questions.length) {
        setMessages((prev) => [
          ...prev,
          { text: questions[step + 1], sender: "bot" }
        ]);
        setStep(step + 1);
      } else {
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    }, 800);
  };

  return (
    <div className="chat-container">

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </div>
        ))}

        {typing && <div className="typing">AI is typing...</div>}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your answer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>

    </div>
  );
};

export default ChatPage;