import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  X,
  Sparkles,
  Briefcase,
  Heart,
  Coins,
  Zap,
  Droplets,
  Wind,
  Mountain,
  BookOpen,
  Eye,
  Star,
} from "lucide-react";

// --- MOCK DATA IMPORTS (Giả lập để code chạy được, bạn thay bằng import thật) ---
import TARROT_CARDS, { type TarrotCard } from "@/data/tarrot.data";
import { getCardMeta } from "@/utils/tarotHelper";
import { useNavigate } from "react-router";

// --- CONSTANTS ---
const FILTERS = [
  { id: "all", label: "Tất cả" },
  { id: "major", label: "Major Arcana" },
  { id: "wands", label: "Wands" },
  { id: "cups", label: "Cups" },
  { id: "swords", label: "Swords" },
  { id: "pentacles", label: "Pentacles" },
];

const TABS = [
  { id: "overview", label: "Tổng quan", icon: Eye },
  { id: "love", label: "Tình yêu", icon: Heart },
  { id: "career", label: "Sự nghiệp", icon: Briefcase },
  { id: "finance", label: "Tài chính", icon: Coins },
];

// --- SUB-COMPONENTS ---

/** 1. Element Badge: Hiển thị nguyên tố với màu sắc tương ứng */
const ElementBadge = ({
  element,
  className = "",
}: {
  element: string;
  className?: string;
}) => {
  const config: Record<string, any> = {
    Lửa: {
      icon: Zap,
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
    },
    Nước: {
      icon: Droplets,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
    },
    Khí: {
      icon: Wind,
      color: "text-sky-300",
      bg: "bg-sky-500/20",
      border: "border-sky-500/30",
    },
    Đất: {
      icon: Mountain,
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/30",
    },
  };

  const theme = config[element] || config["Khí"];
  const Icon = theme.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${theme.bg} ${theme.color} ${theme.border} ${className}`}
    >
      <Icon size={10} />
      {element}
    </span>
  );
};

/** 2. Tarot Card Item: Hiển thị thẻ bài trong lưới */
const TarotCardItem = ({
  card,
  onClick,
}: {
  card: TarrotCard;
  onClick: () => void;
}) => {
  const meta = getCardMeta(card);

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 bg-[#18181b] shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Stronger Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold tracking-widest text-white/80 border border-white/10">
            {meta.numberDisplay}
          </span>
          {meta.isMajor && (
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
          )}
        </div>

        {/* Bottom Info */}
        <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md">
            {card.name}
          </h3>
          <div className="flex items-center gap-2">
            <ElementBadge element={card.element} />
            <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              Chi tiết <ArrowLeft size={10} className="rotate-180" />
            </span>
          </div>
        </div>
      </div>

      {/* Active Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
    </div>
  );
};

/** 3. Detail Modal: Hiển thị chi tiết lá bài */
const TarotDetailModal = ({
  card,
  onClose,
}: {
  card: TarrotCard;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Animation mounting
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-5xl h-[85vh] bg-[#121214] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-10"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 text-white/60 hover:bg-white hover:text-black hover:scale-110 transition-all border border-white/5 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* LEFT: Image Section (Mobile: Hidden height, Desktop: Full height) */}
        <div className="relative w-full md:w-[40%] h-48 md:h-full flex-shrink-0 bg-black overflow-hidden">
          {/* Blur Background */}
          <img
            src={card.image}
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125"
            alt=""
          />

          {/* Main Image Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
            <div className="relative h-full max-h-[400px] md:max-h-[80%] aspect-[2/3] rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden group perspective-1000">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="flex-1 flex flex-col bg-[#121214] relative overflow-hidden">
          {/* Header Info */}
          <div className="p-6 md:p-8 pb-2">
            <div className="flex items-center gap-3 mb-3">
              <ElementBadge element={card.element} />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                {card.astrology}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-white to-amber-100 mb-4">
              {card.name}
            </h2>

            <div className="flex flex-wrap gap-2">
              {card.keywords.map((k) => (
                <span
                  key={k}
                  className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/5 text-slate-300 border border-white/5"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 md:px-8 border-b border-white/5 flex gap-6 overflow-x-auto hide-scrollbar">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group flex items-center gap-2 pb-3 pt-2 text-sm font-medium transition-all relative whitespace-nowrap
                    ${
                      isActive
                        ? "text-amber-200"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-amber-400"
                        : "text-slate-600 group-hover:text-slate-400"
                    }
                  />
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
            <div className="prose prose-invert prose-p:text-slate-300 prose-p:leading-relaxed max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300 key={activeTab}">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <p className="text-lg font-light">{card.meaning.overview}</p>
                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-xl border border-amber-500/10 flex gap-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg h-fit text-amber-300">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-amber-200 mb-1">
                        Lời khuyên
                      </h4>
                      <p className="text-sm text-slate-400 italic">
                        "Lắng nghe trực giác và đừng ngại bước ra khỏi vùng an
                        toàn."
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "love" && (
                <p className="text-lg">{card.meaning.love}</p>
              )}
              {activeTab === "career" && (
                <p className="text-lg">{card.meaning.career}</p>
              )}
              {activeTab === "finance" && (
                <p className="text-lg">{card.meaning.finance}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

const DictionaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCard, setSelectedCard] = useState<TarrotCard | null>(null);

  // Filter Logic
  const filteredCards = useMemo(() => {
    return TARROT_CARDS.filter((card) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        card.name.toLowerCase().includes(q) ||
        card.keywords.some((k) => k.toLowerCase().includes(q));

      if (activeFilter === "all") return matchesSearch;
      if (activeFilter === "major")
        return (
          matchesSearch &&
          !["wands", "cups", "swords", "pentacles"].some((s) =>
            card.id.includes(s)
          )
        );
      return matchesSearch && card.id.includes(activeFilter);
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="relative flex flex-col h-screen bg-[#050505] text-slate-200 overflow-hidden font-sans selection:bg-amber-500/30">
      {/* 1. Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5" />
      </div>

      {/* 2. Header */}
      <div className="flex-none z-30 px-4 md:px-8 py-5 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full space-y-5">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              onClick={() => navigate(-1)}
            >
              <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                <ArrowLeft size={20} />
              </div>
              <span className="font-medium hidden md:inline">Quay lại</span>
            </button>
            <h1 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
              Từ điển Tarot
            </h1>
            <div className="w-10 md:w-20" /> {/* Spacer */}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative group w-full md:max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-duration-500" />
              <div className="relative flex items-center bg-[#121214] border border-white/10 rounded-xl group-focus-within:border-indigo-500/50 transition-colors">
                <Search className="absolute left-3 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="Tìm lá bài (VD: The Fool, 2 ly...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none rounded-xl"
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 custom-scrollbar hide-scrollbar">
              <div className="flex gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
                      activeFilter === f.id
                        ? "bg-slate-100 text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Grid Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 pb-20">
              {filteredCards.map((card) => (
                <TarotCardItem
                  key={card.id}
                  card={card}
                  onClick={() => setSelectedCard(card)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                <Search className="text-slate-600" size={32} />
              </div>
              <p className="text-slate-500">Không tìm thấy lá bài phù hợp.</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Detail Modal */}
      {selectedCard && (
        <TarotDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default DictionaryPage;
