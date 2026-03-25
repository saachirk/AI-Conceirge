import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/ChatPage.css";

const SUGGESTED = [
  "What should I invest in?",
  "Explain ET Prime benefits",
  "How to start an SIP?",
  "Best mutual funds right now",
];

const ChatPage = () => {
  const location = useLocation();
  const userProfile = location.state || {};

  const [messages, setMessages] = useState([
    { text: "Hello! I'm your ET AI Navigator. I'm here to help you discover the full ET ecosystem — from markets and premium content to wealth management and events. What can I help you with today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const sendMessage = async (text) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    const userMsg = { text: msgText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/chat/", {
        message: msgText,
        user_profile: userProfile
      });
      const botReply = res.data.reply;
      setMessages((prev) => [
        ...prev,
        { text: botReply, sender: "bot" }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI", sender: "bot" }
      ]);
    }
    setTyping(false);
  };

  return (
    <div className="chat-container">

      {/* HEADER */}
      <div className="chat-header">
        <div className="chat-header-avatar">ET</div>
        <div className="chat-header-info">
          <div className="chat-header-title">AI Navigator</div>
          <div className="chat-header-status">Online · Ready to help</div>
        </div>
        <div className="chat-header-et">Economic Times</div>
      </div>

      {/* SUGGESTED PROMPTS */}
      <div className="suggested-prompts">
        {SUGGESTED.map((s, i) => (
          <button
            key={i}
            className="prompt-chip"
            onClick={() => sendMessage(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* MESSAGES */}
      <div className="chat-body">
        <div className="date-divider">Today</div>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
            <div className="message-meta">
              {msg.sender === "bot" ? "ET AI" : "You"} · just now
            </div>
          </div>
        ))}
        {typing && (
          <div className="typing">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your ET AI Navigator..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()}>Send</button>
      </div>

    </div>
  );
};

export default ChatPage;
