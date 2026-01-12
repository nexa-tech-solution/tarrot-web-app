import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  ChevronRight,
  Feather,
  History,
  LayoutGrid,
  Search,
  Sparkles,
  Trash2,
  X, // Import thêm icon X để đóng modal
  BookOpen, // Thêm icon cho tiêu đề modal
} from "lucide-react";

// Data & Store
import { SPREAD_TYPES, TAROT_DECK } from "@/data/index.data";
import { useAppStore } from "@/zustand/index.zustand";
import type { JournalEntry } from "@/types/index.type";
import { useTranslation } from "react-i18next";
import MysticalBackground from "@/components/mystical-background";

// --- SUB-COMPONENT: EMPTY STATE ---
const EmptyJournal = ({ onNavigate }: { onNavigate: () => void }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in relative z-10">
      <div className="w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
        <Feather size={40} className="text-indigo-300 opacity-80" />
      </div>
      <h3 className="text-xl font-serif font-bold text-indigo-100 mb-2">
        {t("journal.empty_title")}
      </h3>
      <p className="text-indigo-300/60 max-w-xs mb-8 text-sm">
        {t("journal.empty_desc")}
      </p>
      <button
        onClick={onNavigate}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all"
      >
        {t("journal.btn_reading")}
      </button>
    </div>
  );
};
// --- NEW SUB-COMPONENT: JOURNAL DETAIL MODAL ---
interface ModalProps {
  entryId: string;
  onClose: () => void;
  getDataHelper: (item: JournalEntry) => {
    card: any;
    cards: any[];
    spread: any;
    isMultiCard: boolean;
  };
  journalData: JournalEntry[];
}

const JournalDetailModal = ({
  entryId,
  onClose,
  getDataHelper,
  journalData,
}: ModalProps) => {
  const { t } = useTranslation();
  const entry = journalData.find((item) => item.id === entryId);
  if (!entry) return null;

  const { card, cards, spread, isMultiCard } = getDataHelper(entry);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop - Click ra ngoài để đóng */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 bg-[#13131a] border border-[#d4af37]/30 rounded-3xl overflow-hidden w-full max-w-3xl shadow-[0_0_50px_-10px_rgba(212,175,55,0.3)] flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-indigo-300 hover:text-white transition-colors z-20"
        >
          <X size={20} />
        </button>

        {/* Left Side: Card Image(s) */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-transparent md:bg-gradient-to-r z-10"></div>
          {isMultiCard ? (
            // Multi-card grid display
            <div className="w-full h-full p-4 grid grid-cols-3 gap-2 bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
              {cards.slice(0, 6).map((c: any, idx: number) => (
                <div
                  key={idx}
                  className="aspect-[2/3] rounded-lg overflow-hidden border border-amber-400/20"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {cards.length > 6 && (
                <div className="aspect-[2/3] rounded-lg bg-white/10 flex items-center justify-center text-amber-400 text-sm font-bold">
                  +{cards.length - 6}
                </div>
              )}
            </div>
          ) : (
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover object-center opacity-90"
            />
          )}
          {/* Spread Badge Overlay on Mobile */}
          <div className="absolute bottom-4 left-4 md:hidden z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            {spread.icon && <spread.icon size={10} className={spread.color} />}
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${spread.color}`}
            >
              {spread.title}
            </span>
          </div>
        </div>

        {/* Right Side: Details & Note */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar flex flex-col">
          {/* Header Info */}
          <div className="mb-6">
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
              {spread.icon && (
                <spread.icon size={10} className={spread.color} />
              )}
              <span
                className={`text-[9px] font-bold uppercase tracking-wider ${spread.color}`}
              >
                {spread.title}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 mb-2">
              {isMultiCard
                ? `${cards.length} ${t("reading.card_count", {
                    count: cards.length,
                  }).replace(/\d+\s*/, "")}`
                : card.name}
            </h2>
            {isMultiCard && (
              <p className="text-xs text-indigo-300/70 mb-2">
                {cards.map((c: any) => c.name).join(" • ")}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300/70">
              <Calendar size={12} /> {entry.date}
            </div>
          </div>

          {/* Full Note Section */}
          <div className="flex-1 relative bg-white/5 border border-[#d4af37]/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4 pb-3 border-b border-white/5">
              <BookOpen size={12} /> {t("journal.modal_reflection")}
            </div>
            <Sparkles
              className="absolute top-4 right-4 text-[#d4af37]/20"
              size={16}
            />
            <p className="text-indigo-100/90 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
              {entry.note || t("journal.modal_no_note")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const JournalPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { journal, removeJournalEntry } = useAppStore();

  // 1. STATE MỚI: Theo dõi bài viết đang được chọn để hiển thị modal
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

  // Helper lấy thông tin chi tiết
  const getJournalItemInfo = (item: JournalEntry) => {
    // Support multi-card entries (cardIds) and legacy single-card (cardId)
    const cardIds = item.cardIds || (item.cardId ? [item.cardId] : []);
    const cards = cardIds
      .map((id) => TAROT_DECK.find((c) => c.id === String(id)))
      .filter(Boolean);
    const card = cards[0] || TAROT_DECK[0]; // First card for display
    const spread =
      SPREAD_TYPES.find((s) => s.id === item.spreadId) || SPREAD_TYPES[0];
    return { card, cards, spread, isMultiCard: cardIds.length > 1 };
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-[#090514] text-white overflow-x-hidden pb-[100px] md:pb-0">
      <MysticalBackground />

      {/* 2. TÍCH HỢP MODAL: Hiển thị nếu có ID được chọn */}
      {selectedEntryId && (
        <JournalDetailModal
          entryId={selectedEntryId}
          onClose={() => setSelectedEntryId(null)}
          getDataHelper={getJournalItemInfo}
          journalData={journal}
        />
      )}

      {/* Header Area */}
      <div className="relative z-10 px-6 pt-12 md:pt-16 pb-8 max-w-5xl mx-auto w-full">
        {/* ... (Giữ nguyên phần Header cũ) ... */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-amber-400/80 uppercase tracking-[0.2em] mb-2 animate-fade-in-down">
            <History size={12} /> <span>{t("journal.label_journey")}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 via-white to-indigo-200 mb-3 drop-shadow-sm">
              {t("journal.title")}
            </h2>
            <p className="text-indigo-200/60 text-sm md:text-base font-light max-w-md">
              {t("journal.subtitle")} ({journal.length}{" "}
              {t("journal.count_entries")})
            </p>
          </div>
          {/* Search / Filter Visual Only */}
          <div className="flex items-center gap-3 hidden md:flex">
            <div className="relative group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-300"
                size={16}
              />
              <input
                type="text"
                placeholder={t("journal.search")}
                className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-indigo-100 placeholder:text-indigo-400/30 focus:outline-none focus:bg-white/10 focus:border-indigo-400/50 transition-all w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 md:px-10">
        {journal.length === 0 ? (
          <EmptyJournal onNavigate={() => navigate("/main/home")} />
        ) : (
          <div className="relative py-8">
            {/* Timeline Line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>

            <div className="space-y-16">
              {journal.map((item, idx) => {
                const { card, cards, spread, isMultiCard } =
                  getJournalItemInfo(item);
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col md:flex-row items-center md:items-stretch ${
                      isEven ? "md:flex-row-reverse" : ""
                    } group`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-0 md:left-1/2 top-0 md:-ml-3 w-10 h-10 md:w-6 md:h-6 flex items-center justify-center z-20">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#090514] border-2 border-amber-400 shadow-[0_0_15px_#fbbf24] group-hover:scale-150 transition-transform duration-500"></div>
                    </div>

                    {/* Spacer for Desktop Layout */}
                    <div className="hidden md:block w-1/2"></div>

                    {/* Card Content */}
                    <div
                      className={`w-full md:w-[calc(50%-40px)] pl-12 md:pl-0 ${
                        isEven
                          ? "md:pr-10 md:text-right"
                          : "md:pl-10 md:text-left"
                      }`}
                    >
                      {/* Date Label */}
                      <div
                        className={`flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-widest text-indigo-300/70 ${
                          isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <Calendar size={12} /> {item.date}
                      </div>

                      {/* Main Card */}
                      <div className="relative group/card">
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn không cho mở modal khi bấm nút xóa
                            if (window.confirm(t("journal.delete_confirm"))) {
                              removeJournalEntry(item.id);
                            }
                          }}
                          className={`absolute -top-2 ${
                            isEven ? "-left-2" : "-right-2"
                          } z-30 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-red-500 hover:text-white pointer-events-auto`}
                          title={t("journal.delete_tooltip")}
                        >
                          <Trash2 size={14} />
                        </button>

                        <div
                          // 3. CẬP NHẬT SỰ KIỆN ONCLICK: Mở modal thay vì navigate
                          onClick={() => setSelectedEntryId(item.id)}
                          className={`
                                            relative overflow-hidden rounded-2xl border border-white/10 
                                            bg-[#13131a]/60 backdrop-blur-md p-5 transition-all duration-500
                                            hover:border-[#d4af37]/40 hover:bg-[#1c1c29]/90 hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.2)]
                                            group-hover:translate-y-[-4px] cursor-pointer pointer-events-auto
                                        `}
                        >
                          {/* Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-[#d4af37]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                          <div
                            className={`flex gap-5 items-start ${
                              isEven ? "md:flex-row-reverse" : "flex-row"
                            }`}
                          >
                            {/* Mini Tarot Image(s) */}
                            {isMultiCard ? (
                              <div className="relative w-20 h-28 shrink-0">
                                {cards
                                  .slice(0, 3)
                                  .map((c: any, cIdx: number) => (
                                    <div
                                      key={cIdx}
                                      className="absolute rounded-lg overflow-hidden border border-white/10 shadow-lg"
                                      style={{
                                        width: "60px",
                                        height: "84px",
                                        top: `${cIdx * 4}px`,
                                        left: `${cIdx * 8}px`,
                                        zIndex: 3 - cIdx,
                                      }}
                                    >
                                      <img
                                        src={c.image}
                                        alt={c.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                {cards.length > 3 && (
                                  <div
                                    className="absolute bg-black/60 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-amber-400"
                                    style={{ bottom: 0, right: 0, zIndex: 10 }}
                                  >
                                    +{cards.length - 3}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-lg group-hover/card:shadow-[#d4af37]/20 transition-all">
                                <img
                                  src={card.image}
                                  alt={card.name}
                                  className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700"
                                />
                              </div>
                            )}

                            {/* Text Info */}
                            <div className="flex-1 min-w-0">
                              {/* Spread Type Badge */}
                              <div
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 mb-2 ${
                                  isEven ? "md:ml-auto" : ""
                                }`}
                              >
                                {spread.icon && (
                                  <spread.icon
                                    size={10}
                                    className={spread.color}
                                  />
                                )}
                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider ${spread.color}`}
                                >
                                  {spread.title}
                                </span>
                              </div>

                              <h3 className="text-lg md:text-xl font-serif font-bold text-indigo-50 mb-2 truncate group-hover/card:text-amber-200 transition-colors">
                                {isMultiCard
                                  ? t("reading.card_count", {
                                      count: cards.length,
                                    })
                                  : card.name}
                              </h3>

                              {/* Note Truncated */}
                              <div className="relative">
                                <Sparkles
                                  className="absolute -top-1 -left-2 text-[#d4af37]/20"
                                  size={12}
                                />
                                <p className="text-sm text-indigo-200/70 font-light italic line-clamp-2 leading-relaxed pl-2 border-l-2 border-[#d4af37]/20">
                                  "{item.note || t("journal.no_note_short")}"
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div
                            className={`mt-4 pt-3 border-t border-white/5 flex items-center text-[10px] font-bold uppercase tracking-widest text-indigo-400/50 group-hover/card:text-[#d4af37] transition-colors ${
                              isEven ? "md:justify-end" : ""
                            }`}
                          >
                            {t("journal.view_details")}{" "}
                            <ChevronRight size={12} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom padding for mobile nav */}
        <div className="h-10"></div>
      </div>

      <style>{`
        .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.7; }
        }
        /* Custom scrollbar cho modal */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.5); }
      `}</style>
    </div>
  );
};

export default JournalPage;
