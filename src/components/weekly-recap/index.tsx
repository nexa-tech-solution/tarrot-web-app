import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { X, Sparkles, Star, Feather, Loader2 } from "lucide-react";

import { useAppStore } from "@/zustand/index.zustand";
import { TAROT_DECK } from "@/data/index.data";
import { generateWeeklyRecapData, computeWeeklyStats } from "@/utils/recapHelper";
import type { WeeklyRecapData } from "@/types/index.type";

interface WeeklyRecapModalProps {
  onClose: () => void;
}

const WeeklyRecapModal: React.FC<WeeklyRecapModalProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const journal = useAppStore((state) => state.journal);
  const cachedRecapData = useAppStore((state) => state.cachedRecapData);
  const setCachedRecapData = useAppStore((state) => state.setCachedRecapData);

  const [recapData, setRecapData] = useState<WeeklyRecapData | null>(
    cachedRecapData
  );
  const [isLoading, setIsLoading] = useState(!cachedRecapData);

  // Compute weekly stats immediately (sync)
  const weeklyStats = useMemo(() => computeWeeklyStats(journal), [journal]);
  const hasReadings = weeklyStats.totalReadings > 0;

  // Generate AI insight on mount if needed
  useEffect(() => {
    const fetchRecap = async () => {
      if (cachedRecapData) {
        setRecapData(cachedRecapData);
        setIsLoading(false);
        return;
      }

      if (!hasReadings) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await generateWeeklyRecapData(journal, i18n.language);
        setRecapData(data);
        setCachedRecapData(data);
      } catch (error) {
        console.error("Failed to generate recap:", error);
        // Use basic stats without AI insight
        setRecapData({
          ...weeklyStats,
          aiInsight: null,
          generatedAt: Date.now(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecap();
  }, []);

  // Get card details from ID
  const getCardInfo = (cardId: string) => {
    return TAROT_DECK.find((c) => c.id === cardId) || TAROT_DECK[0];
  };

  // Handle empty state CTA
  const handleStartReading = () => {
    onClose();
    navigate("/main/home");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-[500px] max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#0a0a1a] border border-[#d4af37]/30 shadow-[0_0_60px_-10px_rgba(212,175,55,0.4)] animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full text-indigo-300 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Decorative Stars */}
        <div className="absolute top-6 left-6 text-[#d4af37]/30">
          <Star size={16} />
        </div>
        <div className="absolute top-16 right-16 text-[#d4af37]/20">
          <Sparkles size={14} />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh] custom-scrollbar">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] mb-2">
              <Sparkles size={12} /> {t("recap.subtitle")}
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200">
              {t("recap.title")}
            </h2>
          </div>

          {isLoading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2
                size={40}
                className="text-[#d4af37] animate-spin mb-4"
              />
              <p className="text-indigo-200/70 text-sm">{t("recap.loading")}</p>
            </div>
          ) : hasReadings && recapData ? (
            /* Has Readings State */
            <>
              {/* Top Cards Section */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-indigo-300/70 uppercase tracking-widest mb-4 text-center">
                  {t("recap.top_cards")}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {recapData.topCards.map((tc, idx) => {
                    const card = getCardInfo(tc.cardId);
                    return (
                      <div key={tc.cardId} className="text-center group">
                        {/* Card Image */}
                        <div className="relative mx-auto w-20 h-28 md:w-24 md:h-32 rounded-lg overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_0_20px_-5px_rgba(212,175,55,0.5)] group-hover:border-[#d4af37] group-hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.7)] transition-all duration-300 mb-2">
                          <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Rank Badge */}
                          <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center text-[10px] font-bold text-black shadow-lg">
                            {idx + 1}
                          </div>
                        </div>
                        {/* Card Name */}
                        <p className="text-xs font-medium text-indigo-100 truncate px-1">
                          {card.name}
                        </p>
                        {/* Draw Count */}
                        <p className="text-[10px] text-indigo-300/60">
                          {t("recap.times_drawn", { count: tc.count })}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Insight Section */}
              {recapData.aiInsight && (
                <div className="mb-6 p-4 bg-white/5 border border-[#d4af37]/20 rounded-2xl relative">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-3">
                    <Sparkles size={12} /> {t("recap.ai_insight_title")}
                  </div>
                  <p className="text-indigo-100/90 text-sm leading-relaxed">
                    {recapData.aiInsight}
                  </p>
                </div>
              )}

              {/* Stats Row */}
              <div className="text-center text-xs text-indigo-300/60 mb-6">
                {t("recap.total_readings", { count: recapData.totalReadings })}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
                <Feather size={32} className="text-indigo-300 opacity-80" />
              </div>
              <h3 className="text-lg font-serif font-bold text-indigo-100 mb-2">
                {t("recap.empty_title")}
              </h3>
              <p className="text-indigo-300/60 text-sm max-w-xs mb-6">
                {t("recap.empty_message")}
              </p>
              <button
                onClick={handleStartReading}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all"
              >
                {t("recap.empty_cta")}
              </button>
            </div>
          )}

          {/* Continue Button (for non-empty states) */}
          {!isLoading && hasReadings && (
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d4af37] to-amber-500 text-black font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              {t("recap.continue")}
            </button>
          )}
        </div>
      </div>

      {/* Inline Styles for animations */}
      <style>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WeeklyRecapModal;
