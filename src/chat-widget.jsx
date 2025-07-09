import React from "react";
import { createRoot } from "react-dom/client";
import ChatWidget from "./components/ChatWidget.jsx";

const container = document.createElement("div");
container.id = "chat-root";
Object.assign(container.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 9999,
  width: "360px",
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
});
document.body.appendChild(container);

const root = createRoot(container);
root.render(<ChatWidget />);
