import React from 'react';
import { useRef, useState } from "react";

const recommendedImages = [
  "/img1.jpg",
  "/img2.jpg",
  "/img3.jpg",
];

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "你好，我是穿搭助手，可以上传你的照片获得专属推荐哦！" },
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
      text: "为你推荐三套穿搭：",
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
      <h2 className="text-2xl font-semibold mb-4">穿搭聊天助手</h2>
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
            placeholder="输入你的穿搭问题（可选）"
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
          />
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="px-4 py-2 border rounded bg-white hover:bg-blue-50"
          >
            上传照片
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
            <img src={uploadImg} alt="预览" className="w-20 h-28 object-cover rounded shadow" />
            <button
              onClick={() => {
                setUploadImg(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="text-xs text-red-500"
            >
              移除
            </button>
          </div>
        )}
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          发送
        </button>
      </div>
    </div>
  );
}
