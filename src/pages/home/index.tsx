import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, BookOpen, Search, Sparkles } from "lucide-react";

// Store & Theme & Data
import { useAppStore } from "@/zustand/index.zustand";
import { getThemeStyles } from "@/themes/index.theme";
import { SPREAD_TYPES } from "@/data/index.data";

// Components
import DailyInsights from "@/components/daily-insights";
import MoonWidget from "@/components/moon-widget";
import FloatingChatBot from "@/components/floating-chat-bot";
import { useTranslation } from "react-i18next";
import MysticalBackground from "@/components/mystical-background";

// --- Sub-Components (Keep in same file or move to separate files) ---

const UserHeader = ({
  name,
  onProfileClick,
  isDark,
  s,
}: {
  name: string;
  onProfileClick: () => void;
  isDark: boolean;
  s: any;
}) => {
  const { t } = useTranslation();
  return (
    <div className="pt-12 md:pt-10 pb-4 md:px-10 flex justify-between items-end max-w-[1600px] mx-auto w-full">
      <div>
        <div
          className={`flex items-center gap-2 ${
            isDark ? "text-amber-200/80" : "text-indigo-600/80"
          } text-[10px] uppercase tracking-[0.2em] font-bold mb-2 animate-fade-in`}
        >
          <Sparkles size={12} /> <span>{t("home.streak")}</span>
        </div>
        <h1 className={`text-3xl md:text-4xl font-serif font-bold ${s.text}`}>
          {t("home.hello")},{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            {name}
          </span>
        </h1>
      </div>
      <button
        onClick={onProfileClick}
        className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-white border-stone-200 shadow-sm"
        } border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform`}
      >
        <img
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
          alt="User"
          className="w-full h-full opacity-90"
        />
      </button>
    </div>
  );
};
const TarotDictionaryCard = ({
  onClick,
  isDark,
  s,
}: {
  onClick: () => void;
  isDark: boolean;
  s: any;
}) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      className={`w-full p-1 rounded-[2rem] border ${s.cardBorder} ${s.cardBg} backdrop-blur-md cursor-pointer group transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="relative overflow-hidden rounded-[1.8rem] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        {/* Icon Box */}
        <div
          className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner ${
            isDark
              ? "bg-indigo-500/20 text-indigo-300"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          <BookOpen size={28} />
        </div>

        {/* Content */}
        <div className="flex-1 z-10">
          <h3
            className={`${s.text} text-lg md:text-xl font-serif font-bold mb-1`}
          >
            {t("home.dictionary_title")}
          </h3>
          <p className={`${s.textSub} text-xs md:text-sm mb-4 md:mb-0`}>
            {t("home.dictionary_desc")}
          </p>
        </div>

        {/* Visual Search Bar */}
        <div
          className={`w-full md:w-auto min-w-[200px] py-3 px-4 rounded-xl flex items-center gap-3 border transition-colors ${
            isDark
              ? "bg-black/20 border-white/5 group-hover:bg-black/30"
              : "bg-white/50 border-stone-200 group-hover:bg-white"
          }`}
        >
          <Search
            size={16}
            className={isDark ? "text-white/40" : "text-stone-400"}
          />
          <span
            className={`text-xs ${isDark ? "text-white/40" : "text-stone-400"}`}
          >
            {t("home.search_placeholder")}
          </span>
        </div>
      </div>
    </div>
  );
};

const SpreadCard = ({
  spread,
  index,
  onClick,
  isDark,
  s,
}: {
  spread: any;
  index: number;
  onClick: () => void;
  isDark: boolean;
  s: any;
}) => {
  const { t } = useTranslation();
  // First item spans 2 columns on mobile/tablet for emphasis
  const gridSpanClass = index === 0 ? "col-span-2 lg:col-span-1" : "col-span-1";

  return (
    <button
      onClick={onClick}
      className={`
        group relative h-40 md:h-56 rounded-3xl overflow-hidden border ${s.cardBorder} ${s.cardBg} 
        backdrop-blur-md flex flex-col p-5 text-left transition-all duration-500 
        hover:-translate-y-1 hover:shadow-2xl ${gridSpanClass}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${spread.color.replace(
          "text-",
          "from-"
        )}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      <div className="flex-1 relative z-10">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${spread.bg} border ${spread.border} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform duration-500`}
        >
          {/* Render Icon Component */}
          <spread.icon className={spread.color} size={20} />
        </div>
        <h4
          className={`${s.text} font-serif font-bold text-sm md:text-lg mb-1`}
        >
          {spread.title}
        </h4>
        <p
          className={`${s.textSub} text-[10px] md:text-xs line-clamp-2 leading-relaxed opacity-80`}
        >
          {spread.subtitle}
        </p>
      </div>

      <div
        className={`relative z-10 mt-auto pt-4 border-t ${
          isDark ? "border-white/5" : "border-stone-100"
        } flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      >
        <span
          className={`text-[9px] font-bold uppercase tracking-widest ${s.textSub}`}
        >
          {t("home.start")}
        </span>
        <ArrowRight size={12} className={s.text} />
      </div>
    </button>
  );
};

// --- Main Page Component ---

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Optimized Selectors
  const theme = useAppStore((state) => state.theme);
  const userProfile = useAppStore((state) => state.userProfile);
  const setSelectedSpread = useAppStore((state) => state.setSelectedSpread);
  const setActiveTab = useAppStore((state) => state.setActiveTab);

  const isDark = theme === "dark";
  const s = useMemo(() => getThemeStyles(theme), [theme]);

  const handleSpreadSelect = (spread: any) => {
    setSelectedSpread(spread);
    navigate("/reading");
  };

  return (
    <div className="flex flex-col px-6 h-full animate-fade-in pb-[80px] md:pb-0 font-sans">
      <UserHeader
        name={userProfile.name}
        isDark={isDark}
        s={s}
        onProfileClick={() => setActiveTab("profile")}
      />

      <div className="flex-1 md:px-10 custom-scrollbar pt-2 max-w-[1600px] mx-auto w-full">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MoonWidget />
              <DailyInsights />
            </div>

            {/* 3. Dictionary Banner */}
            <TarotDictionaryCard
              onClick={() => navigate("/dictionary")}
              isDark={isDark}
              s={s}
            />

            {/* 4. Spreads Grid */}
            <div className="mt-4 md:mt-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3
                  className={`text-xs md:text-sm font-bold ${s.sectionTitle} uppercase tracking-widest`}
                >
                  {t("home.popular_spreads")}
                </h3>
                {/* <button
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  } hover:underline`}
                >
                  Xem tất cả
                </button> */}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-6">
                {SPREAD_TYPES.map((spread, idx) => (
                  <SpreadCard
                    key={spread.id}
                    spread={spread}
                    index={idx}
                    onClick={() => handleSpreadSelect(spread)}
                    isDark={isDark}
                    s={s}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-8"></div>
        <FloatingChatBot onClick={() => navigate("/chat-bot")} />
      </div>
    </div>
  );
};

export default HomePage;
