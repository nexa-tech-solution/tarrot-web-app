import { TAROT_DECK } from "@/data/index.data";
import { getThemeStyles } from "@/themes/index.theme";
import type { TarotCard } from "@/types/index.type";
import { useAppStore } from "@/zustand/index.zustand";
import {
  ArrowLeft,
  ChevronUp,
  Globe,
  Moon,
  RefreshCw,
  Sparkles,
  Stars,
  X,
  BookOpen, // Thêm icon sách
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

const ReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, selectedSpread } = useAppStore();
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);

  const [currentCard, setCurrentCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [showMeaning, setShowMeaning] = useState<boolean>(false); // Trạng thái hiển thị bottom sheet
  const [showClickText, setShowClickText] = useState<boolean>(false);
  const [showOpenButton, setShowOpenButton] = useState<boolean>(false); // Nút mở bottom sheet

  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    };
  }, []);

  const handleDraw = () => {
    if (isShuffling) return;

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);

    setIsShuffling(true);
    setIsFlipped(false);
    setShowMeaning(false);
    setShowClickText(false);
    setShowOpenButton(false);
    setCurrentCard(null);

    // Thời gian tráo bài
    setTimeout(() => {
      const random = Math.floor(Math.random() * TAROT_DECK.length);
      setCurrentCard(TAROT_DECK[random]);
      setIsShuffling(false);

      shuffleTimerRef.current = setTimeout(() => {
        setShowClickText(true);
      }, 300);
    }, 1200);
  };

  const handleFlip = () => {
    if (!isFlipped && !isShuffling && currentCard) {
      setIsFlipped(true);
      setShowClickText(false);

      // Sau khi lật xong (khoảng 600ms transition), hiện nút mở bottom sheet
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
      flipTimerRef.current = setTimeout(() => {
        setShowOpenButton(true);
      }, 600);
    }
  };

  const handleOpenMeaning = () => {
    setShowMeaning(true);
    setShowOpenButton(false); // Ẩn nút đi khi đã mở sheet
  };

  const handleCloseMeaning = () => {
    setShowMeaning(false);
    setShowOpenButton(true); // Hiện lại nút mở khi đóng
  };

  const handleBack = () => {
    navigate("/main/home");
  };

  if (!selectedSpread) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col h-screen w-screen ${s.bg} md:flex-row overflow-hidden transition-colors duration-700 font-sans`}
    >
      {/* --- Ambient Background Effects (UPDATED) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Thay thế background cũ bằng Ảnh 1 (Ví dụ ảnh Galaxy/Mystic từ Unsplash) */}
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2940&auto=format&fit=crop"
          alt="Mystic Background"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            isDark ? "opacity-40" : "opacity-20"
          }`}
        />
        {/* Lớp phủ gradient để background hòa trộn tốt hơn với theme */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-black/80 via-purple-900/30 to-black/80 mix-blend-multiply"
              : "bg-gradient-to-br from-white/80 via-indigo-100/30 to-white/80"
          }`}
        ></div>
      </div>

      {/* --- Mobile Header --- */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-50 px-6 pt-12 pb-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={handleBack}
          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90 pointer-events-auto ${
            isDark
              ? "bg-white/10 text-white border border-white/10"
              : "bg-black/5 text-slate-800 border border-black/5"
          }`}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.25em] opacity-60 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Reading
          </span>
          <span
            className={`text-2xl font-serif font-bold tracking-wide ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {selectedSpread.title}
          </span>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* --- Desktop Close Button --- */}
      <div className="hidden md:block absolute top-8 left-8 z-50">
        <button
          onClick={handleBack}
          className={`group flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isDark
              ? "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              : "bg-white/60 hover:bg-white/80 text-slate-800 border border-slate-200"
          }`}
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs font-bold uppercase tracking-wider">
            Quay lại
          </span>
        </button>
      </div>

      {/* --- MAIN STAGE: CARD AREA --- */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full z-10 md:w-[55%] md:border-r md:border-white/5">
        {/* Hint / Question Text */}
        {!currentCard && !isShuffling && (
          <div className="absolute top-[20%] w-2/4 text-center animate-fade-in-up z-20 pointer-events-none">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-xl backdrop-blur-sm ${
                isDark
                  ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                  : "bg-white border border-slate-100"
              }`}
            >
              <div className={`text-${selectedSpread.color.split("-")[1]}-500`}>
                {selectedSpread.icon}
              </div>
            </div>
            <h2
              className={`text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight ${
                isDark ? "text-white drop-shadow-lg" : "text-slate-900"
              }`}
            >
              {selectedSpread.title}
            </h2>
            <p
              className={`text-lg md:text-xl font-medium leading-relaxed italic opacity-80 ${
                isDark ? "text-indigo-200" : "text-slate-600"
              }`}
            >
              "{selectedSpread.question}"
            </p>
            <div className="mt-12 flex flex-col items-center gap-3 opacity-60">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-400" />
              <p
                className={`text-[10px] uppercase tracking-[0.3em] font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Tập trung & Kết nối
              </p>
            </div>
          </div>
        )}

        {/* 3D CARD CONTAINER */}
        <div className="relative perspective-container">
          <div
            className={`
              w-[280px] h-[460px] md:w-[340px] md:h-[560px] 
              relative cursor-pointer transition-all duration-500 ease-out
              ${
                !currentCard && !isShuffling
                  ? "hover:scale-105 hover:-translate-y-4"
                  : ""
              }
              ${isShuffling ? "animate-vibrate" : ""}
            `}
            onClick={handleFlip}
          >
            {/* Empty Slot (Dotted) */}
            {!currentCard && !isShuffling && (
              <div className="absolute inset-0 rounded-[32px] flex items-center justify-center overflow-hidden group">
                <div
                  className={`absolute inset-0 rounded-[32px] border-2 border-dashed opacity-30 transition-opacity group-hover:opacity-50 ${
                    isDark ? "border-white" : "border-indigo-400"
                  }`}
                ></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDark
                      ? "from-indigo-500/10 to-transparent"
                      : "from-indigo-100/50 to-transparent"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            )}

            {/* The Actual Card (Flippable) */}
            {(currentCard || isShuffling) && (
              <div
                className={`w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform-style-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* --- CARD BACK (Mặt sau) --- */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-[30px] overflow-hidden shadow-2xl border ${
                    isDark
                      ? "bg-[#1e1b4b] border-white/10 shadow-indigo-500/20"
                      : "bg-indigo-900 border-indigo-200 shadow-indigo-200/50"
                  }`}
                >
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>

                  {/* Inner Border Design */}
                  <div className="absolute inset-3 border border-white/20 rounded-[24px] flex items-center justify-center">
                    <div className="absolute inset-1 border border-white/10 rounded-[20px]"></div>

                    {/* Mystic Center Symbol */}
                    <div className="relative flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-indigo-400 rounded-full blur-[20px] opacity-40 animate-pulse-slow"></div>
                        <div className="relative z-10 w-24 h-24 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                          <Moon
                            className="w-10 h-10 text-indigo-200 fill-indigo-200/20"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* "Click Here" Hint */}
                      <div
                        className={`transition-all duration-500 ${
                          showClickText
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2"
                        }`}
                      >
                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/20 shadow-lg animate-pulse">
                          Mở bài
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- CARD FRONT (Mặt trước - New Mystic Design) --- */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-[30px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7),0_10px_20px_-10px_rgba(0,0,0,0.5)] group`}
                >
                  {/* Mystic Gold Frame & Texture */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37] via-[#f7ef8a] to-[#c5a028] p-[6px]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-40 mix-blend-multiply"></div>

                    {/* Inner Content Area - Dark Background for contrast */}
                    <div className="relative w-full h-full bg-[#0f0f1a] rounded-[24px] overflow-hidden border-2 border-[#d4af37]/60">
                      {/* Main Image */}
                      <img
                        src={currentCard?.image}
                        alt="Tarot Card"
                        className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-110 opacity-85"
                      />

                      {/* Mystical Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-transparent to-transparent mix-blend-multiply pointer-events-none"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_#000_150%)] pointer-events-none opacity-70"></div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end pb-8">
                        {/* Element Badge */}
                        <div className="mb-4 opacity-0 transform translate-y-4 transition-all duration-700 delay-300 group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/50 bg-black/70 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <Sparkles className="w-3 h-3 text-[#f7ef8a]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7ef8a]">
                              {currentCard?.element}
                            </span>
                          </div>
                        </div>

                        {/* Card Name */}
                        <div className="relative w-full text-center">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#fff] via-[#f7ef8a] to-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wider leading-tight">
                            {currentCard?.name}
                          </h3>
                          <div className="flex justify-center items-center gap-2 mt-3 opacity-80">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]"></div>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                          </div>
                        </div>
                      </div>

                      {/* Holographic Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none mix-blend-overlay"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN / BOTTOM SHEET (MEANING) --- */}
      <div className="relative z-50 w-full md:w-[45%] pointer-events-none flex flex-col justify-end md:justify-center md:h-full">
        {/* Draw Button Container */}
        {!currentCard && (
          <div className="absolute bottom-10 left-0 right-0 px-6 md:relative md:bottom-auto md:px-16 pointer-events-auto flex justify-center">
            <button
              onClick={handleDraw}
              disabled={isShuffling}
              className={`
                group relative w-full md:w-auto md:min-w-[300px] h-16 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-xl
                ${isShuffling ? "cursor-wait opacity-80" : "cursor-pointer"}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient"></div>
              <div className="absolute inset-[2px] rounded-[14px] bg-black/20 backdrop-blur-sm flex items-center justify-center gap-3">
                {isShuffling ? (
                  <RefreshCw className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <>
                    <Stars className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span className="text-white font-bold text-sm uppercase tracking-[0.2em]">
                      Rút Bài Ngay
                    </span>
                  </>
                )}
              </div>
            </button>
          </div>
        )}

        {/* Nút "Xem Luận Giải" - Xuất hiện sau khi lật bài */}
        {currentCard && isFlipped && !showMeaning && (
          <div
            className={`fixed bottom-10 left-0 right-0 z-50 pointer-events-auto flex justify-center transition-all duration-700 ${
              showOpenButton
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={handleOpenMeaning}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-colors"></div>
              <BookOpen className="w-5 h-5 text-indigo-300" />
              <span className="text-sm font-bold uppercase tracking-widest text-white relative z-10">
                Xem Luận Giải
              </span>
              <ChevronUp className="w-4 h-4 text-white/50 animate-bounce relative z-10" />
            </button>
          </div>
        )}

        {/* Meaning Sheet - Bottom Sheet Style */}
        <div
          className={`
            fixed md:absolute inset-x-0 bottom-0 md:inset-auto md:w-full md:px-12 md:py-0
            transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1)
            ${showMeaning ? "translate-y-0" : "translate-y-[110%]"}
            pointer-events-auto z-50
          `}
        >
          {/* Card Container with padding to prevent shadow clipping */}
          <div className="p-0 md:p-0">
            <div
              className={`
                relative w-full rounded-t-[32px] md:rounded-[32px] p-6 md:p-8 pb-10
                backdrop-blur-3xl 
                border-t border-l border-r border-white/10
                ${
                  isDark
                    ? "bg-slate-900/95 shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.9)]"
                    : "bg-white/95 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]"
                }
                max-h-[85vh] custom-scrollbar
              `}
            >
              {/* Mobile Handle / Close Indicator */}
              <div
                className="md:hidden w-full flex justify-center mb-6 cursor-pointer"
                onClick={handleCloseMeaning}
              >
                <div
                  className={`w-12 h-1.5 rounded-full ${
                    isDark ? "bg-white/20" : "bg-slate-300"
                  }`}
                ></div>
              </div>

              {/* Close Icon (X) - Added for both mobile and desktop */}
              <button
                onClick={handleCloseMeaning}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-20"
              >
                <X
                  size={24}
                  className={
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-black/50 hover:text-black"
                  }
                />
              </button>

              {/* Meaning Content */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between pr-8">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                        isDark ? "bg-white/5" : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {selectedSpread.icon}
                    </div>
                    <div>
                      <p
                        className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ${
                          isDark ? "text-indigo-300" : "text-indigo-500"
                        }`}
                      >
                        Thông điệp
                      </p>
                      <h3 className={`text-xl font-serif font-bold ${s.text}`}>
                        {selectedSpread.title}
                      </h3>
                    </div>
                  </div>
                  {/* Astrology Badge */}
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold uppercase ${
                      isDark
                        ? "bg-white/5 border-white/10 text-indigo-300"
                        : "bg-white border-slate-200 text-indigo-600"
                    }`}
                  >
                    <Globe size={12} /> {currentCard?.astrology}
                  </div>
                </div>

                <div
                  className={`h-px w-full ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                ></div>

                {/* Text */}
                <div>
                  <h4
                    className={`text-2xl font-serif font-bold mb-4 flex items-center gap-2 ${s.text}`}
                  >
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    Lời giải
                  </h4>
                  <p
                    className={`text-base md:text-lg leading-relaxed font-light pl-4 border-l-2 ${
                      isDark
                        ? "text-slate-300 border-indigo-500"
                        : "text-slate-600 border-indigo-300"
                    }`}
                  >
                    {currentCard?.meanings[selectedSpread.id] ||
                      currentCard?.meanings.daily}
                  </p>
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2">
                  {currentCard?.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        isDark
                          ? "bg-white/5 border-white/10 text-slate-300"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Close Action */}
                <button
                  onClick={() => {
                    setCurrentCard(null);
                    setIsFlipped(false);
                    setShowMeaning(false);
                    setShowOpenButton(false);
                  }}
                  className={`w-full py-4 rounded-xl mt-4 text-xs font-bold uppercase tracking-[0.2em] transition-all active:scale-95 ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  Kết thúc phiên
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles for Animations */}
      <style>{`
        .perspective-container { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% auto; }
        
        @keyframes vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        .animate-vibrate { animation: vibrate 0.3s linear infinite; }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(155, 155, 155, 0.3); border-radius: 4px; }
      `}</style>
    </div>
  );
};
export default ReadingPage;
