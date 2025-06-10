import React from 'react';
import { useRef, useState } from "react";

const recommendedImages = [
  "../assets/img1.jpg",
  "../assets/img2.jpg",
  "../assets/img3.jpg",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm your outfit assistant. Upload a photo to get personalized outfit recommendations!" },
  ]);
  const [input, setInput] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const fileInputRef = useRef();

  // 处理图片上传
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        setUploadImg(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 发送消息
  const handleSend = () => {
    if (!input.trim() && !uploadImg) return;

    // 用户消息
    let userMsg = null;
    if (uploadImg) {
      userMsg = { role: "user", img: uploadImg, text: input };
    } else {
      userMsg = { role: "user", text: input };
    }

    // 系统推荐
    const botMsg = {
      role: "bot",
      text: "Recommended outfits for you:",
      imgs: recommendedImages,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setUploadImg(null);
    // 重置 input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Outfit Chatbot</h2>
      <div className="h-96 overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {/* 显示用户上传的图片 */}
            {msg.img && (
              <div className="flex justify-end mb-1">
                <img
                  src={msg.img}
                  alt="user upload"
                  className="inline-block w-24 h-32 object-cover rounded shadow"
                />
              </div>
            )}
            {/* 显示文本 */}
            {msg.text && (
              <span
                className={`inline-block px-3 py-2 rounded shadow mb-1 ${msg.role === "user" ? "bg-blue-100" : "bg-white"}`}
              >
                {msg.text}
              </span>
            )}
            {/* 显示 AI 推荐图片 */}
            {msg.imgs && (
              <div className="flex gap-3 mt-2">
                {msg.imgs.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`推荐${i + 1}`}
                    className="w-20 h-28 object-cover rounded shadow"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 输入和上传 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Enter your outfit question (optional)"
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
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
        {/* 预览上传的图片 */}
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
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
