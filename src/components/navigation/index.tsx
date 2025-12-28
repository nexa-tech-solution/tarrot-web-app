import { getThemeStyles } from "@/themes/index.theme";
import type { TabId, ThemeMode } from "@/types/index.type";
import { BookOpen, Crown, Home, Sparkles, User } from "lucide-react";

const Navigation: React.FC<{
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  theme: ThemeMode;
}> = ({ activeTab, onTabChange, theme }) => {
  const s = getThemeStyles(theme);
  const isDark = theme === "dark";

  const tabs = [
    { id: "home", icon: <Home size={22} />, label: "Home" },
    { id: "journal", icon: <BookOpen size={22} />, label: "Journal" },
    { id: "profile", icon: <User size={22} />, label: "Profile" },
  ];

  return (
    <>
      {/* MOBILE BOTTOM BAR */}
      <div
        className={`md:hidden absolute bottom-0 left-0 right-0 h-[80px] ${s.navBg} backdrop-blur-xl border-t ${s.cardBorder} flex items-center justify-around px-6 z-50 rounded-b-[40px] transition-colors duration-500`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as TabId)}
            className={`flex flex-col items-center gap-1.5 p-2 ${
              activeTab === tab.id
                ? `${s.navTextActive} -translate-y-1`
                : s.navTextInactive
            } transition-all duration-300`}
          >
            <div
              className={`p-1.5 rounded-full transition-all ${
                activeTab === tab.id
                  ? isDark
                    ? "bg-amber-500/10"
                    : "bg-indigo-50"
                  : ""
              }`}
            >
              {tab.icon}
            </div>
            <span
              className={`text-[9px] font-bold tracking-widest uppercase transition-opacity ${
                activeTab === tab.id ? "opacity-100" : "opacity-0 h-0"
              }`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* DESKTOP SIDEBAR (SOPHISTICATED) */}
      <div
        className={`hidden md:flex fixed left-0 top-0 bottom-0 w-[280px] ${s.bg} ${s.sidebarBorder} flex-col z-50 transition-colors duration-500`}
      >
        <div className="p-10 pb-8">
          <h1
            className={`text-3xl font-serif font-bold ${s.text} tracking-wider flex items-center gap-3`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="text-black w-5 h-5" fill="black" />
            </div>
            Mystic
          </h1>
          <p
            className={`mt-2 ${s.textSub} text-xs uppercase tracking-[0.2em] font-medium pl-1`}
          >
            Tarot Reader
          </p>
        </div>

        <nav className="flex-1 px-6 space-y-3 py-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as TabId)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group
                    ${
                      isActive
                        ? isDark
                          ? "bg-white/5 text-amber-100 border border-white/5 shadow-inner"
                          : "bg-white text-indigo-900 shadow-sm border border-stone-100"
                        : `${s.textSub} hover:bg-white/5 hover:text-indigo-200`
                    }`}
              >
                <div
                  className={`transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  {tab.icon}
                </div>
                <span
                  className={`font-medium text-sm tracking-wide ${
                    isActive ? "font-bold" : ""
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]"></div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-8">
          <div
            className={`p-6 rounded-2xl relative overflow-hidden group cursor-pointer border ${s.cardBorder}`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                isDark
                  ? "from-indigo-900/50 to-purple-900/50"
                  : "from-indigo-50 to-purple-50"
              } opacity-50`}
            ></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-amber-400">
                <Crown size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Premium
                </span>
              </div>
              <h4 className={`text-sm font-bold ${s.text} mb-3`}>
                Mở khóa toàn bộ
              </h4>
              <p className={`text-[10px] ${s.textSub} mb-4 leading-relaxed`}>
                Truy cập không giới hạn các trải bài cao cấp.
              </p>
              <div
                className={`w-full h-1 rounded-full ${
                  isDark ? "bg-white/10" : "bg-stone-200"
                }`}
              >
                <div className="w-3/4 h-full bg-amber-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
