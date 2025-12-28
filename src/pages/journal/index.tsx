import { MOCK_JOURNAL, SPREAD_TYPES, TAROT_DECK } from "@/data/index.data";
import { getThemeStyles } from "@/themes/index.theme";
import type { JournalEntry } from "@/types/index.type";
import { useAppStore } from "@/zustand/index.zustand";

const JournalPage: React.FC = () => {
  const { theme } = useAppStore(); // Use stable state reference
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);

  const getJournalItemInfo = (item: JournalEntry) => {
    const card = TAROT_DECK.find((c) => c.id === item.cardId) || TAROT_DECK[0];
    const spread =
      SPREAD_TYPES.find((s) => s.id === item.spreadId) || SPREAD_TYPES[0];
    return { card, spread };
  };

  return (
    <div className="flex flex-col h-full animate-fade-in pb-[80px] md:pb-0 max-w-5xl mx-auto w-full px-6 md:px-10">
      <div className="pt-12 md:pt-10 pb-6 border-b border-dashed border-white/10">
        <h2
          className={`text-3xl md:text-4xl font-serif font-bold ${s.text} mb-2`}
        >
          Nhật Ký Hành Trình
        </h2>
        <p className={`${s.textSub} text-sm`}>
          Lưu giữ những thông điệp từ vũ trụ
        </p>
      </div>
      <div className="flex-1 py-8 custom-scrollbar">
        <div
          className={`space-y-12 relative before:absolute before:left-[19px] before:top-0 before:bottom-0 before:w-[1px] ${
            isDark
              ? "before:bg-gradient-to-b before:from-indigo-500/0 before:via-indigo-500/50 before:to-indigo-500/0"
              : "before:bg-stone-200"
          } md:before:left-1/2`}
        >
          {MOCK_JOURNAL.map((item, idx) => {
            const { card, spread } = getJournalItemInfo(item);
            return (
              <div
                key={item.id}
                className={`relative pl-12 md:pl-0 md:flex md:justify-between group cursor-pointer ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-0 top-6 w-10 h-10 md:left-1/2 md:-ml-5 flex items-center justify-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      isDark
                        ? "bg-slate-900 border-indigo-400"
                        : "bg-white border-indigo-400"
                    } border-2 z-10 shadow-[0_0_15px_rgba(99,102,241,0.6)] group-hover:scale-125 transition-transform duration-300`}
                  ></div>
                </div>
                <div
                  className={`md:w-[45%] ${s.cardBg} border ${s.cardBorder} rounded-3xl p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-2xl hover:-translate-y-1`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${spread.color} flex items-center justify-center text-white text-xs shadow-md`}
                      >
                        {spread.icon}
                      </div>
                      <div>
                        <span
                          className={`block text-[10px] font-bold ${
                            isDark ? "text-indigo-300" : "text-indigo-600"
                          } uppercase tracking-wider`}
                        >
                          {spread.title}
                        </span>
                        <div
                          className={`text-xs ${s.textSub} font-medium mt-0.5`}
                        >
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div
                      className={`w-16 h-24 rounded-lg overflow-hidden border ${s.cardBorder} flex-shrink-0 shadow-md`}
                    >
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`${s.text} font-serif font-bold text-base mb-2`}
                      >
                        {card.name}
                      </h3>
                      <p
                        className={`${s.textSub} text-xs italic leading-relaxed line-clamp-3`}
                      >
                        "{item.note}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
