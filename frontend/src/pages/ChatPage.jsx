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

  // 🧠 Dynamic profile
  const [userProfile, setUserProfile] = useState(location.state || {});

  // 💬 Chat messages
  const [messages, setMessages] = useState([
    {
      type: "text",
      text: "Hello! I'm your ET AI Navigator. What can I help you with today?",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const sendMessage = async (text) => {
    const msgText = text || input;
    if (!msgText.trim()) return;

    // 👤 Add user message
    const userMsg = {
      type: "text",
      text: msgText,
      sender: "user"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/chat/", {
        message: msgText,
        user_profile: userProfile
      });

      const reply = res.data.reply;
      const type = res.data.type || "text";

      // 🤖 Handle AI response (text OR image)
      const botMsg =
        type === "image"
          ? {
              type: "image",
              data: reply,
              sender: "bot"
            }
          : {
              type: "text",
              text: reply,
              sender: "bot"
            };

      setMessages((prev) => [...prev, botMsg]);

      // 🧠 Update profile
      if (res.data.user_profile) {
        setUserProfile(res.data.user_profile);
      }

      // 🎯 Update recommendations
      if (res.data.recommendations) {
        setRecommendations(res.data.recommendations);
      }

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "text",
          text: "⚠️ Error connecting to AI",
          sender: "bot"
        }
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

      {/* CHAT BODY */}
      <div className="chat-body">
        <div className="date-divider">Today</div>

        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>

            {/* 🔥 TEXT MESSAGE */}
            {msg.type === "text" && <div>{msg.text}</div>}

            {/* 🎨 IMAGE MESSAGE */}
            {msg.type === "image" && (
              <img
                src={`data:image/png;base64,${msg.data}`}
                alt="AI Generated"
                style={{
                  maxWidth: "260px",
                  borderRadius: "12px",
                  marginTop: "5px"
                }}
              />
            )}

            <div className="message-meta">
              {msg.sender === "bot" ? "ET AI" : "You"} · just now
            </div>
          </div>
        ))}

        {/* ⏳ Typing animation */}
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