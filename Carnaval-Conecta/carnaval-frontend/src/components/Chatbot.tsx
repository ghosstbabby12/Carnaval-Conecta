// src/components/Chatbot.tsx

import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css"; // Asegúrate de tener los estilos separados

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "Usuario", text: input };
    setMessages([...messages, newMessage, { sender: "Bot", text: "Estoy pensando..." }]);

    try {
      const response = await fetch("http://localhost:9090/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, username: "Usuario" }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Eliminar "Estoy pensando..."
        { sender: "Bot", text: data.botResponse || "⚠️ No se recibió respuesta válida." },
      ]);
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: "Bot", text: "❌ Error al conectar con el servidor." },
      ]);
    }

    setInput("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <button className="chat-toggle-btn" onClick={toggleChat}>
        💬
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">🎭 Carnival Bot</div>
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, idx) => (
              <div key={idx}><strong>{msg.sender}:</strong> {msg.text}</div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      )}
    </div>
  );
};