import React, { useState, useEffect } from "react";
import { Sparkles, X, BrainCircuit } from "lucide-react";

interface Props {
  onClick: () => void;
}

const FloatingChatBot: React.FC<Props> = ({ onClick }) => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Delay một chút để tạo sự bất ngờ
    const timer = setTimeout(() => setShowBubble(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-32 right-6 z-[100] flex flex-col items-end group">
      {/* Message Bubble */}
      {showBubble && (
        <div className="mb-4 mr-2 relative animate-fade-in-up">
          {/* Glowing Background Effect */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />

          <div className="relative bg-[#16161e]/90 backdrop-blur-xl border border-indigo-500/30 p-4 rounded-[2rem] rounded-br-none shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-[220px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="absolute -top-2 -right-2 bg-indigo-900 border border-indigo-400/30 text-indigo-300 rounded-full p-1 hover:bg-indigo-700 transition-colors shadow-lg"
            >
              <X size={10} />
            </button>

            <div className="flex gap-3 items-start">
              <div className="mt-1 w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              </div>
              <p className="text-[13px] text-indigo-100 font-medium leading-relaxed">
                Khách nhân có muốn{" "}
                <span className="text-indigo-400 font-bold">
                  bói chuyên sâu
                </span>{" "}
                cùng Mystic Tarot không? ✨
              </p>
            </div>

            {/* Pointer */}
            <div className="absolute bottom-[-8px] right-2 w-4 h-4 bg-[#16161e]/90 border-r border-b border-indigo-500/30 transform rotate-45" />
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={onClick}
        className="relative w-16 h-16 flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95"
      >
        {/* Outer Rotating Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-70 blur-md" />

        {/* Inner Button Circle */}
        <div className="absolute inset-1 bg-[#0f0f13] rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:border-indigo-400/50">
          <BrainCircuit
            size={28}
            className="text-white group-hover:text-indigo-300 transition-colors animate-float"
          />
        </div>

        {/* Notification Badge */}
        <div className="absolute top-0 right-0 w-5 h-5 bg-indigo-500 border-2 border-[#0c0c0e] rounded-full flex items-center justify-center shadow-lg">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        </div>

        {/* Hover Sparkles Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <Sparkles
            className="absolute -top-2 left-0 text-amber-400 animate-pulse"
            size={12}
          />
          <Sparkles
            className="absolute top-1/2 -right-2 text-indigo-400 animate-pulse"
            size={10}
          />
        </div>
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingChatBot;
