import DailyInsights from "@/components/daily-insights";
import MoonWidget from "@/components/moon-widget";
import { SPREAD_TYPES } from "@/data/index.data";
import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // Use whole state to avoid new object reference loop
  const { theme, userProfile, setSelectedSpread, setActiveTab } = useAppStore();

  const isDark = theme === "dark";
  const s = getThemeStyles(theme);

  return (
    <div className="flex flex-col h-full animate-fade-in pb-[80px] md:pb-0">
      <div className="pt-12 md:pt-10 pb-4 px-6 md:px-10 flex justify-between items-end max-w-[1600px] mx-auto w-full">
        <div>
          <div
            className={`flex items-center gap-2 ${
              isDark ? "text-amber-200/80" : "text-indigo-600/80"
            } text-[10px] uppercase tracking-[0.2em] font-bold mb-2`}
          >
            <Sparkles size={12} /> <span>Chuỗi 3 ngày liên tục</span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-serif font-bold ${s.text}`}>
            Xin chào,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {userProfile.name}
            </span>
          </h1>
        </div>
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white border-stone-200 shadow-sm"
          } border flex items-center justify-center overflow-hidden hover:scale-105 transition-transform`}
        >
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`}
            alt="User"
            className="w-full h-full opacity-90"
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-10 custom-scrollbar pt-2 max-w-[1600px] mx-auto w-full">
        <div className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8 lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <MoonWidget />
              <DailyInsights />
            </div>
            <div className="mt-4 md:mt-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3
                  className={`text-xs md:text-sm font-bold ${s.sectionTitle} uppercase tracking-widest`}
                >
                  Trải bài phổ biến
                </h3>
                <button
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  } hover:underline`}
                >
                  Xem tất cả
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-6">
                {SPREAD_TYPES.map((spread, idx) => (
                  <button
                    key={spread.id}
                    onClick={() => {
                      setSelectedSpread(spread);
                      navigate("/reading");
                    }}
                    className={`group relative h-40 md:h-56 rounded-3xl overflow-hidden border ${
                      s.cardBorder
                    } ${
                      s.cardBg
                    } backdrop-blur-md flex flex-col p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                      idx === 0 ? "col-span-2 lg:col-span-1" : ""
                    }`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${spread.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                    />
                    <div className="flex-1">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br ${spread.color} flex items-center justify-center shadow-lg text-white mb-3 group-hover:scale-110 transition-transform duration-500`}
                      >
                        {spread.icon}
                      </div>
                      <h4
                        className={`${s.text} font-serif font-bold text-sm md:text-lg mb-1`}
                      >
                        {spread.title}
                      </h4>
                      <p
                        className={`${s.textSub} text-[10px] md:text-xs line-clamp-2 leading-relaxed`}
                      >
                        {spread.subtitle}
                      </p>
                    </div>
                    <div
                      className={`mt-auto pt-4 border-t ${
                        isDark ? "border-white/5" : "border-stone-100"
                      } flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest ${s.textSub}`}
                      >
                        Bắt đầu
                      </span>
                      <ArrowRight size={12} className={s.text} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 lg:col-span-4 space-y-6">
            <div
              className={`w-full aspect-[4/5] rounded-3xl overflow-hidden relative group cursor-pointer`}
            >
              <img
                src="https://images.unsplash.com/photo-1630342933732-c64dc240a23d?q=80&w=1000&auto=format&fit=crop"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Crystals"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                  Bộ sưu tập mới
                </span>
                <h3 className="text-white font-serif font-bold text-2xl mb-2">
                  Đá Thạch Anh Tím
                </h3>
                <p className="text-white/70 text-xs mb-4 line-clamp-2">
                  Mang lại sự bình yên và trực giác nhạy bén cho người sở hữu.
                </p>
                <button className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Khám phá ngay
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default HomePage;
