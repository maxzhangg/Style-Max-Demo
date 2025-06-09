import React from 'react';
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "你好，我是穿搭助手，有什么穿搭需求吗？" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const botReply = {
      role: "bot",
      text: "推荐：白衬衫 + 黑裤子 + 小皮鞋，干练又不失温柔。",
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">穿搭聊天助手</h2>
      <div className="h-96 overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded shadow ${msg.role === "user" ? "bg-blue-100" : "bg-white"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="输入你的穿搭问题..."
          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded">
          发送
        </button>
      </div>
    </div>
  );
}
