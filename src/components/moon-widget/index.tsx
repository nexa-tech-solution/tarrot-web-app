import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { Moon } from "lucide-react";

const MoonWidget: React.FC = () => {
  const theme = useAppStore((state) => state.theme);
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);
  return (
    <div
      className={`w-full ${s.cardBg} border ${s.cardBorder} rounded-2xl p-6 flex items-center justify-between backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:shadow-lg group`}
    >
      <div
        className={`absolute top-0 right-0 w-48 h-48 ${
          isDark ? "bg-indigo-500/5" : "bg-indigo-300/10"
        } rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`}
      ></div>
      <div className="flex items-center gap-5 relative z-10">
        <div
          className={`w-14 h-14 rounded-full border ${
            isDark
              ? "border-white/10 bg-[#0a0a0f]"
              : "border-stone-100 bg-white"
          } flex items-center justify-center shadow-2xl`}
        >
          <Moon
            className={`w-6 h-6 ${
              isDark ? "text-indigo-200" : "text-indigo-600"
            }`}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h4 className={`${s.text} font-serif font-bold text-lg`}>
            Trăng Khuyết
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-amber-400" : "bg-indigo-500"
              }`}
            ></span>
            <p
              className={`${s.textSub} text-[10px] uppercase tracking-widest font-medium`}
            >
              Giai đoạn: Buông bỏ
            </p>
          </div>
        </div>
      </div>
      <div className="text-right relative z-10">
        <div className={`text-3xl font-serif font-medium ${s.text}`}>28</div>
        <div
          className={`text-[10px] ${s.textSub} uppercase tracking-widest font-bold`}
        >
          Tháng 12
        </div>
      </div>
    </div>
  );
};

export default MoonWidget;
