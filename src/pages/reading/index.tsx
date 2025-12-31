import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAppStore } from "@/zustand/index.zustand";
import { TAROT_DECK } from "@/data/index.data";
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  X,
  ChevronUp,
  Stars,
  Compass,
  Moon,
  Save,
  Feather,
} from "lucide-react";
import type { TarrotCard } from "@/data/tarrot.data";

// --- SUB-COMPONENTS CHO GỌN CODE ---

// 1. Hiệu ứng nền vũ trụ động
const MysticalBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
    {/* Lớp ảnh nền vũ trụ sâu */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-60 scale-110 animate-pulse-slow"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=3872&auto=format&fit=crop')",
      }}
    />
    {/* Lớp phủ màu gradient tạo chiều sâu */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#090514] via-[#1a1a2e]/80 to-transparent mix-blend-multiply" />
    <div className="absolute inset-0 bg-radial-at-c from-transparent to-[#090514]/90" />

    {/* Hiệu ứng bụi sao trôi (CSS base pattern) */}
    <div
      className="absolute inset-0 opacity-30 animate-float-slow"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "50px 50px",
      }}
    />
  </div>
);

// 2. Nút bấm phong cách ma thuật
const MysticalButton = ({
  onClick,
  children,
  icon: Icon,
  className = "",
}: any) => (
  <button
    onClick={onClick}
    className={`
      group relative flex items-center gap-3 px-8 py-4 rounded-full 
      bg-indigo-950/40 backdrop-blur-xl border border-indigo-400/30
      shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)]
      hover:bg-indigo-900/60 hover:border-indigo-300/50 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.7)]
      transition-all duration-300 active:scale-95
      ${className}
    `}
  >
    {/* Hiệu ứng ánh sáng chạy viền */}
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-[200%] group-hover:animate-shimmer" />
    </div>
    {Icon && (
      <Icon
        className="text-indigo-200 group-hover:text-white transition-colors animate-pulse-fast"
        size={20}
      />
    )}
    <span className="relative z-10 text-xs font-bold uppercase tracking-[0.25em] text-indigo-100 group-hover:text-white text-shadow-sm">
      {children}
    </span>
  </button>
);

// --- MAIN COMPONENT ---

const ReadingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedSpread, addJournalEntry } = useAppStore();

  // States
  const [currentCard, setCurrentCard] = useState<TarrotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showOpenButton, setShowOpenButton] = useState(false);
  const [note, setNote] = useState("");
  const flipTimerRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  if (!selectedSpread) {
    navigate("/");
    return null;
  }

  const handleDraw = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setIsFlipped(false);
    setShowMeaning(false);
    setShowOpenButton(false);
    setCurrentCard(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * TAROT_DECK.length);
      setCurrentCard(TAROT_DECK[randomIndex]);
      setIsShuffling(false);
    }, 2000); // Tăng thời gian xào bài lên một chút để tận hưởng hiệu ứng
  };

  const handleFlip = () => {
    if (!currentCard || isFlipped || isShuffling) return;
    setIsFlipped(true);
    flipTimerRef.current = setTimeout(() => {
      setShowOpenButton(true);
    }, 800);
  };

  const getMeaningContent = useMemo(() => {
    if (!currentCard) return "";
    const key = selectedSpread.dataKey as keyof typeof currentCard.meaning;
    return currentCard.meaning[key] || currentCard.meaning.overview;
  }, [currentCard, selectedSpread]);

  return (
    <div className="fixed inset-0 bg-[#090514] flex flex-col font-sans overflow-hidden text-white">
      <MysticalBackground />

      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6 animate-fade-in-down">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md"
        >
          <ArrowLeft size={18} className="text-indigo-100" />
        </button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-indigo-300/80 uppercase tracking-[0.3em] mb-2">
            <Compass size={12} className="animate-spin-slow" /> Phiên trải bài
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-purple-200 to-amber-100 drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)]">
            {selectedSpread.title}
          </h1>
        </div>
        <div className="w-10" />
      </div>

      {/* Main Stage */}
      <div className="flex-1 flex flex-col items-center justify-center relative perspective-[1500px] z-10 pb-20">
        {/* Intro State */}
        {!currentCard && !isShuffling && (
          <div className="text-center max-w-md px-6 animate-fade-in-up">
            <div
              className={`w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-gradient-to-br ${selectedSpread.color.replace(
                "text-",
                "from-"
              )}/20 to-transparent border border-${
                selectedSpread.color.split("-")[1]
              }-400/30 flex items-center justify-center shadow-[0_0_40px_-10px_currentColor] ${
                selectedSpread.color
              }`}
            >
              <selectedSpread.icon size={40} />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 text-indigo-100">
              Câu hỏi định hướng
            </h3>
            <p className="text-indigo-200/80 text-lg leading-relaxed italic mb-10 font-light">
              "{selectedSpread.question}"
            </p>
            <MysticalButton onClick={handleDraw} icon={Stars}>
              Kết nối năng lượng & Rút bài
            </MysticalButton>
          </div>
        )}

        {/* Shuffling State - Energy Vortex */}
        {isShuffling && (
          <div className="relative flex flex-col items-center justify-center">
            {/* Core energy sphere */}
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-xl animate-pulse-fast" />
              <div className="absolute inset-2 rounded-full border-2 border-indigo-400/50 border-t-transparent animate-spin" />
              <div className="absolute inset-6 rounded-full border-2 border-purple-400/50 border-b-transparent animate-spin-reverse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles
                  size={32}
                  className="text-amber-200 animate-ping-slow"
                />
              </div>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-200 animate-pulse">
              Đang tập trung năng lượng...
            </p>
          </div>
        )}

        {/* The Card - Mystical Artifact */}
        {currentCard && !isShuffling && (
          <div
            className={`
              relative w-[300px] h-[510px] md:w-[340px] md:h-[580px] cursor-pointer 
              transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-style-3d group
              ${
                isFlipped
                  ? "rotate-y-180"
                  : "hover:-translate-y-6 hover:scale-105"
              }
            `}
            onClick={handleFlip}
          >
            {/* === Mặt sau: Cổ vật ma thuật === */}
            <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden border-[3px] border-[#d4af37]/40 bg-[#1a1a2e] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.4)] transition-all">
              {/* Họa tiết nền */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-transparent to-[#d4af37]/20 opacity-60" />

              {/* Vòng tròn ký tự cổ phát sáng ở giữa */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-md animate-pulse-slow" />
                <Moon
                  size={60}
                  strokeWidth={1}
                  className="text-[#d4af37]/80 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                />
              </div>

              {/* Viền sáng chạy qua (Shimmer) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/20 to-transparent -translate-x-[200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />

              {!isFlipped && (
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]/70 animate-pulse">
                    Chạm để mở khóa vận mệnh
                  </span>
                </div>
              )}
            </div>

            {/* === Mặt trước: Sự bùng nổ ánh sáng === */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[24px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-black border-[3px] border-[#d4af37] relative">
              {/* Hiệu ứng ánh sáng bùng nổ khi lật */}
              <div
                className={`absolute inset-0 bg-amber-200 mix-blend-overlay pointer-events-none transition-opacity duration-1000 ${
                  isFlipped ? "opacity-0" : "opacity-100"
                }`}
              />

              <img
                src={currentCard.image}
                alt={currentCard.name}
                className="w-full h-full object-cover"
              />

              {/* Overlay thông tin */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#090514] via-[#090514]/80 to-transparent p-8 pt-24 text-center backdrop-blur-[2px]">
                <div className="inline-block mb-3 px-3 py-1 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4af37] flex items-center gap-2">
                    <Sparkles size={10} /> {currentCard.element}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ffeebb] to-[#d4af37] drop-shadow-md mb-1">
                  {currentCard.name}
                </h3>
                {currentCard.astrology && (
                  <p className="text-xs text-[#d4af37]/70 font-medium tracking-wider">
                    {currentCard.astrology}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nút mở luận giải nổi lên */}
      {showOpenButton && !showMeaning && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-20 animate-fade-in-up">
          <MysticalButton
            onClick={() => setShowMeaning(true)}
            icon={BookOpen}
            className="pl-6 pr-8"
          >
            Xem Luận Giải Chi Tiết
          </MysticalButton>
        </div>
      )}

      {/* Bottom Sheet - Cuộn giấy cổ */}
      <div
        className={`
          fixed inset-x-0 bottom-0 z-40 
          bg-[#120c24]/95 backdrop-blur-3xl border-t border-[#d4af37]/20 rounded-t-[40px] 
          transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar
          shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.8)]
          ${showMeaning ? "translate-y-0" : "translate-y-[110%]"}
        `}
      >
        {/* Decorative Top Element */}
        <div className="flex justify-center mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
          <div
            className="w-16 h-1.5 rounded-full bg-[#d4af37]/40 relative z-10 cursor-pointer"
            onClick={() => setShowMeaning(false)}
          />
        </div>

        <button
          onClick={() => setShowMeaning(false)}
          className="absolute top-8 right-8 text-indigo-300 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="max-w-3xl mx-auto space-y-8 pb-10">
          {/* Header Content */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-[#d4af37]/30 shadow-xl rotate-3 transform hover:rotate-0 transition-all">
              <img
                src={currentCard?.image}
                alt="mini"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <StarIcon className="text-[#d4af37]" size={14} />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  Lá bài định mệnh
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 drop-shadow-lg">
                {currentCard?.name}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {currentCard?.keywords.map((kw: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold uppercase tracking-wider text-indigo-200 border border-indigo-400/30 bg-indigo-950/50 px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Nội dung chính */}
          <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 shadow-inner-lg">
            {/* Decorative Corner */}
            <Sparkles
              className="absolute top-4 left-4 text-[#d4af37]/40"
              size={24}
            />

            <h3 className="flex items-center justify-center md:justify-start gap-3 text-lg font-serif font-bold text-[#d4af37] mb-6 pb-4 border-b border-[#d4af37]/20">
              {selectedSpread.icon && (
                <selectedSpread.icon className="text-[#d4af37]" size={24} />
              )}
              Thông điệp từ vũ trụ
            </h3>
            <div className="prose prose-invert prose-indigo max-w-none">
              <p className="text-indigo-100/90 text-lg leading-8 font-light whitespace-pre-line first-letter:text-3xl first-letter:font-serif first-letter:text-[#d4af37] first-letter:mr-1">
                {getMeaningContent}
              </p>
            </div>
          </div>

          {/* ... Phần nội dung luận giải ở trên ... */}

          {/* === KHU VỰC GHI CHÚ & LƯU === */}
          <div className="mt-8 pt-6 border-t border-[#d4af37]/20">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-3">
              <Feather size={12} /> Ghi chú cá nhân
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Bạn cảm thấy thế nào về thông điệp này? Hãy viết lại để chiêm nghiệm sau này..."
              className="w-full bg-[#090514]/50 border border-[#d4af37]/20 rounded-xl p-4 text-indigo-100 text-sm focus:outline-none focus:border-[#d4af37]/50 focus:bg-[#090514]/80 placeholder:text-indigo-400/30 resize-none h-24 transition-all mb-4"
            />

            <div className="flex gap-3">
              {/* Nút Hủy (Chỉ thoát không lưu) - Tùy chọn */}
              <button
                onClick={() => {
                  setShowMeaning(false);
                  setTimeout(() => setCurrentCard(null), 300);
                }}
                className="px-6 py-5 rounded-2xl border border-white/10 text-indigo-300 font-bold uppercase text-xs tracking-wider hover:bg-white/5 transition-colors"
              >
                Đóng
              </button>

              {/* Nút Lưu & Hoàn tất (Code bạn cần) */}
              <button
                onClick={() => {
                  // 1. Logic Lưu vào Store
                  if (currentCard && selectedSpread) {
                    addJournalEntry({
                      cardId: currentCard.id,
                      spreadId: selectedSpread.id,
                      note: note.trim() || "Không có ghi chú", // Lưu ghi chú
                    });
                  }

                  // 2. Đóng và Điều hướng
                  setShowMeaning(false);
                  setTimeout(() => {
                    setCurrentCard(null);
                    setNote(""); // Reset ghi chú
                    // Bạn có thể navigate(-1) để quay lại, hoặc navigate('/main/journal') để xem kết quả vừa lưu
                    navigate("/main/journal");
                  }, 500);
                }}
                className="flex-1 py-5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-2xl text-[#d4af37] font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37]/20 transition-all active:scale-95 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Save size={14} /> Lưu & Kết thúc
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations Global Styles */}
      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-1500 { perspective: 1500px; }
        
        /* Custom scrollbar cho bottom sheet */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.5); }

        /* Custom Animations */
        @keyframes float-slow {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }

        @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }

         @keyframes pulse-fast {
            0%, 100% { opacity: 0.5; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }

        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }

        @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 8s linear infinite; }

        @keyframes shimmer {
            100% { transform: translateX(200%); }
        }
        .animate-shimmer { animation: shimmer 1.5s infinite; }

        @keyframes ping-slow {
            75%, 100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        
        .bg-radial-at-c { background-image: radial-gradient(circle at center, var(--tw-gradient-stops)); }
        .text-shadow-sm { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
      `}</style>
    </div>
  );
};

// Helper icon component
const StarIcon = ({ className, size }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export default ReadingPage;
