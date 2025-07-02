import React, { useRef, useState } from "react";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";

// ✅ DeepSeek API 调用封装
async function callDeepSeekApi(prompt) {
  const openai = new OpenAI({
    baseURL: "https://api.deepseek.com",
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful fashion assistant. You help users find outfit suggestions for different occasions based on their text input and image descriptions.",
        },
        {
          role: "user",
          content: `User input: "${prompt}". If input is vague or short, assume it's about what to wear and ask for more details.`,
        },
      ],
    });

    console.log("✅ DeepSeek 返回结果：", completion);
    return completion.choices[0].message.content;
  } catch (err) {
    console.error("❌ DeepSeek 请求失败：", err);
    if (err.response) {
      console.error("📛 错误响应状态码:", err.response.status);
      console.error("📛 错误响应内容:", err.response.data);
    }
    return "😓 DeepSeek 出错了，请稍后再试。";
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setUploadImg(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !uploadImg) return;

    const userMsg = uploadImg
      ? { role: "user", img: uploadImg, text: input }
      : { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);

    const prompt = input || "Can you suggest an outfit?";
    const botReply = await callDeepSeekApi(prompt);

    const botMsg = {
      role: "bot",
      text: botReply,
    };

    setMessages((prev) => [...prev, botMsg]);
    setInput("");
    setUploadImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-[900px] mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Style Chat</h2>

      <div className="h-[600px] overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {msg.img && (
              <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-1`}>
                <img
                  src={msg.img}
                  alt="uploaded"
                  className="inline-block w-24 h-32 object-cover rounded shadow"
                />
              </div>
            )}
            {msg.text && (
              <div
                className={`inline-block max-w-[70%] px-3 py-2 rounded shadow mb-1 whitespace-pre-wrap break-words text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-auto text-left"
                    : "bg-white mr-auto text-left"
                }`}
              >
                <ReactMarkdown
                  components={{
                    li: ({ node, ...props }) => (
                      <li {...props} className="ml-6 list-disc text-sm" />
                    ),
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Ask for outfit advice or upload a photo"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="px-4 py-2 border rounded bg-white hover:bg-blue-50"
          >
            Upload photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {uploadImg && (
          <div className="flex items-center gap-3 mt-1">
            <img src={uploadImg} alt="Preview" className="w-20 h-28 object-cover rounded shadow" />
            <button
              onClick={() => {
                setUploadImg(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-red-500"
            >
              Remove
            </button>
          </div>
        )}

        <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
          Send
        </button>
      </div>
    </div>
  );
}
