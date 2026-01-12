import MysticalBackground from "@/components/mystical-background";
import TarotChat from "@/components/tarot-chat";
import React from "react";

const TarotChatBotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 flex flex-col">
      <MysticalBackground />
      <main className="flex-1 relative z-10">
        <TarotChat />
      </main>
    </div>
  );
};

export default TarotChatBotPage;
