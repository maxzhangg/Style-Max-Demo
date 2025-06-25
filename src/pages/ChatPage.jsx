import React, { useRef, useState } from "react";
 
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import mainjpg from '../assets/main.jpg';
 
const recommendedImages = [img1, img2, img3];
 
export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi there! 👋 Looking for outfit ideas? Upload a photo or ask me anything about fashion!" },
    { role: "user", text: "Hey! I have a dinner date this weekend, not sure what to wear..." },
    {
      role: "bot",
      text: "Sounds exciting! 😊 Could you upload a photo of yourself or tell me what kind of vibe you want—elegant, casual, playful?",
    },
    {
      role: "user",
      img: mainjpg,
      text: "This is what I wore last time. Maybe something different this time?",
    },
    {
      role: "bot",
      text: "Thanks! Based on your style, here are a few outfit suggestions that might suit the occasion 👗✨",
      imgs: recommendedImages,
    },
  ]);
 
  const [input, setInput] = useState("");
  const [uploadImg, setUploadImg] = useState(null);
  const fileInputRef = useRef();
 
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
 
  const handleSend = () => {
    if (!input.trim() && !uploadImg) return;
 
    let userMsg = null;
    if (uploadImg) {
      userMsg = { role: "user", img: uploadImg, text: input };
    } else {
      userMsg = { role: "user", text: input };
    }
 
    const botMsg = {
      role: "bot",
      text: "Here are some looks you might like 👠",
      imgs: recommendedImages,
    };
 
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setUploadImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 
  return (
    <div className="max-w-[900px] mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Ask StyleMax</h2>
      <div className="h-[600px] overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            {msg.img && (
              <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-1`}>
                <img
                  src={msg.img}
                  alt="user upload"
                  className="inline-block w-24 h-32 object-cover rounded shadow"
                />
              </div>
            )}
            {msg.text && (
              <span
                className={`inline-block px-3 py-2 rounded shadow mb-1 ${
                  msg.role === "user" ? "bg-blue-100" : "bg-white"
                }`}
              >
                {msg.text}
              </span>
            )}
            {msg.imgs && (
              <div className="flex gap-3 mt-2 flex-wrap">
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
 
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Ask about outfits or upload a photo"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
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
 