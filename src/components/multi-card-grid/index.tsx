import React from "react";
import type { TarrotCard } from "@/data/tarrot.data";
import type {
  SpreadPosition,
  SpreadLayout,
  ThemeMode,
} from "@/types/index.type";
import { useTranslation } from "react-i18next";
import { Moon } from "lucide-react";

interface MultiCardGridProps {
  cards: (TarrotCard | null)[];
  positions: SpreadPosition[];
  layout: SpreadLayout;
  revealedIndices: number[];
  onCardClick: (index: number) => void;
  selectedIndex: number | null;
  theme: ThemeMode;
}

const MultiCardGrid: React.FC<MultiCardGridProps> = ({
  cards,
  positions,
  layout,
  revealedIndices,
  onCardClick,
  selectedIndex,
  theme,
}) => {
  const { t } = useTranslation();
  const isDark = theme === "dark";

  // Grid class based on layout
  const getGridClass = () => {
    switch (layout) {
      case "grid":
        return "grid-cols-2 gap-4"; // Yes/No: 2 columns
      case "relationship":
        return "grid-cols-3 gap-3"; // Relationship: 3 columns
      case "celtic":
        return "grid-cols-2 gap-3"; // Celtic: 2 columns, 5 rows
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className="w-full mx-auto px-4">
      {/* Partner labels for relationship spread */}
      {layout === "relationship" && (
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="col-span-3 text-center">
            <span
              className={`text-xs font-bold uppercase tracking-widest ${
                isDark ? "text-pink-300" : "text-pink-600"
              }`}
            >
              {t("reading.you_label")}
            </span>
          </div>
        </div>
      )}

      <div className={`grid ${getGridClass()}`}>
        {positions.map((position, index) => {
          const card = cards[index];
          const isRevealed = revealedIndices.includes(index);
          const isSelected = selectedIndex === index;

          // Add partner separator for relationship spread
          const showPartnerSeparator = layout === "relationship" && index === 3;

          return (
            <React.Fragment key={position.id}>
              {showPartnerSeparator && (
                <div className="col-span-3 text-center py-2 my-2 border-t border-dashed border-white/20">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isDark ? "text-indigo-300" : "text-indigo-600"
                    }`}
                  >
                    {t("reading.them_label")}
                  </span>
                </div>
              )}

              <button
                onClick={() => onCardClick(index)}
                className={`
                  relative aspect-[2/3] rounded-xl overflow-hidden transition-all duration-500
                  ${
                    isSelected
                      ? "ring-2 ring-amber-400 scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                      : ""
                  }
                  ${isRevealed ? "shadow-lg" : "hover:scale-105 cursor-pointer"}
                `}
              >
                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden border-[3px] border-[#d4af37]/40 bg-[#1a1a2e] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] group-hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.4)] transition-all">
                  <div className="absolute inset-0 bg-[url('/textures/stardust.png')] opacity-30 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-transparent to-[#d4af37]/20 opacity-60" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-md animate-pulse-slow" />
                    <Moon
                      size={24}
                      strokeWidth={1}
                      className="text-[#d4af37]/80 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/20 to-transparent -translate-x-[200%] transition-transform duration-1000 group-hover:translate-x-[200%]" />
                  {!isRevealed && (
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <span className="text-[7px] font-bold uppercase text-[#d4af37]/70 animate-pulse">
                        {t("reading.tap_reveal")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Face */}
                <div
                  className={`
                    absolute inset-0 transition-all duration-500 backface-hidden
                    ${isRevealed ? "opacity-100" : "opacity-0 rotate-y-180"}
                  `}
                >
                    {card && (
                      <>
                        <img
                          src={card.image}
                          alt={card.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      {/* Position label overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-[8px] font-bold uppercase tracking-wider text-amber-400 text-center truncate">
                          {position.name}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Remaining cards hint */}
      {revealedIndices.length < positions.length && (
        <p className="text-center mt-4 text-xs text-indigo-300/60 animate-pulse">
          {t("reading.tap_to_reveal")} •{" "}
          {t("reading.cards_remaining", {
            count: positions.length - revealedIndices.length,
          })}
        </p>
      )}
    </div>
  );
};

export default MultiCardGrid;
