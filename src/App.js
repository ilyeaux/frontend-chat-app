import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// Replace with your server IP and port
const SERVER_URL = "http://89.108.78.231";
const socket = io(SERVER_URL);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("chat message");
    };
  }, []);

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat App</h1>
      <div style={styles.chatBox}>
        {chat.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

// Basic styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    width: "300px",
    height: "400px",
    border: "1px solid #ccc",
    overflowY: "scroll",
    padding: "10px",
    marginBottom: "10px",
  },
  message: {
    marginBottom: "10px",
    padding: "5px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    width: "300px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    marginLeft: "10px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;
