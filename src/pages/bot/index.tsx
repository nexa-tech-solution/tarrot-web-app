import TarotChat from "@/components/tarot-chat";
import React from "react";

const TarotChatBotPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-slate-100 flex flex-col">
      {/* Mystical Background Overlays */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="flex-1 relative z-10">
        <TarotChat />
      </main>
    </div>
  );
};

export default TarotChatBotPage;
