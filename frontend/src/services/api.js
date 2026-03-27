// src/services/api.js

export const sendMessage = async (message, userProfile) => {
  try {
    const res = await fetch("http://localhost:5000/chat/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        user_profile: userProfile,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return { reply: "Error connecting to server" };
  }
};