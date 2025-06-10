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
        <Link to="/chat" className={navClass("/chat")}>Chat</Link>
        <Link to="/community" className={navClass("/community")}>Community</Link>
        <Link to="/wardrobe" className={navClass("/wardrobe")}>Wardrobe</Link>
      </div>
    </nav>
  );
}
