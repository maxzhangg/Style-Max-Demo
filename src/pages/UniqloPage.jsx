import React from "react";
import uniqloHtml from "../assets/uniqlo.html?raw"; // ✅ 注意 ?raw
import ChatWidget from "../components/ChatWidget";

export default function UniqloPage() {
  return (
    <div className="relative min-h-screen w-full bg-white border-none overflow-hidden">
      <div dangerouslySetInnerHTML={{ __html: uniqloHtml }} />
      <div className="fixed bottom-4 right-4 z-50 border-none">
        <ChatWidget />
      </div>
    </div>
  );
}
