import React, { useState } from "react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! How can I help you with your style today? 👗👔" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful Uniqlo fashion assistant. You help users find outfit suggestions for different occasions based on their text input.",
          },
          { role: "user", content: input },
        ],
      });

      const replyText = completion.choices[0]?.message?.content || "Sorry, I didn't catch that.";
      const botMsg = { role: "bot", text: replyText };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("❌ DeepSeek 请求失败：", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "😓 DeepSeek 出错了，请稍后再试。" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 w-[500px] bg-white border rounded shadow-lg flex flex-col z-50">
      <div className="p-3 border-b font-semibold bg-gray-100">Style Assistant</div>
      <div className="flex-1 p-3 overflow-y-auto max-h-96">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 px-3 py-2 rounded text-sm whitespace-pre-wrap break-words ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {msg.role === "bot" ? (
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p {...props} className="mb-2" />,
                  li: ({ node, ...props }) => <li {...props} className="list-disc ml-5" />,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">Thinking...</div>}
      </div>
      <div className="flex items-center p-2 border-t bg-white">
        <input
          className="flex-1 px-2 py-1 border rounded text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-2 text-sm bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
