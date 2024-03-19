import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const messageRef = useRef(null);
  const [socketId, setSocketId] = useState(undefined);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("https://real-time-app-wuag.onrender.com", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setSocketId(socket.id);
      socket.on("message", (message) => {
        console.log(message);
        setMessage(message);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = io("https://real-time-app-wuag.onrender.com", { transports: ["websocket"] });
    socket.emit("user-message", messageRef.current.value);
  };

  return (
    <>
      <h1>socket.io</h1>
      <h3>ID: {socketId}</h3>
      <p>{message}</p>
      <br />
      <input type="text" placeholder="your message" ref={messageRef} />
      <br />
      <br />
      <button onClick={sendMessage}>Send Message</button>
    </>
  );
}

export default App;
