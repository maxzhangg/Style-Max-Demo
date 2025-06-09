import React from 'react';
import { Link, useLocation } from "react-router-dom";



export default function Navbar() {
  const location = useLocation();
  const navClass = (path) =>
    location.pathname === path
      ? "text-blue-600 font-bold underline"
      : "hover:text-blue-500";

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <div className="text-xl font-bold">AI Fashion</div>
      <div className="space-x-6">
        <Link to="/chat" className={navClass("/chat")}>聊天推荐</Link>
        <Link to="/community" className={navClass("/community")}>社区</Link>
        <Link to="/wardrobe" className={navClass("/wardrobe")}>衣橱</Link>
      </div>
    </nav>
  );
}
