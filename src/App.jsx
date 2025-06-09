import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import CommunityPage from "./pages/CommunityPage";
import WardrobePage from "./pages/WardrobePage";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/wardrobe" element={<WardrobePage />} />
      </Routes>
    </div>
  );
}
