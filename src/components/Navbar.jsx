import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/style_max_logo.jpg'; // 引入 logo 图片

export default function Navbar() {
  const location = useLocation();
  const navClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold underline"
      : "hover:text-blue-500";

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      {/* 左侧：logo 和站名 */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">Style Max - Your AI Fashion Assistant</span>
      </div>

      {/* 右侧：导航链接 */}
      <div className="space-x-6">
        <Link to="/chat" className={navClass("/chat")}>Chat</Link>
        <Link to="/community" className={navClass("/community")}>Community</Link>
        <Link to="/wardrobe" className={navClass("/wardrobe")}>Wardrobe</Link>
      </div>
    </nav>
  );
}
