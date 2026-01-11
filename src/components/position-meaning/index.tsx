import React from "react";
import type { TarrotCard } from "@/data/tarrot.data";
import type { SpreadPosition, ThemeMode } from "@/types/index.type";
import { useTranslation } from "react-i18next";
import { X, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface PositionMeaningProps {
  card: TarrotCard;
  position: SpreadPosition;
  currentIndex: number;
  totalCards: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  theme: ThemeMode;
}

const PositionMeaning: React.FC<PositionMeaningProps> = ({
  card,
  position,
  currentIndex,
  totalCards,
  onClose,
  onPrev,
  onNext,
  theme,
}) => {
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        fixed inset-x-0 bottom-0 z-50
        ${isDark ? "bg-[#120c24]/95" : "bg-white/95"}
        backdrop-blur-3xl border-t ${isDark ? "border-amber-400/20" : "border-stone-200"}
        rounded-t-[40px] p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar
        shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.8)]
        animate-slide-up
      `}
    >
      {/* Decorative Top Element */}
      <div className="flex justify-center mb-6 relative">
        <div
          className={`absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent ${
            isDark ? "via-amber-400/30" : "via-indigo-400/30"
          } to-transparent`}
        />
        <div
          className={`w-16 h-1.5 rounded-full ${
            isDark ? "bg-amber-400/40" : "bg-indigo-400/40"
          } relative z-10 cursor-pointer`}
          onClick={onClose}
        />
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-6 right-6 ${
          isDark ? "text-indigo-300 hover:text-white" : "text-stone-500 hover:text-stone-800"
        } transition-colors bg-white/5 p-2 rounded-full`}
      >
        <X size={24} />
      </button>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`p-2 rounded-full ${
            currentIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-stone-100 hover:bg-stone-200"
          } transition-colors`}
        >
          <ChevronLeft size={20} className={isDark ? "text-white" : "text-stone-700"} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <button
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
          className={`p-2 rounded-full ${
            currentIndex === totalCards - 1
              ? "opacity-30 cursor-not-allowed"
              : isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-stone-100 hover:bg-stone-200"
          } transition-colors`}
        >
          <ChevronRight size={20} className={isDark ? "text-white" : "text-stone-700"} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header with card and position */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Card Image */}
          <div className="w-28 h-40 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/30 shadow-xl">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Info */}
          <div className="text-center md:text-left flex-1">
            {/* Position Badge */}
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  isDark ? "text-amber-400" : "text-indigo-600"
                }`}
              >
                {t("reading.position_label")}: {position.name}
              </span>
            </div>

            {/* Card Name */}
            <h2
              className={`text-2xl md:text-3xl font-serif font-bold ${
                isDark ? "text-white" : "text-stone-800"
              } mb-2`}
            >
              {card.name}
            </h2>

            {/* Position Description */}
            <p
              className={`text-sm ${
                isDark ? "text-indigo-300/80" : "text-stone-600"
              } italic mb-4`}
            >
              "{position.description}"
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {card.keywords.slice(0, 4).map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark
                      ? "text-indigo-200 border-indigo-400/30 bg-indigo-950/50"
                      : "text-indigo-700 border-indigo-300 bg-indigo-50"
                  } border px-3 py-1.5 rounded-lg`}
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Meaning */}
        <div
          className={`relative p-6 rounded-2xl ${
            isDark ? "bg-white/5 border-white/10" : "bg-stone-50 border-stone-200"
          } border`}
        >
          <Sparkles
            className={`absolute top-4 left-4 ${
              isDark ? "text-amber-400/40" : "text-indigo-400/40"
            }`}
            size={20}
          />

          <h3
            className={`flex items-center justify-center md:justify-start gap-3 text-sm font-serif font-bold ${
              isDark ? "text-amber-400" : "text-indigo-600"
            } mb-4 pb-3 border-b ${isDark ? "border-amber-400/20" : "border-indigo-200"}`}
          >
            {t("reading.label_universe_msg")}
          </h3>

          <p
            className={`${
              isDark ? "text-indigo-100/90" : "text-stone-700"
            } text-sm leading-7 whitespace-pre-line`}
          >
            {card.meaning.overview}
          </p>
        </div>

        {/* Card counter */}
        <div className="text-center">
          <span
            className={`text-xs ${
              isDark ? "text-indigo-400/60" : "text-stone-500"
            }`}
          >
            {currentIndex + 1} / {totalCards}
          </span>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PositionMeaning;
